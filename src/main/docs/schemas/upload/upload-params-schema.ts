

export const uploadParamsSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    img: {
      type: 'form-data archive'
    }
  },
  required: ['type', 'id']
}
