import { DbUpdateAccount } from "../../data/useCases/db-account/db-update-account"
import { DbAddDevice, DbGetDevice } from "../../data/useCases/db-device/db-add-device"
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account"
import { DeviceMongoRepository } from "../../infra/db/mongodb/device-repository/device"
import { GetDeviceController, RegisterDeviceController } from "../../presentation/controllers/device/register-device"
import { BcryptAdapter } from "../../utils-adapters/bcrypt-adapter"
import { EmailValidatorAdapter } from "../../utils-adapters/email-validator-adapter"
import { JwtAdapter } from "../../utils-adapters/jwt-adapter"
import { MailProvider } from "../../utils-adapters/nodemailer-adapter"

export const makeRegisterDeviceController = (): RegisterDeviceController => {
    const salt = 10
    const deviceMongoRepository = new DeviceMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddDevice = new DbAddDevice(bcryptAdapter, deviceMongoRepository)
    const mailProvider = new MailProvider()
    const jwtAdapter = new JwtAdapter(process.env.SEED, process.env.EXPIRES_IN)

    const registerDeviceController = new RegisterDeviceController(
      dbAddDevice, 
      deviceMongoRepository,
       accountMongoRepository,
       mailProvider,
       jwtAdapter)
      
       return registerDeviceController
  }
  
  export const makeGetDeviceController = (): GetDeviceController => {

    const deviceMongoRepository = new DeviceMongoRepository()
    
    const dbGetDevice = new DbGetDevice(deviceMongoRepository)

    const getDeviceController = new GetDeviceController(dbGetDevice)
      
       return getDeviceController
  }