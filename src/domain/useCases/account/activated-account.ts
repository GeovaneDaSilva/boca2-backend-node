export interface AddAccountModel {
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

export interface ActivatedAccount {
  active: (status: AddAccountModel) => Promise<AddAccountModel>
}
