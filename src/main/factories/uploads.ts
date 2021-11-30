import { DbUpdateAccount } from "../../data/useCases/db-account/db-update-account"
import { DbEditCategory } from "../../data/useCases/db-category/db-category"
import { DbAddProduct } from "../../data/useCases/db-product/db-product"
import { DbAddUpload, DbListUpload } from "../../data/useCases/db-uploads/db-upload"
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account"
import { CategoryMongoRepository } from "../../infra/db/mongodb/category-repository/category"
import { ProductMongoRepository } from "../../infra/db/mongodb/product-repository/product"
import { UploadMongoRepository } from "../../infra/db/mongodb/uploads-repository/upload"
import { ListUploadController, UploadController } from "../../presentation/controllers/uploads/uploads"
import { UploadAwsAdapter } from "../../utils-adapters/aws-upload-provider"
import { BcryptAdapter } from "../../utils-adapters/bcrypt-adapter"


export const makeUploadController = (): UploadController => {
  const salt = 10
  const accountMongoRepository = new AccountMongoRepository()
  const categoryRepository = new CategoryMongoRepository()
  const uploadRepository = new UploadMongoRepository()
  const uploadAwsAdapter = new UploadAwsAdapter()
  const dbAddUpload = new DbAddUpload(uploadRepository, uploadAwsAdapter)

  const categoryMongoRepository = new CategoryMongoRepository()
  const productMongoRepository = new ProductMongoRepository()
  const DbEditecategory = new DbEditCategory(categoryMongoRepository)
  
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbUpdateAccount = new DbUpdateAccount(bcryptAdapter, accountMongoRepository)
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  const uploadController = new UploadController(
    dbAddUpload, 
    categoryRepository, 
    uploadRepository, 
    accountMongoRepository, 
    productMongoRepository,
    DbEditecategory, 
    dbUpdateAccount,
    dbAddProduct)

  return uploadController
}
export const makeListUploadController = (): ListUploadController => {
 
  const uploadRepository = new UploadMongoRepository()

  const dbListUpload = new DbListUpload(uploadRepository)

  const uploadMongoRepository = new ListUploadController(dbListUpload, uploadRepository)

  return uploadMongoRepository
}