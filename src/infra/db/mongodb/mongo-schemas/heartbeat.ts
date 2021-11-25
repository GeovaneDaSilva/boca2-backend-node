import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const HeartBeatSchema = new Schema({
  activated: Boolean,
  connected_init: Date,
  disconnected: Date,
  latitude: Number,
  longitude: Number,
  created_at: Date,

  device:{ type: Schema.Types.ObjectId, ref:'Device'},
})

HeartBeatSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Heartbeat', HeartBeatSchema)
