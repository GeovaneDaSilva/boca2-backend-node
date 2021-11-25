import { UpdateAccount } from '../../../domain/useCases/account/update-account'
import { GetDevice } from '../../../domain/useCases/device/get-devices'
import { Cryptography } from '../../../infra/cryptgraphy/encryper'
import { AddDevice, DeviceModel, IDevice } from '../../../presentation/controllers/device/device-protocols'
import { IAccountRepository } from '../protocols/repositories/account-repository'
import { IDeviceRepository } from '../protocols/repositories/device-repository'


export class DbAddDevice implements AddDevice {

  constructor (private readonly cryptgraphy: Cryptography,
    private readonly iDeviceRepository: IDeviceRepository,) {
      this.cryptgraphy = cryptgraphy
      this.iDeviceRepository = iDeviceRepository
      
      }   
  async add (device: DeviceModel): Promise<IDevice> {
    device.password = await this.cryptgraphy.encrypt(device.password)
    const deviceDb: IDevice | any = await this.iDeviceRepository.add({
      username: device.username,
      password: device.password,
      phone: device.phone,
      role: device.role,
      created_at: device.created_at,
      activated: device.activated,
      user: device.user,
    })

    return new Promise(resolve => resolve(
      deviceDb

    ))
  }
}


export class DbGetDevice implements GetDevice {

  constructor (private readonly iDeviceRepository: IDeviceRepository) {
      this.iDeviceRepository = iDeviceRepository

      }   
  async get (device: string): Promise<IDevice> {
    
    const deviceDb = await this.iDeviceRepository.getById(device)
    return new Promise(resolve => resolve(
      deviceDb

    ))
  }
}
