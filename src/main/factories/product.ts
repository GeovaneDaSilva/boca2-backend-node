import { DbAddProduct } from "../../data/useCases/db-product/db-product"
import { CategoryMongoRepository } from "../../infra/db/mongodb/category-repository/category"
import { ProductMongoRepository } from "../../infra/db/mongodb/product-repository/product"
import { GetProductController, ListProductsController, RegisterProductController, UpdateProductController } from "../../presentation/controllers/product/product"


export const makeRegisterProductController = (): RegisterProductController => {

  const productMongoRepository = new ProductMongoRepository()
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  const iCategoryRepository = new CategoryMongoRepository()
  const registerProductController = new RegisterProductController(dbAddProduct, iCategoryRepository, productMongoRepository)
  return registerProductController
}

export const makeListProductsController = (): ListProductsController => {

  const productMongoRepository = new ProductMongoRepository()
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  const listProductsController = new ListProductsController(dbAddProduct, productMongoRepository)
  return listProductsController
}

export const makeGetProductController = (): GetProductController => {

  const productMongoRepository = new ProductMongoRepository()
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  const getProductController = new GetProductController(dbAddProduct, productMongoRepository)
  return getProductController
}


export const makeUpdateProductController = (): UpdateProductController => {

  const productMongoRepository = new ProductMongoRepository()
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  const updateProductController = new UpdateProductController(dbAddProduct, productMongoRepository)
  return updateProductController
}
