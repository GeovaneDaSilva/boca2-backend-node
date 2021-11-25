import { IAccount } from '../../../interfaces-responses/IAccount';



export interface DeleteAccount {
  delete: (account: IAccount) => Promise<IAccount>

}