
export class HeartbeatModel {
  activated: boolean 
  connected_init: Date     
  disconnected?: Date
  latitude: number
  longitude: number
  created_at: Date
  device?: string
}
