import { required, minLength, maxLength, between, numeric, email, sameAs } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehicletypecategories',
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
      label: 'Vehiculo',
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
      label: 'Categoria',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : 'vacio' }
    },
    seatNumber: {label: '#Asientos de', sortable: true, 'class': 'text-center'},
    seatNumberTo: {label: '#Asientos a', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:115px', 'class': 'text-center'}
  },
  fieldsTablePrice: {
    vehicleType: {
      label: 'Vehiculo',
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
      label: 'Categoria',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : 'vacio' }
    },
    seatNumber: {label: '#Asientos de', sortable: true, 'class': 'text-center'},
    seatNumberTo: {label: '#Asientos a', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:45px', 'class': 'text-center'}
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
      placeholder: 'Marca de vehiculo',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehicletypes/filter?type=0',
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
      placeholder: 'Modelo de vehiculo',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehicletypes/filter?type=1&vehicleBrand=',
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
      placeholder: 'Clase de vehiculo',
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
      label: 'Categoria',
      placeholder: 'Categoria de vehiculo',
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
      label: 'Asientos De',
      placeholder: 'Numero de asientos',
      type: 'number'
    },
    seatNumberTo: {
      label: 'Asientos A',
      placeholder: 'Numero de asientos',
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
      }
    }
  }
}
