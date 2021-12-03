import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const ItemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  offer_price: Number,
  details: String,
  lb: Number,
  oz: Number,
  text_offer: String,
  image: String,
  sku: String,
  activated: Boolean,
  created_at: Date,
  quantity: Number,
  product: { type: Schema.Types.ObjectId }
})

ItemSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

export default mongoose.model('Item', ItemSchema)
