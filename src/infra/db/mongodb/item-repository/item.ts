import ItemSchema from '../mongo-schemas/item-schema'
import ProductSchema from '../mongo-schemas/product-schema'

import { ItemModel } from '../../../../domain/entities/item'
import { IItemResponse } from '../../../../domain/useCases/item/items'
import { IItemRepository } from '../../../../data/useCases/protocols/repositories/item-repository'
import { ProductModel } from '../../../../domain/entities/product'



const props = 'id tags name items uploads quantity description image activated price details created_at offer_price lb oz text_offer sku product'

export class ItemMongoRepository implements IItemRepository {

  async add (productData: ItemModel): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.create(productData)
      const productDb: any = await ProductSchema.findById(collection.product)
      
      await collection.save()
      
      const resultPush = await productDb.items.push(collection.id)
      console.log('send Push', resultPush);
      
      await productDb.save()

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.find({}, props)
      //.populate({path: 'category', model: CategorySchema})
      const total:number = await ItemSchema.count()

      let items: any = {
        items: collection,
        total: total
      }
      return items
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (name: string): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.findOne({ sku: name }, props)

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.findById(id, props)
      const { _id, 
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        quantity,
        lb,
        oz,
        text_offer,
        sku,
        product } = collection

        const newCollection: any = { 
        id: _id,  
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        lb,
        quantity,
        oz,
        text_offer,
        sku,
        product}

        let item: any = {
          item: newCollection
        }
        
        return item
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: ItemModel, body: ItemModel): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
      const { _id, 
        tags,
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        quantity,
        lb,
        oz,
        text_offer,
        sku,
        product } = collection
      const newCollection: any = { 
        id: _id,  
        tags,
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        quantity,
        lb,
        oz,
        text_offer,
        sku,
        product}

        let item: any = {
          itemUpdated: newCollection
        }
        
        
        return item
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<IItemResponse> {
    try {

      const collectionRemoveItem: ItemModel | any = await ItemSchema.findByIdAndDelete(id)
      
      const collectionProduct: ItemModel | any = await ProductSchema.findById(collectionRemoveItem.product)
    
      let products = await collectionProduct.items;

      const index = products.indexOf(id);
      if (index > -1) {
        products.splice(index, 1);
      }


      await ProductSchema.findByIdAndUpdate({_id: collectionRemoveItem.product}, {$set: {items: products}})

      return  collectionRemoveItem
      
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.count(value)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.find(value, props)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getItemsByProductId (id: string): Promise<ProductModel> {
    try {
      const collection: ItemModel | any = await ProductSchema.findById(id, props)

      .populate({path: 'items', model: ItemSchema})
      const { _id, name, description, created_date, items, quantity, products, short_description, image, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, items: items, products: products, quantity: quantity, short_description: short_description, image: image, activated_dates: activated_dates, created_date: created_date }
      


      let product: any = {
        Product: newCollection,
        count_item: collection.items.length
       }
       
      return product
    } catch (error) {
      console.log(error)
    }
  }
}
