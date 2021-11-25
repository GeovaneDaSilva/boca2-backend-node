import { HeartbeatModel } from '../../../domain/entities/heartbeat'
import { AddHeartbeat, IHeartbeat } from '../../../domain/useCases/heartbeat/add-heartbeat'
import { UpdateHeartbeat } from '../../../domain/useCases/heartbeat/put-heartbeat'
import { IHeartbeatRepository } from '../protocols/repositories/heartbeat-repository'


export class DbUpdateHeartbeath implements UpdateHeartbeat {

  constructor (private readonly iHeartbeatRepository: IHeartbeatRepository) {
    this.iHeartbeatRepository = iHeartbeatRepository
  }
  
  async put (id: string, heartbeat: HeartbeatModel): Promise<IHeartbeat> {


    const heartbeatUpdated = await this.iHeartbeatRepository.update(id, heartbeat)
    if(heartbeatUpdated === null) throw (new Error ('Error in the updated data'))
    console.log(heartbeatUpdated);
    
    return new Promise(resolve => resolve(
      heartbeatUpdated

    ))
  }
}



