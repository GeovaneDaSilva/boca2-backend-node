import { DbAddHeartbeath } from "../../data/useCases/db-heartbeat/db-add-device"
import { DbUpdateHeartbeath } from "../../data/useCases/db-heartbeat/db-update-heartbeat"
import { DeviceMongoRepository } from "../../infra/db/mongodb/device-repository/device"
import { HeartbeatMongoRepository } from "../../infra/db/mongodb/heartbeat-repository/hearbeat"
import { RegisterHeartbeatController, UpdateHeartbeatController } from "../../presentation/controllers/heartbeat/heartbeat"

export const makeRegisterHeartbeatController = (): RegisterHeartbeatController => {
  const heartbeatMongoRepository = new HeartbeatMongoRepository()  
  const dbAddHeartbeath = new DbAddHeartbeath(heartbeatMongoRepository)
  const deviceMongoRepository = new DeviceMongoRepository()
  const registerHeartbeatController = new RegisterHeartbeatController(dbAddHeartbeath, deviceMongoRepository )
      
    return registerHeartbeatController
  }
  

  export const makeUpdateHeartbeatController = (): UpdateHeartbeatController => {
    const heartbeatMongoRepository = new HeartbeatMongoRepository()  
    const dbUpdateHeartbeath = new DbUpdateHeartbeath(heartbeatMongoRepository)
    const updateHeartbeatController = new UpdateHeartbeatController(dbUpdateHeartbeath, heartbeatMongoRepository )
        
      return updateHeartbeatController
    }