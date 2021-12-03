import { productSchema } from './schemas/product/product-schema';
import { DeleteProductPath, productByIdPath, productPath, productsByCategorieIdPath, productsPath } from './product-path';
import { categoriesActivatedPath, categoriesPath, categoryPath, DeletecategoryPath, EditcategoryPath, GetCategoryByIdPath } from './category-path'
import { serverError, badRequest, unauthorized } from './components'
import { loginPath } from './login-path'
import { categoryParamsSchema } from './schemas/category/category-params-schema'
import { categorySchema } from './schemas/category/category-schema'
import { accountSchema } from './schemas/login/account-schema'
import { errorSchema } from './schemas/login/error-schema'
import { loginParamsSchema } from './schemas/login/login-params-schema'
import { signupParamsSchema } from './schemas/signup/signup-params-schema'
import { signupSchema } from './schemas/signup/signup-schema'
import { uploadParamsSchema } from './schemas/upload/upload-params-schema'
import { uploadSchema } from './schemas/upload/upload-schema'
import { checkinTokenPath, deleteAccountSPath, getAccountPath, getAccountSFilterPath, getAccountsPath, signupPath, updateAccountPath } from './signup-path'
import { uploadPath, uploadsPath } from './upload-path'
import { productParamsSchema } from './schemas/product/product-params-schema';
import { DeleteItemPath, EditItemPath, itemByIdPath, itemPath, itemsByCategorieIdPath, itemsPath } from './item-path';
import { itemSchema } from './schemas/item/item-schema';
import { itemParamsSchema } from './schemas/item/item-params-schema';

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
    '/category/{id}/': GetCategoryByIdPath, // route'
    '/category/{category_id}': DeletecategoryPath, // route'
    '/categories/activated': categoriesActivatedPath, // route'

    '/uploads/': uploadsPath, // route'
    '/upload/{type}/{id}': uploadPath, // route'

    '/products/': productsPath, // route'
    '/products/{category_id}': productsByCategorieIdPath, // route'

    '/product/{category_id}': productPath, // route'
    '/product/{product_id}': productByIdPath, // route'
    '/product/{product_id}/': DeleteProductPath, // route'

    '/items/': itemsPath, // route'
    '/items/{product_id}': itemsByCategorieIdPath, // route'
    '/item/{product_id}': itemPath, // route'
    '/item/{item_id}': itemByIdPath, // route'
    '/item/{id}': EditItemPath, // route'

    '/item/{item_id}/': DeleteItemPath, // route'

    
  },
  schemas: {
    account: accountSchema, // response
    loginParams: loginParamsSchema, // request

    product: productSchema, // response
    productParams: productParamsSchema, // request

    signup: signupSchema, // response
    signupParams: signupParamsSchema, // reques

    updated: signupSchema, // response
    updateAccountPath: updateAccountPath, // reques

    category: categorySchema, // response
    categoryParams: categoryParamsSchema, // params

    item: itemSchema, // response
    itemParams: itemParamsSchema, // params

    upload: uploadSchema, // response
    uploadParams: uploadParamsSchema, 
    // params
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized
  }

}
