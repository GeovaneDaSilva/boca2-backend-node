import { makeListOrderController, makeListOrdersController } from './../factories/order';
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterOrderController } from '../factories/order'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares';

export default (router: Router): void => {
  router.post('/order/', AuthenticationToken.veryfyToken, AdaptRoute(makeRegisterOrderController()))
  router.get('/orders/:group_id', AuthenticationToken.veryfyToken, AdaptRoute(makeListOrderController()))
  router.get('/orders', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeListOrdersController()))

  //router.put('/address/:address_id', AdaptRoute(makeUpdateAddressController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


