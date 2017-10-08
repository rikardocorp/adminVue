import { required, minLength, maxLength, between, numeric, email, sameAs } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'users',
  post: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    expense: 0,
    enabled: 1,
    facebook: '',
    _role: null,
    office: null
  },
  fieldsTable: {
    firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},
    lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},
    office: {
      label: 'Oficina',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : '-' }
    },
    email: {label: 'Email', sortable: true, 'class': 'text-center'},
    phone: {label: 'Celular', sortable: true, 'class': 'text-center'},
    expense: {
      label: 'Gastos',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? 'SI' : 'NO' }
    },
    enabled: {
      label: 'Activo',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? 'SI' : 'NO' }
    },
    role: {
      label: 'ROLE',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.role }
    },
    actions: {label: '', thStyle: 'width:115px', 'class': 'text-center'}
  }
}

export const DATA_FORM = {
  input: {
    firstName: {
      label: 'Nombres',
      placeholder: 'Nombre del usuario',
      type: 'text'
    },
    lastName: {
      label: 'Apellidos',
      placeholder: 'Apellidos del usuario',
      type: 'text'
    },
    email: {
      label: 'Email',
      placeholder: 'Correo electronico',
      type: 'email'
    },
    phone: {
      label: 'Telefono',
      placeholder: 'Numero celular',
      type: 'number'
    },
    office: {
      label: 'Oficina',
      placeholder: 'Asignar a oficina',
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
    _role: {
      label: 'ROLES',
      placeholder: 'ROLES',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'roles',
        key: '_role',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        localData: 'roles',
        value: ''
      }
    }
  },
  validate: {
    item: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric
      },
      office: {
        required
      },
      _role: {
        required
      }
    }
  }
}

export const DATA_FORM_PASSWORD = {
  post: {
    password: '',
    rePassword: ''
  },
  input: {
    password: {
      label: 'Contraseña',
      placeholder: 'Nueva Contraseña',
      type: 'password'
    },
    rePassword: {
      label: 'Re-Contraseña',
      placeholder: 'Ingrese nuevamente la contraseña',
      type: 'password'
    }
  },
  validate: {
    itemPass: {
      password: {
        required,
        minLength: minLength(4)
      },
      rePassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  }
}
