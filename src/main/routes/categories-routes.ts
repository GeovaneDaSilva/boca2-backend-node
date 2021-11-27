import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'

import { makeCreateCategoryController, makeDeleteCategoryController, makeEditCategoryController, makeListCategoriesController, makeListCategoryController } from '../factories/category'
export default (router: Router): void => {
  router.post('/category', AdaptRoute(makeCreateCategoryController()))
  router.get('/category/:id', AdaptRoute(makeListCategoryController()))
  router.get('/categories', AdaptRoute(makeListCategoriesController()))
  router.put('/category/:id', AdaptRoute(makeEditCategoryController()))
  router.delete('/category/:id', AdaptRoute(makeDeleteCategoryController()))
}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,

