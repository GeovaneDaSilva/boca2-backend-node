
import {  AddAccount, AddAccountModel } from '../../../domain/useCases/account/add-account'
import { AddGroup } from '../../../domain/useCases/group/group'
import { Cryptography } from '../../../infra/cryptgraphy/encryper'
import { IJwt } from '../../../presentation/interfaces/jwt-token'
import { IMailProvider } from '../../../presentation/services/mail-provider'
import { IAccountRepository } from '../protocols/repositories/account-repository'

export class DbAddAccount implements AddAccount {
  constructor (private readonly cryptgraphy: Cryptography,
    private readonly iAccountRepository: IAccountRepository,
    private readonly mailProvider: IMailProvider,
    private readonly iJwt: IJwt,
    private readonly addGroup: AddGroup) {
    this.cryptgraphy = cryptgraphy
    this.iAccountRepository = iAccountRepository
    this.mailProvider = mailProvider
    this.iJwt = iJwt
    this.addGroup = addGroup
  }

  async add (account: AddAccountModel): Promise<AddAccountModel> {
    
    account.password = await this.cryptgraphy.encrypt(account.password)
    let userDB: any = await this.iAccountRepository.add(account)

    await this.addGroup.create(userDB.id)

    

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
      Account
      
    ))
  }
}
