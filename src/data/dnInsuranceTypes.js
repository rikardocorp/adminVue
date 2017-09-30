import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'insurancetypes',
  post: {
    name: '',
    description: ''
  },
  fieldsTable: {
    name: {label: 'Nombre', sortable: true, 'class': 'text-center'},
    description: {label: 'Descripcion', 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    name: {
      label: 'Nombre',
      placeholder: 'Ingrese nombre de seguro',
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
