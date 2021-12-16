import { DbAddItem } from './../../data/useCases/db-item/db-item';
import { DbAddProduct } from "../../data/useCases/db-product/db-product"
import { ItemMongoRepository } from "../../infra/db/mongodb/item-repository/item"
import { ProductMongoRepository } from "../../infra/db/mongodb/product-repository/product"
import { GetItemController, GetItemsProductByIdController, ListItemsController, RegisterItemController, RemoveItemController, UpdateItemController } from "../../presentation/controllers/item/item"
import { RegisterAddressController } from '../../presentation/controllers/address/address';
import { DbAddAddress } from '../../data/useCases/db-address/db-group';


export const makeRegisterAddressController = (): RegisterAddressController => {

  const dbAddAddress = new DbAddAddress()
  const registerAddressController = new RegisterAddressController(dbAddAddress)
  return registerAddressController
}

export const makeListItemsController = (): ListItemsController => {

  const itemMongoRepository = new ItemMongoRepository()
  const dbAddItem = new DbAddItem(itemMongoRepository)
  const listItemsController = new ListItemsController(dbAddItem, itemMongoRepository)
  return listItemsController
}

export const makeGetItemsProductByIdController = (): GetItemsProductByIdController => {

  const itemMongoRepository = new ItemMongoRepository()

  const dbAddItem = new DbAddItem(itemMongoRepository)
  const getItemsProductByIdController = new GetItemsProductByIdController(dbAddItem, itemMongoRepository)
  return getItemsProductByIdController
}

export const makeGetItemController = (): GetItemController => {

  const itemMongoRepository = new ItemMongoRepository()
  const dbAddItem = new DbAddItem(itemMongoRepository)
  const getItemController = new GetItemController(dbAddItem, itemMongoRepository)
  return getItemController
}


export const makeUpdateItemController = (): UpdateItemController => {

  const itemMongoRepository = new ItemMongoRepository()
  const dbAddItem = new DbAddItem(itemMongoRepository)
  const updateItemController = new UpdateItemController(dbAddItem, itemMongoRepository)
  return updateItemController
}

export const makeRemoveItemController = (): RemoveItemController => {

  const itemMongoRepository = new ItemMongoRepository()
  const dbAddItem = new DbAddItem(itemMongoRepository)
  const removeItemController = new RemoveItemController(dbAddItem, itemMongoRepository)
  return removeItemController
}