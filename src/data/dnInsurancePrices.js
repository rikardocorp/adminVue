import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'insuranceprices',
  post: {
    name: '',
    price: '',
    vehicleTypeId: '',
    insuranceCompanyId: '',
    insuranceTypeId: '',
    regionId: '',
    useTypeId: '',
    validityDate: ''
  },
  fieldsTable: {
    name: {label: 'Nombre', sortable: true, 'class': 'text-center'},
    price: {label: 'Precio', sortable: true, 'class': 'text-center'},
    insuranceCompanyName: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    insuranceTypeName: {label: 'Tipo Seguro', sortable: true, 'class': 'text-center'},
    regionName: {label: 'Ciudad', sortable: true, 'class': 'text-center'},
    useTypeName: {label: 'Tipo Uso', sortable: true, 'class': 'text-center'},
    validityDate: {label: 'Fecha Valida', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
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
    insuranceCompanyId: {
      label: 'Aseguradoras',
      placeholder: 'Compañia de Seguro',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'insurancecompanies',
        key: 'insuranceCompanyId',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    insuranceTypeId: {
      label: 'Tipo seguro',
      placeholder: 'Tipo de seguro',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'insurancetypes',
        key: 'insuranceTypeId',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    useTypeId: {
      label: 'Tipo uso',
      placeholder: 'Tipo de uso',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'usetypes',
        key: 'useTypeId',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    price: {
      label: 'Precio',
      placeholder: 'Ingrese el precio',
      type: 'number'
    },
    validityDate: {
      label: 'Fecha Valida',
      placeholder: 'Ingrese una fecha valida',
      type: 'text',
      input: 'datepicker',
      params: {
        key: 'validityDate',
        disabled: {
          to: new Date(2017, 8, 19),
          from: new Date(2019, 6, 1)
        },
        format: 'dd/MM/yyyy',
        value: ''
      }
    }
  },
  validate: {
    item: {
      regionId: {
        required
      },
      insuranceCompanyId: {
        required
      },
      insuranceTypeId: {
        required
      },
      useTypeId: {
        required
      },
      price: {
        required,
        numeric
      },
      validityDate: {
        required
      }
    }
  }
}
