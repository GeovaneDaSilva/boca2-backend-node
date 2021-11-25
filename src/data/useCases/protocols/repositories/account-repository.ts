import { IAccount } from './../../../../Iresponses/IAccount';
import { AccountModel } from '../../../../domain/entities/account'
import { AddAccountModel } from '../../../../domain/useCases/account/add-account'

export interface IAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
  getAll: () => Promise<AccountModel>
  getOne: (email: string) => Promise<AccountModel>
  getById: (id: string) => Promise<AccountModel>
  delete: (id: string) => Promise<IAccount>
  update: (id: string, body: any) => Promise<AccountModel>
  count: (value?: any) => Promise<AccountModel>
  select: (value?: any) => Promise<AccountModel>


}


