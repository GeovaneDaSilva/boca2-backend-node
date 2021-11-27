import { categoriesPath, categoryPath, DeletecategoryPath, EditcategoryPath } from './category-path'
import { serverError, badRequest, unauthorized } from './components'
import { loginPath } from './login-path'
import { categoryParamsSchema } from './schemas/category/category-params-schema'
import { categorySchema } from './schemas/category/category-schema'
import { accountSchema } from './schemas/login/account-schema'
import { errorSchema } from './schemas/login/error-schema'
import { loginParamsSchema } from './schemas/login/login-params-schema'
import { signupParamsSchema } from './schemas/signup/signup-params-schema'
import { signupSchema } from './schemas/signup/signup-schema'
import { checkinTokenPath, deleteAccountSPath, getAccountPath, getAccountSFilterPath, getAccountsPath, signupPath, updateAccountPath } from './signup-path'
export default {
  openapi: '3.0.0',
  info: {
    title: 'API Node Boca2',
    description: 'API boca2.com - Geovane Da Silva',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath, // route
    '/signup': signupPath, // route
    '/account/:ID': updateAccountPath, // route
    '/account/{id}': getAccountPath, // route'
    '/accounts/': getAccountsPath, // route'
    '/accounts/activated/{value}': getAccountSFilterPath, // route'
    '/account/{account_id}': deleteAccountSPath, // route'
    '/auth/checkin/token': checkinTokenPath, // route'
    '/categories': categoriesPath, // route'
    '/category': categoryPath, // route'
    '/category/{id}': EditcategoryPath, // route'
    '/category/{id}/': DeletecategoryPath, // route'

    
  },
  schemas: {
    account: accountSchema, // response
    loginParams: loginParamsSchema, // request

    signup: signupSchema, // response
    signupParams: signupParamsSchema, // reques

    updated: signupSchema, // response
    updateAccountPath: updateAccountPath, // reques

    category: categorySchema, // response
    categoryParams: categoryParamsSchema, // params


    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized
  }

}
