import { AccountModel } from '../../../../domain/entities/account'
import { AddAddress } from '../../../../domain/useCases/address/address'
import { IAddress } from '../../../../utils-adapters/stripe-payment'

export interface IAddressRepository {
  add: (accountData: AddAddress) => Promise<IAddress>
  getAll: () => Promise<AccountModel>
  getOne: (email: string) => Promise<IAddress>
  getById: (id: string) => Promise<IAddress>
  delete: (id: string) => Promise<IAddress>
  update: (id: string, body: any) => Promise<IAddress>
  count: (value?: any) => Promise<IAddress>
  select: (value?: any) => Promise<IAddress>


}


