import CategorySchema from '../mongo-schemas/category-schema'
import { IUploadRepository } from '../../../../data/useCases/protocols/repositories/upload-repository';
import { UploadModel } from '../../../../domain/entities/upload';
import { IUploadModel } from '../../../../domain/useCases/uploads/add-upload';
import UploadSchema from '../mongo-schemas/upload-schema';



const props = 'id, name links routes description activated_dates products created_date activated image'
export class UploadMongoRepository implements IUploadRepository {

  async add (accountData: UploadModel): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.create(accountData)
      const { _id, name, path, owner, created_at } = collection
      const newCollection: any = { id: _id, name: name, owner: owner, created_at: created_at}
      await collection.save()
      let upload: any = {
        upload: newCollection
       }
      return upload
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.find({}, props)
      if(collection === null) return

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (path_router: string): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.findOne({ path: path_router })
      if(collection === null) return
      const { _id, name, path, owner, created_at } = collection
      console.log(_id);
      
      const newCollection: any = { id: _id, name: name, path: path, owner: owner, created_at: created_at}
  
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.findById(id, props)
      if(collection === null) return
      
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.findByIdAndDelete(id)

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.count(value)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<IUploadModel> {
    try {
      const collection: IUploadModel | any = await UploadSchema.find(value, props)
      if(collection === null) return
      return collection
    } catch (error) {
      console.log(error)
    }
  }
}
