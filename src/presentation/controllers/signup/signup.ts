import { IJwt } from './../../interfaces/jwt-token';
import { forbidden, notFound, unauthorized } from './../../helpers/http-helper';
import { IAccountRepository } from '../../../data/useCases/protocols/repositories/account-repository'
import { ActivatedAccount } from '../../../domain/useCases/account/activated-account'
import { AddAccount } from '../../../domain/useCases/account/add-account'
import { UpdateAccount } from '../../../domain/useCases/account/update-account'
import { InvalidParamError, MissingParamError } from '../../errors'
import { ReadyExist } from '../../errors/ready-exist-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, EmailValidator } from './signup-protocols'
import { GetAccounts } from '../../../domain/useCases/account/get-account'
import { DeleteAccount } from '../../../domain/useCases/account/delete-account';

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly iAccountRepository: IAccountRepository) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.iAccountRepository = iAccountRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation', 'role']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, last_name, email, password, passwordConfirmation, role, phone, image, activated, activated_at  } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const userReadyExist = await this.iAccountRepository.getOne(email)
      if (userReadyExist) {
        return badRequest(new ReadyExist(email))
      }

      let image_default = 'test_url'
      const body = {
        name, last_name, email, password, phone, role: role || 'USER_ROLE', image: image || image_default, activated: false, activated_at, created_date: new Date()
      }
      const account = await this.addAccount.add(body)
      return success(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class UpdateAccountController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly updateAccount: UpdateAccount,
    private readonly iAccountRepository: IAccountRepository,
    private readonly iJwt: IJwt) {
    this.emailValidator = emailValidator
    this.updateAccount = updateAccount
    this.iAccountRepository = iAccountRepository
    this.iJwt = iJwt
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      
      const id = await httpRequest.params.id
      
      const accountDb = await this.iAccountRepository.getById(id)
      
      if (!accountDb) {
        return badRequest(new ReadyExist(id))
      }
      const requiredField = []

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const body = httpRequest.body
      if (body.password !== body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.updateAccount.edit(id, body)
      return success(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class ActivatedAccountController implements Controller {
  constructor (private readonly iAccountRepository: IAccountRepository,
    private readonly activatedAccount: ActivatedAccount,
    private readonly webToken: IJwt) {
    this.iAccountRepository = iAccountRepository
    this.activatedAccount = activatedAccount
    this.webToken = webToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      let accessToken = httpRequest.params.token

      const isValidToken: any =  await this.webToken.checkin(accessToken, process.env.SEED)
      if(!isValidToken){
        let responseError = {
          message: 'Token is not valid'
        }
        return forbidden(responseError)
      }     

      
      const id = await isValidToken.id
      
      const accountDb: any = await this.iAccountRepository.getById(id)    
    
      if (!accountDb) {
        return badRequest(new ReadyExist(id))
      }
       
      if (accountDb.activated === true) {
        return success(accountDb)
      }

      const account = await this.activatedAccount.active(accountDb)
      return success(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetAccountsActivatedsController implements Controller {
  constructor (private readonly iAccountRepository: IAccountRepository,
    private readonly getAccounts: GetAccounts) {
    this.iAccountRepository = iAccountRepository
    this.getAccounts = getAccounts
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const value = httpRequest.params.value
      const countAccounts = await this.iAccountRepository.count({ activated: value })

      if(!countAccounts){
        return notFound(`No exist Accounts: ${value}`)
      }
      
      const accounts = await this.iAccountRepository.select({ activated: value })
      const mergeObjects = {
        accounts,
        quantity: countAccounts
      }
      const result = await this.getAccounts.getAccountsActivateds(mergeObjects)
      return success(result)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetAccountsController implements Controller {
  constructor (private readonly iAccountRepository: IAccountRepository,
    private readonly getAccounts: GetAccounts) {
    this.iAccountRepository = iAccountRepository
    this.getAccounts = getAccounts
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const countAccounts = await this.iAccountRepository.count()

      if(!countAccounts){
        return notFound('No exist Accounts')
      }

      const accounts = await this.iAccountRepository.getAll()
      const mergeObjects = {
        accounts,
        quantity: countAccounts
      }

      const result = await this.getAccounts.get(mergeObjects)
      return success(result)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetAccountController implements Controller {
  constructor (private readonly iAccountRepository: IAccountRepository,
    private readonly getAccount: GetAccounts,
    private readonly webToken: IJwt) {
    this.iAccountRepository = iAccountRepository
    this.getAccount = getAccount
    this.webToken = webToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const id = httpRequest.params.id
      
      
      const account = await this.iAccountRepository.getById(id)
      if(!account){
        return notFound('No exist Accounts')
      }

      const result = await this.getAccount.get(account)
      return success(result)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class DeleteAccountController implements Controller {
  constructor (private readonly iAccountRepository: IAccountRepository,
    private readonly deleteAccount: DeleteAccount) {
    this.iAccountRepository = iAccountRepository
    this.deleteAccount = deleteAccount

    
  }
  
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const account_id = await httpRequest.params.account_id

      
      
      
      const accountDb: any = await this.iAccountRepository.getById(account_id)
      
      if (!accountDb) {
        return badRequest(new ReadyExist(account_id))
      }

      const account = await this.deleteAccount.delete(accountDb)
      return success(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}