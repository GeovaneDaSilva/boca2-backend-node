
import { IOrder } from './../../../../domain/useCases/order/order';

import { IOrderRepository } from '../../../../data/useCases/protocols/repositories/order-repository';
import { OrderModel } from '../../../../domain/entities/order';
import OrderSchema from '../mongo-schemas/order-schema';
import GroupSchema from '../mongo-schemas/group-schema';
import ProductSchema from '../mongo-schemas/product-schema';



const props = 'id street city state zip country pre_default cord_address group_customer created_at orders '

export class OrderMongoRepository implements IOrderRepository {

  async add (orderData: OrderModel): Promise<IOrder> {
    try {      
        

      const collection: OrderModel | any = await OrderSchema.create(orderData)

      const groupDb: any = await GroupSchema.findById(collection.group_customer)

      await collection.save()

      const resultPush = await groupDb.orders.push(collection._id)
      console.log('send Push Order', resultPush);
      await groupDb.save()

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<IOrder> {
    try {
      const collection: IOrder | any = await OrderSchema.find()
      const count: IOrder | any =  await OrderSchema.count()
      let orders: any = {
        orders: collection, 
        orders_total: count
      }
      return orders
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (name: string): Promise<IOrder> {
    try {
      const collection = null
        
        return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IOrder> {
    try {
      
        
      return 
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<IOrder> {
    try {
  
        
        
        return null
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<IOrder> {
    try {

     
      
      return  
      
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<IOrder> {
    try {
    
      return 
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<IOrder> {
    try {
      
      const collection: IOrder | any = await OrderSchema.find({group_customer: value})
    
      let orders: any = {
        orders: collection, 

      }
      return orders

    } catch (error) {
      console.log(error)
    }
  }

  async getItemsByProductId (id: string): Promise<IOrder> {
    try {

      return 
    } catch (error) {
      console.log(error)
    }
  }
}
