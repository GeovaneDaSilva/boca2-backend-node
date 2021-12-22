import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const InvoiceSchema = new Schema({
  checkout: Object,
  order_number: String,
  delivery_date: String,
  customer_name: String,
  customer_email: String,
  order_type: String,
  address: Object,
  serving_time: Date,
  number_of_guests: Number,
  food_item_type: Array,
  delivery_fee: Number,
  discount_amount: Number,
  admin_fee: Number,
  sales_tax: Number,
  tip: Number,
  cred_card_fee: Number,
  total: Number,
  assigned_to: String,
  paid: Boolean,
  created_at: Date,
  updated_at: Date




  
})

InvoiceSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

mongoose.pluralize(null);
export default mongoose.model('invoices', InvoiceSchema)
