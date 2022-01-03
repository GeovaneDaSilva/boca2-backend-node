import { IInvoiceUseCase } from './../../../domain/useCases/invoice/invoice';
import { NoReadyExist } from '../../errors/ready-exist-error';
import { MissingParamError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from './invoice-protocols';




export class RegisterInvoiceController implements Controller {
  
  constructor(private readonly iInvoice: IInvoiceUseCase){
    this.iInvoice = iInvoice
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      

      const requiredField = ['total' ]

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      
      let body = httpRequest.body
      

      const DTOInvoiceRequest = await this.iInvoice.add(body)
      

      return success(DTOInvoiceRequest)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

