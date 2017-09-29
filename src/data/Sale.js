
import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

// ./policy/PolicySold.vue
export const DATA_SALE = {
  name: 'sales',
  post: {
    date: '',
    amount: '',
    active: '',
    discount: '',
    invoiceNumber: '',
    observation: '',
    state: '',
    currency: '',
    regionId: '',
    vehicleId: '',
    insurancePolicyId: '',
    purchaserId: '',
    seatNumber: ''
  },
  fieldsTable: {
    insurancePolicyId: {label: 'Poliza', sortable: true, 'class': 'text-center'},
    purchaserId: {label: 'Contratante', sortable: true, 'class': 'text-center'},
    vehicleId: {label: 'Auto', sortable: true, 'class': 'text-center'},
    regionId: {label: 'Region', sortable: true, 'class': 'text-center'},
    seatNumber: {label: 'Asientos', sortable: true, 'class': 'text-center'},
    date: {label: 'Fecha', sortable: true, 'class': 'text-center'},
    amount: {label: 'Monto', sortable: true, 'class': 'text-center'},
    discount: {label: 'Descuento', sortable: true, 'class': 'text-center'},
    currency: {label: 'Moneda', sortable: true, 'class': 'text-center'},
    invoiceNumber: {label: 'Factura', sortable: true, 'class': 'text-center'},
    observation: {label: 'Observ', sortable: true, 'class': 'text-center'},
    state: {label: 'Estado', sortable: true, 'class': 'text-center'},
    active: {label: 'Activo?', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  },
  validate: {
    optType: {
      'insurancepolicies': {
        value: {
          required
        }
      },
      'purchasers': {
        value: {
          required
        }
      },
      'vehicles': {
        value: {
          required
        }
      },
      'regions': {
        value: {
          required
        }
      }
    },
    item: {
      seatNumber: {
        required,
        numeric,
        between: between(2, 100)
      },
      date: {
        required
      },
      amount: {
        required,
        numeric
      }
    },
    validationGroup: ['item', 'optType']
  }
}
