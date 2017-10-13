import Vue from 'vue'
import router from '../../router'
// import * as types from '../types'

const state = {
  API_URL: '',
  LOGIN_URL: '',
  SIGNUP_URL: '',
  DATAUSER_URL: '',
  IMAGES_URL: '',
  user: {
    isLogged: false
  },
  LOAD_TABLE: {
    regions: {url: 'regions', data: []},
    provinces: {url: 'provinces', data: []},
    cities: {url: 'cities', data: []},
    roles: {url: 'roles', data: []}
  }
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
  initLogin: (state, payload) => {
    console.log('InitLogin')
    state.API_URL = payload.API_URL
    state.LOGIN_URL = payload.LOGIN_URL
    state.SIGNUP_URL = payload.SIGNUP_URL
    state.DATAUSER_URL = payload.DATAUSER_URL
    state.IMAGES_URL = payload.IMAGES_URL
    console.log(state.IMAGES_URL)
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
    console.log('EXIT!!!')
    localStorage.removeItem('authorization')
    localStorage.removeItem('username')
    localStorage.removeItem('date')
    localStorage.removeItem('time')
    localStorage.clear()
    // localStorage.clear()
    Vue.set(state.user, 'isLogged', false)
    router.push('/login')
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
      commit('switchLoading', false)
    })
    inquiry.catch(error => {
      commit('switchLoading', false)
      console.log('ERROR')
      console.log(error)
      let result = {}
      result.content = error
      result.data = error.data
      commit('pushNotification', result)
    })
  },
  getDataUser: ({commit, state, dispatch}, payload = {router: false}) => {
    console.log('IDENTITY')
    commit('switchLoading', true)
    let inquiry = Vue.http.get(state.DATAUSER_URL).then(response => {
      console.log('response: IDENTITY')
      console.log(response)
      let data = response.data.data
      localStorage.setItem('UserLog', JSON.stringify(data))
      localStorage.setItem('ROLE', data.authorities[0].authority)
      localStorage.setItem('username', data.username)
      localStorage.setItem('date', data.date)
      localStorage.setItem('time', data.time)

      let user = {
        role: data.authorities[0].authority,
        data: data.user,
        date: data.date,
        time: data.time
      }
      commit('setUser', user)

      if (payload.router) dispatch('redirectROLE')
      commit('switchLoading', false)
    })
    inquiry.catch(error => {
      commit('switchLoading', false)
      console.log('ERROR: IDENTITY')
      console.log(error)
      commit('logout')
    })
  },
  redirectROLE: function () {
    /// alert('auth')
    const data = JSON.parse(localStorage.getItem('UserLog'))
    console.log(data)
    if (data === null || data === undefined) {
      console.log('data.authorities[0]')
      router.push('/login')
    } else {
      let role = data.authorities[0].authority
      switch (role) {
        case 'ROLE_ADMIN':
          router.push('/')
          break
        case 'ROLE_PUNTO_VENTA':
          router.push('/dashboard')
          break
        case 'ROLE_VENDEDOR':
          router.push('/dashboard')
          break
        default:
          router.push('/login')
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
