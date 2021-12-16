import { Router } from 'express'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeRegisterAddressController, makeUpdateAddressController } from '../factories/address'
import { makeGetItemController, makeGetItemsProductByIdController, makeListItemsController, makeRegisterItemController, makeRemoveItemController, makeUpdateItemController } from '../factories/item'

export default (router: Router): void => {
  router.post('/address/:group_id', AdaptRoute(makeRegisterAddressController()))
  
  router.put('/address/:address_id', AdaptRoute(makeUpdateAddressController()))

 

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,


