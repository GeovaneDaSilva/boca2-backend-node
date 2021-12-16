import { IGroupRepository } from './../../../data/useCases/protocols/repositories/group-repository';
import { badRequest, serverError, success } from './../../helpers/http-helper';
import { IAccountRepository } from './../../../data/useCases/protocols/repositories/account-repository';
import { InvalidParamError, NoReadyExist} from "../../errors"
import { AddGroup, Controller, HttpRequest, HttpResponse } from "./group-protocols"



export class RegisterGroupController implements Controller {
  
  constructor(private readonly iAddGroup: AddGroup, private readonly iAccountRepository: IAccountRepository){

    this.iAddGroup = iAddGroup
    this.iAccountRepository = iAccountRepository

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const account_id = httpRequest.params.account_id
      const { address, orders, account } = httpRequest.body

      const accountDb: any = await this.iAccountRepository.getById(account_id)
      
      if(!accountDb.group === null) return badRequest(new InvalidParamError(account_id))


      if(!accountDb) return badRequest(new InvalidParamError(account_id))
      if(!accountDb === undefined) return badRequest(new InvalidParamError(account_id))
      

      const DTOGroup = await this.iAddGroup.create(account_id)
      
      return success(DTOGroup)

    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}


export class ListGroupController implements Controller {
  
  constructor(
    private readonly iAddGroup: AddGroup, 
    private readonly iGroupRepository: IGroupRepository){

    this.iAddGroup = iAddGroup
    this.iGroupRepository = iGroupRepository


  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const group_id = httpRequest.params.group_id

      
      const groupDb =  await this.iGroupRepository.getById(group_id)

      if(!groupDb) return badRequest(new NoReadyExist(group_id))
      

      const DTOGroup = await this.iAddGroup.get(groupDb)
      
      return success(DTOGroup)

    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
