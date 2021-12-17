import { DbAddOrder } from './../../data/useCases/db-order/db-order';
import { ListOrderController, ListOrdersController, RegisterOrderController } from "../../presentation/controllers/order/order"
import { OrderMongoRepository } from '../../infra/db/mongodb/order-repository/order';


export const makeRegisterOrderController = (): RegisterOrderController => {

  const orderMongoRepository = new OrderMongoRepository()
  const dbAddOrder = new DbAddOrder(orderMongoRepository)
  const registerOrderController = new RegisterOrderController(dbAddOrder)
  return registerOrderController
}


export const makeListOrderController = (): ListOrderController => {

  const orderMongoRepository = new OrderMongoRepository()
  const dbAddOrder = new DbAddOrder(orderMongoRepository)
  const listOrderController = new ListOrderController(dbAddOrder, orderMongoRepository)
  return listOrderController
}

export const makeListOrdersController = (): ListOrdersController => {

  const orderMongoRepository = new OrderMongoRepository()
  const dbAddOrder = new DbAddOrder(orderMongoRepository)
  const listOrdersController = new ListOrdersController(dbAddOrder, orderMongoRepository)
  return listOrdersController
}

