import { ProductModel } from '../../../../domain/entities/product'
import { IProductResponse } from '../../../../domain/useCases/product/products';

export interface IProductRepository {
  add: (productData: ProductModel) => Promise<IProductResponse>
  getAll: () => Promise<IProductResponse>
  getOne: (email: string) => Promise<IProductResponse>
  getById: (id: string) => Promise<IProductResponse>
  delete: (id: string) => Promise<IProductResponse>
  update: (id: ProductModel, body: ProductModel) => Promise<IProductResponse>
  count: (value?: any) => Promise<IProductResponse>
  select: (value?: any) => Promise<IProductResponse>
}


