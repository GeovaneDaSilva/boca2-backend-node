import { DeviceModel } from '../entities/device';
import { AccountModel } from '../models/account'

export interface Authentication {
  auth: (email: string, password: string) => Promise<AccountModel>
  authDevice: (username: string, password: string) => Promise<DeviceModel>
}
