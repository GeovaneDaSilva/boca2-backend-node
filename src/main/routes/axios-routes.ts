import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeAxiosListControllerController } from '../factories/axios'
export default (router: Router): void => {
  router.get('/axios', AdaptRoute(makeAxiosListControllerController()))
}

// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
