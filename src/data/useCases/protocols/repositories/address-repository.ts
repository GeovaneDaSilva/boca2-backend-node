import { IAddress } from '../../../../domain/useCases/address/address';
import { AddressModel } from './../../../../domain/entities/address';

export interface IAddressRepository {
  add: (addressData: AddressModel) => Promise<IAddress>
  getAll: () => Promise<IAddress>
  getOne: (email: string) => Promise<IAddress>
  getById: (id: string) => Promise<IAddress>
  delete: (id: string) => Promise<IAddress>
  update: (id: string, body: any) => Promise<IAddress>
  count: (value?: any) => Promise<IAddress>
  select: (value?: any) => Promise<IAddress>


}


