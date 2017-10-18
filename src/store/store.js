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
    fullscreen: false,
    user: {
      role: '',
      data: '',
      date: '',
      time: ''
    }
  },
  getters: {
    arrayToObject: (state, getters) => (value) => {
      console.log('Array To OBJECT')
      let newArray = []
      value.forEach(function (value, index) {
        newArray.push({id: index, name: value})
      })
      return newArray
    }
  },
  mutations: {
    [types.CHANGE_TITLEPAGE]: (state, title) => {
      state.titlePage = title
    },
    setUser: (state, value) => {
      Vue.set(state, 'user', value)
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
    sendNotification: (state, value) => {
      let data = {
        count: state.notification.count + 1,
        content: {
          status: value.status,
          data: {message: value.message, status: 'frontend', success: value.status, url: ''}
        }
      }
      Vue.set(state, 'notification', data)
    },
    switchFullscreen: (state, value) => {
      Vue.set(state, 'fullscreen', value)
    }
  },
  actions: {
    dispatchHTTP: ({commit, state, getters}, { type, url, data, notify = {success: false, error: false} }) => {
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
            console.log('DELETE')
            console.log(url)
            console.log(data)
            inquiry = Vue.http.delete(url, {body: data})
            notify.success = true
            notify.error = true
            break
          case 'FILE':
            notify = {success: false, error: false}
            inquiry = Vue.http.get(url)
            break
          case 'LOAD_PDF':
            notify = {success: false, error: false}
            inquiry = Vue.http.get(url)
            break
          case 'LOAD_TABLE':
            notify = {success: false, error: false}
            let dataTable = state.Login.LOAD_TABLE[data.key]
            if (dataTable === undefined) {
              console.log('http')
              inquiry = Vue.http.get(url)
            } else {
              if (dataTable.data.length > 0) {
                // cargamos tablas locales
                result.status = true
                result.content = dataTable.data
                resolve(result)
              } else {
                // almacenamos tablas locales
                inquiry = Vue.http.get(url)
                inquiry.then((response) => {
                  let localData = response.data.data
                  if (data.key === 'roles') localData = getters.arrayToObject(response.data.data)
                  commit('setLoadTable', {key: data.key, data: localData})
                  response.data.data = localData
                })
              }
            }
            break
          default:
            inquiry = []
            result.status = null
            result.content = 'only [GET,INSERT,UPDATE,DELETE,FILE,LOAD_TABLE,LOAD_PDF]'
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
          result.content = response.body.data ? response.body.data : response
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
        commit('switchLoading', false)
      }).catch(() => {
        commit('switchLoading', false)
      })
      return promise
    }
    // alert: (state, title) => {
    //   console.log(state)
    //   console.log(title + state.isLogged)
    //   // console.log()
    // }
  }
})
