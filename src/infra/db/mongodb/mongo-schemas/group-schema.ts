import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const GroupSchema = new Schema({
  address:[{ type: Schema.Types.ObjectId, ref:'Address'}],
  orders:[{ type: Schema.Types.ObjectId, ref:'Orders'}],
  account: { type: Schema.Types.ObjectId },
  created_date: Date,
  
})

GroupSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Group', GroupSchema)
