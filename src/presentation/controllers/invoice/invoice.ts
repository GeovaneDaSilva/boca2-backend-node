import { IInvoiceRepository } from './../../../data/useCases/protocols/repositories/invoice-repository';
import { IInvoiceUseCase } from './../../../domain/useCases/invoice/invoice';
import { NoReadyExist } from '../../errors/ready-exist-error';
import { InvalidParamError, MissingParamError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from './invoice-protocols';
import { ErrorMessage } from '../../errors/errorMessage';




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

export class DeleteStateInvoiceController implements Controller {
  
  constructor(
    private readonly iInvoice: IInvoiceUseCase,
    private readonly iInvoiceRepository: IInvoiceRepository
    ){
    this.iInvoice = iInvoice
    this.iInvoiceRepository = iInvoiceRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const invoice_id = httpRequest.params.invoice_id
      
      const getInvoiceDb = await this.iInvoiceRepository.getById(invoice_id)
      if(!getInvoiceDb) return badRequest(new InvalidParamError(`${invoice_id} no exist.`))
      if(getInvoiceDb.deleted === true) return badRequest(new InvalidParamError(`${invoice_id} no exist.`))

      const DTOInvoiceRequest = await this.iInvoice.delete(invoice_id)
      

      return success(DTOInvoiceRequest)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetStateInvoiceController implements Controller {
  
  constructor(
    private readonly iInvoice: IInvoiceUseCase,
    private readonly iInvoiceRepository: IInvoiceRepository
    ){
    this.iInvoice = iInvoice
    this.iInvoiceRepository = iInvoiceRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const paid = httpRequest.params.paid
      

      const DTOInvoiceRequest = await this.iInvoice.select(paid)
      
      return success(DTOInvoiceRequest)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetInvoiceController implements Controller {
  
  constructor(
    private readonly iInvoice: IInvoiceUseCase,
    private readonly iInvoiceRepository: IInvoiceRepository
    ){
    this.iInvoice = iInvoice
    this.iInvoiceRepository = iInvoiceRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const invoice_id = httpRequest.params.invoice_id
      const getInvoiceDb: any = await this.iInvoiceRepository.getById(invoice_id)
      if(!getInvoiceDb) return badRequest(new InvalidParamError(`${invoice_id} no exist.`))
      if(getInvoiceDb.deleted === true) return badRequest(new InvalidParamError(`${invoice_id} no exist.`))

      const DTOInvoiceRequest = await this.iInvoice.get(getInvoiceDb)
      
      return success(DTOInvoiceRequest)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}


export class EditInvoiceController implements Controller {
  
  constructor(
    private readonly iInvoice: IInvoiceUseCase,
    private readonly iInvoiceRepository: IInvoiceRepository){
    this.iInvoice = iInvoice
    this.iInvoiceRepository = iInvoiceRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const invoice_id = httpRequest.params.invoice_id
      const getInvoiceDb: any = await this.iInvoiceRepository.getById(invoice_id)
      if(!getInvoiceDb) return badRequest(new InvalidParamError(`${invoice_id} no exist.`))
      if(getInvoiceDb.deleted === true) return badRequest(new InvalidParamError(`${invoice_id} no exist.`))

      if(getInvoiceDb.paid) return badRequest(new InvalidParamError(`${invoice_id} Your invoice has already been paid.`))


      const DTOInvoiceRequest = await this.iInvoice.update(getInvoiceDb._id, httpRequest.body)
      
      return success(DTOInvoiceRequest)
    } catch (error) {
      if(error.raw.message) return badRequest(new ErrorMessage(error.raw.message))
      console.log(error)
        return serverError(error)
    }
  }
}