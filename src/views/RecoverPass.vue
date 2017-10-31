<template>
  <div class="app flex-row align-items-center">
    <div class="progress-line" v-if="isLoading"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
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
                    <b-input-group-addon class=""><i :class="'fa ' + option.icon"></i></b-input-group-addon>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <notifications animation-type="velocity" group="foo" />
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
        error: ''
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

          this.$store.dispatch('resetPassword', {data})
//
//          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: data, headers: headers})
//          console.log(self)
//          if (self.status) {
//            this.itemPass = JSON.parse(JSON.stringify(dataFormPass.post))
//            this.$v.itemPass.$reset()
//          }
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
        console.log('ISLOADING')
        console.log(newVal)
        console.log(newVal)
        this.$notify({
          group: 'foo',
          title: 'Important message',
          text: 'Hello user! This is a notification!'
        })
      }
    },
    created () {
      // console.log('loginAuth::::')
      // this.$store.dispatch('redirectROLE')
    }
  }
</script>

<style>
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
