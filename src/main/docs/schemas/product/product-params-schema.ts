export const productParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    offer_price: {
      type: 'number'
    },
    sku: {
      type: 'string'
    },
    lb: {
      type: 'number'
    },
    oz: {
      type: 'number'
    },
    details: {
      type: 'string'
    },
    text_offer: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    tags: {
      type: 'array'
    },
    activated: {
      type: 'boolean'
    },
    activated_at: {
      activated_at: 'date'
    }
  },
  required: ['name', 'price', 'activated', 'sku']
}

// request
