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
      name: 'Perfil'
    },
    {
      name: 'Perfil de Usuario',
      url: '/perfil',
      icon: 'fa fa-user'
    },
    {
      title: true,
      name: 'Mis Compras'
    },
    {
      name: 'Carrito',
      url: '/carrito-compras',
      icon: 'fa fa-handshake-o',
      badge: {
        variant: 'warning',
        text: 'NEW'
      }
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
        variant: 'warning',
        text: 'NEW'
      }
    },
    {
      name: 'Venta Cliente',
      url: '/venta-cliente',
      icon: 'fa fa-mobile',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    }
  ]
}
