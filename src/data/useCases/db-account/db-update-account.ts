
import { AccountModel } from '../../../domain/entities/account'
import { Cryptography } from '../../../infra/cryptgraphy/encryper'
import { IAccountRepository } from '../protocols/repositories/account-repository'
import { AddAccountModel, UpdateAccount } from '../../../domain/useCases/account/update-account'

export class DbUpdateAccount implements UpdateAccount {
  constructor (private readonly cryptgraphy: Cryptography,
    private readonly iAccountRepository: IAccountRepository) {
    this.cryptgraphy = cryptgraphy
    this.iAccountRepository = iAccountRepository
  }

  async edit (id: string, body: AccountModel): Promise<AddAccountModel> {
    if (body.password){
      body.password = await this.cryptgraphy.encrypt(body.password)
    }
    const accountUpdated: any = await this.iAccountRepository.update(id, body)

    return new Promise(resolve => resolve(
      accountUpdated
    ))
  }
}
