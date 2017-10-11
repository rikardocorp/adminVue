import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'offices',
  post: {
    description: '',
    address: '',
    phone: '',
    officeType: '',
    region: null,
    province: null,
    city: null
  },
  fieldsTable: {
    description: {label: 'Descripcion', sortable: true, 'class': 'text-center'},
    address: {label: 'Direccion', sortable: true, 'class': 'text-center'},
    phone: {label: 'Telefono', sortable: true, 'class': 'text-center'},
    officeType: {
      label: 'Tipo',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.description }
    },
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
    officeType: {
      label: 'Tipo',
      placeholder: 'Tipo de oficina',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'officetypes',
        key: 'officeType',
        label: 'description',
        options: [],
        activate: false,
        loadData: true,
        value: ''
      }
    },
    city: {
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
          localData: 'regions',
          //asyncData: false
        },
        {
          url: 'provinces?regionId=',
          options: [],
          pickID: null,
          id: 'province',
          keySearch: 'name',
          colorClass: 'badge badge-success',
          placeholder: 'Provincia',
          localData: 'provinces',
          //asyncData: true
        },
        {
          url: 'cities?regionId=&provinceId=',
          options: [],
          pickID: null,
          id: 'city',
          keySearch: 'name',
          colorClass: 'badge badge-info text-white',
          placeholder: 'Distrito',
          localData: 'cities',
          //asyncData: true
        }
      ]
      // params: [
      //   {
      //     url: 'regions',
      //     options: [],
      //     pickID: null,
      //     id: 'region',
      //     keySearch: 'name',
      //     colorClass: 'badge badge-danger',
      //     placeholder: 'Departamento',
      //     localData: 'regions'
      //   },
      //   {
      //     url: 'provinces',
      //     options: [],
      //     pickID: null,
      //     id: 'province',
      //     keySearch: 'name',
      //     colorClass: 'badge badge-success',
      //     placeholder: 'Provincia',
      //     localData: 'provinces'
      //   },
      //   {
      //     url: 'cities',
      //     options: [],
      //     pickID: null,
      //     id: 'city',
      //     keySearch: 'name',
      //     colorClass: 'badge badge-info text-white',
      //     placeholder: 'Distrito',
      //     localData: 'cities'
      //   }
      // ]
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
      officeType: {
        required
      },
      address: {
        required
      },
      phone: {
        required,
        numeric
      },
      city: {
        required
      },
      description: {
        required
      }
    }
  }
}
