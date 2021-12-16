import { IItemRepository } from "../../../data/useCases/protocols/repositories/item-repository"
import { IProductRepository } from "../../../data/useCases/protocols/repositories/product-repository"
import { InvalidParamError, MissingParamError, NoReadyExist, ReadyExist } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { AddAddress, Controller, HttpRequest, HttpResponse } from "./address-protocols"



export class RegisterAddressController implements Controller {
  
  constructor(private readonly iAddAddress: AddAddress){

    this.iAddAddress = iAddAddress
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const group_id = httpRequest.params.group_id

      console.log(group_id);
      
      const requiredField = ['address']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      return success('address')
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

/*
export class ListItemsController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItemRepository = iItemRepository
    this.iItem = iItem

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const itemsDb = await this.iItemRepository.getAll()
      const DTOItems = await this.iItem.getAll(itemsDb)
      
      return success(DTOItems)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class UpdateItemController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const item_id = httpRequest.params.item_id
      const itemDb: any = await this.iItemRepository.getById(item_id)

      if(!itemDb) return badRequest(new InvalidParamError(item_id))
    
      const DTOItem = await this.iItem.update(itemDb.item.id, httpRequest.body)
      
      return success(DTOItem)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetItemController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const item_id = httpRequest.params.item_id
      const itemDb: any = await this.iItemRepository.getById(item_id)

      if(!itemDb) return badRequest(new InvalidParamError(item_id))
    
      const DTOItem = await this.iItem.get(itemDb)
      
      return success(DTOItem)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class RemoveItemController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const item_id = httpRequest.params.item_id
      const itemDb: any = await this.iItemRepository.getById(item_id)

      if(!itemDb) return badRequest(new InvalidParamError(item_id))
    
      const DTOItem = await this.iItem.remove(itemDb)
      
      return success(DTOItem)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetItemsProductByIdController implements Controller {
  constructor(private readonly iItem: IItem, private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const product_id = httpRequest.params.product_id
      

      const productReadyExist = await this.iItemRepository.getItemsByProductId(product_id)
                  
      if (!productReadyExist) {
        return badRequest(new NoReadyExist(product_id))
      }
      
      

      const DTOProduct = await this.iItem.get(productReadyExist)
      return success(DTOProduct)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
*/