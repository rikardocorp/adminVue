import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehicles',
  post: {
    licensePlate: '',
    manufacturingYear: '',
    seatNumber: '',
    engineNumber: '',
    useType: null,
    vehicleTypeCategory: null,
    webUser: null
  },
  fieldsTable: {
    licensePlate: {label: 'Placa', sortable: true, 'class': 'text-center'},
    manufacturingYear: {label: 'Año', sortable: true, 'class': 'text-center'},
    seatNumber: {label: 'Asientos', 'class': 'text-center'},
    useType: {
      label: 'Uso',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.name }
    },
    engineNumber: {label: 'Motor', 'class': 'text-center'},
    vehicleTypeCategory: {
      label: 'Categoría-Tipo',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.vehicleType.vehicleBrand + '-' + value.vehicleType.vehicleModel + ' / ' + value.vehicleClass.description + '-' + value.vehicleCategory.description : 'vacio' }
    },
    webUser: {
      label: 'Dueño',
      'class': 'text-center',
      formatter: (value) => { return value.razonSocial }
    },
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    licensePlate: {
      label: 'Placa',
      placeholder: 'Ingrese su placa',
      type: 'text',
      icon: 'fa fa-hashtag',
      input: 'input'
    },
    engineNumber: {
      label: 'Nro. Serie',
      placeholder: 'Ingrese número de serie',
      type: 'text',
      icon: 'fa fa-hashtag'
    },
    seatNumber: {
      label: 'Nro. Asientos',
      placeholder: 'Ingrese número de asientos',
      type: 'number',
      icon: 'fa fa-hashtag'
    },
    manufacturingYear: {
      label: 'Año Fabric',
      placeholder: 'Ingrese año de fabricación',
      type: 'number',
      icon: 'fa fa-calendar-o'
    },
    useType: {
      label: 'Tipo de Uso',
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
    vehicleTypeCategory: {
      label: 'Categoría',
      placeholder: 'Categoría y clase del vehículo',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehicletypecategories',
        key: 'vehicleTypeCategory',
        label: 'vehicleClass',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    webUser: {
      label: 'Usuario Cliente',
      placeholder: 'Usuario tipo cliente',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'webusers',
        key: 'webUser',
        label: 'razonSocial',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    }
  },
  validate: {
    item: {
      licensePlate: {
        required
      },
      manufacturingYear: {
        required
      },
      seatNumber: {
        required
      },
      useType: {
        required
      },
      engineNumber: {
        required
      },
      vehicleTypeCategory: {
        required
      },
      webUser: {
        required
      }
    }
  }
}
