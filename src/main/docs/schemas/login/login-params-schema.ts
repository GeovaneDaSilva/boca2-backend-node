export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'test@test.com'
    },
    password: {
      type: '123456'
    }
  },
  required: ['email', 'password']
}
