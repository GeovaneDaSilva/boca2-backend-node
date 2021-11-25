import { AccountModel } from '../../entities/account'

export interface AddAccountModel {
  name: string
  last_name: string
  email: string
  phone: number
  password: string
  role: string
  created_date: Date
  activated: Boolean
  activated_at: Date
}

export interface Address {
  street: string
  country: string
  state: string
  zipCode: number
  apt: number
}

export interface AddAccount {
  add: (account: AccountModel) => Promise<AddAccountModel>
}
