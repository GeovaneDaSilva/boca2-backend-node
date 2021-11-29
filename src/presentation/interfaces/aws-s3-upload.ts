export interface IParams {
  bucket: string
  key: string
  body: any
  contentType: any
}
export interface IUploadAws {
  upload: (params: IParams, callback?: Function) => Promise<IParams>
}
