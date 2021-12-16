import { DbAddItem } from './../../data/useCases/db-item/db-item';
import { DbAddProduct } from "../../data/useCases/db-product/db-product"
import { ItemMongoRepository } from "../../infra/db/mongodb/item-repository/item"
import { ProductMongoRepository } from "../../infra/db/mongodb/product-repository/product"
import { GetItemController, GetItemsProductByIdController, ListItemsController, RegisterItemController, RemoveItemController, UpdateItemController } from "../../presentation/controllers/item/item"
import { RegisterAddressController, UpdateAddressController } from '../../presentation/controllers/address/address';
import { GroupMongoRepository } from '../../infra/db/mongodb/group-repository/group';
import { AddressMongoRepository } from '../../infra/db/mongodb/address-repository/address';
import { DbAddAddress } from '../../data/useCases/db-address/db-address';


export const makeRegisterAddressController = (): RegisterAddressController => {
  const groupMongoRepository = new GroupMongoRepository()
  const addressMongoRepository = new AddressMongoRepository()
  const dbAddAddress = new DbAddAddress(addressMongoRepository)
  const registerAddressController = new RegisterAddressController(dbAddAddress, groupMongoRepository)
  return registerAddressController
}

export const makeUpdateAddressController = (): UpdateAddressController => {
  const addressMongoRepository = new AddressMongoRepository()
  const dbAddAddress = new DbAddAddress(addressMongoRepository)
  const updateAddressController = new UpdateAddressController(dbAddAddress, addressMongoRepository)
  return updateAddressController
}

