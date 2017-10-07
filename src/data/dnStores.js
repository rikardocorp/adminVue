import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'store',
  post: {
    description: '',
    address: '',
    phone: '',
    type: '',
    region: null,
    province: null,
    city: null
  },
  fieldsTable: {
    description: {label: 'Descripcion', sortable: true, 'class': 'text-center'},
    address: {label: 'Direccion', sortable: true, 'class': 'text-center'},
    phone: {label: 'Telefono', sortable: true, 'class': 'text-center'},
    type: {label: 'Tipo', sortable: true, 'class': 'text-center'},
    region: {
      label: 'Depart.',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.name }
    },
    province: {
      label: 'Provincia',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.name }
    },
    city: {
      label: 'Distrito',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.name }
    },
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_FORM = {
  input: {
    type: {
      label: 'Tipo',
      placeholder: 'Nombre del usuario',
      type: 'text'
    },
    localidad: {
      label: 'Localidad',
      placeholder: 'Departamento-Provincia-Distrito',
      type: 'text',
      icon: 'fa fa-map-marker',
      input: 'onlyMultiSelect',
      params: [
        {
          url: 'regions',
          options: [],
          pickID: null,
          id: 'region',
          keySearch: 'name',
          colorClass: 'badge badge-danger',
          placeholder: 'Departamento',
        },
        {
          url: 'provinces',
          options: [],
          pickID: null,
          id: 'province',
          keySearch: 'name',
          colorClass: 'badge badge-success',
          placeholder: 'Provincia',
        },
        {
          url: 'cities',
          options: [],
          pickID: null,
          id: 'city',
          keySearch: 'name',
          colorClass: 'badge badge-info text-white',
          placeholder: 'Distrito',
        }
      ]
    },
    address: {
      label: 'Direccion',
      placeholder: 'Correo electronico',
      type: 'email'
    },
    phone: {
      label: 'Telefono',
      placeholder: 'Numero celular',
      type: 'number'
    },
    description: {
      label: 'Descripcion',
      placeholder: 'Numero celular',
      type: 'text',
      input: 'textarea'
    }
  },
  validate: {
    item: {
      type: {
        required
      },
      address: {
        required
      },
      phone: {
        required,
        numeric
      },
      region: {
        required
      },
      province: {
        required
      },
      city: {
        required
      },
      localidad: {
        required
      }
    }
  }
}
