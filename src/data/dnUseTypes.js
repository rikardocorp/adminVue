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
    actions: {label: '', thStyle: 'width:75px'}
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
      label: 'Descripcion',
      placeholder: 'Ingrese una descripcion',
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
