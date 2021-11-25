import { AccountModel } from '../../../domain/entities/account'
import { GetAccounts } from './../../../domain/useCases/account/get-account'

export class DbGetAccount implements GetAccounts {

  async get (data: any): Promise<AccountModel> {
    return new Promise(resolve => resolve(
      data
    ))
  }

  async getAccountsActivateds (data: any): Promise<AccountModel> {
    return new Promise(resolve => resolve(
      data
    ))
  }
}
