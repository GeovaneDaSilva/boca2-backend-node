import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const DeviceSchema = new Schema({
  username: String,
  password: String,
  phone: String,
  role: String,
  created_at: Date,
  activated: Boolean,
  user:{ type: Schema.Types.ObjectId, ref:'Account'},
  heartbeats:{ type: Schema.Types.ObjectId, ref:'Heartbeats'},

})

DeviceSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('device', DeviceSchema)
