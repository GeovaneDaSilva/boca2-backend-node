import { IOrderRepository } from './../protocols/repositories/order-repository';
import { OrderModel } from '../../../domain/entities/order';
import { AddOrder, IOrder } from './../../../domain/useCases/order/order';

export class DbAddOrder implements AddOrder {
  constructor(private readonly iOrderRepository: IOrderRepository){
    this.iOrderRepository = iOrderRepository
  }
  async add (orderData: OrderModel): Promise<IOrder> {
    
    const salveOrderDb = await this.iOrderRepository.add(orderData)
    
    if(!salveOrderDb) throw(new Error('Error to save Order in the push DB'))
    return new Promise(resolve => resolve(
      salveOrderDb
      
    ))
  }

  async get (address: OrderModel): Promise<IOrder> {
    
    return new Promise(resolve => resolve(
      address
      
    ))
  }

}
