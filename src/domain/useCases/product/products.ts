import { ProductModel } from '../../entities/product';

export interface IProductResponse {
    id?: string
    _id?: string
    name: string
    description: string
    price: number
    offer_price: number
    details: string
    lb: number
    oz: number
    quantity: number
    text_offer: string
    image?: any
    tags?: any
    activated: boolean
    created_at: Date
    activated_at?: Date
    category?: any
    sku: string
    items?: any
    uploads?: any
}


export interface IProduct {
  add: (product: ProductModel) => Promise<IProductResponse>
  get?: (id: ProductModel) => Promise<IProductResponse>
  getAll?: (product: ProductModel) => Promise<IProductResponse>
  update?: (id: ProductModel, body: any) => Promise<IProductResponse>
  delete?: (id: string) => Promise<IProductResponse>
}
