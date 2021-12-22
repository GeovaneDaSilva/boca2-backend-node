import { makeListOrderController, makeListOrdersController } from './../factories/order';
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterOrderController } from '../factories/order'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares';
import { makeRegisterInvoiceController } from '../factories/invoice';

export default (router: Router): void => {
  router.post('/invoice/', AdaptRoute(makeRegisterInvoiceController()))


  router.get('/orders/:group_id', AuthenticationToken.veryfyToken, AdaptRoute(makeListOrderController()))
  router.get('/orders', AdaptRoute(makeListOrdersController()))

  //router.put('/address/:address_id', AdaptRoute(makeUpdateAddressController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


