import { ItemModel } from '../../entities/item';

export interface IItemResponse {
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
    item?: any
}


export interface IItem {
  add: (product: ItemModel) => Promise<IItemResponse>
  get?: (id: ItemModel) => Promise<IItemResponse>
  getAll?: (product: ItemModel) => Promise<IItemResponse>
  update?: (id: ItemModel, body: any) => Promise<IItemResponse>
  remove?: (id: ItemModel) => Promise<IItemResponse>

}
