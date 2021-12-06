import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'

import { makeCheckoutController } from '../factories/checkout'
export default (router: Router): void => {
  router.post('/checkout', AdaptRoute(makeCheckoutController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
