
import {  AddAccount, AddAccountModel } from '../../../domain/useCases/account/add-account'
import { Cryptography } from '../../../infra/cryptgraphy/encryper'
import { IJwt } from '../../../presentation/interfaces/jwt-token'
import { IMailProvider } from '../../../presentation/services/mail-provider'
import { IAccountRepository } from '../protocols/repositories/account-repository'

export class DbAddAccount implements AddAccount {
  constructor (private readonly cryptgraphy: Cryptography,
    private readonly iAccountRepository: IAccountRepository,
    private readonly mailProvider: IMailProvider,
    private readonly iJwt: IJwt) {
    this.cryptgraphy = cryptgraphy
    this.iAccountRepository = iAccountRepository
    this.mailProvider = mailProvider
    this.iJwt = iJwt
  }

  async add (account: AddAccountModel): Promise<AddAccountModel> {
    
    account.password = await this.cryptgraphy.encrypt(account.password)
    const userDB: any = await this.iAccountRepository.add(account)
    const { id, role } = userDB
    const token = await this.iJwt.token(id, role)
    
    if (!token) {
      throw Error('NO exist TOken in the data')
    }
    
    
    await this.mailProvider.sendMail({
      to: {
        name: userDB.name,
        email: userDB.email
      },
      from: {
        name: 'APP MOBILE Mechanic',
        email: process.env.EMAILVERIFIED
      },
      subject: 'Activar mi cuenta',
      body: `click aqui para activar tu cuenta token ${process.env.baseUrl}/account/activated/${token}`
    })

    let Account: any = {
      Account: userDB,
      token
      
    }
    return new Promise(resolve => resolve(
      Account,
      
    ))
  }
}
