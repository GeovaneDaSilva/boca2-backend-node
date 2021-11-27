import { ICategoryRepository } from './../protocols/repositories/category-repository';
import { CategoryModel } from "../../../domain/entities/category"
import { AddCategory, AddCategoryModel, DeleteCategory, EditCategory, ListCategory } from "../../../domain/useCases/category/add-category"

export class DbAddCategory implements AddCategory {

    constructor ( private readonly iCategoryRepository: ICategoryRepository) {
      this.iCategoryRepository = iCategoryRepository
    }   
    async add (category: CategoryModel): Promise<AddCategoryModel> {

      const categorySavedDb = await this.iCategoryRepository.add(category)
      return new Promise(resolve => resolve(
        categorySavedDb
  
      ))
    }
  }

  export class DbListCategory implements ListCategory {

    async get (categoryDb: CategoryModel): Promise<AddCategoryModel> {
      return new Promise(resolve => resolve(
        categoryDb
  
      ))
    }
  }

  export class DbEditCategory implements EditCategory {
    constructor(private readonly iCategoryRepository: ICategoryRepository){
      this.iCategoryRepository = iCategoryRepository
    }
    async edit (id: string, categoryDb: CategoryModel): Promise<AddCategoryModel> {
      const editCategory = await this.iCategoryRepository.update(id, categoryDb)
      return new Promise(resolve => resolve(
        editCategory
  
      ))
    }
  }

  export class DbDeleteCategory implements DeleteCategory {
    constructor(private readonly iCategoryRepository: ICategoryRepository){
      this.iCategoryRepository = iCategoryRepository
    }
    async delete (category: AddCategoryModel): Promise<AddCategoryModel> {
      const { id } = category.Category
      const editCategory = await this.iCategoryRepository.delete(id)
      return new Promise(resolve => resolve(
        editCategory
  
      ))
    }
  }