
import { EmailValidatorAdapter } from '../../utils-adapters/email-validator-adapter'
import { LoginController, LoginDeviceController } from '../../presentation/controllers/login/login'
import { Dbauth } from '../../data/useCases/db-authentication'
import { DcryptAdapter } from '../../utils-adapters/bcrypt-adapter'
import { JwtAdapter } from '../../utils-adapters/jwt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { CheckinTokenController } from '../../presentation/controllers/chekin-token/checkin-token'
import { DeviceMongoRepository } from '../../infra/db/mongodb/device-repository/device'

export const makeLoginController = (): LoginController => {
  const seed = process.env.SEED
  const expiresIn = process.env.EXPIRES_IN
  const jwtAdapter = new JwtAdapter(seed, expiresIn)
  const accountMongoRepository = new AccountMongoRepository()
  const deviceMongoRepository = new DeviceMongoRepository()
  const dbauth = new Dbauth(jwtAdapter, accountMongoRepository, deviceMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const dcryptAdapter = new DcryptAdapter()
  const loginController = new LoginController(emailValidatorAdapter, dbauth, dcryptAdapter, accountMongoRepository)
  return loginController
}

export const makeLoginDeviceController = (): LoginDeviceController => {
  const seed = process.env.SEED
  const expiresIn = process.env.EXPIRES_IN
  const jwtAdapter = new JwtAdapter(seed, expiresIn)
  const accountMongoRepository = new AccountMongoRepository()
  const deviceMongoRepository = new DeviceMongoRepository()
  const dbauth = new Dbauth(jwtAdapter, accountMongoRepository, deviceMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const dcryptAdapter = new DcryptAdapter()
  const loginDeviceController = new LoginDeviceController(emailValidatorAdapter, dbauth, dcryptAdapter, deviceMongoRepository)
  return loginDeviceController
}



export const makeCheckinTokenController = (): CheckinTokenController => {
  const seed = process.env.SEED
  const expiresIn = process.env.EXPIRES_IN
  const jwtAdapter = new JwtAdapter(seed, expiresIn)
  const accountMongoRepository = new AccountMongoRepository()
  const checkinTokenController = new CheckinTokenController(jwtAdapter, accountMongoRepository)
  return checkinTokenController
}