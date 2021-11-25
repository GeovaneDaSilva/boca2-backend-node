import { makeLoginDeviceController } from './../factories/auth';
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeCheckinTokenController, makeLoginController } from '../factories/auth'

export default (router: Router): void => {
  router.get('/auth/checkin/token', AdaptRoute(makeCheckinTokenController()))
  router.post('/auth/device', AdaptRoute(makeLoginDeviceController()))
}

// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
