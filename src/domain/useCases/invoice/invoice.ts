import { InvoiceModel } from "../../entities/invoice"
import { OrderModel } from "../../entities/order"


export interface IInvoice {
    _id?: string
    order_number: number
    due_date: Date
    delivery_date: Date
    delivery_location_code: string
    customer_name: string
    customer_email: string
    customer_phone?: string
    order_type: string
    address: any
    serving_time: Date
    number_of_guests: number
    food_item_type: any
    delivery_fee: number
    discount_amount: number
    admin_fee: number
    sales_tax: number
    tip: number
    cred_card_fee: number
    total: number
    paid: boolean
    assigned_to: string
    note?: string
    deleted?: boolean
    created_at?: Date
    updated_at?: Date
  

}

export interface IInvoiceUseCase {
  add: (data: InvoiceModel) => Promise<IInvoice>
  get: (id?: InvoiceModel) => Promise<IInvoice>
  select: (value: Boolean) => Promise<IInvoice>
  update?: (id: string, body: InvoiceModel) => Promise<IInvoice>
  delete: (id: InvoiceModel ) => Promise<IInvoice>
}
