// City - Ciudad
export const DATA_CITY = {
  name: 'cities',
  post: {
    name: '',
    description: ''
  },
  get: {
    name: 'Nombre',
    description: 'Descripción',
    date: 'Fecha'
  },
  fieldsTable: {
    name: {label: 'Nombre Ciudad', sortable: true, 'class': 'text-center'},
    description: {label: 'Descripción', sortable: true},
    date: {label: 'Fecha', sortable: true},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_WERUSER2 = {
  name: 'webusers',
  post: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    username: '',
    password: ''
  },
  fieldsTable: {
    firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},
    lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},
    phone: {label: 'Telefono', sortable: true},
    email: {label: 'Email', sortable: true},
    username: {label: 'Username', sortable: true},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_WEBUSER = {
  name: 'webusers',
  post: {
    firstName: '',
    lastName: '',
    dniRuc: '',
    email: '',
    razonSocial: '',
    address: '',
    departamento: '',
    provincia: '',
    distrito: '',
    cellPhone: '',
    phone: '',
    username: '',
    typeDocument: 1
  },
  fieldsTable: {
    firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},
    lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},
    dniRuc: {label: 'DNI', 'class': 'text-center'},
    email: {label: 'Email', 'class': 'text-center'},
    address: {label: 'Direccion', sortable: true, 'class': 'text-center'},
    // departamento: {label: 'Departamento', sortable: true, 'class': 'text-center'},
    // provincia: {label: 'Provincia', sortable: true, 'class': 'text-center'},
    // distrito: {label: 'Distrito', sortable: true, 'class': 'text-center'},
    cellPhone: {label: 'Telefono', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}
// ------------------------------------

export const DATA_VEHICLE = {
  name: 'vehicles',
  post: {
    licensePlate: '',
    manufacturingYear: '',
    seatNumber: '',
    color: '',
    useTypeId: '',
    engineNumber: '',
    vehicleTypeId: '',
    webUserId: ''
  },
  fieldsTable: {
    licensePlate: {label: 'Placa', sortable: true, 'class': 'text-center'},
    manufacturingYear: {label: 'Año', sortable: true, 'class': 'text-center'},
    seatNumber: {label: 'Asientos', 'class': 'text-center'},
    color: {label: 'Color', sortable: true, 'class': 'text-center'},
    useTypeId: {label: 'Uso', sortable: true, 'class': 'text-center'},
    engineNumber: {label: 'Motor', 'class': 'text-center'},
    vehicleTypeId: {label: 'Tipo', sortable: true, 'class': 'text-center'},
    webUserId: {label: 'Dueño', 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}
// ------------------------------------

export const DATA_USETYPE = {
  name: 'usetypes',
  post: {
    name: '',
    description: ''
  },
  fieldsTable: {
    name: {label: 'Tipo de Uso', sortable: true, 'class': 'text-center'},
    description: {label: 'Descripción', sortable: true},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_VEHICLETYPE = {
  name: 'vehicletypes',
  post: {
    vehicleBrand: '',
    vehicleModel: '',
    seatNumber: '',
    category: ''
  },
  fieldsTable: {
    vehicleBrand: {label: 'Marca', sortable: true, 'class': 'text-center'},
    vehicleModel: {label: 'Modelo', sortable: true, 'class': 'text-center'},
    seatNumber: {label: 'Asientos', sortable: false, 'class': 'text-center'},
    category: {label: 'Categoria', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_PURCHASER = {
  name: 'purchasers',
  post: {
    firtsName: '',
    lastName: '',
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
  fieldsTable: {
    razonSocial: {label: 'Razon Social', sortable: true, 'class': 'text-center'},
    dniRuc: {label: 'DNI/RUC', 'class': 'text-center'},
    email: {label: 'Email', 'class': 'text-center'},
    address: {label: 'Dirección', 'class': 'text-center'},
    departamento: {label: 'Departamento', sortable: true, 'class': 'text-center'},
    distrito: {label: 'Distrito', sortable: true, 'class': 'text-center'},
    provincia: {label: 'Provincia', sortable: true, 'class': 'text-center'},
    phone: {label: 'Telefono', 'class': 'text-center'},
    cellPhone: {label: 'Celular', 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_USER = {
  name: 'users',
  post: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    username: '',
    expense: '',
    enabled: '',
    facebook: '',
    role: ''
  },
  fieldsTable: {
    firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},
    lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},
    email: {label: 'Email', sortable: true, 'class': 'text-center'},
    phone: {label: 'Celular', sortable: true, 'class': 'text-center'},
    username: {label: 'Username', sortable: true, 'class': 'text-center'},
    expense: {label: 'Gastos', sortable: true, 'class': 'text-center'},
    enabled: {label: 'Activo', sortable: true, 'class': 'text-center'},
    role: {label: 'ROLE', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_ICOMPANIES = {
  name: 'insurancecompanies',
  post: {
    name: '',
    phone: '',
    address: '',
    email: ''
  },
  fieldsTable: {
    name: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    phone: {label: 'Telefono', 'class': 'text-center'},
    address: {label: 'Dirección', 'class': 'text-center'},
    email: {label: 'Email', 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_INSURANCEPRICES = {
  name: 'insuranceprices',
  post: {
    name: '',
    price: '',
    vehicleTypeId: '',
    insuranceCompanyId: '',
    insuranceTypeId: '',
    regionId: '',
    useTypeId: '',
    validityDate: ''
  },
  fieldsTable: {
    name: {label: 'Nombre', sortable: true, 'class': 'text-center'},
    price: {label: 'Precio', sortable: true, 'class': 'text-center'},
    insuranceCompanyId: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    insuranceTypeId: {label: 'Tipo Seguro', sortable: true, 'class': 'text-center'},
    regionId: {label: 'Ciudad', sortable: true, 'class': 'text-center'},
    useTypeId: {label: 'Tipo Uso', sortable: true, 'class': 'text-center'},
    validityDate: {label: 'Fecha Valida', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ---------------------------------------

export const DATA_POLICIES = {
  name: 'insurancepolicies',
  post: {
    number: '',
    validityStart: '01/01/1800',
    validityEnd: '01/01/1800',
    insuranceCompanyId: '',
    // insuranceCompanyName: '',
    userId: '',
    // username: ''
  },
  fieldsTable: {
    number: {label: 'Numero', sortable: true, 'class': 'text-center'},
    // validityStart: {label: 'Nombre', sortable: true, 'class': 'text-center'},
    // validityEnd: {label: 'Nombre', sortable: true, 'class': 'text-center'},
    // insuranceCompanyId: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    // userId: {label: 'Usuario Venta', sortable: true, 'class': 'text-center'},
    insuranceCompanyName: {label: 'Aseguradora', sortable: true, 'class': 'text-center'},
    username: {label: 'Usuario Venta', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

export const DATA_INSURANCETYPES = {
  name: 'insurancetypes',
  post: {
    name: '',
    description: ''
  },
  fieldsTable: {
    name: {label: 'Nombre', sortable: true, 'class': 'text-center'},
    description: {label: 'Descripcion', 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}

// ------------------------------------

export const DATA_COTIZAR = {
  name: 'cotizar',
  post: {
    ciudad: '',
    marca: '',
    modelo: '',
    tipoUso: ''
  }
}

// ------------------------------------

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
    regionId: '',
    vehicleId: '',
    insurancePolicyId: '',
    purchaserId: '',
    seatNumber: ''
  },
  fieldsTable: {
    insurancePolicyId: {label: 'Poliza', sortable: true, 'class': 'text-center'},
    purchaserId: {label: 'Contratante', sortable: true, 'class': 'text-center'},
    vehicleId: {label: 'Auto', sortable: true, 'class': 'text-center'},
    regionId: {label: 'Region', sortable: true, 'class': 'text-center'},
    seatNumber: {label: 'Asientos', sortable: true, 'class': 'text-center'},
    date: {label: 'Fecha', sortable: true, 'class': 'text-center'},
    amount: {label: 'Monto', sortable: true, 'class': 'text-center'},
    discount: {label: 'Descuento', sortable: true, 'class': 'text-center'},
    currency: {label: 'Moneda', sortable: true, 'class': 'text-center'},
    invoiceNumber: {label: 'Factura', sortable: true, 'class': 'text-center'},
    observation: {label: 'Observ', sortable: true, 'class': 'text-center'},
    state: {label: 'Estado', sortable: true, 'class': 'text-center'},
    active: {label: 'Activo?', sortable: true, 'class': 'text-center'},
    actions: {label: '', thStyle: 'width:75px'}
  }
}
