import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const AddressSchema = new Schema({
  address:{ type: Array },
  group_customer: { type: Schema.Types.ObjectId },
  created_at: Date,
  
})

AddressSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

mongoose.pluralize(null);
export default mongoose.model('address', AddressSchema)
