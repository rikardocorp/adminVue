import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehicles',
  post: {
    licensePlate: '',
    manufacturingYear: '',
    seatNumber: '',
    color: '',
    useType: '',
    engineNumber: '',
    vehicleType: '',
    webUser: ''
  },
  fieldsTable: {
    licensePlate: {label: 'Placa', sortable: true, 'class': 'text-center'},
    manufacturingYear: {label: 'Año', sortable: true, 'class': 'text-center'},
    seatNumber: {label: 'Asientos', 'class': 'text-center'},
    color: {label: 'Color', sortable: true, 'class': 'text-center'},
    useTypeId: {label: 'Uso', sortable: true, 'class': 'text-center'},
    engineNumber: {label: 'Motor', 'class': 'text-center'},
    vehicleTypeId: {label: 'Tipo', sortable: true, 'class': 'text-center'},
    webUser: {label: 'Dueño', 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
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
      color: {
        required
      },
      useType: {
        required
      },
      engineNumber: {
        required
      },
      vehicleType: {
        required
      },
      webUser: {
        required
      }
    }
  }
}
