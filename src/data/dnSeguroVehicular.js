import { required, minLength, maxLength, between, numeric, email, alphaNum } from 'vuelidate/lib/validators'

// export const DATA_VEHICLE = {
//   name: 'vehicles',
//   post: {
//     insurancePolicy: '',
//     licensePlate: '',
//     manufacturingYear: '',
//     seatNumber: '',
//     useType: '',
//     engineNumber: '',
//     vehicleTypeCategory: '',
//     user: ''
//   },
//   input: {
//     insurancePolicy: {
//       label: 'Poliza',
//       placeholder: 'Polizas disponibles',
//       type: 'text',
//       icon: 'fa fa-hashtag',
//       input: 'multiselect',
//       params: {
//         url: 'insurancepolicies',
//         key: 'insurancePolicy',
//         label: 'number',
//         options: [],
//         activate: false,
//         loadData: false,
//         value: ''
//       }
//     },
//     licensePlate: {
//       label: 'Placa',
//       placeholder: 'Ingrese su placa',
//       type: 'text',
//       icon: 'fa fa-hashtag',
//       input: 'input-search'
//     },
//     engineNumber: {
//       label: 'Nro. Serie',
//       placeholder: 'Ingrese numero de serie',
//       type: 'text',
//       icon: 'fa fa-hashtag'
//     },
//     seatNumber: {
//       label: 'Nro. Asientos',
//       placeholder: 'Ingrese numero de asientos',
//       type: 'number',
//       icon: 'fa fa-hashtag'
//     },
//     manufacturingYear: {
//       label: 'Año Fabric',
//       placeholder: 'Ingrese año de fabricacion',
//       type: 'number',
//       icon: 'fa fa-calendar-o'
//     }
//   },
//   validate: {
//     item: {
//       insurancePolicy: {
//         required
//       },
//       licensePlate: {
//         required
//       },
//       manufacturingYear: {
//         required,
//         numeric,
//         maxLength: maxLength(4)
//       },
//       seatNumber: {
//         required,
//         numeric,
//         maxLength: maxLength(3)
//       },
//       // useType: {
//       //   required
//       // },
//       engineNumber: {
//         required
//       }
//       // vehicleTypeCategory: {
//       //   required
//       // }
//     }
//   }
// }

export const DATA_VEHICLE = {
  name: 'vehicles',
  post: {
    licensePlate: '',
    manufacturingYear: '',
    seatNumber: '',
    engineNumber: ''
  },
  input: {
    licensePlate: {
      label: 'Placa',
      placeholder: 'Ingrese su placa',
      type: 'text',
      icon: 'fa fa-hashtag',
      input: 'input-search'
    },
    engineNumber: {
      label: 'Nro. de Serie',
      placeholder: 'Ingrese numero de serie',
      type: 'text',
      icon: 'fa fa-hashtag'
    },
    seatNumber: {
      label: 'Nro. de Asientos',
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
      engineNumber: {
        required
      }
    }
  }
}

export const DATA_USER = {
  name: 'users',
  post: {
    dniRuc: '',
    razonSocial: '',
    firstName: '',
    lastName: '',
    address: '',
    distrito: '',
    departamento: '',
    provincia: '',
    cellPhone: '',
    phone: '',
    email: '',
    password: '',
    role: {
      email: '',
      role: 'ROLE_USUARIO'
    }
  }
}

