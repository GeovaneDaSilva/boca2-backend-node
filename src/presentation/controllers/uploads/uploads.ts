import { IAccountRepository } from './../../../data/useCases/protocols/repositories/account-repository';
import { ICategoryRepository } from './../../../data/useCases/protocols/repositories/category-repository';
import { badRequest } from './../../helpers/http-helper';
import { serverError, success } from "../../helpers/http-helper"
import { AddUpload, Controller, HttpRequest, HttpResponse } from "./uploads-protocols"
import { InvalidParamError, MissingParamError, NoReadyExist, ReadyExist } from '../../errors';
import fs from 'fs';
import { IUploadRepository } from '../../../data/useCases/protocols/repositories/upload-repository';
import { EditCategory } from '../category/category-protocols';
import { UpdateAccount } from '../../../domain/useCases/account/update-account';
import { ListUploads } from '../../../domain/useCases/uploads/get-upload';
import { IProductRepository } from '../../../data/useCases/protocols/repositories/product-repository';
import { IProduct } from '../product/product-protocols';

export class UploadController implements Controller {
    constructor(private readonly addUpload: AddUpload,
      private readonly iCategoryRepository: ICategoryRepository,
      private readonly iUploadRepository: IUploadRepository,
      private readonly iAccountRepository: IAccountRepository,
      private readonly iProductRepository: IProductRepository,
      private readonly editCategory: EditCategory,
      private readonly updateAccount: UpdateAccount,
      private readonly iProduct: IProduct) {
        this.addUpload = addUpload
        this.iCategoryRepository = iCategoryRepository
        this.iUploadRepository = iUploadRepository
        this.iAccountRepository = iAccountRepository
        this.updateAccount = updateAccount
        this.iProductRepository = iProductRepository
        this.iProduct = iProduct
    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const type = httpRequest.params.type
        const id = httpRequest.params.id
        var typesValids = ['users', 'products', 'categories', 'packages']; // base de dados

      for (const field of typesValids) {
        if( !typesValids.includes( type )){
          return badRequest(new MissingParamError(`${field}. typesValids: ${typesValids}`))
          }
      }
        if (!httpRequest.files || Object.keys(httpRequest.files).length === 0) {
          return badRequest(new InvalidParamError('No files were uploaded.'))
        }

        const img = httpRequest.files.img
        
        let nameSplit = img.name.split('.');
        let extensionArchive = nameSplit[nameSplit.length -1];
        const extensionValids = ['png', 'jpg', 'gif', 'jpeg', 'png', 'JPG', 'webp']
        
        if( extensionValids.indexOf(extensionArchive) < 0 ){
          return badRequest(new MissingParamError(`Please send a file with the valid extension type: ${extensionValids}`))
        }
        let nameArchive = `${id}-${nameSplit[0]}.${ extensionArchive}`

        let path: any = `src/uploads/${ type }/${nameArchive}`; //  path local
      
        let path_db: any = `uploads/${ type }/${nameArchive}`; //  path DB
        
        if(type === 'categories') {
          const category: any = await this.iCategoryRepository.getById(id)
        
          if(category === undefined) return badRequest(new InvalidParamError(id))
          if(category.Category.id === null) return badRequest(new InvalidParamError(id))

          const getPathDb: any = await this.iUploadRepository.getOne(path_db)
               
          if(getPathDb) return badRequest(new ReadyExist(img.name))

          // await img.mv( path )

          let pathOld = './uploads/categories/' + category.Category.image;
          if( fs.existsSync(pathOld)){
            fs.unlinkSync( pathOld );
          }
          let body: any = {
            image: path_db
          }
          await this.editCategory.edit(category.Category.id, body)
        }

        if(type === 'users') {
          const account: any = await this.iAccountRepository.getById(id)
          
          if(account === undefined) return badRequest(new InvalidParamError(id))
          if(account.id === null) return badRequest(new InvalidParamError(id))

          const getPathDb: any = await this.iUploadRepository.getOne(path_db)
               
          if(getPathDb) return badRequest(new ReadyExist(img.name))

          // await img.mv( path )

          let pathOld = './uploads/users/' + account.image;
          if( fs.existsSync(pathOld)){
            fs.unlinkSync( pathOld );
          }
          let body: any = {
            image: path_db
          }
          await this.updateAccount.edit(account.id, body)
        }

        if(type === 'products') {
          const productDB: any = await this.iProductRepository.getById(id)

          let { product } = productDB
          
          if(product === undefined) return badRequest(new InvalidParamError(id))
          if(product.id === null) return badRequest(new InvalidParamError(id))

          const getPathDb: any = await this.iUploadRepository.getOne(path_db)
               
          if(getPathDb) return badRequest(new ReadyExist(img.name))

          // await img.mv( path )

          let pathOld = './uploads/users/' + product.image;
          if( fs.existsSync(pathOld)){
            fs.unlinkSync( pathOld );
          }
          let body: any = {
            image: path_db,
          }

          await this.iUploadRepository.pushUpload(product.id, body)
        }
        
        
        const newUpload: any = {
          path: `uploads/${ type }/${nameArchive}`,
          name: img.name,
          created_at: new Date(),
          owner: id,
          data: img.data,
          name_archive: nameArchive,
          type: type
        }

        
        const DTOUpload = await this.addUpload.add(newUpload)
        return success(DTOUpload)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
export class ListUploadController implements Controller {

  constructor(private readonly listUploads: ListUploads,
    private readonly iUploadRepository: IUploadRepository) {
      this.listUploads = listUploads
      this.iUploadRepository = iUploadRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
     
      const uploadsDb = await this.iUploadRepository.getAll()

      const uploadsDTO = await this.listUploads.get(uploadsDb)
      
      return success(uploadsDTO)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}  