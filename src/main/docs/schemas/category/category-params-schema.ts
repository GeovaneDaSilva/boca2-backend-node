

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
    packages: {
      type: [{}]
    }
  },
  required: ['name', 'description']
}
