import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const CategorySchema = new Schema({
  name: String,
  description: String,
  created_date: Date,
  products:[{ type: Schema.Types.ObjectId, ref:'Products'}],
  packages:[{ type: Schema.Types.ObjectId, ref:'Items'}],
})

CategorySchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Category', CategorySchema)
