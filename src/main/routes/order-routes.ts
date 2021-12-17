import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterOrderController } from '../factories/order'

export default (router: Router): void => {
  router.post('/order/', AdaptRoute(makeRegisterOrderController()))
  
  //router.put('/address/:address_id', AdaptRoute(makeUpdateAddressController()))

 

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


