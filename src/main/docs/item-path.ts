export const itemsPath = {
  get: {
    tags: ['Items'],
    summary: 'API list items',
    description: 'Here you can list all items', 
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/items'
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
export const itemPath = {
  post: {
    tags: ['Items'],
    summary: 'API register item by id product_id',
    description: 'To send the item, you must add an array of items ids. ', 
    parameters: [{
      in: 'path',
      name: 'product_id',
      description: `You need to pass the product id to be able to submit the product to a product.items property within that product. Basically it does a push, so it is required to send the param product_id`,
      required: true
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/item'
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
              $ref: '#/schemas/item'
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
export const itemByIdPath = {
  get: {
    tags: ['Items'],
    summary: 'API List item by id',
    description: 'Here you can list a item by id, just send the item id.', 
    parameters: [{
      in: 'path',
      name: 'item_id',
      description: `You need to pass the item id.`,
      required: true
    }],

    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/item'
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
export const EditItemPath = {
  put: {
    tags: ['Items'],
    summary: 'API update item',
    description: 'Here you can edit a item product.', 
    parameters: [{
      in: 'path',
      name: 'id',
      required: true
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/itemParams'
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
              $ref: '#/schemas/item'
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

export const DeleteItemPath = {
  delete: {
    tags: ['Items'],
    summary: 'API delete item',
    description: 'Here you can delete a item.', 
    parameters: [{
      in: 'path',
      name: 'item_id',
      description: `You need to pass the Id of the item you want to delete.`,
      required: true
    }],

    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/item'
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

export const itemsByCategorieIdPath = {
  get: {
    tags: ['Items'],
    summary: 'API List items by Product id',
    description: 'Here you can list a items of product_id by id, just send the product id.', 
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