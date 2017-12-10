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
    fromNumber: '',
    toNumber: ''
  }
}

export const DATA_FORM = {
  input: {
    sold: {
      label: 'Vendidos',
      placeholder: 'Estado de las pólizas',
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
      placeholder: 'Pólizas asignadas',
      type: 'text',
      input: 'radio-group',
      params: {
        variant: 'primary',
        size: 'sm',
        options: [
          { text: 'Todo', value: '' },
          { text: 'Si', value: '0' },
          { text: 'No', value: '1' }
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
    },
    number: {
      label: 'Número Póliza',
      placeholder: 'Número de póliza',
      type: 'text',
      srOnly: true
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
    office: {
      label: 'Oficina',
      placeholder: 'Elije  oficina',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'offices',
        key: 'office',
        label: 'description',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    role: {
      label: 'ROL',
      placeholder: 'ROL',
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
        loadData: false,
        value: ''
      }
    }
  },
  validate: {
    item: {
      user: {
        required
      }
    }
  }
}

export const DATA_FORM_USER2 = {
  input: {
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
      }
    }
  }
}
