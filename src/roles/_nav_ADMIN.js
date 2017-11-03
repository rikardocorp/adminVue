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
      name: 'Mantenimiento'
    },
    {
      name: 'General',
      url: '/mantenimiento',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Aseguradoras',
          url: '/mantenimiento/aseguradoras',
          icon: 'icon-puzzle'
        },
        {
          name: 'Oficinas',
          url: '/mantenimiento/oficinas',
          icon: 'icon-puzzle'
        },
        {
          name: 'Usuarios',
          url: '/mantenimiento/usuarios',
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
          name: 'Contratante',
          url: '/mantenimiento/contratantes',
          icon: 'fa fa-map-marker'
        }
      ]
    },
    {
      name: 'Precios',
      url: '/precios',
      icon: 'fa fa-gears',
      children: [
        {
          name: 'Tipos de Vehiculo',
          url: '/precios/tipo-vehiculo',
          icon: 'icon-puzzle'
        },
        {
          name: 'Categ. de Vehiculo',
          url: '/precios/categoria-vehiculo',
          icon: 'icon-puzzle'
        },
        {
          name: 'Clases de Vehiculo',
          url: '/precios/clases-vehiculo',
          icon: 'icon-puzzle'
        },
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
        // {
        //   name: 'Registro Vehiculo',
        //   url: '/vehiculo/vehiculos',
        //   icon: 'fa fa-map-marker'
        // },
        // {
        //   name: 'Contratos',
        //   url: '/venta/contratos',
        //   icon: 'fa fa-map-marker'
        // }
      ]
    },
    {
      title: true,
      name: 'PRECIOS VEHICULO'
    },
    {
      name: 'VCC',
      url: '/precios/tipo-categoria-vehiculo',
      icon: 'icon-puzzle'
    },
    // {
    //   name: 'Precios',
    //   url: '/vehiculo/precio-poliza',
    //   icon: 'fa fa-money'
    // },
    {
      name: 'Precios',
      url: '/precios/precio-poliza-full',
      icon: 'fa fa-money'
    },
    // {
    //   name: 'Precio Full2',
    //   url: '/vehiculo/precio-poliza-full2',
    //   icon: 'fa fa-money'
    // },
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
    // {
    //   name: 'Poliza Vendida',
    //   url: '/poliza-vendida',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'danger',
    //     text: 'NEW'
    //   }
    // },
    {
      name: 'Poliza Vendida',
      url: '/polizas-vendidas',
      icon: 'icon-speedometer',
      badge: {
        variant: 'warning',
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
    },
    {
      name: 'Venta Especial',
      url: '/venta-especial',
      icon: 'icon-speedometer',
      badge: {
        variant: 'success',
        text: 'NEW'
      }
    },
    {
      name: 'Venta Cliente',
      url: '/venta-cliente',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    }
  ]
}
