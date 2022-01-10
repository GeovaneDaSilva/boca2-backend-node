import { makeListOrderController, makeListOrdersController } from './../factories/order';
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterOrderController } from '../factories/order'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares';
import { makeDeleteStateInvoiceController, makeEditInvoiceController, makeGetInvoiceController, makeGetStateInvoiceController, makeRegisterInvoiceController } from '../factories/invoice';

export default (router: Router): void => {
  router.get('/invoices/:paid', AdaptRoute(makeGetStateInvoiceController()))
  router.get('/invoice/client/:invoice_id', AdaptRoute(makeGetInvoiceController()))
  router.post('/invoice/', AdaptRoute(makeRegisterInvoiceController()))
  router.put('/invoice/client/:invoice_id', AdaptRoute(makeEditInvoiceController()))
  router.delete('/invoice/:invoice_id', AdaptRoute(makeDeleteStateInvoiceController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


