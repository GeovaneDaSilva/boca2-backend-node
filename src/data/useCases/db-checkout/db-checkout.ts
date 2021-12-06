import { ICheckout } from '../../../domain/useCases/checkout/checkout';


export class DbAddCheckout implements ICheckout {

  toPay (gateWay: any): Promise<any>{
    
    console.log(gateWay.paid);
    // if is true, call payment order
    
    return new Promise(resolve => resolve(
      gateWay

    ))
  }

}

