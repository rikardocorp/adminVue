import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'cotizar',
  post: {
    regionId: '',
    useTypeId: '',
    brand: '',
    model: ''
  }
}

export const DATA_FORM = {
  input: {
    brand: {
      label: 'Marca',
      placeholder: 'Seleccione Marca',
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
        icon: 'fa-bookmark',
        value: ''
      }
    },
    model: {
      label: 'Modelo',
      placeholder: 'Seleccione Modelo',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'vehicletypes/filter?type=1&vehicleBrand=',
        key: 'model',
        keyValue: 'vehicleModel',
        objectKey: 'vehicleType',
        label: 'vehicleModel',
        options: [],
        activate: false,
        loadData: false,
        icon: 'fa-car',
        value: ''
      }
    },
    regionId: {
      label: 'Ciudad',
      placeholder: 'Seleccione Ciudad',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'regions',
        key: 'regionId',
        keyValue: 'id',
        objectKey: 'region',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        localData: 'regions',
        icon: 'fa-map-marker',
        value: ''
      }
    },
    useTypeId: {
      label: 'Tipo de Uso',
      placeholder: 'Seleccione Tipo de Uso',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'usetypes',
        key: 'useTypeId',
        keyValue: 'id',
        objectKey: 'useType',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        icon: 'fa-id-card-o',
        value: ''
      }
    }
  },
  validate: {
    item: {
      brand: {
        required
      },
      model: {
        required
      },
      regionId: {
        required
      }
    }
  }
}
