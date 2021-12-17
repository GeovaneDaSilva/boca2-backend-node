import { Router } from 'express'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares'
import { AdaptRoute } from '../adapters/express-route-adapter'

import { makeCheckoutController } from '../factories/checkout'
export default (router: Router): void => {
  router.post('/checkout', AuthenticationToken.veryfyToken, AdaptRoute(makeCheckoutController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
