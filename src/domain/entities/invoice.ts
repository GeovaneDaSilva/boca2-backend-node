export class InvoiceModel {
    id?: string
    checkout: any
    due_date: Date
    order_number: number
    delivery_date: Date
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
    deleted: boolean
    assigned_to: string
    note?: string
    created_at: Date
    updated_at: Date
}