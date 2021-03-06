import { InvalidParamError } from './../../errors/invalid-email';
import { badRequest } from './../../helpers/http-helper';
import { IPayment } from "../../../utils-adapters/stripe-payment"
import { serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse, ICheckout } from "./checkout-protocols"
import { ErrorMessage } from '../../errors/errorMessage';
import { MissingParamError } from '../../errors';

export class CheckoutController implements Controller {

    constructor(private readonly iCheckout: ICheckout, private readonly iPayment: IPayment){
        this.iCheckout = iCheckout
        this.iPayment = iPayment
    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
       
        const { amount, currency, name, detail, products, items, group_customer, address,  card: {number, exp_month, exp_year, cvc}, } = httpRequest.body
        
        const requiredField = ['amount', 'products', 'group_customer', 'address', 'card']
        for (const field of requiredField) {
          if (!httpRequest.body[field]) {
            return badRequest(new MissingParamError(field))
          }
        }

        let card: any = {card: {}};
            card.card = {
                number: number,
                exp_month: exp_month,
                exp_year:exp_year,
                cvc: cvc, 
            }

        let order: any = {
          products, items, group_customer, address
        }

        const token: any = await this.iPayment.creatCard(card)

        const payment = await this.iPayment.pay({
            amount, currency: 'USD', source: token.id, description: `${name} - ${detail}`
        })
        
        const checkoutOrder = await this.iCheckout.toPay(payment, order)
        
        return success(checkoutOrder)
      } catch (error) {
        if(error.raw.message) return badRequest(new ErrorMessage(error.raw.message))
        return serverError(error)
      }
    }
  }