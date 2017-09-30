import { required, email, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

// ./maintenance/InsuranceCompanies.vue
export const DATA = {
  name: 'insurancecompanies',
  post: {
    name: '',
    phone: '',
    address: '',
    email: ''
  },
  fieldsTable: {
    name: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    phone: {label: 'Telefono', 'class': 'text-center'},
    address: {label: 'Dirección', 'class': 'text-center'},
    email: {label: 'Email', 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    name: {
      label: 'Compañia',
      placeholder: 'Ingrese nombre',
      type: 'text'
    },
    email: {
      label: 'Email',
      placeholder: 'Ingrese un email',
      type: 'text'
    },
    phone: {
      label: 'Telefono',
      placeholder: 'Ingrese numero telefono',
      type: 'number'
    },
    address: {
      label: 'Direccion',
      placeholder: 'Ingrese una direccion',
      type: 'text'
    }
  },
  validate: {
    item: {
      name: {
        required
      },
      email: {
        required,
        email
      }
    }
  }
}
