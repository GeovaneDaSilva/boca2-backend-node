import { AddressModel } from '../../entities/address';

export interface IAddress {
  _id?: string
  address? : any
  group?: any 

}

export interface AddAddress {
  add: (data: AddressModel) => Promise<IAddress>
  get: (id?: AddressModel) => Promise<IAddress>
  update: (id: AddressModel) => Promise<IAddress>
  delete: (id: AddressModel) => Promise<IAddress>
}
