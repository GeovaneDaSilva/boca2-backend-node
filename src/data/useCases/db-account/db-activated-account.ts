import { ActivatedAccount, AddAccountModel } from '../../../domain/useCases/account/activated-account'
import { IAccountRepository } from '../protocols/repositories/account-repository'

export class DbActivatedAccount implements ActivatedAccount {
  constructor (private readonly iAccountRepository: IAccountRepository) {
    this.iAccountRepository = iAccountRepository
  }

  async active (account: AddAccountModel | any): Promise<AddAccountModel> {

    account.activated = true
    account.activated_at = new Date()
    
    const accountUpdated: any = await this.iAccountRepository.update(account.id, {activated: account.activated, activated_at: account.activated_at})

    console.log(accountUpdated);
    
    return new Promise(resolve => resolve(
      accountUpdated
    ))
  }
}
