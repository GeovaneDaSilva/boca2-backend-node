import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterHeartbeatController, makeUpdateHeartbeatController } from '../factories/heartbeat'


export default (router: Router): void => {
  router.post('/heartbeat/:device_id', AdaptRoute(makeRegisterHeartbeatController()))
  router.put('/heartbeat/:id', AdaptRoute(makeUpdateHeartbeatController()))

}

// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
