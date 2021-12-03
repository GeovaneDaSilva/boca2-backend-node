import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeGetItemController, makeListItemsController, makeRegisterItemController, makeRemoveItemController, makeUpdateItemController } from '../factories/item'

export default (router: Router): void => {
  router.post('/item/:product_id', AdaptRoute(makeRegisterItemController()))
  router.get('/items/', AdaptRoute(makeListItemsController()))
  router.put('/item/:item_id', AdaptRoute(makeUpdateItemController()))
  router.get('/item/:item_id', AdaptRoute(makeGetItemController()))
  router.delete('/item/:item_id', AdaptRoute(makeRemoveItemController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


