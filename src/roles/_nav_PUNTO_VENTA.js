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
        {
          name: 'Mi oficina',
          url: '',
          icon: 'icon-puzzle'
        },
        {
          name: 'Usuarios',
          url: '/mantenimiento/usuarios',
          icon: 'icon-puzzle'
        },
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
      title: true,
      name: 'VENTAS'
    },
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
