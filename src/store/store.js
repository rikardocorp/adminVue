import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import Login from './modules/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Login
  },
  state: {
    isLogged: false,
    isLoading: false,
    isLoadingModal: false,
    notification: {
      count: 0,
      content: ''
    },
    fullscreen: false
  },
  getters: {
  },
  mutations: {
    [types.CHANGE_TITLEPAGE]: (state, title) => {
      state.titlePage = title
    },
    switchLoading: (state, value) => {
      console.log('SWITCH LOADING')
      Vue.set(state, 'isLoading', value)
    },
    pushNotification: (state, value) => {
      console.log('PUSH NOTIFICATION')
      let data = {
        count: state.notification.count + 1,
        content: value
      }
      Vue.set(state, 'notification', data)
    },
    switchFullscreen: (state, value) => {
      Vue.set(state, 'fullscreen', value)
    }
  },
  actions: {
    dispatchHTTP: ({commit, state}, { type, url, data, notify = {success: false, error: false} }) => {
      console.log(type, url, data, notify)
      commit('switchLoading', true)
      let inquiry = ''
      let message = {}
      let keyStatus = ''
      let promise = new Promise((resolve, reject) => {
        let result = {
          status: false,
          content: []
        }
        switch (type) {
          case 'GET':
            inquiry = Vue.http.get(url)
            notify.success = false
            notify.error = true
            break
          case 'INSERT':
            inquiry = Vue.http.post(url, data)
            notify.success = true
            notify.error = true
            break
          case 'UPDATE':
            inquiry = Vue.http.patch(url, data)
            notify.success = true
            notify.error = true
            break
          case 'DELETE':
            inquiry = Vue.http.delete(url)
            notify.success = true
            notify.error = true
            break
          case 'FILE':
            notify = {success: false, error: false}
            inquiry = Vue.http.get(url)
            break
          default:
            inquiry = []
            result.status = null
            result.content = 'only [GET,INSERT,UPDATE,DELETE]'
            resolve(result)
        }

        // SUCCSESS
        inquiry.then(response => {
          console.log('SUCCESSSSSSSSS')
          console.log(response)
          message.status = response.data.success
          message.data = {message: response.data.message, status: response.status, success: response.data.success, url: response.url}

          keyStatus = response.data.success ? 'success' : 'error'
          if (notify[keyStatus]) {
            commit('pushNotification', message)
          }
          result.status = response.data.success
          result.content = response.body.data
          resolve(result)
        })

        // ERROR
        inquiry.catch(error => {
          console.log('ERRRRRORRRRRR')
          console.log(error)
          message.status = false
          message.data = {message: 'Ocurrio un problema inesperado, intenta nuevamente', status: error.status, success: false, url: error.url}
          if (notify.error) {
            commit('pushNotification', message)
          }
          result.content = error
          reject(result)
        })
      })
      promise.then(() => {
        console.log('SUCCESSSSSSSSS 2')
        commit('switchLoading', false)
      }).catch(() => {
        console.log('ERROOORRRRRRRR 2')
        commit('switchLoading', false)
      })
      return promise
    },
    alert: (state, title) => {
      console.log(state)
      console.log(title + state.isLogged)
      // console.log()
    }
  }
})
