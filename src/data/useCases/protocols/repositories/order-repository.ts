import { IOrder } from './../../../../domain/useCases/order/order';
import { OrderModel } from "../../../../domain/entities/order"


export interface IOrderRepository {
  add: (orderData: OrderModel) => Promise<IOrder>
  getAll: () => Promise<IOrder>
  getOne: (email: string) => Promise<IOrder>
  getById: (id: string) => Promise<IOrder>
  delete: (id: string) => Promise<IOrder>
  update: (id: string, body: any) => Promise<IOrder>
  count: (value?: any) => Promise<IOrder>
  select: (value?: any) => Promise<IOrder>


}


