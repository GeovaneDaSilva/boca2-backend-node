import express from 'express'
import setupSwagger from './config-swagger'
// import { config as dotenv } from 'dotenv'
import middlewares from './middlewares'
import routes from './routes'

import cors from 'cors'

const app = express()

app.use(cors())


setupSwagger(app)
middlewares(app)
// dotenv()
routes(app)

export default app //
