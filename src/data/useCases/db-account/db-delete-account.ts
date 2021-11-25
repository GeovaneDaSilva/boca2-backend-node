
import { IAccountRepository } from '../protocols/repositories/account-repository'
import { DeleteAccount } from '../../../domain/useCases/account/delete-account'
import { IAccount } from '../../../interfaces-responses/IAccount'

export class DbDeleteAccount implements DeleteAccount {
  constructor (private readonly iAccountRepository: IAccountRepository) {
    this.iAccountRepository = iAccountRepository
  }

  async delete (account: IAccount): Promise<IAccount> {

    const accountUpdated: any = await this.iAccountRepository.delete(account.id)
  
    return new Promise(resolve => resolve(
      accountUpdated 
    ))
  }
}
