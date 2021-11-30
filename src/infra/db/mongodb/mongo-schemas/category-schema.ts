import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const CategorySchema = new Schema({
  name: String,
  description: String,
  created_date: Date,
  image: String,
  activated_dates: Array,
  products:[{ type: Schema.Types.ObjectId, ref:'Products'}],
})

CategorySchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Category', CategorySchema)
