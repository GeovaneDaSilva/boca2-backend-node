import { IDeviceRepository } from '../../../../data/useCases/protocols/repositories/device-repository'
import { DeviceModel } from '../../../../domain/entities/device'
import { AddDevice, IDevice } from '../../../../domain/useCases/device/add-device'
import AccountSchema from '../mongo-schemas/account-schema'
import DeviceSchema from '../mongo-schemas/device-schema'
import HeartbeatSchema from '../mongo-schemas/heartbeat'

const props = 'id created_at username activated activated_at'

export class DeviceMongoRepository implements IDeviceRepository {

  async add (device: DeviceModel): Promise<IDevice> {
    try {
      const collection: AddDevice | any = await DeviceSchema.create(device)

      const { _id, username, password,  created_at, role, phone, user } = collection
      const newCollection: any = { id: _id, username, role, phone, activated: created_at, password: ' :) ' }

      await collection.save()

      const accountDb: any = await AccountSchema.findById(user)
      await accountDb.devices.push(newCollection.id)
      await accountDb.save()
      
      
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (username: string): Promise<IDevice> {
    try {
      const collection: IDevice | any = await DeviceSchema.findOne({username})
      
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IDevice> {
    try {
      const collection: IDevice | any = await DeviceSchema.findById(id)
      .populate({path: 'heartbeats', model: HeartbeatSchema})
      const { _id, username, password, activated, created_at, role, phone, heartbeats, user } = collection
      const newCollection: any = { id: _id, username, role, phone, activated, created_at, password: ' :) ', heartbeats, user }
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }
}
