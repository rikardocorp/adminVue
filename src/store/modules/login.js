import Vue from 'vue'
import router from '../../router'
// import * as types from '../types'

const state = {
  API_URL: '',
  LOGIN_URL: '',
  RESET_PASSWORD_URL: '',
  RECOVER_PASSWORD_URL: '',
  SIGNUP_URL: '',
  DATAUSER_URL: '',
  IMAGES_URL: '',
  FILES_URL: '',
  user: {
    isLogged: false
  },
  LOAD_TABLE: {
    regions: {url: 'regions', data: []},
    provinces: {url: 'provinces', data: []},
    cities: {url: 'cities', data: []},
    roles: {url: 'roles', data: []}
  },
  provider: null,
  logOut: false
}

const getters = {
  getAuthHeader: state => {
    return {
      'Authorization': state.authorization,
      'Content-Type': 'application/json'
    }
  },
  getDateTime: () => {
    return {
      'date': localStorage.getItem('date'),
      'time': localStorage.getItem('time')
    }
  }
  // [types.DOUBLE_COUNTER]: state => {
  //   return state.counter * 2;
  // },
}

const mutations = {
  setLogOut: (state, value) => {
    Vue.set(state, 'logOut', value)
  },
  initLogin: (state, payload) => {
    console.log('InitLogin')
    state.API_URL = payload.API_URL
    state.LOGIN_URL = payload.LOGIN_URL
    state.RESET_PASSWORD_URL = payload.RESET_PASSWORD_URL
    state.RECOVER_PASSWORD_URL = payload.RECOVER_PASSWORD_URL
    state.SIGNUP_URL = payload.SIGNUP_URL
    state.DATAUSER_URL = payload.DATAUSER_URL
    state.IMAGES_URL = payload.IMAGES_URL
    state.FILES_URL = payload.FILES_URL
  },
  changeAuth: (state, value) => {
    Vue.set(state.user, 'isLogged', value)
  },
  setAuthHeader: (state) => {
    console.log('HEADER')
    Vue.http.headers.common['Authorization'] = localStorage.getItem('authorization')
    Vue.set(state.user, 'isLogged', true)
  },
  logout: (state) => {
    let redirect = ''
    if (localStorage.getItem('ROLE') === 'ROLE_USUARIO') {
      redirect = 'webpage'
      if (localStorage.getItem('facebook') === '1') {
        Vue.set(state, 'logOut', true)
      } else {
        Vue.set(state, 'logOut', false)
      }
    } else {
      redirect = 'Login'
      Vue.set(state, 'logOut', false)
    }

    localStorage.removeItem('authorization')
    localStorage.removeItem('username')
    localStorage.removeItem('date')
    localStorage.removeItem('time')
    localStorage.removeItem('ROLE')
    localStorage.removeItem('facebook')
    localStorage.removeItem('UserLog')
    // localStorage.clear()
    // localStorage.clear()
    Vue.set(state.user, 'isLogged', false)
    router.push({name: redirect})
  },
  setLoadTable: (state, value) => {
    Vue.set(state.LOAD_TABLE[value.key], 'data', value.data)
  }
}

