import { IAccountRepository } from "../../../data/useCases/protocols/repositories/account-repository"
import { AccessDeniedError } from "../../errors/forbidden-error"
import { forbidden, serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces"
import { IJwt } from "../../interfaces/jwt-token"

export interface IResponseToken {
    value: any
}
export class CheckinTokenController implements Controller {
    constructor (private readonly verifyToken: IJwt,
        private readonly iAccountRepository: IAccountRepository) {
        this.verifyToken = verifyToken
        this.iAccountRepository = iAccountRepository

    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const token = await httpRequest.headers['x-access-token']
        
        const getToken: any = await this.verifyToken.checkin(token, process.env.SEED)
        
        
        if(!getToken){
            return forbidden(new AccessDeniedError())
        }
        
        const account = await this.iAccountRepository.getById(getToken.id)
        
        return success({account, token})
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
  }
  