
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
    regionId: {
      label: 'Ciudad',
      placeholder: 'CIUDAD',
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
        icon: 'fa-map-marker',
        value: ''
      }
    },
    brand: {
      label: 'Marca',
      placeholder: 'MARCA',
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
      placeholder: 'MODELO',
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
    useTypeId: {
      label: 'Tipo de Uso',
      placeholder: 'TIPO DE USO',
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
    item: {}
  }
}
