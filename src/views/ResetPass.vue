<template>
  <div class="app flex-row align-items-center">
    <div class="progress-line" v-if="isLoading"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div v-if="!switchResetPass" class="card-body">
                <h1>JMC</h1>
                <p class="text-muted">Recuperar Contraseña</p>

                <b-form-group v-for="(option, index) in optInput" :key="index"
                              :class="{ 'form-group--error': $v.itemPass[index]? $v.itemPass[index].$error : false, 'text-right': true}"
                              :label-cols="null"
                              :label-sr-only="option.srOnly"
                              :label="option.label + ':'"
                              :horizontal="true">
                  <!-- INPUT -->
                  <b-input-group v-if="option.input==undefined || option.input=='input'">
                    <b-input-group-addon class=""><i :class="option.icon"></i></b-input-group-addon>
                    <b-form-input :disabled="isLoading" :type="option.type"
                                  v-model.trim="itemPass[index]"
                                  @blur.native="$v.itemPass[index]? $v.itemPass[index].$touch(): false"
                                  :placeholder="option.placeholder+'..'"></b-form-input>
                  </b-input-group>

                  <form-error :data="$v.itemPass[index] ? $v.itemPass[index] : {} "></form-error>
                </b-form-group>
                <div class="row">
                  <div class="col-6 text-left">
                    <button type="button" class="btn bg-inverse px-4" @click.prevent="reset()">Reset</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-primary px-4" @click.prevent="changePassword">Cambiar</button>
                  </div>
                </div>
              </div>

              <div v-else class="card-body">
                <br>
                <br>
                <h4 class="text-primary text-center">Solicitud Procesada</h4>
                <br><br>
                <p class="text-center">
                  El cambio de su contraseña fue procesada con exito, ahora puede ingresar a nuestro sistema.
                </p>
                <p class="text-right">
                  <router-link to="/login" class="text-primary">ingresar al sistema >></router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<notifications animation-type="velocity" group="foo" />-->
    <notifications group="foo"
                   position="top right"
                   animation-type="velocity"
                   :speed="500" :duration="3000" :max="5">
    </notifications>

  </div>
</template>

<script>
  //  import auth from '../auth'
  //  import {mapActions} from 'vuex'
  import {DATA_FORM_PASSWORD_RECOVER as dataFormPass} from '../data/dnUser'
  import FormError from '../components/FormError.vue'

  export default {
    name: 'RecoverPassword',
    data () {
      return {
        optInput: dataFormPass.input,
        itemPass: JSON.parse(JSON.stringify(dataFormPass.post)),
        credentials: {
          username: '',
          password: ''
        },
        error: '',
        switchResetPass: false
      }
    },
    components: {
      FormError
    },
    validations () {
      return dataFormPass.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      notification () {
        return this.$store.state.notification
      }
    },
    methods: {
      async changePassword () {
        let invalid = this.$v.itemPass.$invalid
        if (!invalid) {
          let data = {
            email: this.itemPass.email,
            password: this.itemPass.rePassword,
            token: this.$route.params.token
          }
          let self = await this.$store.dispatch('resetPassword', data)
          if (self.status) {
            this.switchResetPass = true
          }
          console.log(self)
        } else {
          this.$v.itemPass.$touch()
        }
      },
      reset () {
        this.$v.itemPass.$reset()
        this.itemPass = JSON.parse(JSON.stringify(dataFormPass.post))
      },
      submit () {
        console.log('Submit')
        let credentials = {
          email: this.credentials.username,
          password: this.credentials.password
        }
        this.$store.dispatch('login', {credentials})
      },
      login (creds) {
        let urlLogin = this.$store.state.Login.LOGIN_URL
        this.$http.post(urlLogin, creds).then(response => {
          // success callback
          console.log(response)
        }, response => {
          // error callback
          console.log(response)
        })
      }
    },
    watch: {
      notification (newVal, oldVal) {
        console.log('NOTIFICATION')
        console.log(newVal)
        console.log(oldVal)
        let type = ''
        let content = newVal.content.data
        if (content.success === true) {
          type = 'success'
        } else if (content.success === false) {
          type = 'error'
        } else if (content.success === null) {
          type = 'warn'
        }

        this.$notify({
          group: 'foo',
          title: 'Mensaje Importante',
          text: content.message,
          type: type
        })
      }
    },
    created () {
      // console.log('loginAuth::::')
      // this.$store.dispatch('redirectROLE')
    }
  }
</script>

<style lang="scss">

  .vue-notification {
    border-radius: 0.55rem;
    border-left: none;
    box-shadow: 1px 1px 3px #3e3e3e;

    .notification-title{
      font-size: 1.1em;
    }
    .notification-content{
      font-size: 1.1em;
    }
  }


  .progress-line, .progress-line:before, .progress-line:after {
    height: 3px;
    width: 100%;
    margin: 0;
    position: absolute;
    z-index: 1;
    top: 0;

  }
  .progress-line {
    background-color: #ef7b1f;
    display: -webkit-flex;
    display: flex;
  }
  .progress-line:before {
    background-color: #21a8d8;
    content: '';
    -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  /*.progress-line:after {*/
  /*background-color: rgb(33, 33, 32);*/
  /*content: '';*/
  /*-webkit-animation: running-progress 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;*/
  /*animation: running-progress 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;*/
  /*}*/
  @-webkit-keyframes running-progress {
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }
  }
  @keyframes running-progress {
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }
  }
</style>
