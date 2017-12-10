import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehiclecategories',
  post: {
    description: ''
  },
  fieldsTable: {
    id: {label: 'ID', sortable: true, 'class': 'text-center'},
    description: {label: 'Descripción', sortable: true},
    actions: {label: 'Acciones', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    description: {
      label: 'Descripción',
      placeholder: 'Ingrese una categoría',
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
