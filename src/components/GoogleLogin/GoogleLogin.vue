<template>
  <div class="g-signin-button">
    <!--<div class="icoSocial">-->
      <!--<i aria-hidden="true" class="fa fa-google"></i>-->
    <!--</div>-->
    <!--Sign in with Google-->
    <button id="signin-button" @click="handleSignInClick()">Sign In</button>
    <button id="signout-button" @click="handleSignOutClick()">Sign Out</button>
  </div>
</template>
<script>
  export default {
    name: 'google-login',
    props: {
      params: {
        type: Object,
        required: true,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        isWorking: false,
        isConnected: false,
        auth2: null,
        gapi: null
      }
    },
    methods: {
      handleClientLoad () {
        this.gapi.load('client:auth2', this.initClient)
      },
      initClient () {
        let vm = this
        this.gapi.auth2.init({
          client_id: '833712505628-imprrpljbf80th9nsek1q4hmcp2gqjll.apps.googleusercontent.com'
        }).then(function (response) {
//          console.log(vm.gapi.auth2.getAuthInstance().isSignedIn)
          console.log(response)

          // Listen for sign-in state changes.
          //vm.gapi.auth2.getAuthInstance().isSignedIn.listen(vm.updateSigninStatus)
          // Handle the initial sign-in state.
          //vm.updateSigninStatus(vm.gapi.auth2.getAuthInstance().isSignedIn.get())
        })
      },
      updateSigninStatus (isSignedIn) {
        if (isSignedIn) {
          alert(isSignedIn)
          this.makeApiCall()
        }
      },
      makeApiCall () {
        // Make an API call to the People API, and print the user's given name.
        this.gapi.client.people.people.get({
          'resourceName': 'people/me',
          'requestMask.includeField': 'person.names'
        }).then(function (response) {
          console.log('Hello, ' + response.result.names[0].givenName)
        }, function (reason) {
          console.log('Error: ' + reason.result.error.message)
        })
      },
      handleSignInClick (event) {
        this.gapi.auth2.getAuthInstance().signIn()
      },
      handleSignOutClick (event) {
        this.gapi.auth2.getAuthInstance().signOut()
      },
      error (msg) {
        typeof console !== 'undefined' && console.error(`[google-login] ${msg}`)
      }
    },
    created () {
      this.gapi = window.gapi
      this.handleClientLoad()
    },
    mounted () {
      if (!window.gapi) {
        this.error('"https://apis.google.com/js/api:client.js" needs to be included as a <script>.')
        return
      }

      if (!this.params.client_id) {
        this.error('params.client_id must be specified.')
        return
      }

//      if (this.readyState === 'complete') {
//        this.onload()
//      }

//      window.gapi.load('auth2', () => {
//        this.auth2 = window.gapi.auth2.init(this.params)
//      })
    }

  }
</script>

<style lang="scss" scoped="">
  .g-signin-button {
    background: #e04931;
    border-radius: 0.5em;
    margin-top: 0.3em;
    text-align: center;
    position: relative;
    padding: 5px;
    border: none;
    line-height: 34px;
    font-size: 1em;
    color: #FFF;
    width: 100%;
    .icoSocial{
      display: inline;
      font-size: 1.5em;
      position: relative;
      margin-right: 40px;
      i {
        position: absolute;
        top: 5px;
        font-size: 1em;
      }
    }
  }

</style>
