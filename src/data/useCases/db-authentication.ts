import { created } from './../../presentation/helpers/http-helper';
import { DeviceModel } from './../../domain/entities/device';
import { Authentication } from '../../domain/useCases/authentication'
import { AccountModel } from '../../domain/models/account'
import { IJwt } from '../../presentation/interfaces/jwt-token'
import { IAccountRepository } from './protocols/repositories/account-repository'
import { IDeviceRepository } from './protocols/repositories/device-repository';

export class Dbauth implements Authentication {
  constructor (private readonly iJwt: IJwt,
    private readonly iAccountRepository: IAccountRepository,
    private readonly iDeviceRepository: IDeviceRepository) {
    this.iJwt = iJwt
    this.iAccountRepository = iAccountRepository
    this.iDeviceRepository = iDeviceRepository
  }

  async auth (email: string): Promise<AccountModel> {
    try {
      const userDB: any = await this.iAccountRepository.getOne(email)
      const Account: any = {
        id: userDB._id,
        name: userDB.name,
        email: userDB.email,
        role: userDB.role,
        last_name: userDB.last_name,
        phone: userDB.phone,
        image: userDB.image,
        activated: userDB.activated,
        created_date: userDB.created_date,
        activated_at: userDB.activated_at,
        group: userDB.group,
      }
      const token = await this.iJwt.token(Account.id, Account.role)

      if (!token) {
        throw Error('NO exist Token in the data')
      }

      const newUser: any = {
        Account,
        token

      }

      console.log(newUser);
      
      return newUser
    } catch (error) {
      console.log(error)
      return error.message
    }
  }


  async authDevice (username: string): Promise<DeviceModel> {
    try {
      const deviceDB: any = await this.iDeviceRepository.getOne(username)
      const Device: any = {
        id: deviceDB._id,
        role: deviceDB.role,
        username: deviceDB.username,
        activated: deviceDB.activated,
        created_at: deviceDB.created_at
        
      }

      const token = await this.iJwt.token(Device.id, Device.role)

      if (!token) {
        throw Error('NO exist TOken in the data')
      }

      const newUser: any = {
        Device,
        token

      }
      return newUser
    } catch (error) {
      console.log(error)
      return error.message
    }
  }
}
