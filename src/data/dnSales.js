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
  }
}

export const DATA_FORM = {
  input: {
    insurancePolicyId: {
      label: 'Polizas',
      placeholder: 'Numero de Polizas',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'insurancepolicies/mypolicies?sold=0',
        key: 'insurancePolicyId',
        label: 'number',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    purchaserId: {
      label: 'Cotratante',
      placeholder: 'Numero de asientos',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'purchasers',
        key: 'purchaserId',
        label: 'razonSocial',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    vehicleId: {
      label: 'Vehiculo',
      placeholder: 'Vehiculo asegurado',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehicles',
        key: 'vehicleId',
        label: 'licensePlate',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    regionId: {
      label: 'Departamento',
      placeholder: 'Departamento',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'regions',
        key: 'regionId',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
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
      insurancePolicyId: {
        required
      },
      purchaserId: {
        required
      },
      vehicleId: {
        required
      },
      regionId: {
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
