import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UploadSchema = new Schema({
  name: String,
  path: String,
  owner:{ type: Schema.Types.ObjectId},
  created_at: Date

})

UploadSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Upload', UploadSchema)
