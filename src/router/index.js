import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import WebPage from '@/views/WebPage'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ResetPass from '@/views/ResetPass'
import Profile from '../views/maintenance/Profile.vue'
import Cliente from '../views/Cliente.vue'

// Views Maintenance
// import City from '../views/maintenance/City.vue'
import UseType from '../views/maintenance/UseType.vue'
// import InsuranceType from '../views/maintenance/InsuranceTypes.vue'
import User from '../views/maintenance/User.vue'
import Client from '../views/maintenance/Client.vue'
import Aseguradoras from '../views/maintenance/InsuranceCompanies.vue'
import Store from '../views/maintenance/Office.vue'
import Report from '../views/maintenance/Report.vue'

// Views vehicle
import VehicleType from '../views/vehicle/VehicleType.vue'
import VehicleCategory from '../views/vehicle/VehicleCategory.vue'
import VehicleClass from '../views/vehicle/VehicleClass.vue'
import VehicleTypeCategory from '../views/vehicle/VehicleTypeCategory.vue'
// import NewSale from '../views/vehicle/NewSale.vue'
// import WebUser from '../views/vehicle/WebUser.vue'
// import Vehicle from '../views/vehicle/Vehicle.vue'
// import Purchaser from '../views/vehicle/Purchaser.vue'

// Selling
import Sales from '../views/selling/Sales.vue'
import CartClient from '../views/selling/CartClient.vue'
import Sale from '../views/selling/Sale.vue'
import SellNewPolice from '../views/selling/NewSale.vue'
import SellNewPoliceSpecial from '../views/selling/NewSaleSpecial.vue'
import SellNewPoliceClient from '../views/selling/NewSaleClient.vue'
import Cotizar from '../views/selling/Cotizar.vue'
import SeguroVehicular from '../views/selling/SeguroVehicular.vue'

// Price
// import Price from '../views/price/Price.vue'
import PriceFull from '../views/price/PriceFull.vue'
// import PriceFull2 from '../views/price/PriceFull2.vue'

// Policy
import Policy from '../views/policy/Policy.vue'
// import PolicyRegister from '../views/policy/PolicyRegister.vue'
import PolicyAssign from '../views/policy/PolicyAssign.vue'
import PolicySold from '../views/policy/PolicySold.vue'

Vue.use(Router)

const roles = {
  admin: 'ROLE_ADMIN',
  puntoVenta: 'ROLE_PUNTO_VENTA',
  vendedor: 'ROLE_VENDEDOR',
  cliente: 'ROLE_USUARIO'
}

