import { AddCategory, AddCategoryModel, DeleteCategory, EditCategory, ListCategory } from './../../../domain/useCases/category/add-category';
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "./category-protocols"
import { ICategoryRepository } from '../../../data/useCases/protocols/repositories/category-repository';
import { MissingParamError, NoReadyExist, ReadyExist } from '../../errors';


export class CreateCategoryController implements Controller {
  constructor(private readonly addCategory: AddCategory, private readonly iCategoryRepository: ICategoryRepository){
    this.addCategory = addCategory
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, description, short_description, activated_dates } = httpRequest.body

      const requiredField = ['name', 'description']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const categoryReadyExist: any = await this.iCategoryRepository.getOne(name)
          console.log(categoryReadyExist);

      if (categoryReadyExist.Category) {
        return badRequest(new ReadyExist(name))
      }
      
      const request: AddCategoryModel = {
        name: name,
        description: description,
        activated_dates: activated_dates,
        short_description: short_description,
        created_date: new Date()
      }
      

      const DTOCatregory = await this.addCategory.add(request)
      return success(DTOCatregory)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class ListCategoriesController implements Controller {
  constructor(private readonly listCategory:ListCategory, private readonly iCategoryRepository: ICategoryRepository){
    this.listCategory = listCategory
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const id = httpRequest.params.id

      const listCategoriesDb= await this.iCategoryRepository.getAll()
            
      if (!listCategoriesDb) {
        return badRequest(new ReadyExist(id))
      }
      

      const DTOCatregory = await this.listCategory.get(listCategoriesDb)
      return success(DTOCatregory)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class ListCategoryController implements Controller {
  constructor(private readonly listCategory:ListCategory, private readonly iCategoryRepository: ICategoryRepository){
    this.listCategory = listCategory
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const id = httpRequest.params.id

      const categoryReadyExist = await this.iCategoryRepository.getById(id)
      
            
      if (!categoryReadyExist) {
        return badRequest(new ReadyExist(id))
      }
      

      const DTOCatregory = await this.listCategory.get(categoryReadyExist)
      return success(DTOCatregory)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class GetProductsCategoryByIdController implements Controller {
  constructor(private readonly listCategory:ListCategory, private readonly iCategoryRepository: ICategoryRepository){
    this.listCategory = listCategory
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const category_id = httpRequest.params.category_id

      const categoryReadyExist = await this.iCategoryRepository.getProductsByCategoryId(category_id)
      
            
      if (!categoryReadyExist) {
        return badRequest(new NoReadyExist(category_id))
      }
      

      const DTOCatregory = await this.listCategory.get(categoryReadyExist)
      return success(DTOCatregory)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class EditCategoryController implements Controller {
  constructor(private readonly editCategory: EditCategory, private readonly iCategoryRepository: ICategoryRepository){
    this.editCategory = editCategory
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      let id = httpRequest.params.id

      const categoryDb: AddCategoryModel = await this.iCategoryRepository.getById(id)


    
      if (!categoryDb) {
        return badRequest(new ReadyExist(id))
      }

      const DTOCatregory = await this.editCategory.edit(categoryDb.Category.id, httpRequest.body)
      return success(DTOCatregory)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
export class DeleteCategoryController implements Controller {
  constructor(private readonly deleteCategory:DeleteCategory, private readonly iCategoryRepository: ICategoryRepository){
    this.deleteCategory = deleteCategory
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const category_id = httpRequest.params.category_id

      const categoryReadyExist = await this.iCategoryRepository.getById(category_id)
      
            
      if (!categoryReadyExist) {
        return badRequest(new ReadyExist(category_id))
      }
      

      const DTOCatregory = await this.deleteCategory.delete(categoryReadyExist)
      return success(DTOCatregory)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export class SelectCategoriesController implements Controller {
  constructor(private readonly listCategory:ListCategory, private readonly iCategoryRepository: ICategoryRepository){
    this.listCategory = listCategory
    this.iCategoryRepository = iCategoryRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const activated = httpRequest.params.activated

      
      const getDay = new Date().getDay() // Day Of the Week

      const listCategoriesDb = await this.iCategoryRepository.select({activated_dates: getDay})

      const DTOCatregory = await this.listCategory.get(listCategoriesDb)
      return success(DTOCatregory)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}