import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeListUploadController, makeUploadController } from '../factories/uploads'

export default (router: Router): void => {
  router.post('/upload/:type/:id', AdaptRoute(makeUploadController()))
  router.get('/uploads', AdaptRoute(makeListUploadController()))
}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