const preFijo = '/'
const router = new Router({
  // mode: 'hash',
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: preFijo,
      redirect: preFijo + 'dashboard',
      name: 'admin',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true}
        },
        {
          path: 'mantenimiento',
          redirect: preFijo + 'mantenimiento/aseguradoras',
          name: 'Mantenimiento',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {requiresAuth: true, ROLE_ADMIN: false, ROLE_PUNTO_VENTA: false, ROLE_VENDEDOR: false},
          children: [
            // {
            //   path: 'ciudad',
            //   name: 'Ciudad',
            //   component: City
            // },
            {
              path: 'aseguradoras',
              name: 'Aseguradoras',
              component: Aseguradoras,
              meta: {requiresAuth: true, ROLE_ADMIN: true}
            },
            {
              path: 'oficinas',
              name: 'Oficinas',
              component: Store,
              meta: {requiresAuth: true, ROLE_ADMIN: true}
            },
            {
              path: 'usuarios',
              name: 'Usuarios',
              component: User,
              meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true}
            },
            {
              path: 'clientes',
              name: 'Clientes',
              component: Client,
              meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true}
            },
            {
              path: 'tipo-uso',
              name: 'Tipos de Uso',
              component: UseType,
              meta: {requiresAuth: true, ROLE_ADMIN: true}
            },
            // {
            //   path: 'tipo-seguro',
            //   name: 'Tipos de Seguro',
            //   component: InsuranceType,
            //   meta: {requiresAuth: true, ROLE_ADMIN: true}
            // },
            // {
            //   path: 'contratantes',
            //   name: 'Contratante',
            //   component: Purchaser,
            //   meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true}
            // }
          ]
        },
        {
          path: 'vehiculos',
          redirect: preFijo + 'vehiculos/categoria-vehiculo',
          name: 'Vehiculos',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // {
            //   path: 'tipo-vehiculo',
            //   name: 'Tipos de Vehiculo',
            //   component: VehicleType,
            //   meta: {requiresAuth: true, ROLE_ADMIN: true}
            // },
            {
              path: 'categoria-vehiculo',
              name: 'Categ. de Vehiculo',
              component: VehicleCategory,
              meta: {requiresAuth: true, ROLE_ADMIN: true}
            },
            {
              path: 'clases-vehiculo',
              name: 'Clases de Vehiculo',
              component: VehicleClass,
              meta: {requiresAuth: true, ROLE_ADMIN: true}
            },
            {
              path: 'tipo-categoria-vehiculo',
              name: 'Tipo categoria de Vehiculo',
              component: VehicleTypeCategory,
              meta: {requiresAuth: true, ROLE_ADMIN: true}
            },
            // {
            //   path: 'precio-poliza',
            //   name: 'Precio de Poliza',
            //   component: Price,
            //   meta: {requiresAuth: true, ROLE_ADMIN: true}
            // },
            {
              path: 'precio-poliza-full',
              name: 'Tabla de Precios Poliza',
              component: PriceFull,
              meta: {requiresAuth: true, ROLE_ADMIN: true}
            }
            // {
            //   path: 'precio-poliza-full2',
            //   name: 'Tabla de Precios Poliza 2',
            //   component: PriceFull2,
            //   meta: {requiresAuth: true, ROLE_ADMIN: true}
            // },
            // {
            //   path: 'vehiculos',
            //   name: 'Registro Vehiculo',
            //   component: Vehicle,
            //   meta: {requiresAuth: true, ROLE_ADMIN: true}
            // },
          ]
        },
        {
          path: 'perfil',
          name: 'PerfilUsuario',
          component: Profile,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true, ROLE_USUARIO: true}
        },
        {
          path: 'insertar-poliza',
          name: 'Asignacion Poliza',
          component: Policy,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true}
        },
        {
          path: 'asignar-poliza',
          name: 'Asignar Poliza',
          component: PolicyAssign,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true}
        },
        {
          path: 'poliza-vendida',
          name: 'Poliza Vendida',
          component: PolicySold,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true, ROLE_USUARIO: true}
        },
        {
          path: 'polizas-vendidas',
          name: 'Ventas',
          component: Sales,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true}
        },
        {
          path: 'carrito-compras',
          name: 'Carrito',
          component: CartClient,
          meta: {requiresAuth: true, ROLE_USUARIO: true}
        },
        {
          path: 'seguro-vehicular',
          name: 'Seguro',
          component: SeguroVehicular,
          meta: {requiresAuth: true, ROLE_USUARIO: true}
        },
        {
          path: 'polizas-vendidas/:idSale/:type',
          name: 'VentasId',
          component: Sale,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true}
        },
        {
          path: 'cotizar-admin',
          name: 'cotizar',
          component: Cotizar
        },
        {
          path: 'nueva-venta',
          name: 'Nueva Venta',
          component: SellNewPolice,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true}
        },
        {
          path: 'venta-especial',
          name: 'Venta Especial',
          component: SellNewPoliceSpecial,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true}
        },
        {
          path: 'venta-cliente',
          name: 'Venta Cliente',
          component: SellNewPoliceClient,
          meta: {requiresAuth: true, ROLE_USUARIO: true}
        },
        {
          path: 'reportes',
          name: 'reportes',
          component: Report,
          meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: true, ROLE_VENDEDOR: true}
        },
        {
          path: 'cliente',
          name: 'Cliente',
          component: Cliente,
          meta: {requiresAuth: true, ROLE_USUARIO: true}
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/resetpassword/:token',
      name: 'Recover',
      component: ResetPass
    },
    {
      path: '/registrar',
      name: 'register',
      component: Register
    },
    {
      path: '/jmc',
      name: 'webpage',
      component: WebPage
    }
  ]
})

