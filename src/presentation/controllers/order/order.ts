import { NoReadyExist } from './../../errors/ready-exist-error';
import { IOrderRepository } from './../../../data/useCases/protocols/repositories/order-repository';
import { MissingParamError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { AddOrder, Controller, HttpRequest, HttpResponse } from "./order-protocols"




export class RegisterOrderController implements Controller {
  
  constructor(private readonly iAorder: AddOrder){

    this.iAorder = iAorder

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      

      
      let { checkout, products, items, group_customer, address, created_at, payment, drive_id, cancelled, total } = httpRequest.body

      const requiredField = ['checkout', 'products', 'group_customer', 'address', 'total' ]

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      

      const DTOOrder = await this.iAorder.add({checkout, products, items, group_customer, address, payment, drive_id, cancelled, created_at: new Date, total})
      

      return success(DTOOrder)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}


export class ListOrderController implements Controller {
  
  constructor(private readonly iAorder: AddOrder, private readonly iOrderRepository:IOrderRepository){

    this.iAorder = iAorder
    this.iOrderRepository = iOrderRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const group_id = httpRequest.params.group_id
   
      
      const ordersGroupDb = await this.iOrderRepository.select(group_id)
      if(!ordersGroupDb) return badRequest(new NoReadyExist(group_id))

      
      const orders = await this.iAorder.get(ordersGroupDb)

      return success(orders)      

    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}


export class ListOrdersController implements Controller {
  
  constructor(private readonly iAorder: AddOrder, private readonly iOrderRepository:IOrderRepository){

    this.iAorder = iAorder
    this.iOrderRepository = iOrderRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
    
      
      const ordersGroupDb = await this.iOrderRepository.getAll()

      if(!ordersGroupDb) return badRequest(new NoReadyExist())

      const orders = await this.iAorder.get(ordersGroupDb)

      return success(orders)      

    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}