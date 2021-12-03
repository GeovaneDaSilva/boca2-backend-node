import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeGetProductController, makeListProductsController, makeRegisterProductController, makeRemoveProductController, makeUpdateProductController } from '../factories/product'

export default (router: Router): void => {
  router.post('/product/:category_id', AdaptRoute(makeRegisterProductController()))
  router.get('/products/', AdaptRoute(makeListProductsController()))
  router.put('/product/:product_id', AdaptRoute(makeUpdateProductController()))
  router.get('/product/:product_id', AdaptRoute(makeGetProductController()))
  router.delete('/product/:product_id', AdaptRoute(makeRemoveProductController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,



