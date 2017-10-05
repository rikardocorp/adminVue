import Vue from 'vue'
import router from '../../router'
import * as types from '../types'

const state = {
  API_URL: '',
  LOGIN_URL: '',
  SIGNUP_URL: '',
  DATAUSER_URL: '',
  IMAGES_URL: 'EEEEE',
  user: {
    isLogged: false
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
    // localStorage.clear()
    Vue.set(state.user, 'isLogged', false)
    router.push('/login')
  }
}

const actions = {
  login: ({ commit, state, dispatch }, payload) => {
    commit('switchLoading', true)
    let result = {}
    let inquiry = Vue.http.post(state.LOGIN_URL, payload.credentials).then(response => {
      console.log(response)
      let authKey = response.data.Authorization
      localStorage.setItem('authorization', authKey)
      commit('setAuthHeader')
      // dispatch('getDataUser')
      commit('switchLoading', false)
      if (payload.redirect) {
        router.push(payload.redirect)
      }
    })
    inquiry.catch(error => {
      commit('switchLoading', false)
      console.log('ERROR')
      console.log(error)
      result.content = error
      result.data = error.data
      commit('pushNotification', result)
    })
  },
  getDataUser: ({commit, state}) => {
    console.log('IDENTITY')
    let inquiry = Vue.http.get(state.DATAUSER_URL).then(response => {
      console.log('response: IDENTITY')
      console.log(response)
      let data = response.data.data
      localStorage.setItem('username', data.username)
      localStorage.setItem('date', data.date)
      localStorage.setItem('time', data.time)
    })
    inquiry.catch(error => {
      console.log('ERROR: IDENTITY')
      console.log(error)
      commit('logout')
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
