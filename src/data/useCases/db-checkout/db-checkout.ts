import { OrderModel } from './../../../domain/entities/order';
import { AddOrder } from './../../../domain/useCases/order/order';
import { ICheckout } from '../../../domain/useCases/checkout/checkout';

export class DbAddCheckout implements ICheckout {

  constructor(private readonly iAddOrder: AddOrder){
    this.iAddOrder = iAddOrder
  }

  async toPay (gateWay: any, data: OrderModel): Promise<any>{
    
    const checkoutStripe = {
      id: gateWay.id,
      amount: gateWay.amount,
      calculated_statement_descriptor: gateWay.calculated_statement_descriptor,
      currency: gateWay.currency,
      description: gateWay.description,
      outcome: gateWay.outcome,
      payment_method_details: gateWay.payment_method_details.card,
      receipt_url: gateWay.receipt_url

    }

    if(gateWay.paid !== true && gateWay.status !== 'succeeded') {
      gateWay
      
    }
    
    const pushOrderDb = await this.iAddOrder.add({
      checkout: checkoutStripe,
      products: data.products,
      items: data.items,
      group_customer: data.group_customer,
      address: data.address,
      created_at: new Date,
      payment: true,
      cancelled: false,
      total: checkoutStripe.amount

    })

    
    return new Promise(resolve => resolve(
      pushOrderDb

    ))
  }

}

