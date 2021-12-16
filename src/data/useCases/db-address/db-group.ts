
import { AddressModel } from '../../../domain/entities/address'
import { AddAddress, IAddress } from '../../../domain/useCases/address/address'


export class DbAddAddress implements AddAddress {
  

  async create (data: AddressModel): Promise<IAddress> {
    
    return new Promise(resolve => resolve(
      data
      
    ))
  }

  async get (address: AddressModel): Promise<IAddress> {
    
    return new Promise(resolve => resolve(
      address
      
    ))
  }

  async update (address: AddressModel): Promise<IAddress> {
    
    return new Promise(resolve => resolve(
      address
      
    ))
  }

  async delete (address: AddressModel): Promise<IAddress> {
    
    return new Promise(resolve => resolve(
      address
      
    ))
  }
}
