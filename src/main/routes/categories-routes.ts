import { Router } from 'express'
import  AuthenticationToken  from '../../presentation/middlewares/auth-middlewares'
import { AdaptRoute } from '../adapters/express-route-adapter'

import { makeCreateCategoryController, makeDeleteCategoryController, makeEditCategoryController, makeGetProductsCategoryByIdController, makeListCategoriesController, makeListCategoryController, makeSelectCategoriesController } from '../factories/category'
export default (router: Router): void => {
  router.post('/category', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeCreateCategoryController()))
  router.get('/category/:id', AuthenticationToken.veryfyToken, AdaptRoute(makeListCategoryController()))
  router.get('/categories', AdaptRoute(makeListCategoriesController()))
  router.put('/category/:id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeEditCategoryController()))
  router.delete('/category/:category_id', AuthenticationToken.veryfyRole_Admin, AdaptRoute(makeDeleteCategoryController()))

  router.get('/products/:category_id', AuthenticationToken.veryfyToken, AdaptRoute(makeGetProductsCategoryByIdController()))
  router.get('/categories/activated', AuthenticationToken.veryfyToken, AdaptRoute(makeSelectCategoriesController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,

