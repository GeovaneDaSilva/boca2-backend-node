export const signupPath = {
  post: {
    tags: ['Signup'],
    summary: 'API to register new user',
    description: 'Types of Roles = ADMIN_ROLE, SUPER_ROLE, USER_ROLE',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
              $ref: '#/schemas/account'
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
export const updateAccountPath = {
  put: {
    tags: ['Update Account'],
    summary: 'API to updated account',
    description: 'Types of Roles = ADMIN_ROLE, SUPER_ROLE, USER_ROLE',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
              $ref: '#/schemas/account'
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


export const getAccountsPath = {
  
  get: {
    tags: ['Accounts'],

    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
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

export const getAccountPath = {
  
  get: {
    tags: ['Account'],
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'Account Id is required',
      required: true
    }],
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: "header", 
        name: 'X-API-Key'
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
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

export const getAccountSFilterPath = {
  
  get: {
    tags: ['Get Accounts Activated'],
    parameters: [{
      in: 'path',
      name: 'value',
      description: 'List active and inactive accounts - You must pass the parameter value = true or false.',
      required: true
    }],
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: "header", 
        name: 'X-API-Key'
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
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

export const deleteAccountSPath = {
  
  delete: {
    tags: ['Delete Account'],
    parameters: [{
      in: 'path',
      name: 'account_id',
      description: 'Here you can delete an account, you need to pass the id parameter and the token through the headers.',
      required: true
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
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

export const checkinTokenPath = {
  
  get: {
    tags: ['Checkin Token'],
    description: 'You need to send the token x-access-token headers',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
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