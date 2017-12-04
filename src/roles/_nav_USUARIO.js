export default {
  items: [
    {
      name: 'Pagina Principal',
      url: '/cliente',
      icon: 'icon-speedometer'
    },
    {
      name: 'Perfil de Usuario',
      url: '/perfil',
      icon: 'fa fa-user'
    },
    {
      name: 'Carrito',
      url: '/carrito-compras',
      icon: 'fa fa-handshake-o',
    },
    // {
    //   name: 'Poliza Vendida',
    //   url: '/polizas-vendidas',
    //   icon: 'fa fa-handshake-o',
    //   badge: {
    //     variant: 'warning',
    //     text: 'NEW'
    //   }
    // },
    {
      title: true,
      name: 'Comprar'
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
      name: 'Nueva Compra',
      url: '/venta-cliente',
      icon: 'fa fa-mobile',
      display: true,
      badge: {
        variant: 'success'
      }
    },
    {
      name: 'Seguro Vehicular',
      url: '/seguro-vehicular',
      icon: 'fa fa-car'
    }
  ]
}
