export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'warning',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'UI elements'
    },
    {
      name: 'Mantenimineto',
      url: '/mantenimiento',
      icon: 'icon-puzzle',
      children: [
        // {
        //   name: 'Ciudad',
        //   url: '/mantenimiento/ciudad',
        //   icon: 'icon-puzzle'
        // },
        {
          name: 'Aseguradoras',
          url: '/mantenimiento/aseguradoras',
          icon: 'icon-puzzle'
        },
        {
          name: 'Locales',
          url: '/mantenimiento/locales',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tipos de Uso',
          url: '/mantenimiento/tipo-uso',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tipos de Seguro',
          url: '/mantenimiento/tipo-seguro',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tipos de Vehiculo',
          url: '/mantenimiento/tipo-vehiculo',
          icon: 'icon-puzzle'
        },
        {
          name: 'Usuarios',
          url: '/mantenimiento/usuarios',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Vehiculos',
      url: '/venta',
      icon: 'fa fa-gears',
      children: [
        // {
        //   name: 'Nueva venta',
        //   url: '/venta/nueva-venta',
        //   icon: 'fa fa-map-marker',
        //   badge: {
        //     variant: 'primary',
        //     text: 'NEW'
        //   }
        // },
        // {
        //   name: 'Registro Cliente',
        //   url: '/venta/clientes',
        //   icon: 'fa fa-map-marker'
        // },
        {
          name: 'Registro Vehiculo',
          url: '/venta/vehiculos',
          icon: 'fa fa-map-marker'
        },
        {
          name: 'Contratante',
          url: '/venta/contratantes',
          icon: 'fa fa-map-marker'
        },
        // {
        //   name: 'Contratos',
        //   url: '/venta/contratos',
        //   icon: 'fa fa-map-marker'
        // }
      ]
    },
    {
      title: true,
      name: 'POLIZA'
    },
    {
      name: 'Polizas',
      url: '/insertar-poliza',
      icon: 'fa fa-money',
      badge: {
        variant: 'danger',
        text: 'NEW'
      }
    },
    {
      name: 'Asignacion',
      url: '/asignar-poliza',
      icon: 'fa fa-money',
      badge: {
        variant: 'success',
        text: 'NEW'
      }
    },
    {
      name: 'Precios',
      url: '/precio-poliza',
      icon: 'fa fa-money',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'VENTAS'
    },
    // {
    //   name: 'Venta Poliza',
    //   url: '/venta-poliza',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'warning',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   name: 'Cotizacion',
    //   url: '/cotizar',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'warning',
    //     text: 'NEW'
    //   }
    // },
    {
      name: 'Poliza Vendida',
      url: '/poliza-vendida',
      icon: 'icon-speedometer',
      badge: {
        variant: 'danger',
        text: 'NEW'
      }
    },
    {
      name: 'Cotizacion',
      url: '/cotizar-admin',
      icon: 'icon-speedometer',
      badge: {
        variant: 'warning',
        text: 'NEW'
      }
    },
    {
      name: 'Nueva Venta',
      url: '/nueva-venta',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    }
  ]
}
