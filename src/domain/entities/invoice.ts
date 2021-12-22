export class InvoiceModel {
    checkout: any
    order_number: string
    delivery_date: Date
    customer_name: string
    customer_email: string
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
    created_at: Date
    updated_at: Date
}