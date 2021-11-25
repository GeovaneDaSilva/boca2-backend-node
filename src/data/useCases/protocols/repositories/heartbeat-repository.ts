import { HeartbeatModel } from '../../../../domain/entities/heartbeat';
import { IHeartbeat } from '../../../../domain/useCases/heartbeat/add-heartbeat';

export interface IHeartbeatRepository {
  add: (device: HeartbeatModel ) => Promise<IHeartbeat>
  getOne: (value: string) => Promise<IHeartbeat>
  getById: (id: string) => Promise<IHeartbeat>
  update: (id: string, body: any) => Promise<IHeartbeat>
}


