

export const categoryParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    products: {
      type: [{}]
    },
    activated_dates: {
      type: [0, 1, 2, 3, 4, 5, 6]
    }
  },
  required: ['name', 'description']
}
