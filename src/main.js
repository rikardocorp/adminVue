// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRosource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store/store'
import lodash from 'lodash'
import moment from 'moment'
import VueFormWizard from 'vue-form-wizard'
import VueScrollTo from 'vue-scrollto'

Vue.prototype.$lodash = lodash
Vue.prototype.$moment = moment
moment.locale('es')

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(VueRosource)
Vue.use(VueFormWizard)
Vue.use(Notifications, { velocity })
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

// Guard Login
// router.beforeEach((to, from, next) => {})
router.afterEach((to, from) => {
  let isLogged = store.state.Login.user.isLogged
  if (!isLogged) {
    let session = localStorage.getItem('authorization')
    console.log(session)
    if (session) {
      store.commit('setAuthHeader')
    } else {
      console.log('NO EXISTE')
      router.push('/login')
    }
  } else {
    store.dispatch('getDataUser')
  }
  console.log('GLOBAL ROUTER')
  console.log('Loggin ' + store.state.Login.user.isLogged)
})

// Peticiones al servidor
// Vue.http.options.root = 'http://192.168.1.7:8070/jmc/rest/v1/'
Vue.http.options.root = 'http://174.138.48.60:8080/jmc/rest/v1/'
Vue.http.headers.common['Content-Type'] = 'application/json'

// Login and SignUp
const API_URL = 'http://174.138.48.60:8080/jmc/'
const URL_LOG = {
  API_URL: API_URL,
  LOGIN_URL: API_URL + 'login',
  SIGNUP_URL: API_URL + 'users',
  DATAUSER_URL: API_URL + 'rest/v1/identity',
  IMAGES_URL: API_URL + 'files'
}
store.commit('initLogin', URL_LOG)

// Filter
Vue.filter('currency', function (value) {
  return value + '.00'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
