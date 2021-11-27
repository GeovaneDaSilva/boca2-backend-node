export const categoriesPath = {
  get: {
    tags: ['Category'],
    summary: 'API list categories',
    description: 'To send the products, you must add an array of product ids.', 
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

export const categoryPath = {
  post: {
    tags: ['Category'],
    summary: 'API register categories',
    description: 'To send the products, you must add an array of product ids.', 
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
export const EditcategoryPath = {
  put: {
    tags: ['Category'],
    summary: 'API update categories',
    description: 'Here you can edit a product category.', 
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

export const DeletecategoryPath = {
  delete: {
    tags: ['Category'],
    summary: 'API delete category',
    description: 'Here you can delete a product category.', 
    parameters: [{
      in: 'path',
      name: 'id',
      description: `You need to pass the Id of the category you want to delete.`,
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