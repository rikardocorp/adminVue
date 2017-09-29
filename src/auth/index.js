// import {router} from '../router/index'

// URL and endpoint constants
const API_URL = 'http://174.138.48.60:8080/jmc/'
const LOGIN_URL = API_URL + 'login'
const SIGNUP_URL = API_URL + 'users/'

export default {
  data () {
    return {
      user: {
        authenticated: false
      },
      authorization: ''
    }
  },
  methods: {
    login (context, creds, redirect) {
      console.log(this)
      this.$http.post(LOGIN_URL, creds, (data) => {
        console.log('LOGIN')
        console.log(data)
        localStorage.setItem('id_token', data.id_token)
        localStorage.setItem('access_token', data.access_token)
        this.user.authenticated = true
        // Redirect to a specified route
        if (redirect) {
          this.$router.push(redirect)
        }
      }).error((err) => {
        context.error = err
      })
    },
    signup (context, creds, redirect) {
      context.$http.post(SIGNUP_URL, creds, (data) => {
        localStorage.setItem('id_token', data.id_token)
        localStorage.setItem('access_token', data.access_token)
        this.user.authenticated = true
        // this.$router.push('login')
        if (redirect) {
          router.go(redirect)
        }
      }).error((err) => {
        context.error = err
      })
    },
    // To log out, we just need to remove the token
    logout () {
      localStorage.removeItem('id_token')
      localStorage.removeItem('access_token')
      this.user.authenticated = false
    },
    checkAuth () {
      let jwt = localStorage.getItem('id_token')
      if (jwt) {
        this.user.authenticated = true
      } else {
        this.user.authenticated = false
      }
    },
    // The object to be passed as a header for authenticated requests
    getAuthHeader () {
      return {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    }
  }

}