export const DATA_PURCHASER = {
  name: 'purchasers',
  post: {
    razonSocial: '',
    dniRuc: '',
    address: '',
    departamento: '',
    distrito: '',
    provincia: '',
    phone: '',
    cellPhone: '',
    typeDocument: 1,
    birthDate: '',
    hasEmail: true
  },
  input: {
    dniRuc: {
      label: 'DNI',
      placeholder: 'Ingrese su Dni o Ruc',
      type: 'number',
      icon: 'fa fa-address-card-o',
      input: 'input-dni'
    },
    razonSocial: {
      label: 'Nombre',
      placeholder: 'Ingrese su nombre',
      type: 'text',
      icon: 'fa fa-user-o'
    },
    address: {
      label: 'Dirección',
      placeholder: 'Ingrese su dirección',
      type: 'text',
      icon: 'fa fa-address-book-o',
      input: 'input'
    },
    distrito: {
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
          localData: 'regions'
        },
        {
          url: 'provinces',
          options: [],
          pickID: null,
          id: 'province',
          keySearch: 'name',
          colorClass: 'badge badge-success',
          placeholder: 'Provincia',
          localData: 'provinces'
        },
        {
          url: 'cities',
          options: [],
          pickID: null,
          id: 'city',
          keySearch: 'name',
          colorClass: 'badge badge-info text-white',
          placeholder: 'Distrito',
          localData: 'cities',
        }
      ]
    },
    phone: {
      label: 'Teléfono Fijo',
      placeholder: 'Ingrese su teléfono fijo',
      type: 'number',
      icon: 'fa fa-phone',
      input: 'input'
    },
    cellPhone: {
      label: 'Celular',
      placeholder: 'Ingrese su celular',
      type: 'number',
      icon: 'fa fa-mobile',
      input: 'input'
    },
    birthDate: {
      label: 'F.Nacimiento',
      placeholder: 'Ingrese una fecha de nacimiento',
      type: 'text',
      icon: 'fa fa-calendar',
      input: 'datepicker',
      params: {
        key: 'birthDate',
        disabled: {
          to: new Date(2017, 8, 19),
          from: new Date(2019, 6, 1)
        },
        format: 'dd/MM/yyyy',
        value: ''
      }
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
      distrito: {
        required
      },
      phone: {
        required
      },
      cellPhone: {
        required
      }
    }
  },
  validate2: {
    item: {
      razonSocial: {
        required
      },
      dniRuc: {
        required,
        numeric,
        maxLength: maxLength(11)
      },
      address: {
        required
      },
      distrito: {
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
    validityStart: '',
    amount: '',
    active: '',
    discount: '',
    invoiceNumber: '',
    observation: '',
    state: '',
    currency: 'Soles',
    region: null,
    vehicle: null,
    insurancePolicy: null,
    purchaser: null,
    cart: null,
    seatNumber: '',
    bodywork: ''
  }
}

export const DATA_PAY = {
  name: 'pay',
  post: {
    discount: 0,
    amount: 0,
    validityStart: '',
    invoiceNumber: '',
    observation: '',
    paymentType: 1,
    bodywork: ''
  },
  input: {
    discount: {
      label: 'Descuento',
      placeholder: 'Descuento',
      type: 'number',
      icon: 'fa fa-minus-square',
      show: false
    },
    amount: {
      label: 'Monto a Pagar',
      placeholder: 'Monto a pagar',
      type: 'number',
      icon: 'fa fa-money',
      show: true
    },
    validityStart: {
      label: 'Fecha de Inicio',
      placeholder: 'Inicio de cobertura',
      type: 'text',
      icon: 'fa fa-calendar',
      input: 'datepicker',
      params: {
        key: 'birthDate',
        disabled: {
          to: new Date(2017, 8, 19),
          from: new Date(2019, 6, 1)
        },
        format: 'dd/MM/yyyy',
        value: ''
      }
    },
    _line: {
      label: 'Datos Opcionales',
      input: 'separator',
      srOnly: false
    },
    invoiceNumber: {
      label: 'Comprobante',
      placeholder: '#comprobante de pago',
      type: 'text',
      icon: 'fa fa-hashtag',
      show: true
    },
    bodywork: {
      label: 'Carrocería',
      placeholder: 'Carrocería del vehículo',
      type: 'text',
      icon: 'fa fa-car',
      show: true
    },
    observation: {
      label: 'Observación',
      placeholder: 'Observación en la venta',
      type: 'text',
      icon: 'fa fa-user-o',
      input: 'textarea',
      srOnly: true
    }
  },
  validate: {
    item: {
      validityStart: {
        required
      },
      discount: {
        between: between(0, 30),
        numeric
      },
      amount: {
        required,
        between: between(0, 30)
      },
      paymentType: {
        required
      }
    }
  }
}

export const DATA_PAYMENT = {
  name: 'payments',
  post: {
    amount: 0,
    paymentType: 1,
    numFactura: '',
    sale: null
  }
}

// SPECIAL SALE

export const DATA_VEHICLETYPE = {
  name: 'vehicletypecategories',
  post: {
    useType: null,
    brand: '',
    vehicleType: null,
    vehicleClass: null,
    vehicleCategory: null,
    amount: ''
  },
  input: {
    brand: {
      label: 'Marca',
      placeholder: 'Marca de vehículo',
      type: 'text',
      icon: 'fa fa-bookmark',
      input: 'multiselect-tag',
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
      placeholder: 'Modelo de vehículo',
      type: 'text',
      icon: 'fa fa-car',
      input: 'multiselect-tag',
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
    useType: {
      label: 'Tipo de uso',
      placeholder: 'Tipo de uso',
      type: 'text',
      icon: 'fa fa-tag',
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
    vehicleClass: {
      label: 'Clase',
      placeholder: 'Clase de vehículo',
      type: 'text',
      icon: 'fa fa-tag',
      input: 'multiselect-tag',
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
      icon: 'fa fa-tag',
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
    amount: {
      label: 'Precio Valorado',
      placeholder: 'Valorado en Dolares',
      type: 'number',
      icon: 'fa fa-usd'
    }
  },
  validate: {
    item: {
      amount: {
        required
      },
      useType: {
        required
      },
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
      }
    }
  }
}
