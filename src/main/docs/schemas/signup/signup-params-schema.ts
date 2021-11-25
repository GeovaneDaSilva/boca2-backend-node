export const signupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phone: {
      type: 'number'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    },
    role: {
      type: 'string'
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation', 'role']
}

// request
