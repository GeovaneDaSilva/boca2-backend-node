import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const AccountSchema = new Schema({
  name: String,
  last_name: String,
  email: String,
  phone: Number,
  password: String,
  role: String,
  image: String,
  created_date: Date,
  activated: Boolean,
  activated_at: Date,
  group: { type: Schema.Types.ObjectId },

  // devices:[{ type: Schema.Types.ObjectId, ref:'Devices'}],
})

AccountSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Account', AccountSchema)
