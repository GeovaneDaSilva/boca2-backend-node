import { OrderModel } from "../../entities/order"
import { IAddress } from "../address/address"
import { IItem } from "../item/items"
import { IProduct } from "../product/products"

export interface IOrder {
  _id?: string
  checkout: any
  id?: string
  products: IProduct
  items?: IItem
  group_customer: any
  address: IAddress
  payment: boolean
  drive_id?: any
  cancelled: boolean
  created_at: Date
  total: number

}

export interface AddOrder {
  add: (data: OrderModel) => Promise<IOrder>
  get: (id?: OrderModel) => Promise<IOrder>
  //update: (id: string, body: AddressModel) => Promise<IAddress>
  // delete: (id: AddressModel ) => Promise<IAddress>
}
