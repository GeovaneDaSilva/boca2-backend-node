import { AccountModel } from "../../entities/account";

export interface AddAccountModel {
  id?: string
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
export interface DeleteAccount {
  delete: (account: AccountModel) => Promise<AddAccountModel>

}