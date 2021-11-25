import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeGetDeviceController, makeRegisterDeviceController } from '../factories/device'


export default (router: Router): void => {
  router.post('/register/device/:user', AdaptRoute(makeRegisterDeviceController()))
  router.get('/device/:id', AdaptRoute(makeGetDeviceController()))

}

// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
