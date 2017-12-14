import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehicleclasses',
  post: {
    description: ''
  },
  fieldsTable: {
    id: {label: 'ID', sortable: true, 'class': 'text-center'},
    description: {label: 'Nombre:', sortable: true},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    description: {
      label: 'Nombre',
      placeholder: 'Ingrese nombre de la clase',
      type: 'text'
    }
  },
  validate: {
    item: {
      description: {
        required
      }
    }
  }
}
