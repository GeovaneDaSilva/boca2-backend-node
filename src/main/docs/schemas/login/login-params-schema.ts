export const loginParamsSchema = {
  type: 'object',
  description: 'Access: { email: test@test.com, password: 123456} ', 
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['email', 'password']
}
