import { IAccount } from './../../../Iresponses/IAccount';



export interface DeleteAccount {
  delete: (account: IAccount) => Promise<IAccount>

}