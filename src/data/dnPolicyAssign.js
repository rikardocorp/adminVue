import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'insurancepolicies',
  post: {
    number: '',
    insuranceCompany: '',
    sold: '',
    user: '',
    assign: '',
    dateFrom: '',
    dateTo: '',
    numberFrom: '',
    numberTo: ''
  }
}

export const DATA_FORM = {
  input: {
    sold: {
      label: 'Vendidos',
      placeholder: 'Estado de las polizas',
      type: 'text',
      input: 'radio-group',
      params: {
        variant: 'primary',
        size: 'sm',
        options: [
          { text: 'Todo', value: '' },
          { text: 'Si', value: '1' },
          { text: 'No', value: '0' }
        ]
      }
    },
    assign: {
      label: 'Asignados',
      placeholder: 'Polizas asignadas',
      type: 'text',
      input: 'radio-group',
      params: {
        variant: 'primary',
        size: 'sm',
        options: [
          { text: 'Todo', value: '' },
          { text: 'Si', value: '1' },
          { text: 'No', value: '0' }
        ]
      }
    },
    insuranceCompany: {
      label: 'Aseguradora',
      placeholder: 'Compañia de Seguro',
      type: 'text',
      input: 'multiselect',
      srOnly: true,
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
      srOnly: true,
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
    item: {}
  }
}

export const DATA_USER = {
  name: 'assignUser',
  post: {
    user: '',
    region: '',
    role: '',
    extra: null
  }
}

export const DATA_FORM_USER = {
  input: {
    region: {
      label: 'Departamento',
      placeholder: 'Departamento',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'regions',
        key: 'region',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        localData: 'regions',
        value: ''
      }
    },
    role: {
      label: 'ROLES',
      placeholder: 'ROLES',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'roles',
        key: 'role',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        localData: 'roles',
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
      user: {
        required
      },
      region: {
        required
      }
    }
  }
}
