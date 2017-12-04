import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

// ./policy/Policy.vue
export const DATA = {
  name: 'insurancepolicies',
  post: {
    number: '',
    validityStart: '01/01/1800',
    validityEnd: '01/01/1800',
    insuranceCompany: null,
    policyType: null,
    user: null
  },
  fieldsTable: {
    number: {
      label: 'Numero',
      sortable: true,
      'class': 'text-center',
    },
    insuranceCompany: {
      label: 'Aseguradora',
      sortable: true,
      class: 'text-center',
      formatter: (value) => { return value.name }
    },
    policyType: {
      label: 'Tipo',
      sortable: true,
      class: 'text-center',
      formatter: (value) => {
        let text = ''
        switch (value) {
          case 'W':
            text = 'WEB'
            break
          case 'D':
            text = 'DIGITAL'
            break
          case 'M':
            text = 'MANUAL'
            break
          default:
            text = '-'
        }
        return text
      }
    },
    user: {
      label: 'Usuario Venta',
      sortable: true,
      class: 'text-center',
      formatter: (value) => { return (value !== null && value.id !== 0) ? value.firstName + ' ' + value.lastName : 'LIBRE' }
    },
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
      placeholder: 'Compañía de Seguro',
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
    policyType: {
      label: 'Tipo de Poliza',
      placeholder: 'Tipo de la Póliza',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'policyTypes',
        key: 'policyType',
        label: 'name',
        options: [
          {id: 'W', name: 'WEB'},
          {id: 'D', name: 'Digital'},
          {id: 'M', name: 'Manual'}
        ],
        activate: false,
        loadData: false,
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
      policyType: {
        required
      },
      user: {}
    }
  }
}
