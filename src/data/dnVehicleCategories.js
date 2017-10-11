import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehiclecategories',
  post: {
    description: ''
  },
  fieldsTable: {
    id: {label: 'ID', sortable: true, 'class': 'text-center'},
    description: {label: 'Descripción', sortable: true},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    description: {
      label: 'Descripcion',
      placeholder: 'Ingrese una categoria',
      type: 'text',
      input: 'textarea'
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
