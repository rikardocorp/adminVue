import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'

// Views Maintenance
import City from '../views/maintenance/City.vue'
import UseType from '../views/maintenance/UseType.vue'
import InsuranceType from '../views/maintenance/InsuranceTypes.vue'
import User from '../views/maintenance/User.vue'
import Aseguradoras from '../views/maintenance/InsuranceCompanies.vue'
import Store from '../views/maintenance/Office.vue'

// Views vehicle
import VehicleType from '../views/vehicle/VehicleType.vue'
import VehicleCategory from '../views/vehicle/VehicleCategory.vue'
import VehicleClass from '../views/vehicle/VehicleClass.vue'
import VehicleTypeCategory from '../views/vehicle/VehicleTypeCategory.vue'
import NewSale from '../views/vehicle/NewSale.vue'
import WebUser from '../views/vehicle/WebUser.vue'
import Vehicle from '../views/vehicle/Vehicle.vue'
import Purchaser from '../views/vehicle/Purchaser.vue'

// Selling
import SellNewPolice from '../views/selling/NewSale.vue'
import Cotizar from '../views/selling/Cotizar.vue'

// Price
import Price from '../views/price/Price.vue'

// Policy
import Policy from '../views/policy/Policy.vue'
import PolicyRegister from '../views/policy/PolicyRegister.vue'
import PolicyAssign from '../views/policy/PolicyAssign.vue'
import PolicySold from '../views/policy/PolicySold.vue'

Vue.use(Router)

const roles = {
  admin: 'ROLE_ADMIN',
  puntoVenta: 'ROLE_PUNTO_VENTA',
  vendedor: 'ROLE_VENDEDOR',
  cliente: 'ROLE_USUARIO'
}

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'mantenimiento',
          redirect: '/mantenimiento/aseguradoras',
          name: 'Mantenimiento',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {requiresAuth: true, ROLE_ADMIN: false, ROLE_PUNTO_VENTA: false, ROLE_VENDEDOR: false},
          children: [
            {
              path: 'ciudad',
              name: 'Ciudad',
              component: City
            },
            {
              path: 'aseguradoras',
              name: 'Aseguradoras',
              component: Aseguradoras,
              meta: {requiresAuth: true, ROLE_ADMIN: true, ROLE_PUNTO_VENTA: false, ROLE_VENDEDOR: false}
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
              meta: {requiresAuth: true}
            },
            {
              path: 'tipo-uso',
              name: 'Tipos de Uso',
              component: UseType,
              meta: {requiresAuth: true}
            },
            {
              path: 'tipo-seguro',
              name: 'Tipos de Seguro',
              component: InsuranceType,
              meta: {requiresAuth: true}
            }
          ]
        },
        {
          path: 'vehiculo',
          redirect: '/vehiculo/tipo-vehiculo',
          name: 'Vehiculos',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'tipo-vehiculo',
              name: 'Tipos de Vehiculo',
              component: VehicleType
            },
            {
              path: 'categoria-vehiculo',
              name: 'Categ. de Vehiculo',
              component: VehicleCategory
            },
            {
              path: 'clases-vehiculo',
              name: 'Clases de Vehiculo',
              component: VehicleClass
            },
            {
              path: 'tipo-categoria-vehiculo',
              name: 'Tipo categoria de Vehiculo',
              component: VehicleTypeCategory
            },
            {
              path: 'precio-poliza',
              name: 'Precio de Poliza',
              component: Price
            },
            {
              path: 'vehiculos',
              name: 'Registro Vehiculo',
              component: Vehicle
            },
            {
              path: 'contratantes',
              name: 'Registro Contratante',
              component: Purchaser
            }
          ]
        },
        {
          path: 'insertar-poliza',
          name: 'Asignacion Poliza',
          component: Policy
        },
        {
          path: 'asignar-poliza',
          name: 'Asignar Poliza',
          component: PolicyAssign
        },
        {
          path: 'poliza-vendida',
          name: 'Poliza Vendida',
          component: PolicySold
        },
        {
          path: 'cotizar-admin',
          name: 'cotizar',
          component: Cotizar
        },
        {
          path: 'nueva-venta',
          name: 'Nueva Venta',
          component: SellNewPolice
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
  alert('META?')
  if (to.meta.requiresAuth) {
    alert('META!!!!')
    console.log('META')
    console.log(to.meta)
    const authUser = JSON.parse(localStorage.getItem('UserLog'))
    const token = localStorage.getItem('authorization')
    console.log(authUser)
    console.log(token)
    if (!authUser || !token) {
      alert('no pasa')
      next({name: 'Login'})
    } else {
      let localRole = authUser.authorities[0].authority
      if (to.meta[localRole] !== undefined && to.meta[localRole]) {
        alert('tiene accesso')
        next()
      } else {
        alert('no pasa')
        store.dispatch('redirectROLE')
        next(false)
      }
    }
  } else {
    alert('NO META')
    console.log('No META')
    next()
  }
})

router.afterEach((to, from) => {
  let isLogged = store.state.Login.user.isLogged
  if (!isLogged) {
    alert('sethHeaders')
    store.commit('setAuthHeader')
  } else {
    store.dispatch('getDataUser')
  }
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
