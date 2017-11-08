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
        },
        {
          name: 'Contratante',
          url: '/mantenimiento/contratantes',
          icon: 'fa fa-male '
        }
      ]
    },
    {
      name: 'Precios',
      url: '/precios',
      icon: 'fa fa-money',
      children: [
        {
          name: 'Tipos de Vehiculo',
          url: '/precios/tipo-vehiculo',
          icon: 'fa fa-taxi'
        },
        {
          name: 'Categ. de Vehiculo',
          url: '/precios/categoria-vehiculo',
          icon: 'fa fa-rocket'
        },
        {
          name: 'Clases de Vehiculo',
          url: '/precios/clases-vehiculo',
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
      icon: 'fa fa-car'
    },
    {
      name: 'Precios',
      url: '/precios/precio-poliza-full',
      icon: 'fa fa-usd'
    },
    {
      title: true,
      name: 'POLIZA'
    },
    {
      name: 'Polizas',
      url: '/insertar-poliza',
      icon: 'fa fa-balance-scale',
      badge: {
        variant: 'danger',
        text: 'NEW'
      }
    },
    {
      name: 'Asignacion',
      url: '/asignar-poliza',
      icon: 'fa fa-hand-o-right',
      badge: {
        variant: 'success',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'VENTAS'
    },
    {
      name: 'Poliza Vendida',
      url: '/polizas-vendidas',
      icon: 'fa fa-handshake-o',
      badge: {
        variant: 'warning',
        text: 'NEW'
      }
    },
    {
      name: 'Cotizacion',
      url: '/cotizar-admin',
      icon: 'fa fa-money',
      badge: {
        variant: 'warning',
        text: 'NEW'
      }
    },
    {
      name: 'Nueva Venta',
      url: '/nueva-venta',
      icon: 'fa fa-plus',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Venta Especial',
      url: '/venta-especial',
      icon: 'fa fa-star-o',
      badge: {
        variant: 'success',
        text: 'NEW'
      }
    }
  ]
}
