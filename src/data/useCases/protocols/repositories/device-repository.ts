import { DeviceModel } from '../../../../domain/entities/device';
import { AddDevice, IDevice } from '../../../../domain/useCases/device/add-device'

export interface IDeviceRepository {
  add: (device: DeviceModel ) => Promise<IDevice>
  getOne: (value: string) => Promise<IDevice>
  getById: (id: string) => Promise<IDevice>

}


