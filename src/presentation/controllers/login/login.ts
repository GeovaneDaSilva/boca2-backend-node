import { NoReadyExist } from './../../errors/ready-exist-error';
import { HttpRequest, HttpResponse, Controller, EmailValidator } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, notFound, serverError, success, unauthorized } from '../../helpers/http-helper'
import { Authentication } from '../../../domain/useCases/authentication'
import { Dcryptography } from '../../../infra/cryptgraphy/encryper'
import { IAccountRepository } from '../../../data/useCases/protocols/repositories/account-repository'
import { IDeviceRepository } from '../../../data/useCases/protocols/repositories/device-repository'
import { AccessDeniedError } from '../../errors/forbidden-error'
import { NotFoundError } from '../../errors/not-fount-error';

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication,
    private readonly dcryptgraphy: Dcryptography,
    private readonly iAccountRepository: IAccountRepository) {
    this.emailValidator = emailValidator
    this.authentication = authentication
    this.dcryptgraphy = dcryptgraphy
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['email', 'password']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const user: { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(user.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account: any = await this.iAccountRepository.getOne(user.email)

      if (!account) {
        return notFound(`${user.email}`)
      }
      const passwordDcrypt = await this.dcryptgraphy.dencrypt(user.password, account.password)
      if (passwordDcrypt === false) {
        return unauthorized(new Error('Unauthorized'))
      }
      if (!passwordDcrypt) {
        throw Error('Error in dcrypt')
      }
      const userAuth = await this.authentication.auth(user.email, user.password)
      return success(userAuth)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class LoginDeviceController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication,
    private readonly dcryptgraphy: Dcryptography,
    private readonly iDeviceRepository: IDeviceRepository) {
    this.emailValidator = emailValidator
    this.authentication = authentication
    this.dcryptgraphy = dcryptgraphy
    this.iDeviceRepository = iDeviceRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['username', 'password']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { username, password } = httpRequest.body

      
      const device: any = await this.iDeviceRepository.getOne(username)

      if (!device) {
        return unauthorized(new NoReadyExist(username))
      }
      
      
      const passwordDcrypt = await this.dcryptgraphy.dencrypt(password, device.password)
      
      if (passwordDcrypt === false) return unauthorized(new Error('Unauthorized'))

      if (!passwordDcrypt) throw Error('Error in dcrypt')

      const userAuth = await this.authentication.authDevice(device.username, device.password)
      return success(userAuth)
    } catch (error) {
      
      
      return serverError(error)
    }
  }
}
