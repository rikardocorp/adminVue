import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'insurancetypes',
  post: {
    id: '',
    duplicated: false,
    object: '',
    creation_date: '',
    amount: 0,
    amount_refunded: 0,
    current_amount: 0,
    currency_code: '',
    email: '',
    description: '',
    reference_code: '',
    sales: []
  },
  fieldsTable: {
    id: {label: 'ID', 'class': 'text-center'},
    duplicated: {
      label: 'Duplicado',
      class: 'text-center',
      formatter: (value) => { return value ? 'SI' : 'NO' }
    },
    object: {label: 'Objeto', 'class': 'text-center'},
    creation_date: {label: 'Fecha', sortable: true, 'class': 'text-center'},
    amount: {label: 'Monto', 'class': 'text-center'},
    amount_refunded: {label: 'Devolver', sortable: true, 'class': 'text-center'},
    current_amount: {label: 'Monto Actual', 'class': 'text-center'},
    currency_code: {label: 'Moneda', sortable: true, 'class': 'text-center'},
    email: {label: 'Email', 'class': 'text-center'},
    description: {label: 'Desc.', 'class': 'text-center'},
    reference_code: {label: 'Código Referencia', 'class': 'text-center'},
    // actions: {label: 'Acciones', thStyle: 'width:75px', 'class': 'text-center'}
  }
}

// export const DATA_FORM = {
//   input: {
//     name: {
//       label: 'Nombre',
//       placeholder: 'Ingrese nombre de seguro',
//       type: 'text'
//     },
//     description: {
//       label: 'Descripción',
//       placeholder: 'Ingrese una descripción',
//       type: 'text',
//       input: 'textarea'
//     }
//   },
//   validate: {
//     item: {
//       name: {
//         required
//       },
//       description: {
//         required
//       }
//     }
//   }
// }
