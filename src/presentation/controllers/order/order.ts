import { MissingParamError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { AddOrder, Controller, HttpRequest, HttpResponse } from "./order-protocols"




export class RegisterOrderController implements Controller {
  
  constructor(private readonly iAorder: AddOrder){

    this.iAorder = iAorder

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      

      
      let { checkout, products, item, group_customer, address, created_at, payment, drive_id, cancelled, total } = httpRequest.body

      const requiredField = ['checkout', 'products', 'group_customer', 'address', 'total' ]

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      

      const DTOOrder = await this.iAorder.add({checkout, products, item, group_customer, address, payment, drive_id, cancelled, created_at: new Date, total})
      

      return success(DTOOrder)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}


