import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

// ./policy/PolicySold.vue
export const DATA = {
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
    region: null,
    vehicle: null,
    insurancePolicy: null,
    purchaser: null,
    seatNumber: ''
  },
  fieldsTable: {
    insurancePolicy: {
      label: 'Poliza',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.number }
    },
    purchaser: {
      label: 'Contratante',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.razonSocial }
    },
    vehicle: {
      label: 'Auto',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.licensePlate }
    },
    region: {
      label: 'Region',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.name }
    },
    seatNumber: {label: 'Asientos', sortable: true, 'class': 'text-center'},
    date: {label: 'Fecha', sortable: true, 'class': 'text-center'},
    amount: {label: 'Monto', sortable: true, 'class': 'text-center'},
    discount: {label: 'Descuento', sortable: true, 'class': 'text-center'},
    currency: {label: 'Moneda', sortable: true, 'class': 'text-center'},
    invoiceNumber: {label: 'Factura', sortable: true, 'class': 'text-center'},
    observation: {label: 'Observ', sortable: true, 'class': 'text-center'},
    state: {label: 'Estado', sortable: true, 'class': 'text-center'},
    active: {label: 'Activo?', sortable: true, 'class': 'text-center'},
    actions: {label: '', 'class': 'text-center', thStyle: 'width:115px'}
  }
}

export const DATA_FORM = {
  input: {
    insurancePolicy: {
      label: 'Polizas',
      placeholder: 'Numero de Polizas',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'insurancepolicies/mypolicies?sold=0',
        key: 'insurancePolicy',
        label: 'number',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    purchaser: {
      label: 'Cotratante',
      placeholder: 'Numero de asientos',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'purchasers',
        key: 'purchaser',
        label: 'razonSocial',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    vehicle: {
      label: 'Vehiculo',
      placeholder: 'Vehiculo asegurado',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehicles',
        key: 'vehicle',
        label: 'licensePlate',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    region: {
      label: 'Departamento',
      placeholder: 'Departamento',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'regions',
        key: 'region',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        localData: 'regions',
        value: ''
      }
    },
    seatNumber: {
      label: 'Asientos',
      placeholder: 'Numero de asientos',
      type: 'number'
    },
    date: {
      label: 'Fecha',
      placeholder: 'Fecha de la venta',
      type: 'text'
    },
    amount: {
      label: 'Monto',
      placeholder: 'Costo de la venta',
      type: 'number'
    },
    discount: {
      label: 'Descuento',
      placeholder: 'Ingrese descuento',
      type: 'number'
    },
    currency: {
      label: 'Moneda',
      placeholder: 'Tipo de moneda',
      type: 'text'
    },
    invoiceNumber: {
      label: 'Factura',
      placeholder: 'Comprobante de pago',
      type: 'text',
      input: 'input'
    },
    observation: {
      label: 'Observacion',
      placeholder: 'Ingrese alguna observacion',
      type: 'text',
      input: 'textarea'
    }
  },
  validate: {
    item: {
      insurancePolicy: {
        required
      },
      purchaser: {
        required
      },
      vehicle: {
        required
      },
      region: {
        required
      },
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
    }
  }
}
