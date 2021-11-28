import { IUploadRepository } from './../protocols/repositories/upload-repository';
import { UploadModel } from "../../../domain/entities/upload"
import { AddUpload, IUploadModel } from "../../../domain/useCases/uploads/add-upload"

export class DbAddUpload implements AddUpload {

  constructor( private readonly iUploadRepository: IUploadRepository){
    this.iUploadRepository = iUploadRepository
  }
    async add (uploads: UploadModel): Promise<IUploadModel> {
      const uploadDb = await this.iUploadRepository.add(uploads)
      return new Promise(resolve => resolve(
        uploadDb,
      ))
    }
  }
  