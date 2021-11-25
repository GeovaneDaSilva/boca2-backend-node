import { DeviceModel } from '../../entities/device';

export interface IDevice {
  _id?: string
  id?: string
  phone: string
  username: string
  password: string
  created_at: Date
  activated: Boolean
  user: string
  role?: string
}

export interface AddDevice {
  add: (device: DeviceModel) => Promise<IDevice>
}
