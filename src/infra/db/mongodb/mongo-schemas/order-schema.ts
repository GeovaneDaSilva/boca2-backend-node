import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const OrderSchema = new Schema({
  checkout: Object,
  products:[{
    _id: { type: Schema.Types.ObjectId, ref:'Products'},
    quantity: Number
  }],
  items:[{
    _id: { type: Schema.Types.ObjectId, ref:'Items'},
    quantity: Number
  }],
  address: { type: Schema.Types.ObjectId },
  payment: Boolean,
  cancelled: Boolean,
  drive_id: { type: Schema.Types.ObjectId, required: false },
  group_customer: { type: Schema.Types.ObjectId },
  total: Number,
  created_at: Date,
  
})

OrderSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

mongoose.pluralize(null);
export default mongoose.model('orders', OrderSchema)
