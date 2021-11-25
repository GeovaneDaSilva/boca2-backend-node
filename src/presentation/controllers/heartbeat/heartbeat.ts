import { IDeviceRepository } from './../../../data/useCases/protocols/repositories/device-repository';
import { badRequest, notFound, serverError, success } from '../../helpers/http-helper';
import { Controller } from './../../interfaces/controller';
import { AddHeartbeat, HttpRequest, HttpResponse, IHeartbeat } from "./heartbeat-protocols"
import { MissingParamError, ReadyExist } from '../../errors';
import { UpdateHeartbeat } from '../../../domain/useCases/heartbeat/put-heartbeat';
import { IHeartbeatRepository } from '../../../data/useCases/protocols/repositories/heartbeat-repository';


export class RegisterHeartbeatController implements Controller {

    constructor (private readonly iAddHeartbeat: AddHeartbeat,
      private readonly iDeviceRepository: IDeviceRepository){
      this.iAddHeartbeat = iAddHeartbeat
      this.iDeviceRepository = iDeviceRepository
    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {

        const device_id = httpRequest.params.device_id
        
        const foundDevice = await this.iDeviceRepository.getById(device_id)
          
        if(!foundDevice) return notFound(device_id)

        
        let { latitude, longitude,  }: IHeartbeat = httpRequest.body

        const requiredField = ['latitude', 'longitude']

        for (const field of requiredField) {
          if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
        }
        const DTO = await this.iAddHeartbeat.add({
          latitude,
          longitude,
          activated: true,
          connected_init: new Date(),
          created_at: new Date(),
          device: foundDevice.id
        })
        
        return success(DTO)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}

export class UpdateHeartbeatController implements Controller {

  constructor (private readonly iUpdateHeartbeat: UpdateHeartbeat,
    private readonly iHeartbeatRepository: IHeartbeatRepository){
    this.iUpdateHeartbeat = iUpdateHeartbeat
    this.iHeartbeatRepository = iHeartbeatRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const heartbeat_id = httpRequest.params.id
      
      const foundHeartbeat = await this.iHeartbeatRepository.getById(heartbeat_id)
        
      if(!foundHeartbeat) return notFound(heartbeat_id)
      
      let body: IHeartbeat = httpRequest.body


      const DTO = await this.iUpdateHeartbeat.put(foundHeartbeat.id, body)
      
      return success(DTO)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}