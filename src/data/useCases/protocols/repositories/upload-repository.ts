import { UploadModel } from '../../../../domain/entities/upload';
import { IUploadModel } from '../../../../domain/useCases/uploads/add-upload'

export interface IUploadRepository {
  add: (uploadData: UploadModel) => Promise<IUploadModel>
  getAll: () => Promise<UploadModel>
  getOne: (path_router: string) => Promise<IUploadModel>
  getById: (id: string) => Promise<IUploadModel>
  delete: (id: string) => Promise<IUploadModel>
  update: (id: string, body: any) => Promise<IUploadModel>
  count: (value?: any) => Promise<IUploadModel>
  select: (value?: any) => Promise<IUploadModel>
  pushUpload: (id: string, img: string) => Promise<IUploadModel>

}


