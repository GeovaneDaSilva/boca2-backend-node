import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  offer_price: Number,
  details: String,
  lb: Number,
  oz: Number,
  text_offer: String,
  image: String,
  tags: Array,
  activated: Boolean,
  created_at: Date,
  quantity: Number,
  activated_at: Date,
  sku: String,
  category: { type: Schema.Types.ObjectId },
  items:[{ type: Schema.Types.ObjectId, ref:'Items'}],
  uploads: Array,
})

ProductSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })
mongoose.pluralize(null);
export default mongoose.model('products', ProductSchema)