// Guard Login
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     let isLogged = store.state.Login.user.isLogged
//     const authorization = localStorage.getItem('authorization')
//     if (!isLogged || !authorization) {
//       next({name: 'Login'})
//     }
//   }
// })

// router.beforeEach((to, from, next) => {
//   if(to.meta.requiresAuth) {
//     const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
//     if(!authUser || !authUser.token) {
//       next({name:'login'})
//     } else if(to.meta.adminAuth) {
//       const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
//       if (authUser.data.role_id === 'ADMIN') {
//         next()
//       } else {
//         next('/resident')
//       }
//     } else if(to.meta.residentAuth) {
//       const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
//       if (authUser.data.role_id === 'RESIDENT') {
//         next()
//       } else {
//         console.log('Im in admin')
//         next('/admin')
//       }
//     }
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  const authUser = JSON.parse(localStorage.getItem('UserLog'))
  const token = localStorage.getItem('authorization')

  let isLogged = store.state.Login.user.isLogged
  let loggedAux = isLogged
  if (!isLogged) {
    if (authUser && token) {
      store.commit('setAuthHeader')
      store.dispatch('setDataUser', authUser)
    }
  }

  if (to.name === 'Dashboard' && token === null) {
    next({name: 'webpage'})
  } else if (to.name === 'Recover') {
    next()
  } else if (to.name === 'Login') {
    if (authUser && token) {
      store.dispatch('redirectROLE')
      next(false)
    } else {
      next()
    }
  } else if (to.meta.requiresAuth) {
    if (!authUser || !token) {
      next({name: 'Login'})
    } else {
      let localRole = authUser.authorities[0].authority
      if (to.meta[localRole] !== undefined && to.meta[localRole]) {
        if (!loggedAux) next()
        store.dispatch('validToken').then(response => {
          console.log('response')
          console.log(response)
          if (!response) {
            store.commit('sendNotification', {message: 'Su sesion ha expirado, vuelva a ingresar al sistema', status: null})
            next(false)
          } else {
            next()
          }
        })
      } else {
        store.dispatch('redirectROLE')
        next(false)
      }
    }
  } else {
    console.log('No META')
    next()
  }
})

router.afterEach((to, from) => {
  if (to.name === 'Recover') return false
  // let isLogged = store.state.Login.user.isLogged

  // if (!isLogged) {
  //   const authUser = JSON.parse(localStorage.getItem('UserLog'))
  //   const token = localStorage.getItem('authorization')
  //   if (authUser && token) {
  //     alert('sethHeaders')
  //     store.commit('setAuthHeader')
  //     store.dispatch('getDataUser')
  //   }
  //   // if (to.name === 'Login') return false
  // } else {
  //   // alert('getDATAUSER')
  //   // store.dispatch('getDataUser')
  // }
})

// router.afterEach((to, from) => {
//   let isLogged = store.state.Login.user.isLogged
//   if (!isLogged) {
//     alert('Logged False')
//     let session = localStorage.getItem('authorization')
//     if (session) {
//       store.commit('setAuthHeader')
//       //store.dispatch('loginAuth')
//     } else {
//       alert('no session')
//       console.log('NO EXISTE')
//       router.push('/login')
//     }
//   } else {
//     alert('Logged True')
//     store.dispatch('getDataUser')
//     //store.dispatch('loginAuth')
//   }
//   console.log('GLOBAL ROUTER')
//   console.log('Loggin ' + store.state.Login.user.isLogged)
// })

export default router
