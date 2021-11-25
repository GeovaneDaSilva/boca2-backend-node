import { AccountModel } from '../../entities/account'

export interface AddAccountModel {
  owner_id: string
  name: string
  last_name: string
  email: string
  phone: number
  password: string
  role: string
  address: Address
  activated: boolean
  created_date: Date
}

export interface Address {
  street: string
  country: string
  state: string
  zipCode: number
  apt: number
}

export interface UpdateAccount {
  edit: (id: string, body: AccountModel) => Promise<AddAccountModel>
}