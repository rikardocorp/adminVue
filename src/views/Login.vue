<template>
  <div class="app flex-row align-items-center">
    <div class="progress-line" v-if="isLoading"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
        <!--<div class="col-md-9">-->
          <div class="card-group mb-0">
            <div class="card p-4">
              <div v-if="!changePass" class="card-body">
                <h1>JMC</h1>
                <p class="text-muted">Iniciar Sesión</p>
                <div class="alert alert-danger" v-if="error">
                  <p>{{ error }}</p>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="text" class="form-control" placeholder="Usuario" v-model="credentials.username">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Contraseña" v-model="credentials.password" @keyup.enter="submit">
                </div>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" @click="submit">Ingresar</button>
                  </div>
                  <div class="col-6 text-right">
                    <button @click="changePass=true" type="button" class="btn btn-link px-0">Olvidaste tu contraseña?</button>
                  </div>
                </div>
              </div>
              <div v-else="" class="card-body">
                <h1>JMC</h1>
                <p class="text-muted">Recuperar Contraseña</p>

                <b-form-group>
                  <!-- INPUT -->
                  <b-input-group>
                    <b-input-group-addon class=""><i class="fa fa-envelope-o"></i></b-input-group-addon>
                    <b-form-input type="email" v-model.trim="recoverEmail" placeholder="Correo Electrónico.."></b-form-input>
                  </b-input-group>
                </b-form-group>
                <br>
                <div class="row">
                  <div class="col-6 text-left">
                    <button type="button" class="btn bg-light px-4" @click.prevent="changePass=false">Regresar</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-primary px-4" @click.prevent="recoverPassword">Cambiar</button>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">-->
              <!--<div class="card-body text-center">-->
                <!--<div>-->
                  <!--<h2>Registrate</h2>-->
                  <!--<p>Para cualquier duda comuniquese con nosotros al 999-00-9966 o al email <span>jcm@gmail.com</span></p>-->
                  <!--<button type="button" class="btn btn-primary active mt-3">Registrarse!</button>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
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

  export default {
    name: 'Login',
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: '',
        changePass: false,
        recoverEmail: ''
      }
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
      },
      async recoverPassword () {
        console.log('Submit')
        if (this.recoverEmail === '') return false
        let data = {
          email: this.recoverEmail
        }
        let self = await this.$store.dispatch('recoverPassword', data)
        if (self.status) {
          this.recoverEmail = ''
          this.changePass = false
        }
        console.log(self)
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
