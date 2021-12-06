import { DbAddCheckout } from "../../data/useCases/db-checkout/db-checkout"
import { CheckoutController } from "../../presentation/controllers/checkout/checkout"
import { StripePayment } from "../../utils-adapters/stripe-payment"

export const makeCheckoutController = (): CheckoutController => {

    const dbAddCheckout = new DbAddCheckout()
    const stripePayment = new StripePayment()
    const checkoutController = new CheckoutController(dbAddCheckout, stripePayment)
    return checkoutController
    
  }