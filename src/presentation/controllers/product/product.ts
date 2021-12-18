import { ReadyExist } from './../../errors/ready-exist-error';
import { IProductRepository } from './../../../data/useCases/protocols/repositories/product-repository';
import { InvalidParamError } from './../../errors/invalid-email';
import { badRequest } from './../../helpers/http-helper';
import { ICategoryRepository } from './../../../data/useCases/protocols/repositories/category-repository';
import { serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse, IProduct } from "./product-protocols"
import { MissingParamError } from '../../errors';


export class RegisterProductController implements Controller {

  constructor(private readonly iProduct: IProduct, 
    private readonly iCategoryRepository: ICategoryRepository,
    private readonly iProductRepository: IProductRepository){
    this.iProduct = iProduct
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const requiredField = ['name', 'price', 'activated', 'sku']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const category_id = httpRequest.params.category_id

      const categoryDb: any = await this.iCategoryRepository.getById(category_id)
      if(!categoryDb) return badRequest(new InvalidParamError(`${category_id} no exist.`))

      const verifyExistProduct = await this.iProductRepository.getOne(httpRequest.body.sku)
      if(verifyExistProduct) return badRequest(new ReadyExist(`SKU: ${httpRequest.body.sku}`))
    
      const { id } = await categoryDb.Category

      let { name,
            description,
            price,
            offer_price,
            details,
            lb,
            oz,
            text_offer,
            quantity,
            image,
            tags,
            activated,
            created_at,
            activated_at,
            category,
            items,
            sku,
            uploads } = httpRequest.body
              
      
      const DTOProduct = await this.iProduct.add({
            name,
            description,
            price,
            offer_price,
            details,
            lb,
            oz,
            text_offer,
            image: image || null,
            tags,
            activated: activated || true,
            quantity,
            created_at: new Date(),
            activated_at,
            sku,
            category: id })
      
      return success(DTOProduct)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class  ListProductsController implements Controller {

  constructor(private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository){
    this.iProduct = iProduct

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const productsDb = await this.iProductRepository.getAll()
      
      const DTOProducts = await this.iProduct.getAll(productsDb)
      
      
      return success(DTOProducts)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class UpdateProductController implements Controller {

  constructor(private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository){
    this.iProduct = iProduct

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const product_id = httpRequest.params.product_id
      const productDb: any = await this.iProductRepository.getById(product_id)

      if(!productDb) return badRequest(new InvalidParamError(product_id))
    
      const DTOProduct = await this.iProduct.update(productDb.product.id, httpRequest.body)
      
      return success(DTOProduct)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetProductController implements Controller {

  constructor(private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository){
    this.iProduct = iProduct

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const product_id = httpRequest.params.product_id
      const productDb: any = await this.iProductRepository.getById(product_id)

      if(!productDb) return badRequest(new InvalidParamError(product_id))
    
      const DTOProduct = await this.iProduct.get(productDb)
      
      return success(DTOProduct)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class RemoveProductController implements Controller {

  constructor(private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository){
    this.iProduct = iProduct

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const product_id = httpRequest.params.product_id
      const productDb: any = await this.iProductRepository.getById(product_id)

      if(!productDb) return badRequest(new InvalidParamError(product_id))
    
      const DTOProduct = await this.iProduct.remove(productDb)
      
      return success(DTOProduct)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

