import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeUploadController } from '../factories/uploads'

export default (router: Router): void => {
  router.post('/upload/:type/:id', AdaptRoute(makeUploadController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
