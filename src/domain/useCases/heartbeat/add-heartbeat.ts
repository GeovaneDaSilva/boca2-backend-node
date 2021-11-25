import { HeartbeatModel } from '../../entities/heartbeat';

export interface IHeartbeat {
  _id?: string
  id?: string
  activated: boolean 
  connected_init: Date     
  disconnected?: Date
  latitude: number
  longitude: number
  created_at: Date
  device?: string
}

export interface AddHeartbeat {
  add: (device: HeartbeatModel) => Promise<IHeartbeat>
}

