export const productSchema = {
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
    text_offer: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    details: {
      type: 'string'
    },
    tags: {
      type: '[ array of strings]'
    },
    activated: {
      type: 'boolean'
    },
    activated_at: {
      type: 'date'
    }
  }
}

// response
