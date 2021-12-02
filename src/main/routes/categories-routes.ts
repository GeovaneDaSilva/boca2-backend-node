import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'

import { makeCreateCategoryController, makeDeleteCategoryController, makeEditCategoryController, makeGetProductsCategoryByIdController, makeListCategoriesController, makeListCategoryController, makeSelectCategoriesController } from '../factories/category'
export default (router: Router): void => {
  router.post('/category', AdaptRoute(makeCreateCategoryController()))
  router.get('/category/:id', AdaptRoute(makeListCategoryController()))
  router.get('/categories', AdaptRoute(makeListCategoriesController()))
  router.put('/category/:id', AdaptRoute(makeEditCategoryController()))
  router.delete('/category/:category_id', AdaptRoute(makeDeleteCategoryController()))

  router.get('/products/:category_id', AdaptRoute(makeGetProductsCategoryByIdController()))
  router.get('/categories/activated', AdaptRoute(makeSelectCategoriesController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,

