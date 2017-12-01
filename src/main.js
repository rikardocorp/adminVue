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
import VueScroll from 'vue-scroll'
import VuejsDialog from 'vuejs-dialog'
import {names} from './data/GlobalNames'
import * as VueGoogleMaps from 'vue2-google-maps'
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDz4RIhRYSyaU06tOfPRAGgAEU9YEst3ow',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    v: '3.26'
  }
})

Vue.prototype.$lodash = lodash
Vue.prototype.$moment = moment
Vue.prototype.$global = names
moment.locale('es')

Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  okText: 'Si',
  cancelText: 'No',
  animation: 'bounce',
  clicksCount: 2,
  type: 'soft' // 'soft', 'hard', 'basic'
})
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(VueRosource)
Vue.use(VueFormWizard)
Vue.use(Notifications, { velocity })
Vue.use(VueScroll)
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

// Peticiones al servidor
// Vue.http.options.root = 'http://192.168.1.7:8070/jmc/rest/v1/'
Vue.http.options.root = 'http://174.138.48.60:8080/jmc/rest/v1/'
Vue.http.headers.common['Content-Type'] = 'application/json'

// Login and SignUp
const API_URL = 'http://174.138.48.60:8080/jmc/'
const URL_LOG = {
  API_URL: API_URL,
  LOGIN_URL: API_URL + 'login',
  RESET_PASSWORD_URL: API_URL + 'resetpassword',
  RECOVER_PASSWORD_URL: API_URL + 'recoverpassword',
  SIGNUP_URL: API_URL + 'users',
  DATAUSER_URL: API_URL + 'rest/v1/identity',
  IMAGES_URL: API_URL + 'files',
  FILES_URL: API_URL + 'docs'
}
store.commit('initLogin', URL_LOG)

// Filter
Vue.filter('currency', function (value) {
  // alert(value)
  let decimal = ''
  let numero = value.toString().split('.')
  if (numero[1] !== undefined) {
    decimal = numero[1].length === 1 ? numero[1] + '0' : numero[1][0] + numero[1][1]
  } else {
    decimal = '00'
  }
  return numero[0] + '.' + decimal
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
