export default {
  type: "object",
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['title']
} as const;
//'{"body":{"title":"Oneplus Nord","description":"A oneplus mobile which is nothing like apple","price": 99}'