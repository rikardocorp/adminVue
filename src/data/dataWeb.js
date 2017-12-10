import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

export const DATA_CONTACT = {
  name: 'Contáctanos',
  post: {
    nombre: '',
    email: '',
    titulo: '',
    mensaje: ''
  },
  validate: {
    item: {
      nombre: {
        required
      },
      email: {
        required,
        email
      },
      titulo: {
        required
      },
      mensaje: {
        required
      }
    }
  }
}
