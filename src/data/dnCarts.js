import { required, minLength, maxLength, between, numeric, email, alphaNum } from 'vuelidate/lib/validators'

export const DATA_CARTS = {
  name: 'carts',
  post: {
    amount: 0,
    observation: '',
    seatNumber: '',
    region: null,
    vehicle: null,
    purchaser: null,
    insuranceCompany: null
  }
}
