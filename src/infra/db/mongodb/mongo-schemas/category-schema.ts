import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const CategorySchema = new Schema({
  name: String,
  description: String,
  created_date: Date,
  image: String,
  activated_dates: Array,
  short_description: String, 
  package_type: Boolean,
  products:[{ type: Schema.Types.ObjectId, ref:'Products'}],
})



CategorySchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

mongoose.pluralize(null);
export default mongoose.model('categories', CategorySchema)
