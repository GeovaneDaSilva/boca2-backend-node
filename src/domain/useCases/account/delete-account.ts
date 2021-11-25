import { IAccount } from '../../../i-responses/IAccount';



export interface DeleteAccount {
  delete: (account: IAccount) => Promise<IAccount>

}