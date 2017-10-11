import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'vehicletypes',
  post: {
    vehicleBrand: '',
    vehicleModel: '',
    seatNumber: ''
  },
  fieldsTable: {
    vehicleBrand: {label: 'Marca', sortable: true, 'class': 'text-center'},
    vehicleModel: {label: 'Modelo', sortable: true, 'class': 'text-center'},
    seatNumber: {label: 'Asientos', sortable: false, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    vehicleBrand: {
      label: 'Marca',
      placeholder: 'Ingrese la marca',
      type: 'text'
    },
    vehicleModel: {
      label: 'Modelo',
      placeholder: 'Ingrese el modelo',
      type: 'text',
    },
    seatNumber: {
      label: 'Nro. Asientos',
      placeholder: 'Ingrese nro. asientos',
      type: 'number'
    }
  },
  validate: {
    item: {
      vehicleBrand: {
        required
      },
      vehicleModel: {
        required
      }
    }
  }
}
