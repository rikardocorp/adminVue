<template>
  <div class="">
    <button :disabled="isWorking" @click="buttonClicked">
      <div v-if="isWorking" class="icoSocial">
        <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
      </div>
      <div v-if="!isWorking" class="icoSocial">
        <i class="fa fa-facebook" aria-hidden="true"></i>
      </div>
      {{getButtonText}}
    </button>
  </div>
</template>
<script>
import { loadFbSdk, getLoginStatus, fbLogout, fbLogin } from './helpers.js'
import icon from './icon.png'
export default {
  name: 'facebook-login',
  data () {
    return {
      isWorking: false,
      isConnected: false,
      icon
    }
  },
  computed: {
    getButtonText() {
      switch (this.isConnected) {
        case true:
          return this.logoutLabel
        case false:
          return this.loginLabel
        default:
          return 'this is default'
      }
    }
  },
  methods: {
    buttonClicked () {
      this.$emit('click')
      if (this.isConnected) {
        this.logout()
      } else {
        this.login()
      }
    },
    logout () {
      this.isWorking = true
      getLoginStatus().then(response => {
        if (response.status === 'connected') {
          this.isConnected = true
          fbLogout().then(response => {
            this.isWorking = false
            this.isConnected = false
            this.$emit('logout', response)
          })
        } else {
          this.isConnected = false
        }
      })
    },
    login () {
      this.isWorking = true
      fbLogin(this.loginOptions)
        .then(response => {
          if (response.status === 'connected') {
            this.isConnected = true
          } else {
            this.isConnected = false
          }
          this.isWorking = false
          this.$emit('login', {
            response,
            FB: window.FB
          })
        });
    }
  },
  props: {
    appId: {
      type: String,
      required: true
    },
    version: {
      type: String,
      default: 'v2.10'
    },
    logoutLabel: {
      type: String,
      default: 'Log out from Facebook'
    },
    loginLabel: {
      type: String,
      default: 'Log In To Facebook'
    },
    loginOptions: {
      type: Object,
      default: function () {
        return {
          scope: 'email'
        }
      }
    }
  },
  mounted () {
    this.isWorking = true
    loadFbSdk(this.appId, this.version)
      .then(() => {
        this.isWorking = false
        this.$emit('sdk-loaded', {
          isConnected: this.isConnected,
          FB: window.FB
        })
      })

//    loadFbSdk(this.appId, this.version)
//      .then(loadingResult => {})
//      .then(() => getLoginStatus())
//      .then(response => {
//        if (response.status === 'connected') {
//          this.isConnected = true
//        }
//        this.isWorking = false
//        /** get-initial-status to be depcreated on next major version */
//        this.$emit('get-initial-status', response)
//        this.$emit('sdk-loaded', {
//          isConnected: this.isConnected,
//          FB: window.FB
//        })
//      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  button {
    background: #385899;
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
