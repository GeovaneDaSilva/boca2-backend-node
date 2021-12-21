/* eslint-disable handle-callback-err */
import AWS from 'aws-sdk'

import { IParams, IUploadAws } from '../presentation/interfaces/aws-s3-upload'

export class UploadAwsAdapter implements IUploadAws {
  async upload (params: IParams): Promise<IParams> {
    try {
      
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      })

      const S3params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: params.body,
        Key: params.key,
        ACL: 'public-read',
      }
      
      const options = { partSize: 10 * 1024 * 1024, queueSize: 1}

      
      const upload: any = s3.upload(S3params).promise()
      console.log('set in AWS', upload)
      return upload
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
