export const productsPath = {
  get: {
    tags: ['Products'],
    summary: 'API list products',
    description: 'Here you can list all products', 
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/products'
            }
          }
        }
      },
      404: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
export const productPath = {
  post: {
    tags: ['Products'],
    summary: 'API register product by id category',
    description: 'To send the products, you must add an array of product ids. activated_dates, must be an array of numbers that correspond to the number of days in a week you want to show this category. If you send an empty array, it should show every day, and if you send it with the number of days, it should show every day you define in the array.', 
    parameters: [{
      in: 'path',
      name: 'category_id',
      description: `You need to pass the category id to be able to submit the product to a category.products property within that category. Basically it does a push, so it is required to send the param category_id`,
      required: true
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/product'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/product'
            }
          }
        }
      },
      404: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
export const productByIdPath = {
  get: {
    tags: ['Products'],
    summary: 'API List product by id',
    description: 'Here you can list a product by id, just send the product id.', 
    parameters: [{
      in: 'path',
      name: 'product_id',
      description: `You need to pass the product id.`,
      required: true
    }],

    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/product'
            }
          }
        }
      },
      404: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
export const EditcategoryPath = {
  put: {
    tags: ['Category'],
    summary: 'API update categories',
    description: 'Here you can edit a product category. activated_dates, must be an array of numbers that correspond to the number of days in a week you want to show this category. If you send an empty array, it should show every day, and if you send it with the number of days, it should show every day you define in the array.', 
    parameters: [{
      in: 'path',
      name: 'id',
      description: `You need to pass the Id to be able to edit a category The object IDs products packages are optional. If you don't send the ids, you need to remove and pass po name and category description.`,
      required: true
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/categoryParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/category'
            }
          }
        }
      },
      404: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
