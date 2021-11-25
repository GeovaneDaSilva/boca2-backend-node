import { AccountModel } from './../../entities/account'


export interface GetAccounts {
  get: (data: any) => Promise<AccountModel>
  getAccountsActivateds: (data: any) => Promise<AccountModel>
}