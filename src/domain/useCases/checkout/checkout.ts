import { OrderModel } from './../../entities/order';



export interface ICheckout {
  toPay: (gateWay: any, data: OrderModel) => Promise<any>
}
