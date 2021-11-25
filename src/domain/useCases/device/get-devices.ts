import { DeviceModel } from '../../entities/device';

export interface IDevice {
  _id?: string
  phone: string
  username: string
  password: string
  created_at: Date
  activated: Boolean
  user: string
  role?: string
}

export interface GetDevice {
  get: (device: string) => Promise<IDevice>
}
