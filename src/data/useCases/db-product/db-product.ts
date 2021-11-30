import { ProductModel } from "../../../domain/entities/product"
import { IProduct, IProductResponse } from "../../../domain/useCases/product/products"
import { IProductRepository } from "../protocols/repositories/product-repository"

export class DbAddProduct implements IProduct {

  constructor(private readonly iProductRepository: IProductRepository) {
    this.iProductRepository = iProductRepository
  }
    async add (product: ProductModel): Promise<IProductResponse> {
      const productDb = await this.iProductRepository.add(product)
      return new Promise(resolve => resolve(
        productDb
      ))
    }

    async getAll (product: ProductModel): Promise<IProductResponse> {
      return new Promise(resolve => resolve(
        product
      ))
    }

    async get (product: ProductModel): Promise<IProductResponse> {
      return new Promise(resolve => resolve(
        product
      ))
    }

    async update (id: ProductModel, body: ProductModel): Promise<IProductResponse> {
      
      const productUpdated = await this.iProductRepository.update(id, body)

      if(!productUpdated) throw(new Error('Error to updated product'))
      
      return new Promise(resolve => resolve(
        productUpdated
      ))
    }
}

