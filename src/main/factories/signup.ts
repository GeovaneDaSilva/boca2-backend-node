import { RedisCache } from './../../utils-adapters/redis-cache';
import { DbGetAccount } from './../../data/useCases/db-account/db-get-account';
import { ActivatedAccountController, DeleteAccountController, GetAccountController, GetAccountsActivatedsController, GetAccountsController } from './../../presentation/controllers/signup/signup';
import { DbAddAccount } from '../../data/useCases/db-account/db-add-account'
import { DbUpdateAccount } from '../../data/useCases/db-account/db-update-account'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController, UpdateAccountController } from '../../presentation/controllers/signup/signup'
import { BcryptAdapter } from '../../utils-adapters/bcrypt-adapter'
import { EmailValidatorAdapter } from '../../utils-adapters/email-validator-adapter'
import { JwtAdapter } from '../../utils-adapters/jwt-adapter';
import { MailProvider } from '../../utils-adapters/nodemailer-adapter';
import { DbActivatedAccount } from '../../data/useCases/db-account/db-activated-account';
import { DbDeleteAccount } from '../../data/useCases/db-account/db-delete-account';
import { GroupMongoRepository } from '../../infra/db/mongodb/group-repository/group';
import { DbAddGroup } from '../../data/useCases/db-group/db-group';

export const makeSignUpController = (): SignUpController => {
  const salt = 10
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const mailProvider = new MailProvider()
  const jwtAdapter = new JwtAdapter(process.env.SEED, process.env.EXPIRES_IN)
  const iGroupRepository = new GroupMongoRepository()
  const dbAddGroup = new DbAddGroup(iGroupRepository)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository, mailProvider, jwtAdapter, dbAddGroup)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, accountMongoRepository)
  return signUpController
}

export const makeUpdateAccountController = (): UpdateAccountController => {
  const salt = 10
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbUpdateAccount = new DbUpdateAccount(bcryptAdapter, accountMongoRepository)
  const jwtAdapter = new JwtAdapter(process.env.SEED, process.env.EXPIRES_IN)
  const signUpController = new UpdateAccountController(emailValidatorAdapter, dbUpdateAccount, accountMongoRepository, jwtAdapter)
  return signUpController
}

export const makeActivatedAccountController = (): ActivatedAccountController => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(process.env.SEED, process.env.EXPIRES_IN)
  const dbActivatedAccount = new DbActivatedAccount(accountMongoRepository)
  const activatedAccountController = new ActivatedAccountController(accountMongoRepository, dbActivatedAccount, jwtAdapter)
  return activatedAccountController
}

export const makeGetAccountsActivatedsController = (): GetAccountsActivatedsController => {
  const accountMongoRepository = new AccountMongoRepository()
  const dbGetAccounts = new DbGetAccount()
  const getAccountsActivatedsController = new GetAccountsActivatedsController(accountMongoRepository, dbGetAccounts)
  return getAccountsActivatedsController
}

export const makeGetAccountsController = (): GetAccountsController => {
  const accountMongoRepository = new AccountMongoRepository()
  const dbGetAccounts = new DbGetAccount()
  const getAccountsController = new GetAccountsController(accountMongoRepository, dbGetAccounts)
  return getAccountsController
}

export const makeGetAccountController = (): GetAccountController => {
  const accountMongoRepository = new AccountMongoRepository()
  const dbGetAccounts = new DbGetAccount()
  const jwtAdapter = new JwtAdapter(process.env.SEED, process.env.EXPIRES_IN)
  const getAccountController = new GetAccountController(accountMongoRepository, dbGetAccounts, jwtAdapter)
  return getAccountController
}

export const makeDeleteAccountController = (): DeleteAccountController => {
  const accountMongoRepository = new AccountMongoRepository()
  const dbDeleteAccount = new DbDeleteAccount(accountMongoRepository)
  const getAccountController = new DeleteAccountController(accountMongoRepository, dbDeleteAccount)
  return getAccountController
}
