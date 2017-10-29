import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'pricecalendars',
  post: {
    description: '',
    dateFrom: '',
    dateTo: '',
    date: '',
    active: 0
  }
}

export const DATA_FORM = {
  input: {
    description: {
      label: 'Titulo',
      placeholder: 'Titulo del calendario',
      type: 'text',
      srOnly: true
    },
    // date: {
    //   label: 'F. Valida',
    //   placeholder: 'Fecha valida',
    //   type: 'text',
    //   input: 'datepicker-range',
    //   srOnly: true,
    //   params: {
    //     value: ''
    //   }
    // }
  },
  validate: {
    item: {
      description: {
        required,
        minLength: minLength(5)
      },
      // dateFrom: {
      //   required
      // },
      // dateTo: {
      //   required
      // },
      date: {
        required
      }
    }
  }
}
