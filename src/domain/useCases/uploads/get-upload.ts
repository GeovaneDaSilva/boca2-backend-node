import { UploadModel } from '../../../presentation/controllers/uploads/uploads-protocols';

export interface IUploadModel {
    _id?: string
    owner?: string
    name: string
    router: any
    path: string
    created_date: Date
  }

export interface ListUploads {
  get: (account: UploadModel) => Promise<IUploadModel>
}
