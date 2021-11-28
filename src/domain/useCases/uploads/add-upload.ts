import { UploadModel } from '../../../presentation/controllers/uploads/uploads-protocols';
import { AccountModel } from '../../entities/account'

export interface IUploadModel {
    _id?: string
    name: string
    router: any
    path: string
    created_date: Date
  }

export interface AddUpload {
  add: (account: UploadModel) => Promise<IUploadModel>
}
