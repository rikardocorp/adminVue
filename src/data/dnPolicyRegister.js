import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

// ./policy/Policy.vue
export const DATA = {
  name: 'insurancepolicies/createpolicies',
  post: {
    insuranceCompanyId: '',
    userId: '',
    prefijo: '',
    postfijo: '',
    numberFrom: '',
    numberTo: ''
  }
}

export const DATA_FORM = {
  input: {
    prefijo: {
      label: 'Prefijo',
      placeholder: '[prefijo] #poliza',
      type: 'text',
      icon: 'fa-car',
      input: 'input'
      // srOnly: true
    },
    numberFrom: {
      label: 'Desde',
      placeholder: 'Desde la #poliza',
      type: 'number',
      icon: 'fa-car',
      // srOnly: true
    },
    numberTo: {
      label: 'Hasta',
      placeholder: 'Hasta la #poliza',
      type: 'number',
      icon: 'fa-car',
      // srOnly: true
    },
    postfijo: {
      label: 'Postfijo',
      placeholder: '#poliza [postfijo]',
      type: 'text',
      icon: 'fa-car',
      input: 'input',
      // srOnly: true
    },
    insuranceCompanyId: {
      label: 'Aseguradoras',
      placeholder: 'Compañia de Seguro',
      type: 'text',
      input: 'multiselect',
      // srOnly: true,
      params: {
        url: 'insurancecompanies',
        key: 'insuranceCompanyId',
        keyValue: 'id',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    userId: {
      label: 'Usuarios',
      placeholder: 'Usuarios [opcional]',
      type: 'text',
      input: 'multiselect',
      // srOnly: true,
      params: {
        url: 'users',
        key: 'userId',
        keyValue: 'id',
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
      insuranceCompanyId: {
        required
      },
      prefijo: {
        required
      },
      postfijo: {
        required
      },
      numberFrom: {
        required,
        numeric
      },
      numberTo: {
        required,
        numeric
      }
    }
  }
}
