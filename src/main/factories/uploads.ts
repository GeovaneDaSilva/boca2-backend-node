import { DbAddUpload } from "../../data/useCases/db-uploads/db-upload"
import { CategoryMongoRepository } from "../../infra/db/mongodb/category-repository/category"
import { UploadMongoRepository } from "../../infra/db/mongodb/uploads-repository/upload"
import { UploadController } from "../../presentation/controllers/uploads/uploads"


export const makeUploadController = (): UploadController => {

  const iCategoryRepository = new CategoryMongoRepository()
  const iUploadRepository = new UploadMongoRepository()
  const dbAddUpload = new DbAddUpload(iUploadRepository)
  const uploadController = new UploadController(dbAddUpload, iCategoryRepository, iUploadRepository)
  return uploadController
}
