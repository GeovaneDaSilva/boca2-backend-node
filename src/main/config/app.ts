import express from 'express'
import setupSwagger from './config-swagger'
import { config as dotenv } from 'dotenv'
import middlewares from './middlewares'
import routes from './routes'
import bodyParser from 'body-parser';

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

setupSwagger(app)
middlewares(app)
dotenv()
routes(app)

export default app //
