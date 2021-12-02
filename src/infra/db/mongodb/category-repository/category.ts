import { AddCategoryModel } from './../../../../domain/useCases/category/add-category';
import { AddAccountModel } from '../../../../domain/useCases/account/add-account'
import CategorySchema from '../mongo-schemas/category-schema'
import { ICategoryRepository } from '../../../../data/useCases/protocols/repositories/category-repository'
import { CategoryModel } from '../../../../domain/entities/category'
import ProductSchema from '../mongo-schemas/product-schema'


const props = 'id, name description activated_dates short_description products created_date activated image'
const props_category = 'id, name description activated_dates products short_description created_date activated image'

export class CategoryMongoRepository implements ICategoryRepository {

  async add (accountData: AddCategoryModel): Promise<CategoryModel> {
    try {
      const collection: AddAccountModel | any = await CategorySchema.create(accountData)
      if(collection === null) return
      const { _id, name, description, short_description, created_date, products, image, activated_dates } = collection
      const newCollection: any = { id: _id, name: name, description, products, short_description: short_description, activated_dates, image: image,  created_date: created_date }

      await collection.save()
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.find({}, props_category)

      const total:number = await CategorySchema.count()
            
       let categories: any = {
        Categories: collection,
          categories: total
       }
       
      return categories
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (name: string): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.findOne({ name: name })
      //.//populate({path: 'products', model: ProductSchema})
      let category: any = {
        Category: collection
       }
      return category
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<CategoryModel> {
    try {
      const collection: AddAccountModel | any = await CategorySchema.findById(id, props)
      const { _id, name, description, created_date, products, short_description, image, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, short_description: short_description, image: image, activated_dates: activated_dates, created_date: created_date }
      

      let category: any = {
        Category: newCollection,
        count_product: collection.products.length
       }
       
      return category
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsByCategoryId (id: string): Promise<CategoryModel> {
    try {
      const collection: AddAccountModel | any = await CategorySchema.findById(id, props)
      .populate({path: 'products', model: ProductSchema})
      const { _id, name, description, created_date, products, short_description, image, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, products: products, short_description: short_description, image: image, activated_dates: activated_dates, created_date: created_date }
      

      let category: any = {
        Category: newCollection,
        count_product: collection.products.length
       }
       
      return category
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<CategoryModel> {
    try {
      const collection: AddAccountModel | any = await CategorySchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
      const { _id, name, description, created_date, short_description,  products,image, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, short_description: short_description, products: products, image: image, activated_dates: activated_dates, created_date: created_date }

      let category: any = {
        Category: newCollection
       }
      return category
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.findByIdAndDelete(id)
      .populate({path: 'products', model: ProductSchema})
      const { _id, name, description, created_date, products, image, short_description, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, short_description: short_description,  image: image, products: products, activated_dates: activated_dates, created_date: created_date }

      let category: any = {
        Category: newCollection
       }
      return category
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.count(value)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<CategoryModel> {
    try {
       
    
      let collection: AddCategoryModel | any = await CategorySchema.find(value)

      return collection

    } catch (error) {
      console.log(error)
    }
  }
}
