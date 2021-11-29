import { IUploadRepository } from './../protocols/repositories/upload-repository';
import { UploadModel } from "../../../domain/entities/upload"
import { AddUpload, IUploadModel } from "../../../domain/useCases/uploads/add-upload"
import { IParams, IUploadAws } from '../../../presentation/interfaces/aws-s3-upload';

export class DbAddUpload implements AddUpload {

  constructor( private readonly iUploadRepository: IUploadRepository, private readonly iUploadAws: IUploadAws){
    this.iUploadRepository = iUploadRepository
    this.iUploadAws = iUploadAws
    
  }
    async add (uploads: UploadModel): Promise<IUploadModel> {
    
      const params: any = {
        key: uploads.path,
        body: uploads.data
        
      }

     
      const data: any = await this.iUploadAws.upload(params)

      if(!data.Location) throw(new Error('error in AWS'))
      
      const uploadDb: any = await this.iUploadRepository.add(uploads)

      const response: any = {
        uploadDb,
        source: data.Location
      }
      return new Promise(resolve => resolve(
        response
      ))
    }
  }
  