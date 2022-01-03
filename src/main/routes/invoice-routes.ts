import { makeListOrderController, makeListOrdersController } from './../factories/order';
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterOrderController } from '../factories/order'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares';
import { makeDeleteStateInvoiceController, makeGetInvoiceController, makeGetStateInvoiceController, makeRegisterInvoiceController } from '../factories/invoice';

export default (router: Router): void => {
  router.post('/invoice/', AdaptRoute(makeRegisterInvoiceController()))
  router.delete('/invoice/:invoice_id', AdaptRoute(makeDeleteStateInvoiceController()))

  router.get('/invoice/client/:invoice_id', AdaptRoute(makeGetInvoiceController()))

  router.get('/invoices/:paid', AdaptRoute(makeGetStateInvoiceController()))

  
}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


