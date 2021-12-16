import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  pre_default: String,
  cord_address: Object,
  group_customer: { type: Schema.Types.ObjectId },
  created_at: Date,
  
})

AddressSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

mongoose.pluralize(null);
export default mongoose.model('address', AddressSchema)
