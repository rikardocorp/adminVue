import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'insuranceprices',
  post: {
    name: '',
    price: '',
    date: '',
    // vehicleType: '',
    insuranceCompany: '',
    insuranceType: '',
    region: '',
    useType: '',
    validityDate: '',
    observation: '',
    vehicleClass: null,
    vehicleCategory: null
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
    region: {
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
        localData: 'regions',
        value: ''
      }
    },
    insuranceCompany: {
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
    insuranceType: {
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
    useType: {
      label: 'Tipo uso',
      placeholder: 'Tipo de uso',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'usetypes',
        key: 'useType',
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
      region: {
        required
      },
      insuranceCompany: {
        required
      },
      insuranceType: {
        required
      },
      useType: {
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

export const DATA_FORM_PRICE = {
  input: {
    date: {
      label: 'Fecha Registro',
      placeholder: 'F. Registro',
      type: 'text',
      input: 'datepicker',
      srOnly: true,
      params: {
        key: 'date',
        format: 'dd/MM/yyyy',
        value: ''
      }
    },
    insuranceCompany: {
      label: 'Aseguradora',
      placeholder: 'Aseguradora',
      type: 'text',
      input: 'multiselect',
      srOnly: true,
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
    insuranceType: {
      label: 'Tipo seguro',
      placeholder: 'Tipo de seguro',
      type: 'text',
      input: 'multiselect',
      srOnly: true,
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
    useType: {
      label: 'Tipo uso',
      placeholder: 'Tipo de uso',
      type: 'text',
      input: 'multiselect',
      srOnly: true,
      params: {
        url: 'usetypes',
        key: 'useType',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    // region: {
    //   label: 'Departamento',
    //   placeholder: 'Departamento',
    //   type: 'text',
    //   input: 'multiselect',
    //   params: {
    //     url: 'regions',
    //     key: 'regionId',
    //     label: 'name',
    //     options: [],
    //     activate: false,
    //     loadData: true,
    //     localData: 'regions',
    //     value: ''
    //   }
    // },
    validityDate: {
      label: 'F. Valida',
      placeholder: 'Fecha valida',
      type: 'text',
      input: 'datepicker',
      srOnly: true,
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
      // date: {
      //   required
      // },
      insuranceCompany: {
        required
      },
      insuranceType: {
        required
      },
      useType: {
        required
      },
      validityDate: {
        required
      }
    }
  }
}
