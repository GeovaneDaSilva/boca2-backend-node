import { ICategoryRepository } from './../../../data/useCases/protocols/repositories/category-repository';
import { badRequest } from './../../helpers/http-helper';
import { serverError, success } from "../../helpers/http-helper"
import { AddUpload, Controller, HttpRequest, HttpResponse } from "./uploads-protocols"
import { InvalidParamError, MissingParamError, ReadyExist } from '../../errors';
import fs from 'fs';
import { IUploadRepository } from '../../../data/useCases/protocols/repositories/upload-repository';

export class UploadController implements Controller {
    constructor(private readonly addUpload: AddUpload,
      private readonly iCategoryRepository: ICategoryRepository,
      private readonly iUploadRepository: IUploadRepository) {
        this.addUpload = addUpload
        this.iCategoryRepository = iCategoryRepository
        this.iUploadRepository = iUploadRepository
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
        const extensionValids = ['png', 'jpg', 'gif', 'jpeg', 'png', 'JPG']
        
        if( extensionValids.indexOf(extensionArchive) < 0 ){
          return badRequest(new MissingParamError(`Please send a file with the valid extension type: ${extensionValids}`))
        }
        let nameArchive = `${id}-${nameSplit[0]}.${ extensionArchive}`

        console.log(nameArchive);
        let path: any = `src/uploads/${ type }/${nameArchive}`; //  Definimos las rutas de los archivos
        
        const category: any = await this.iCategoryRepository.getById(id)
        
        if(category === undefined) return badRequest(new InvalidParamError(id))
        if(category.Category.id === null) return badRequest(new InvalidParamError(id))

        const getPathDb: any = await this.iUploadRepository.getOne(path)
               
        if(getPathDb) return badRequest(new ReadyExist(img.name))

        await img.mv( path )

        
        if(type === 'categories') {
          let pathOld = './uploads/categories/' + category.Category.image;
          if( fs.existsSync(pathOld)){
            fs.unlinkSync( pathOld );
          }

          category.Category.image = nameArchive;
        }
      
        const newUpload: any = {
          path: path,
          name: img.name,
          created_at: new Date(),
          owner: id
        }

        
        const DTOUpload = await this.addUpload.add(newUpload)
        return success(DTOUpload)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
  }
  