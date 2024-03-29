// import ConnectDB from '../../infra/db/mongodb/mongo-connect'
import { MongooseHelper } from '../../infra/db/mongodb/mongoose-helper/mongoose-helper'

import { config as dotenv } from 'dotenv'


  dotenv()


// dbConnection()
MongooseHelper.connect(process.env.MONGODB)

  .then(async () => {
    const app = (await import('../../main/config/app')).default
    
  
    app.listen(process.env.PORT, () => {
      console.log(`'Express server port: \x1b[32m${process.env.PORT}\x1b[0m`)
      console.log('Base de datos  puerto 27017: \x1b[32m%s\x1b[0m', 'online')
    })
  })
  .catch(console.error)