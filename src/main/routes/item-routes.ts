import { Router } from 'express'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeGetItemController, makeGetItemsProductByIdController, makeListItemsController, makeRegisterItemController, makeRemoveItemController, makeUpdateItemController } from '../factories/item'

export default (router: Router): void => {
  router.post('/item/:product_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeRegisterItemController()))
  router.get('/items/', AdaptRoute(makeListItemsController()))
  router.put('/item/:item_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeUpdateItemController()))
  router.get('/item/:item_id',AdaptRoute(makeGetItemController()))
  router.delete('/item/:item_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeRemoveItemController()))
  
  router.get('/items/:product_id',  AdaptRoute(makeGetItemsProductByIdController()))


}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


