import { Router } from 'express'
import AuthenticationToken from '../../presentation/middlewares/auth-middlewares'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeDeleteAddressController, makeRegisterAddressController, makeUpdateAddressController } from '../factories/address'
import { makeGetItemController, makeGetItemsProductByIdController, makeListItemsController, makeRegisterItemController, makeRemoveItemController, makeUpdateItemController } from '../factories/item'

export default (router: Router): void => {
  router.post('/address/:group_id',  AuthenticationToken.veryfyToken, AdaptRoute(makeRegisterAddressController()))
  
  router.put('/address/:address_id', AdaptRoute(makeUpdateAddressController()))
  router.delete('/address/:address_id', AdaptRoute(makeDeleteAddressController()))

 

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


