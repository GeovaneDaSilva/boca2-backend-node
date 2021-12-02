import ProductSchema from '../mongo-schemas/product-schema'
import CategorySchema from '../mongo-schemas/category-schema'

import { IProductRepository } from '../../../../data/useCases/protocols/repositories/product-repository'
import { ProductModel } from '../../../../domain/entities/product'
import { IProductResponse } from '../../../../domain/useCases/product/products'



const props = 'id tags name items uploads description image activated price details created_at offer_price lb oz text_offer sku category'

export class ProductMongoRepository implements IProductRepository {

  async add (productData: ProductModel): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.create(productData)
      const categoryDb: any = await CategorySchema.findById(collection.category)
      
      await collection.save()
      
      const resultPush = await categoryDb.products.push(collection.id)
      console.log('send Push', resultPush);
      
      await categoryDb.save()

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.find({}, props)
      //.populate({path: 'category', model: CategorySchema})
      const total:number = await ProductSchema.count()

      let products: any = {
        products: collection,
        total: total
      }
      return products
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (name: string): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.findOne({ sku: name }, props)

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.findById(id, props)
      .populate({path: 'category', model: CategorySchema, populate: [{path: 'products', model: ProductSchema}]})
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
        lb,
        oz,
        text_offer,
        sku,
        category } = collection

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
        lb,
        oz,
        text_offer,
        sku,
        category}

        let product: any = {
          product: newCollection
        }
        
        return product
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: ProductModel, body: ProductModel): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
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
        lb,
        oz,
        text_offer,
        sku,
        category } = collection
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
        lb,
        oz,
        text_offer,
        sku,
        category}

        let product: any = {
          productUpdated: newCollection
        }
        
        
        return product
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.findByIdAndDelete(id)

      const { _id, name, email, last_name, phone, role, activated, created_date, activated_at } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, phone, activated, created_date: created_date, activated_at }
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.count(value)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.find(value, props)
      return collection
    } catch (error) {
      console.log(error)
    }
  }
}
