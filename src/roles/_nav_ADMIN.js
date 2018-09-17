const preFijo = '/jmc/'

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'warning',
        text: 'Nuevo'
      }
    },
    {
      name: 'Reportes',
      url: '/reportes',
      icon: 'fa fa-book'
    },
    {
      title: true,
      name: 'Mantenimiento'
    },
    {
      name: 'General',
      url: '/mantenimiento',
      icon: 'fa fa-diamond',
      children: [
        {
          name: 'Aseguradoras',
          url: '/mantenimiento/aseguradoras',
          icon: 'fa fa-tags'
        },
        {
          name: 'Oficinas',
          url: '/mantenimiento/oficinas',
          icon: 'fa fa-building'
        },
        {
          name: 'Usuarios',
          url: '/mantenimiento/usuarios',
          icon: 'fa fa-user'
        },
        {
          name: 'Clientes',
          url: '/mantenimiento/clientes',
          icon: 'fa fa-users'
        },
        {
          name: 'Tipos de Uso',
          url: '/mantenimiento/tipo-uso',
          icon: 'fa fa-gavel'
        },
        // {
        //   name: 'Tipos de Seguro',
        //   url: '/mantenimiento/tipo-seguro',
        //   icon: 'fa fa-thumbs-up'
        // },
        // {
        //   name: 'Contratante',
        //   url: '/mantenimiento/contratantes',
        //   icon: 'fa fa-male '
        // }
      ]
    },
    {
      name: 'Vehiculos',
      url: '/vehiculos',
      icon: 'fa fa-bus',
      children: [
        // {
        //   name: 'Tipos de Vehiculo',
        //   url: '/vehiculos/tipo-vehiculo',
        //   icon: 'fa fa-taxi'
        // },
        {
          name: 'Categ. de Vehiculo',
          url: '/vehiculos/categoria-vehiculo',
          icon: 'fa fa-rocket'
        },
        {
          name: 'Clases de Vehiculo',
          url: '/vehiculos/clases-vehiculo',
          icon: 'fa fa-pencil-square-o'
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
        //   url: '/vehiculos/vehiculos',
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
      url: '/vehiculos/tipo-categoria-vehiculo',
      icon: 'fa fa-car'
    },
    // {
    //   name: 'Precios',
    //   url: '/vehiculo/precio-poliza',
    //   icon: 'fa fa-money'
    // },
    {
      name: 'Precios',
      url: '/vehiculos/precio-poliza-full',
      icon: 'fa fa-usd'
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
      icon: 'fa fa-balance-scale'
    },
    {
      name: 'Asignacion',
      url: '/asignar-poliza',
      icon: 'fa fa-hand-o-right'
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
      name: 'Estado de Ventas',
      url: '/polizas-vendidas',
      icon: 'fa fa-handshake-o'
    },
    {
      name: 'Cotizacion',
      url: '/cotizar-admin',
      icon: 'fa fa-money',
      badge: {
        variant: 'info',
        text: 'online'
      }
    },
    {
      name: 'Venta en Proceso',
      url: '/nueva-venta',
      icon: 'fa fa-plus',
      display: true
    },
    {
      name: 'Venta Especial',
      url: '/venta-especial',
      icon: 'fa fa-star-o'
    },
    // {
    //   name: 'Venta Especial X',
    //   url: '/venta-especialx',
    //   icon: 'fa fa-star-o'
    // },
    {
      title: true,
      name: 'MOVIL'
    },
    {
      name: 'Cargos Culqi',
      url: '/movil-devoluciones',
      icon: 'fa fa-usd'
    }
    // {
    //   name: 'Venta Cliente',
    //   url: '/venta-cliente',
    //   icon: 'fa fa-mobile',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // }
  ]
}
