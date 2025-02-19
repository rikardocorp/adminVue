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
      icon: 'fa fa-diamond',
      children: [
        {
          name: 'Usuarios',
          url: '/mantenimiento/usuarios',
          icon: 'fa fa-users'
        }
      ]
    },
    // {
    //   name: 'Precios',
    //   url: '/precios',
    //   icon: 'fa fa-money',
    //   children: [
    //     {
    //       name: 'Tipos de Vehiculo',
    //       url: '/precios/tipo-vehiculo',
    //       icon: 'fa fa-taxi'
    //     },
    //     {
    //       name: 'Categ. de Vehiculo',
    //       url: '/precios/categoria-vehiculo',
    //       icon: 'fa fa-rocket'
    //     },
    //     {
    //       name: 'Clases de Vehiculo',
    //       url: '/precios/clases-vehiculo',
    //       icon: 'fa fa-pencil-square-o'
    //     },
    //   ]
    // },
    // {
    //   title: true,
    //   name: 'PRECIOS VEHICULO'
    // },
    // {
    //   name: 'VCC',
    //   url: '/precios/tipo-categoria-vehiculo',
    //   icon: 'fa fa-car'
    // },
    // {
    //   name: 'Precios',
    //   url: '/precios/precio-poliza-full',
    //   icon: 'fa fa-usd'
    // },
    {
      title: true,
      name: 'POLIZA'
    },
    // {
    //   name: 'Polizas',
    //   url: '/insertar-poliza',
    //   icon: 'fa fa-balance-scale',
    //   badge: {
    //     variant: 'danger',
    //     text: 'NEW'
    //   }
    // },
    {
      name: 'Asignacion',
      url: '/asignar-poliza',
      icon: 'fa fa-hand-o-right'
    },
    {
      title: true,
      name: 'VENTAS'
    },
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
        variant: 'success',
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
    {
      name: 'Reportes',
      url: '/reportes',
      icon: 'fa fa-book'
    }
  ]
}
