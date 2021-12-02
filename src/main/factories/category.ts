
import { CreateCategoryController, DeleteCategoryController, EditCategoryController, GetProductsCategoryByIdController, ListCategoriesController, ListCategoryController, SelectCategoriesController } from '../../presentation/controllers/category/category'
import { CategoryMongoRepository } from '../../infra/db/mongodb/category-repository/category'
import { DbAddCategory, DbDeleteCategory, DbEditCategory, DbListCategory } from '../../data/useCases/db-category/db-category'

export const makeCreateCategoryController = (): CreateCategoryController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const category = new DbAddCategory(categoryMongoRepository)
  const createCategoryController = new CreateCategoryController(category, categoryMongoRepository)
  return createCategoryController
}

export const makeListCategoryController = (): ListCategoryController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const category = new DbListCategory()
  const listCategoryController = new ListCategoryController(category, categoryMongoRepository)
  return listCategoryController
}

export const makeGetProductsCategoryByIdController = (): GetProductsCategoryByIdController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const category = new DbListCategory()
  const getProductsCategoryByIdController = new GetProductsCategoryByIdController(category, categoryMongoRepository)
  return getProductsCategoryByIdController
}

export const makeListCategoriesController = (): ListCategoriesController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const category = new DbListCategory()
  const listCategoriesController = new ListCategoriesController(category, categoryMongoRepository)
  return listCategoriesController
}

export const makeSelectCategoriesController = (): SelectCategoriesController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const category = new DbListCategory()
  const selectCategoriesController = new SelectCategoriesController(category, categoryMongoRepository)
  return selectCategoriesController
}


export const makeEditCategoryController = (): EditCategoryController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const DbEditecategory = new DbEditCategory(categoryMongoRepository)
  const editCategoryController = new EditCategoryController(DbEditecategory, categoryMongoRepository)
  return editCategoryController
}

export const makeDeleteCategoryController = (): DeleteCategoryController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const DbDeleletecategory = new DbDeleteCategory(categoryMongoRepository)
  
  const deleteCategoryController = new DeleteCategoryController(DbDeleletecategory, categoryMongoRepository)
  return deleteCategoryController
}


