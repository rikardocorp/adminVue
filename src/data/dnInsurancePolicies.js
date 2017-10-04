import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

// ./policy/Policy.vue
export const DATA = {
  name: 'insurancepolicies',
  post: {
    number: '',
    validityStart: '01/01/1800',
    validityEnd: '01/01/1800',
    insuranceCompany: '',
    // insuranceCompanyName: '',
    user: null
    // username: ''
  },
  fieldsTable: {
    number: {label: 'Numero', sortable: true, 'class': 'text-center'},
    // validityStart: {label: 'Nombre', sortable: true, 'class': 'text-center'},
    validityEnd: {label: 'Fecha Valida', sortable: true, 'class': 'text-center'},
    // insuranceCompanyId: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    // userId: {label: 'Usuario Venta', sortable: true, 'class': 'text-center'},
    // insuranceCompany: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    // username: {label: 'Usuario Venta', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    number: {
      label: 'Poliza',
      placeholder: 'Ingrese numero de poliza',
      type: 'text'
    },
    insuranceCompany: {
      label: 'Aseguradoras',
      placeholder: 'Compañia de Seguro',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'insurancecompanies',
        key: 'insuranceCompany',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    user: {
      label: 'Usuarios',
      placeholder: 'Usuarios',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'users',
        key: 'user',
        label: 'email',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    }
  },
  validate: {
    item: {
      number: {
        required
      },
      insuranceCompany: {
        required
      },
      user: {}
    }
  }
}
