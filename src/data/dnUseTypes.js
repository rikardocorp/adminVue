import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'usetypes',
  post: {
    name: '',
    description: ''
  },
  fieldsTable: {
    name: {label: 'Tipo de Uso', sortable: true, 'class': 'text-center'},
    description: {label: 'Descripción', sortable: true},
    actions: {label: 'Acciones', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    name: {
      label: 'Nombre',
      placeholder: 'Ingrese tipo de uso',
      type: 'text'
    },
    description: {
      label: 'Descripción',
      placeholder: 'Ingrese una descripción',
      type: 'text',
      input: 'textarea'
    }
  },
  validate: {
    item: {
      name: {
        required
      },
      description: {
        required
      }
    }
  }
}
