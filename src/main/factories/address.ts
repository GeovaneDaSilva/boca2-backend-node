
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

