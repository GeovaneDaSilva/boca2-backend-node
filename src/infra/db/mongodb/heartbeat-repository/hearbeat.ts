import { HeartbeatModel } from '../../../../domain/entities/heartbeat'
import { AddHeartbeat, IHeartbeat } from '../../../../domain/useCases/heartbeat/add-heartbeat'
import HeartbeatSchema from '../mongo-schemas/heartbeat'
import DeviceSchema from '../mongo-schemas/device-schema'
import { IHeartbeatRepository } from '../../../../data/useCases/protocols/repositories/heartbeat-repository'
import { UpdateHeartbeat } from '../../../../domain/useCases/heartbeat/put-heartbeat'


const props = 'id latitude longitude activated connected_init created_at device'

export class HeartbeatMongoRepository implements IHeartbeatRepository {

  async add (heartbeat: HeartbeatModel): Promise<IHeartbeat> {
    try {
      const collection: AddHeartbeat | any = await HeartbeatSchema.create(heartbeat)

      const { _id, latitude, longitude,  activated, connected_init, created_at, device } = collection
      const newCollection: any = { id: _id, latitude, longitude, activated, connected_init, created_at, device}


      const deviceDb: any = await DeviceSchema.findById(device)

      if(!deviceDb) throw( new Error('Error in the save heartbeats: check in the server'))

      deviceDb.heartbeats = await newCollection.id
      
      await collection.save()
      await deviceDb.save()
      
      
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (username: string): Promise<IHeartbeat> {
    try {
      const collection: IHeartbeat | any = await DeviceSchema.findOne({username})
      
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IHeartbeat> {
    try {
      const collection: IHeartbeat | any = await HeartbeatSchema.findById(id)
      const { _id, latitude, longitude,  activated, connected_init, created_at, device } = collection
      const newCollection: any = { id: _id, latitude, longitude, activated, connected_init, created_at, device}

      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<IHeartbeat> {
    try {
      const collection: UpdateHeartbeat | any = await HeartbeatSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
      
      const { _id, latitude, longitude,  activated, connected_init, created_at, device } = collection
      const newCollection: any = { id: _id, latitude, longitude, activated, connected_init, created_at, device}
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }
}
