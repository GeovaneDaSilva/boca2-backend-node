import { Router } from 'express'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeGetProductController, makeListProductsController, makeRegisterProductController, makeRemoveProductController, makeUpdateProductController } from '../factories/product'

export default (router: Router): void => {
  router.post('/product/:category_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeRegisterProductController()))
  router.get('/products/', AdaptRoute(makeListProductsController()))
  router.put('/product/:product_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeUpdateProductController()))
  router.get('/product/:product_id', AdaptRoute(makeGetProductController()))
  router.delete('/product/:product_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeRemoveProductController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,



