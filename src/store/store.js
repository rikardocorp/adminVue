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
      data: ''
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
        data: value
      }
      Vue.set(state, 'notification', data)
    },
    switchFullscreen: (state, value) => {
      Vue.set(state, 'fullscreen', value)
    }
  },
  actions: {
    dispatchHTTP: ({commit, state}, { type, url, data, notify = {success: true, error: true} }) => {
      console.log(type, url, data, notify)
      commit('switchLoading', true)
      let inquiry = ''
      let message = {}
      let promise = new Promise((resolve, reject) => {
        let result = {
          status: false,
          content: []
        }
        switch (type) {
          case 'GET':
            inquiry = Vue.http.get(url)
            break
          case 'INSERT':
            inquiry = Vue.http.post(url, data)
            break
          case 'UPDATE':
            inquiry = Vue.http.patch(url, data)
            break
          case 'DELETE':
            inquiry = Vue.http.delete(url)
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
          message.status = true
          message.data = {statusText: response.statusText, status: response.status, data: response.data.message}
          if (notify.success) {
            commit('pushNotification', message)
          }
          result.status = true
          result.content = response.body.data
          resolve(result)
        })

        // ERROR
        inquiry.catch(error => {
          console.log('ERRRRRORRRRRR')
          message.status = false
          message.data = {statusText: error.statusText, status: error.status, data: error.data.message}
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
