import { IAddressRepository } from './../protocols/repositories/address-repository';

import { AddressModel } from '../../../domain/entities/address'
import { AddAddress, IAddress } from '../../../domain/useCases/address/address'


export class DbAddAddress implements AddAddress {
  
  constructor(private readonly iAddressRepository: IAddressRepository) {
    this.iAddressRepository = iAddressRepository
  }

  async add (addressData: AddressModel): Promise<IAddress> {
    
    const addressDb = await this.iAddressRepository.add(addressData)

    return new Promise(resolve => resolve(
      addressDb
      
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