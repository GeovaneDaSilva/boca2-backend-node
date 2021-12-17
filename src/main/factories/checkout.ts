import { DbAddCheckout } from "../../data/useCases/db-checkout/db-checkout"
import { DbAddOrder } from "../../data/useCases/db-order/db-order"
import { OrderMongoRepository } from "../../infra/db/mongodb/order-repository/order"
import { CheckoutController } from "../../presentation/controllers/checkout/checkout"
import { StripePayment } from "../../utils-adapters/stripe-payment"

export const makeCheckoutController = (): CheckoutController => {

    const orderMongoRepository = new OrderMongoRepository()
    const dbAddOrder = new DbAddOrder(orderMongoRepository)
    const dbAddCheckout = new DbAddCheckout(dbAddOrder)
    const stripePayment = new StripePayment()
    const checkoutController = new CheckoutController(dbAddCheckout, stripePayment)
    return checkoutController
    
  }