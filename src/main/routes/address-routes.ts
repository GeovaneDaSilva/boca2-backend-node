import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterAddressController } from '../factories/address'
import { makeGetItemController, makeGetItemsProductByIdController, makeListItemsController, makeRegisterItemController, makeRemoveItemController, makeUpdateItemController } from '../factories/item'

export default (router: Router): void => {
  router.post('/address/:group_id', AdaptRoute(makeRegisterAddressController()))
  
  router.get('/items/', AdaptRoute(makeListItemsController()))
  router.put('/item/:item_id', AdaptRoute(makeUpdateItemController()))
  router.get('/item/:item_id', AdaptRoute(makeGetItemController()))
  router.delete('/item/:item_id', AdaptRoute(makeRemoveItemController()))
  
  router.get('/items/:product_id', AdaptRoute(makeGetItemsProductByIdController()))


}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


