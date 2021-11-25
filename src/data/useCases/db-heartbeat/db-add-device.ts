import { HeartbeatModel } from '../../../domain/entities/heartbeat'
import { AddHeartbeat, IHeartbeat } from '../../../domain/useCases/heartbeat/add-heartbeat'
import { IHeartbeatRepository } from '../protocols/repositories/heartbeat-repository'


export class DbAddHeartbeath implements AddHeartbeat {

  constructor (private readonly iHeartbeatRepository: IHeartbeatRepository) {
    this.iHeartbeatRepository = iHeartbeatRepository
  }
  
  async add (heartbeat: HeartbeatModel): Promise<IHeartbeat> {
    
    const saveHeartbeat = await this.iHeartbeatRepository.add(heartbeat)

    if(!saveHeartbeat) throw( new Error('Error in the save heartbeats: check in the server'))

    return new Promise(resolve => resolve(
      saveHeartbeat

    ))
  }
}



