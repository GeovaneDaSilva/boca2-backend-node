import { Router } from 'express'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeListGroupController, makeRegisterGroupController } from '../factories/group'
import { makeGetItemController, makeGetItemsProductByIdController, makeListItemsController, makeRegisterItemController, makeRemoveItemController, makeUpdateItemController } from '../factories/item'

export default (router: Router): void => {
  router.post('/group/:account_id',AuthenticationToken.veryfyToken, AdaptRoute(makeRegisterGroupController()))
  router.get('/account/:group_id',  AdaptRoute(makeListGroupController()))
  
  router.get('/items/',  AdaptRoute(makeListItemsController()))
  
  router.get('/item/:item_id', AdaptRoute(makeGetItemController()))
  router.delete('/item/:item_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeRemoveItemController()))
  
  router.get('/items/:product_id', AdaptRoute(makeGetItemsProductByIdController()))


}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


