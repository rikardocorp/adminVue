import { required, minLength, maxLength, between, numeric, email, sameAs, minValue } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehicletypecategories?type=',
  post: {
    brand: '',
    vehicleType: null,
    vehicleClass: null,
    vehicleCategory: null,
    seatNumber: '',
    seatNumberTo: '',
    type: 0
  },
  fieldsTable: {
    vehicleType: {
      label: 'Vehículo',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.vehicleBrand + '-' + value.vehicleModel : '-' }
    },
    vehicleClass: {
      label: 'Clase',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : 'vacio' }
    },
    vehicleCategory: {
      label: 'Categoría',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : 'vacio' }
    },
    seatNumber: {label: 'Desde', sortable: true, 'class': 'text-center'},
    seatNumberTo: {label: 'Hasta', sortable: true, 'class': 'text-center'},
    actions: {label: 'Acciones', thStyle: 'width:115px', 'class': 'text-center'}
  },
  fieldsTablePrice: {
    // vehicleType: {
    //   label: 'Vehiculo',
    //   sortable: true,
    //   'class': 'text-center',
    //   formatter: (value) => { return value ? value.vehicleBrand + '-' + value.vehicleModel : '-' }
    // },
    vehicleClass: {
      label: 'Clase',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : 'vacio' }
    },
    vehicleCategory: {
      label: 'Categoría',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : 'vacio' }
    },
    seatNumber: {label: 'Desde', sortable: true, 'class': 'text-center'},
    seatNumberTo: {label: 'Hasta', sortable: true, 'class': 'text-center'},
    actions: {label: 'Acciones', thStyle: 'width:45px', 'class': 'text-center'}
  }
}

export const DATA_FORM = {
  input: {
    // vehicleType: {
    //   label: 'Oficina',
    //   placeholder: 'Asignar a oficina',
    //   type: 'text',
    //   input: 'multiselect',
    //   params: {
    //     url: 'offices',
    //     key: 'office',
    //     label: 'description',
    //     options: [],
    //     activate: false,
    //     loadData: true,
    //     value: ''
    //   }
    // },
    brand: {
      label: 'Marca',
      placeholder: 'Marca de vehículo',
      type: 'text',
      input: 'multiselect-tag',
      params: {
        url: 'vehicletypes?type=1',
        key: 'brand',
        keyValue: 'vehicleBrand',
        objectKey: 'vehicleType',
        label: 'vehicleBrand',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    vehicleType: {
      label: 'Modelo',
      placeholder: 'Modelo de vehículo',
      type: 'text',
      input: 'multiselect-tag',
      params: {
        url: 'vehicletypes?type=0&vehicleBrand=',
        key: 'vehicleType',
        keyValue: 'vehicleModel',
        objectKey: 'vehicleType',
        label: 'vehicleModel',
        options: [],
        activate: false,
        loadData: false,
        value: ''
      }
    },
    vehicleClass: {
      label: 'Clase',
      placeholder: 'Clase de vehículo',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehicleclasses',
        key: 'vehicleClass',
        label: 'description',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    vehicleCategory: {
      label: 'Categoría',
      placeholder: 'Categoría de vehículo',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehiclecategories',
        key: 'vehicleCategory',
        label: 'description',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    seatNumber: {
      label: 'Asientos Desde',
      placeholder: 'Número de asientos',
      type: 'number'
    },
    seatNumberTo: {
      label: 'Asientos Hasta',
      placeholder: 'Número de asientos',
      type: 'number'
    }
  },
  validate: {
    item: {
      brand: {
        required
      },
      vehicleType: {
        required
      },
      vehicleClass: {
        required
      },
      vehicleCategory: {
        required
      },
      seatNumber: {
        required,
        numeric
      },
      seatNumberTo: {
        required,
        numeric
      }
    }
  }
}
