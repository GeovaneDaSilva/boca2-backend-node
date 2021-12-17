import { DbAddOrder } from './../../data/useCases/db-order/db-order';
import { RegisterOrderController } from "../../presentation/controllers/order/order"
import { OrderMongoRepository } from '../../infra/db/mongodb/order-repository/order';


export const makeRegisterOrderController = (): RegisterOrderController => {

  const orderMongoRepository = new OrderMongoRepository()
  const dbAddOrder = new DbAddOrder(orderMongoRepository)
  const registerOrderController = new RegisterOrderController(dbAddOrder)
  return registerOrderController
}

