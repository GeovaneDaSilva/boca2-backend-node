
import { CreateCategoryController, DeleteCategoryController, EditCategoryController, ListCategoriesController, ListCategoryController } from '../../presentation/controllers/category/category'
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

export const makeListCategoriesController = (): ListCategoriesController => {

  const categoryMongoRepository = new CategoryMongoRepository()

  const category = new DbListCategory()
  const listCategoriesController = new ListCategoriesController(category, categoryMongoRepository)
  return listCategoriesController
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
