import { DbAddGroup } from './../../data/useCases/db-group/db-group';
import { DbAddItem } from './../../data/useCases/db-item/db-item';
import { DbAddProduct } from "../../data/useCases/db-product/db-product"
import { ItemMongoRepository } from "../../infra/db/mongodb/item-repository/item"
import { GetItemController, GetItemsProductByIdController, ListItemsController, RegisterItemController, RemoveItemController, UpdateItemController } from "../../presentation/controllers/item/item"
import { ListGroupController, RegisterGroupController } from '../../presentation/controllers/group/group';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { GroupMongoRepository } from '../../infra/db/mongodb/group-repository/group';


export const makeRegisterGroupController = (): RegisterGroupController => {

  const iGroupRepository = new GroupMongoRepository()
  const dbAddGroup = new DbAddGroup(iGroupRepository)
  const IAccountRepository = new AccountMongoRepository()
  const registerGroupController = new RegisterGroupController(dbAddGroup, IAccountRepository)
  return registerGroupController
}


export const makeListGroupController = (): ListGroupController => {

  const groupMongoRepository = new GroupMongoRepository()
  const dbAddGroup = new DbAddGroup(groupMongoRepository)
  const listItemsController = new ListGroupController(dbAddGroup, groupMongoRepository)
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