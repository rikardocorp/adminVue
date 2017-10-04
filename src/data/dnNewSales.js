import { required, minLength, maxLength, between, numeric, email } from 'vuelidate/lib/validators'

export const DATA_VEHICLE = {
  name: 'vehicles',
  post: {
    licensePlate: '',
    manufacturingYear: '',
    seatNumber: '',
    useType: '',
    engineNumber: '',
    vehicleType: '',
    webUser: ''
  },
  input: {
    licensePlate: {
      label: 'Placa',
      placeholder: 'Ingrese su placa',
      type: 'text',
      icon: 'fa fa-hashtag'
    },
    engineNumber: {
      label: 'Nro. Serie',
      placeholder: 'Ingrese numero de serie',
      type: 'text',
      icon: 'fa fa-hashtag'
    },
    seatNumber: {
      label: 'Nro. Asientos',
      placeholder: 'Ingrese numero de asientos',
      type: 'number',
      icon: 'fa fa-hashtag'
    },
    manufacturingYear: {
      label: 'Año Fabric',
      placeholder: 'Ingrese año de fabricacion',
      type: 'number',
      icon: 'fa fa-calendar-o'
    }
  },
  validate: {
    item: {
      licensePlate: {
        required
      },
      manufacturingYear: {
        required,
        numeric,
        maxLength: maxLength(4)
      },
      seatNumber: {
        required,
        numeric,
        maxLength: maxLength(3)
      },
      useType: {
        required
      },
      engineNumber: {
        required
      },
      vehicleType: {
        required
      }
    }
  }
}

export const DATA_WEBUSER = {
  name: 'webusers',
  post: {
    dniRuc: '',
    razonSocial: '',
    address: '',
    distrito: '',
    departamento: '',
    provincia: '',
    cellPhone: '',
    user: {
      email: ''
    }
  }
}

export const DATA_PURCHASER = {
  name: 'purchasers',
  post: {
    razonSocial: '',
    dniRuc: '',
    email: '',
    address: '',
    departamento: '',
    distrito: '',
    provincia: '',
    phone: '',
    cellPhone: '',
    typeDocument: 1
  },
  input: {
    razonSocial: {
      label: 'Nombre:',
      placeholder: 'Ingrese su nombre',
      type: 'text',
      icon: 'fa fa-user-o'
    },
    dniRuc: {
      label: 'DNI',
      placeholder: 'Ingrese su Dni o Ruc',
      type: 'number',
      icon: 'fa fa-address-card-o'
    },
    email: {
      label: 'Email',
      placeholder: 'Ingrese su email',
      type: 'text',
      icon: 'fa fa-envelope-o',
      input: 'input-email'
    },
    address: {
      label: 'Dirección',
      placeholder: 'Ingrese su dirección',
      type: 'text',
      icon: 'fa fa-address-book-o'
    },
    departamento: {
      label: 'Localidad',
      placeholder: 'Departamento-Provincia-Distrito',
      type: 'text',
      icon: 'fa fa-map-marker',
      input: 'onlyMultiSelect'
    },
    phone: {
      label: 'Telefono Fijo',
      placeholder: 'Ingrese su telefono fijo',
      type: 'number',
      icon: 'fa fa-phone'
    },
    cellPhone: {
      label: 'Celular',
      placeholder: 'Ingrese su celular',
      type: 'number',
      icon: 'fa fa-mobile'
    }
  },
  validate: {
    item: {
      razonSocial: {
        required
      },
      dniRuc: {
        required,
        numeric,
        maxLength: maxLength(11)
      },
      email: {
        required,
        email
      },
      address: {
        required
      },
      departamento: {
        required
      },
      distrito: {
        required
      },
      provincia: {
        required
      },
      phone: {
        required
      },
      cellPhone: {
        required
      }
    }
  }
}

export const DATA_SALE = {
  name: 'sales',
  post: {
    date: '',
    amount: '',
    active: '',
    discount: '',
    invoiceNumber: '',
    observation: '',
    state: '',
    currency: '',
    region: null,
    vehicle: null,
    insurancePolicy: null,
    purchaser: null,
    seatNumber: ''
  }
}