const actions = {
  login: ({ commit, state, dispatch }, payload) => {
    commit('switchLoading', true)
    let inquiry = Vue.http.post(state.LOGIN_URL, payload.credentials).then(response => {
      let authKey = response.data.Authorization
      localStorage.setItem('authorization', authKey)
      commit('setAuthHeader')
      dispatch('getDataUser', {router: true})
      // commit('switchLoading', false)
    })
    inquiry.catch(error => {
      commit('switchLoading', false)
      console.log('ERROR')
      console.log(error)
      commit('sendNotification', {status: false, message: 'Ocurrio un problema, vuelva a intentarlo.'})
    })
  },
  xlogin: ({ commit, state, dispatch }, data) => {
    commit('switchLoading', true)
    let result = {}
    let promise = new Promise((resolve, reject) => {
      Vue.http.post(state.LOGIN_URL, data).then(response => {
        let authKey = response.data.Authorization
        localStorage.setItem('authorization', authKey)
        commit('setAuthHeader')
        dispatch('getDataUser', {router: true})
        // commit('switchLoading', false)
        result.status = true
        resolve(result)
      }).catch(error => {
        commit('switchLoading', false)
        console.log('ERROR')
        console.log(error)
        commit('sendNotification', {status: false, message: 'Ocurrio un problema, vuelva a intentarlo.'})
        result.status = false
        resolve(result)
      })
    })
    return promise
  },
  recoverPassword: ({ commit, state, dispatch }, data) => {
    commit('switchLoading', true)
    let promise = new Promise((resolve, reject) => {
      Vue.http.post(state.RECOVER_PASSWORD_URL, data).then(response => {
        commit('switchLoading', false)
        let state = response.data.success
        let message = response.data.message
        commit('sendNotification', {status: state, message: message})

        let result = {}
        result.status = response.data.success
        result.content = response.body.data
        resolve(result)
      }).catch(error => {
        console.log(error)
        commit('switchLoading', false)
        commit('sendNotification', {status: false, message: 'Ocurrio un problema, vuelva a intentarlo.'})

        let result = {}
        result.status = false
        result.content = error
        reject(result)
      })
    })
    return promise
  },
  contactanos: ({ commit, state, dispatch }, data) => {
    commit('switchLoading', true)
    let promise = new Promise((resolve, reject) => {
      Vue.http.post(state.API_URL + 'contactanos', data).then(response => {
        commit('switchLoading', false)
        console.log(response)
        let state = response.data.success
        let message = response.data.message
        commit('sendNotification', {status: state, message: message})

        let result = {}
        result.status = response.data.success
        result.content = response.body.data
        resolve(result)
      }).catch(error => {
        console.log(error)
        commit('switchLoading', false)
        commit('sendNotification', {status: false, message: 'Ocurrio un problema, vuelva a intentarlo.'})

        let result = {}
        result.status = false
        result.content = error
        reject(result)
      })
    })
    return promise
  },
  register: ({ commit, state, dispatch }, data) => {
    commit('switchLoading', true)
    let promise = new Promise((resolve, reject) => {
      Vue.http.post(state.API_URL + 'signup', data).then(response => {
        commit('switchLoading', false)
        console.log(response)
        let state = response.data.success
        let message = response.data.message

        message = state ? 'Su cuenta de usuario se ha creado exitosamente, ahora puede iniciar sesion.' : message
        commit('sendNotification', {status: state, message: message})

        let result = {}
        result.status = response.data.success
        result.content = response.body.data
        resolve(result)
      }).catch(error => {
        console.log(error)
        commit('switchLoading', false)
        commit('sendNotification', {status: false, message: 'Ocurrio un problema, vuelva a intentarlo.'})

        let result = {}
        result.status = false
        result.content = error
        reject(result)
      })
    })
    return promise
  },
  resetPassword: ({ commit, state, dispatch }, data) => {
    commit('switchLoading', true)
    console.log(data)
    let promise = new Promise((resolve, reject) => {
      Vue.http.post(state.RESET_PASSWORD_URL, data).then(response => {
        commit('switchLoading', false)
        let state = response.data.success
        let message = response.data.message
        commit('sendNotification', {status: state, message: message})

        let result = {}
        result.status = response.data.success
        result.content = response.body.data
        resolve(result)
      }).catch(error => {
        console.log(error)
        commit('switchLoading', false)
        commit('sendNotification', {status: false, message: 'Ocurrio un problema, vuelva a intentarlo.'})

        let result = {}
        result.status = false
        result.content = error
        reject(result)
      })
    })
    return promise
  },
  getDataUser: ({commit, state, dispatch}, payload = {router: false}) => {
    console.log('IDENTITY')
    commit('switchLoading', true)
    let inquiry = Vue.http.get(state.DATAUSER_URL).then(response => {
      console.log('response: IDENTITY')
      console.log(response)
      let data = response.data.data
      dispatch('setDataUser', data)

      if (payload.router) dispatch('redirectROLE')
      commit('switchLoading', false)
    })
    inquiry.catch(error => {
      commit('switchLoading', false)
      console.log('ERROR: IDENTITY')
      console.log(error)
      alert('error getData')
      commit('logout')
    })
  },
  setDataUser: ({ commit, state }, data) => {
    localStorage.setItem('UserLog', JSON.stringify(data))
    localStorage.setItem('ROLE', data.authorities[0].authority)
    localStorage.setItem('facebook', data.user.facebook)
    localStorage.setItem('username', data.username)
    localStorage.setItem('date', data.date)
    localStorage.setItem('time', data.time)
    let user = {
      role: data.authorities[0].authority,
      data: data.user,
      date: data.date,
      time: data.time,
      isClient: data.authorities[0].authority === 'ROLE_USUARIO',
      isPuntoVenta: data.authorities[0].authority === 'ROLE_PUNTO_VENTA'
    }
    console.log(user)
    commit('setUser', user)
  },
  validToken: ({ commit, state }, data) => {
    commit('switchLoading', true)
    let promise = new Promise((resolve, reject) => {
      Vue.http.get(state.DATAUSER_URL).then(response => {
        commit('switchLoading', false)
        resolve(response.data.success)
      }).catch(error => {
        commit('switchLoading', false)
        resolve(false)
      })
    })
    return promise
  },
  redirectROLE: function () {
    /// alert('auth')
    const data = JSON.parse(localStorage.getItem('UserLog'))
    console.log(data)
    if (data === null || data === undefined) {
      console.log('data.authorities[0]')
      router.push({name: 'Login'})
    } else {
      let role = data.authorities[0].authority
      // alert(role)
      switch (role) {
        case 'ROLE_ADMIN':
          router.push({name: 'admin'})
          break
        case 'ROLE_PUNTO_VENTA':
          router.push({name: 'admin'})
          break
        case 'ROLE_VENDEDOR':
          router.push({name: 'admin'})
          break
        case 'ROLE_USUARIO':
          router.push({name: 'Cliente'})
          break
        default:
          router.push({name: 'Login'})
      }
    }
    // } else if (data.authorities[0].authority === 'ADMIN') {
    //   app.$router.push('/admin')
    // }else {
    //   app.$router.push('/resident')
    // }
  }
  // initDataTables: ({commit, state}) => {
  //   let value = ''
  //   let promises = []
  //   let p = ''
  //   Object.keys(state.LOAD_TABLE).forEach(function (key) {
  //     value = state.LOAD_TABLE[key]
  //     commit('switchLoading', true)
  //     p = new Promise((resolve, reject) => {
  //       Vue.http.get(value.url).then(response => {
  //         commit('switchLoading', false)
  //         if (!response.data.success) return false
  //         commit('setLoadTable', {key: key, data: response.data.data})
  //         resolve()
  //       }).catch(error => {
  //         console.log('ERROR: LOAD-DATATABLE')
  //         console.log(error)
  //         commit('switchLoading', false)
  //         reject(error)
  //       })
  //     })
  //     promises.push(p)
  //   })
  //   return Promise.all(promises)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
