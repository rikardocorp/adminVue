import { required, minLength, maxLength, between, numeric, email, sameAs } from 'vuelidate/lib/validators'

export const DATA = {
  name: 'users',
  post: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    expense: 0,
    enabled: 1,
    facebook: '',
    _role: null,
    office: null
  },
  fieldsTable: {
    firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},
    lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},
    office: {
      label: 'Oficina',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? value.description : '-' }
    },
    email: {label: 'Email', sortable: true, 'class': 'text-center'},
    phone: {label: 'Celular', sortable: true, 'class': 'text-center'},
    enabled: {
      label: 'Activo',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? 'SI' : 'NO' }
    },
    expense: {
      label: 'Gastos',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? 'SI' : 'NO' }
    },
    role: {
      label: 'ROLE',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.role }
    },
    actions: {label: '', thStyle: 'width:115px', 'class': 'text-center'}
  },
  fieldsTableClient: {
    firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},
    lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},
    email: {label: 'Email', sortable: true, 'class': 'text-center'},
    phone: {label: 'Celular', sortable: true, 'class': 'text-center'},
    enabled: {
      label: 'Activo',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? 'SI' : 'NO' }
    },
    expense: {
      label: 'Gastos',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value ? 'SI' : 'NO' }
    },
    role: {
      label: 'ROLE',
      sortable: true,
      'class': 'text-center',
      formatter: (value) => { return value.role }
    },
    actions: {label: '', thStyle: 'width:115px', 'class': 'text-center'}
  }
}

export const DATA_FORM = {
  input: {
    firstName: {
      label: 'Nombres',
      placeholder: 'Nombre del usuario',
      type: 'text',
      params: {
        editDisable: false
      }
    },
    lastName: {
      label: 'Apellidos',
      placeholder: 'Apellidos del usuario',
      type: 'text',
      params: {
        editDisable: false
      }
    },
    email: {
      label: 'Email',
      placeholder: 'Correo electronico',
      type: 'email',
      params: {
        editDisable: true
      }
    },
    phone: {
      label: 'Telefono',
      placeholder: 'Numero celular',
      type: 'number',
      params: {
        editDisable: false
      }
    },
    _role: {
      label: 'ROLES',
      placeholder: 'ROLES',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'roles',
        key: '_role',
        label: 'name',
        options: [],
        activate: false,
        loadData: true,
        localData: 'roles',
        value: '',
        editDisable: true
      }
    },
    office: {
      label: 'Oficina',
      placeholder: 'Asignar a oficina',
      type: 'text',
      input: 'multiselect',
      params: {
        url: 'offices',
        key: 'office',
        label: 'description',
        options: [],
        activate: false,
        loadData: true,
        value: '',
        editDisable: true
      }
    }
  },
  validate: {
    item: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric
      },
      office: {
        required
      },
      _role: {
        required
      }
    }
  }
}

export const DATA_FORM2 = {
  input: {
    firstName: {
      label: 'Nombres',
      placeholder: 'Nombre del usuario',
      type: 'text',
      params: {
        editDisable: false
      }
    },
    lastName: {
      label: 'Apellidos',
      placeholder: 'Apellidos del usuario',
      type: 'text',
      params: {
        editDisable: false
      }
    },
    email: {
      label: 'Email',
      placeholder: 'Correo electronico',
      type: 'email',
      params: {
        editDisable: true
      }
    },
    phone: {
      label: 'Telefono',
      placeholder: 'Numero celular',
      type: 'number',
      params: {
        editDisable: false
      }
    }
  },
  validate: {
    item: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric
      }
    }
  }
}

export const DATA_FORM_CLIENT = {
  input: {
    firstName: {
      label: 'Nombres',
      placeholder: 'Nombre del usuario',
      type: 'text',
      params: {
        editDisable: false
      }
    },
    lastName: {
      label: 'Apellidos',
      placeholder: 'Apellidos del usuario',
      type: 'text',
      params: {
        editDisable: false
      }
    },
    email: {
      label: 'Email',
      placeholder: 'Correo electronico',
      type: 'email',
      params: {
        editDisable: true
      }
    },
    phone: {
      label: 'Telefono',
      placeholder: 'Numero celular',
      type: 'number',
      params: {
        editDisable: false
      }
    },
    // _role: {
    //   label: 'ROLES',
    //   placeholder: 'ROLES',
    //   type: 'text',
    //   input: 'multiselect',
    //   params: {
    //     url: 'roles',
    //     key: '_role',
    //     label: 'name',
    //     options: [],
    //     activate: false,
    //     loadData: true,
    //     localData: 'roles',
    //     value: '',
    //     editDisable: true
    //   }
    // }
  },
  validate: {
    item: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric
      },
      // _role: {
      //   required
      // }
    }
  }
}

export const DATA_FORM_PASSWORD = {
  post: {
    password: '',
    rePassword: ''
  },
  input: {
    password: {
      label: 'Contraseña',
      placeholder: 'Nueva Contraseña',
      type: 'password',
      icon: 'fa-unlock-alt',
      srOnly: true
    },
    rePassword: {
      label: 'Re-Contraseña',
      placeholder: 'Ingrese nuevamente la contraseña',
      type: 'password',
      icon: 'fa-lock',
      srOnly: true
    }
  },
  validate: {
    itemPass: {
      password: {
        required,
        minLength: minLength(4)
      },
      rePassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  }
}

export const DATA_FORM_PASSWORD_RECOVER = {
  post: {
    password: '',
    rePassword: ''
  },
  input: {
    email: {
      label: 'Email',
      placeholder: 'Correo Electronico',
      type: 'email',
      icon: 'icon-envelope',
      srOnly: true
    },
    password: {
      label: 'Contraseña',
      placeholder: 'Nueva Contraseña',
      type: 'password',
      icon: 'icon-lock-open',
      srOnly: true
    },
    rePassword: {
      label: 'Re-Contraseña',
      placeholder: 'Ingrese nuevamente la contraseña',
      type: 'password',
      icon: 'icon-lock',
      srOnly: true
    }
  },
  validate: {
    itemPass: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4)
      },
      rePassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  }
}

export const DATA_USER_PROFILE = {
  validate: {
    item: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      razonSocial: {
        required
      },
      dniRuc: {
        required
      },
      birthDate: {
        required
      },
      address: {
        required
      },
      cellPhone: {
        required
      },
      departamento: {
        required
      },
      provincia: {
        required
      },
      distrito: {
        required
      }
    }
  }
}

export const DATA_FORM_PASSWORD_CHANGE = {
  post: {
    oldPassword: '',
    newPassword: '',
    rePassword: ''
  },
  validate: {
    itemPass: {
      oldPassword: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(4)
      },
      rePassword: {
        required,
        sameAsPassword: sameAs('newPassword')
      }
    }
  }
}
