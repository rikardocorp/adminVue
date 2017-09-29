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
import VehicleType from '../views/maintenance/VehicleType.vue'
import InsuranceType from '../views/maintenance/InsuranceTypes.vue'
import User from '../views/maintenance/User.vue'
import Aseguradoras from '../views/maintenance/InsuranceCompanies.vue'

// Views Sale
import NewSale from '../views/sale/NewSale.vue'
import WebUser from '../views/sale/WebUser.vue'
import Vehicle from '../views/sale/Vehicle.vue'
import Purchaser from '../views/sale/Purchaser.vue'

// Selling
import SellNewPolice from '../views/selling/NewSale.vue'
import Cotizar from '../views/selling/Cotizar.vue'

// Price
import Price from '../views/price/Price.vue'

// Policy
import Policy from '../views/policy/Policy.vue'
import PolicySold from '../views/policy/PolicySold.vue'

Vue.use(Router)

export default new Router({
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
          redirect: '/mantenimiento/ciudad',
          name: 'Mantenimiento',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'ciudad',
              name: 'Ciudad',
              component: City
            },
            {
              path: 'tipo-uso',
              name: 'Tipos de Uso',
              component: UseType
            },
            {
              path: 'tipo-seguro',
              name: 'Tipos de Seguro',
              component: InsuranceType
            },
            {
              path: 'tipo-vehiculo',
              name: 'Tipos de Vehiculo',
              component: VehicleType
            },
            {
              path: 'usuarios',
              name: 'Usuarios',
              component: User
            },
            {
              path: 'aseguradoras',
              name: 'Aseguradoras',
              component: Aseguradoras
            }
          ]
        },
        {
          path: 'venta',
          redirect: '/venta/nueva-venta',
          name: 'Venta',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'nueva-venta',
              name: 'Nueva venta',
              component: NewSale
            },
            {
              path: 'clientes',
              name: 'Registro Cliente',
              component: WebUser
            },{
              path: 'vehiculos',
              name: 'Registro Vehiculo',
              component: Vehicle
            },{
              path: 'contratantes',
              name: 'Registro Contratante',
              component: Purchaser
            },
            {
              path: 'nueva-venta',
              name: 'Registro Contrato',
              component: NewSale
            }
          ]
        },
        {
          path: 'asignacion-poliza',
          name: 'Asignacion Poliza',
          component: Policy
        },
        {
          path: 'precio-poliza',
          name: 'Precio de Poliza',
          component: Price
        },
        {
          path: 'poliza-vendida',
          name: 'Poliza Vendida',
          component: PolicySold
        },
        {
          path: 'cotizar-admin',
          name: 'Cotizacion Admin',
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
