import { IJwt } from './../../interfaces/jwt-token';
import { NoReadyExist } from './../../errors/ready-exist-error';
import { IAccountRepository } from './../../../data/useCases/protocols/repositories/account-repository';
import { badRequest, notFound, serverError, success, unauthorized } from "../../helpers/http-helper"
import { AddDevice, Controller, HttpRequest, HttpResponse, IDevice } from "./device-protocols"
import { IDeviceRepository } from '../../../data/useCases/protocols/repositories/device-repository';
import { MissingParamError, ReadyExist } from "../../errors";
import { NoActivated } from '../../errors/no-activated-error';
import { IMailProvider } from '../../services/mail-provider';
import { GetDevice } from '../../../domain/useCases/device/get-devices';

export class RegisterDeviceController implements Controller {
    constructor (private readonly addDevice: AddDevice,
      private readonly iDeviceRepository: IDeviceRepository,
      private readonly iAccountRepository: IAccountRepository,
      private readonly mailProvider: IMailProvider,
      private readonly iJwt: IJwt) {
      this.addDevice = addDevice
      this.iDeviceRepository = iDeviceRepository
      this.iAccountRepository = iAccountRepository
      this.mailProvider = mailProvider
      this.iJwt = iJwt
    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {

        const user = httpRequest.params.user

        const { username, password, phone, role = 'DEVICE_ROLE', created_at, activated, } = httpRequest.body

        const requiredField = ['username', 'password', 'phone']

        for (const field of requiredField) {
          if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
        }

        const findDevice = await this.iDeviceRepository.getOne(username)
        let findAccount: IDevice | any = await this.iAccountRepository.getById(user)
        
        if(findDevice) return badRequest(new ReadyExist(username))

        findAccount = JSON.stringify(findAccount)

        if(findAccount === null  || findAccount === undefined) return badRequest(new NoReadyExist(user))
        
    
        
        if(findAccount.activated === false ){

          let id =  findAccount._id
          let role = findAccount.role
          const token = await this.iJwt.token(id, role)

          await this.mailProvider.sendMail({
            to: {
              name: findAccount.name,
              email: findAccount.email
            },
            from: {
              name: 'APP MOBILE Activated your account',
              email: process.env.EMAILVERIFIED
            },
            subject: 'Activar mi cuenta',
            body: `click aqui para activar tu cuenta token ${process.env.baseUrl}/account/activated/${token}`
          })
          
          return unauthorized(new NoActivated()) 
        }

        const dto = await this.addDevice.add({
          username, password, phone, role, created_at: new Date(), activated: false, user
        })
        
        return success(dto)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
  }


  export class GetDeviceController implements Controller {
    constructor( private readonly iGetDevice:  GetDevice) {
      this.iGetDevice = iGetDevice
    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const device_id = httpRequest.params.id
  
        const DTO = await this.iGetDevice.get(device_id)

        return success(DTO)
        
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
  }  