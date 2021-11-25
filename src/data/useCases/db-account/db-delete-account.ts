
import { IAccountRepository } from '../protocols/repositories/account-repository'
import { AddAccountModel, DeleteAccount } from '../../../domain/useCases/account/delete-account'
import { AccountModel } from '../../../domain/entities/account'

export class DbDeleteAccount implements DeleteAccount {
  constructor (private readonly iAccountRepository: IAccountRepository) {
    this.iAccountRepository = iAccountRepository
  }

  async delete (account: AccountModel): Promise<AddAccountModel> {

    const accountUpdated: any = await this.iAccountRepository.delete(account.id)
  
    return new Promise(resolve => resolve(
      accountUpdated 
    ))
  }
}
