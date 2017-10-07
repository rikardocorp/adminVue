import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'users',
  post: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    username: '',
    expense: 0,
    enabled: 1,
    facebook: '',
    role: null
  },
  fieldsTable: {
    firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},
    lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},
    email: {label: 'Email', sortable: true, 'class': 'text-center'},
    phone: {label: 'Celular', sortable: true, 'class': 'text-center'},
    username: {label: 'Username', sortable: true, 'class': 'text-center'},
    expense: {label: 'Gastos', sortable: true, 'class': 'text-center'},
    enabled: {label: 'Activo', sortable: true, 'class': 'text-center'},
    role: {label: 'ROLE', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
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
      role: {
        required
      }
    }
  }
}
