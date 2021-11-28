import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const GroupSchema = new Schema({
  name: String,
  email: String,
  address: {type: Array}, 
  orders:[{ type: Schema.Types.ObjectId, ref:'Orders'}],
  invoices:[{ type: Schema.Types.ObjectId, ref:'Orders'}],
  created_date: Date,
  account: { type: Schema.Types.ObjectId },
})

GroupSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Group', GroupSchema)
