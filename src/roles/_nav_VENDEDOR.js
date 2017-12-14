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
      name: 'POLIZA'
    },
    // {
    //   name: 'Mis polizas',
    //   url: '/asignar-poliza',
    //   icon: 'fa fa-hand-o-right',
    //   badge: {
    //     variant: 'success',
    //     text: 'NEW'
    //   }
    // },
    {
      title: true,
      name: 'VENTAS'
    },
    {
      name: 'Estado de Ventas',
      url: '/polizas-vendidas',
      icon: 'fa fa-handshake-o',
    },
    {
      name: 'Cotizacion',
      url: '/cotizar-admin',
      icon: 'fa fa-money',
    },
    {
      name: 'Venta en Proceso',
      url: '/nueva-venta',
      icon: 'fa fa-plus',
    },
    {
      name: 'Venta Especial',
      url: '/venta-especial',
      icon: 'fa fa-star-o',
    }
  ]
}
