import { IGroupRepository } from './../../../data/useCases/protocols/repositories/group-repository';
import { InvalidParamError, MissingParamError, NoReadyExist, ReadyExist } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { AddAddress, Controller, HttpRequest, HttpResponse } from "./address-protocols"
import { IAddressRepository } from '../../../data/useCases/protocols/repositories/address-repository';



export class RegisterAddressController implements Controller {
  
  constructor(private readonly iAddAddress: AddAddress, private readonly iGroupRepository: IGroupRepository){

    this.iAddAddress = iAddAddress
    this.iGroupRepository = iGroupRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const group_id = httpRequest.params.group_id
      const { street, city, state, zip, country, cord_address, pre_default } = httpRequest.body

      const requiredField = ['street']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const getGroupDb = await this.iGroupRepository.getById(group_id)

      if(!getGroupDb) return badRequest(new NoReadyExist(group_id))
      

      let address: any = {
        street: street || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        country: country || null,
        pre_default: pre_default,
        cord_address: cord_address || null,
        group_customer: getGroupDb.id,
        created_at: new Date()
      }

      const DTOAddress = await this.iAddAddress.add(address)

      return success(DTOAddress)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class UpdateAddressController implements Controller {
  
  constructor(
    private readonly iAddAddress: AddAddress, 
    private readonly iAddressRepository: IAddressRepository){

    this.iAddAddress = iAddAddress
    this.iAddressRepository = iAddressRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
  
      const address_id = httpRequest.params.address_id
      const iAddressDb: any = await this.iAddressRepository.getById(address_id)


      if(!iAddressDb) return badRequest(new InvalidParamError(address_id))
    
      
      const DTOAddress = await this.iAddAddress.update( iAddressDb.id, httpRequest.body)
      
      return success(DTOAddress)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class DeleteAddressController implements Controller {
  
  constructor(
    private readonly iAddAddress: AddAddress, 
    private readonly iAddressRepository: IAddressRepository){

    this.iAddAddress = iAddAddress
    this.iAddressRepository = iAddressRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
  
      const address_id = httpRequest.params.address_id
      
      const iAddressDb: any = await this.iAddressRepository.getById(address_id)


      if(!iAddressDb) return badRequest(new InvalidParamError(address_id))
    
      
      const DTOAddress = await this.iAddAddress.delete( iAddressDb)
      
      return success(DTOAddress)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}