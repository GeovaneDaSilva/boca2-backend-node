export const uploadsPath = {
  get: {
    tags: ['Uploads'],
    summary: 'API list archives uploads',
    description: 'Here you can list all AWS files.', 
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/upload'
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

export const uploadPath = {
  post: {
    tags: ['Uploads'],
    summary: 'API register uploads',
    description: `Here you can upload a file to AWS and save it to the database. Valid types are: users, categories, products, packages, path url = {{url}}/upload/:type/:id
    type = ["users", "products", "categories", packages"]
    select the object id you want to update.`, 
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/uploadParams'
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
              $ref: '#/schemas/upload'
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
            $ref: '#/schemas/uploadParams'
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
              $ref: '#/schemas/upload'
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
            $ref: '#/schemas/uploadParams'
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
              $ref: '#/schemas/upload'
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