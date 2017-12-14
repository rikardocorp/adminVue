<template>
  <div id="contentDetailSale" class="content-profile">

    <div class="col-md-12 col-sm-12 col-lg-9 col-xl-7 m-auto">
      <b-card>
        <div slot="header" class="text-left">
          <strong>Perfil</strong> de Usuario
          <toggle-button :labels="{checked: 'Editar', unchecked: 'En Edicion'}" :color="{checked: '#63c1de', unchecked: 'rgb(239, 123, 34)'}"
                         :width="80" :height="28" :sync="true"
                         v-model="edit" class="float-right">
          </toggle-button>
        </div>
        <div class="row">
          <div class="col-md-5">
            <!--<h6>SEGURO SOAT - 2017</h6>-->
            <div class="row">
              <div class="col-md-5 text-center">
                <avatar :username="fullName" :rounded="true" :size="7.5" sizeUnid="em"
                        :border="true" colorBorder="#f4f3ef" color="#ecedef"
                        backgroundColor="orange" :sizeBorder="0.5"></avatar>
              </div>
              <div class="col-md-7 text-center infoPolicy">
                <p>TIPO DE USUARIO</p>
                <p class="xsTitle">{{ role }}</p>
                <h6 class="mt-1"><b-badge class="px-2 py-1 text-white" :variant="item.enabled == 1 ? 'primary' : ''">{{ item.enabled == 1 ? 'Activo' : 'Inactivo' }}</b-badge></h6>
                <p>{{ item.office ? item.office.description : '' }}</p>
                <p>{{ item.office ? item.office.officeType.description : '' }}</p>
              </div>
            </div>
            <div class="row pt-2 auxHeight">
              <div class="col-md-12 borderChild">
                <p class="title mb-2 mt-1">CONTRASEÑAS</p>
                <div class="row">
                  <div class="col-md-12">
                    <p class="subtitle text-left"><span>CONTRASEÑA ACTUAL</span></p>
                    <p class="value"><input :disabled="isLoading" type="password" v-model="itemPass.oldPassword" placeholder="Ingrese su contraseña actual" class="form-control"></p>
                    <form-error :data="$v.itemPass? $v.itemPass.oldPassword : {} "></form-error>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <p class="subtitle text-left"><span>CONTRASEÑA</span></p>
                    <p class="value"><input :disabled="isLoading" type="password" v-model="itemPass.newPassword" placeholder="Ingrese nueva contraseña" class="form-control"></p>
                    <form-error :data="$v.itemPass? $v.itemPass.newPassword : {} "></form-error>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <p class="subtitle text-left"><span>RE-CONTRASEÑA</span></p>
                    <p class="value"><input :disabled="isLoading" type="password" v-model="itemPass.rePassword" placeholder="Repita la contraseña" class="form-control"></p>
                    <form-error :data="$v.itemPass? $v.itemPass.rePassword : {} "></form-error>
                  </div>
                </div>
                <div class="col-md-12 container-subtitle">
                  <b-button :disabled="isLoading" @click="changePassword" class="float-right w-100"  type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Actualizar</b-button>
                </div>
              </div>
            </div>
          </div>

          <!-- UPDATE PROFILE -->
          <div class="col-md-7 ">
            <p class="title" style="margin-top: 0.6em">DATOS DEL PERFIL</p>
            <div class="borderChild py-3">
              <div class="row pt-2">
                <div class="col-md-12 container-subtitle" style="height: 58px;">
                  <p class="subtitle text-left"><span>EMAIL / USERNAME</span></p>
                  <p class="value pt-4">{{ item.email }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 container-subtitle">
                  <div>
                    <p class="subtitle text-left"><span>NOMBRES</span></p>
                    <p class="value"><input :disabled="isLoading" type="text" v-model="item.firstName" class="form-control"></p>
                  </div>
                </div>
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>APELLIDOS</span></p>
                  <p class="value"><input :disabled="isLoading" type="text" v-model="item.lastName" class="form-control"></p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <p class="subtitle text-left"><span>RAZON SOCIAL</span></p>
                  <p class="value"><input :disabled="isLoading" type="text" v-model="item.razonSocial" placeholder="Nombre o Razon Social" class="form-control"></p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 container-subtitle">
                  <div>
                    <p class="subtitle text-left"><span>DNI / RUC</span></p>
                    <p class="value"><input :disabled="isLoading" type="text" v-model="item.dniRuc" placeholder="DNI o RUC" class="form-control"></p>
                  </div>
                </div>
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left" style="position: absolute;z-index: 4;"><span>FECHA NACIMIENTO</span></p>
                  <p class="value">
                    <datepicker v-model="birthDate.value" :format="birthDate.params.format" language="es" :placeholder="birthDate.placeholder"
                                class="special_radius" initial-view="year"
                                :clear-button="false" :bootstrapStyling="true"
                                :disabled-picker="isLoading"
                                @input="selectDate" calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content">
                    </datepicker>
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 container-subtitle">
                  <div>
                    <p class="subtitle text-left"><span>DIRECCION</span></p>
                    <p class="value"><input :disabled="isLoading" type="text" v-model="item.address" placeholder="Direccion" class="form-control"></p>
                  </div>
                </div>
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>CELULAR</span></p>
                  <p class="value"><input :disabled="isLoading" type="text" v-model="item.cellPhone" placeholder="Celular" class="form-control"></p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12" style="overflow: inherit;">
                  <p class="subtitle text-left" style="position: absolute; z-index: 2;"><span>LOCALIDAD</span></p>
                  <p class="value" style="padding-top: 20px;">
                    <only-multi-select class="special_radius"
                                       :maxHeight="200" v-model="localidad" :optionList="distrito.params"
                                       :disabled="isLoading"
                                       :placeholderDefault="distrito.placeholder">
                    </only-multi-select>
                  </p>
                </div>
              </div>
              <div class="col-md-12 container-subtitle">
                <b-button :disabled="isLoading" @click="UpdateProfile" class="float-right w-100"  type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Actualizar</b-button>
              </div>
            </div>
          </div>

        </div>
      </b-card>
    </div>
    <!--<pre>{{ item }}</pre>-->

  </div>
</template>


<script>
  import ToggleButton from '../../../components/ToggleButton.vue'
  import Avatar from '../../../components/Avatar.vue'
  import {DATA_USER_PROFILE as dataProfile, DATA_FORM_PASSWORD_CHANGE as dataFormPass} from '../../../data/dnUser'

  //  import FileSaver from 'file-saver'
  import UploadSimple from '../../../components/UploadFileSimple.vue'
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'
  import Datepicker from 'vuejs-datepicker'
  import Mixin from '../../../mixins'
  import FormError from '../../../components/FormError.vue'

  // import {DATA_FORM_PAYMENT as _payment} from '../../data/dnSales'

  export default {
    props: ['item', 'urlRest'],
    mixins: [Mixin],
    components: {
      ToggleButton,
      Avatar,
      UploadSimple,
      OnlyMultiSelect,
      Datepicker,
      FormError
    },
    data () {
      return {
        localidad: [],
        distrito: {
          label: 'Localidad',
          placeholder: 'Departamento-Provincia-Distrito',
          type: 'text',
          icon: 'fa fa-map-marker',
          input: 'onlyMultiSelect',
          params: [
            {
              url: 'regions',
              options: [],
              pickID: null,
              id: 'region',
              keySearch: 'name',
              colorClass: 'badge badge-danger',
              placeholder: 'Departamento',
              localData: 'regions'
            },
            {
              url: 'provinces',
              options: [],
              pickID: null,
              id: 'province',
              keySearch: 'name',
              colorClass: 'badge badge-success',
              placeholder: 'Provincia',
              localData: 'provinces'
            },
            {
              url: 'cities',
              options: [],
              pickID: null,
              id: 'city',
              keySearch: 'name',
              colorClass: 'badge badge-info text-white',
              placeholder: 'Distrito',
              localData: 'cities',
            }
          ]
        },
        birthDate: {
          label: 'F.Nacimiento',
          placeholder: 'Fecha de nacimiento',
          type: 'text',
          icon: 'fa fa-calendar',
          input: 'datepicker',
          params: {
            key: 'birthDate',
            format: 'dd/MM/yyyy',
            value: ''
          }
        },
        localItem: {},
        itemPass: JSON.parse(JSON.stringify(dataFormPass.post)),
        switchValidate: false,
        edit: true
      }
    },
    validations () {
      if (this.switchValidate) {
        return dataProfile.validate
      } else {
        return dataFormPass.validate
      }
    },
    watch: {
      localidad (newVal, oldVal) {
        if (Array.isArray(newVal)) {
          if (typeof newVal[0] !== 'object') {
            this.item.departamento = newVal[0]
            this.item.provincia = newVal[1]
            this.item.distrito = newVal[2]
          } else {
            this.item.departamento = newVal[0] ? newVal[0].name : ''
            this.item.provincia = newVal[1] ? newVal[1].name : ''
            this.item.distrito = newVal[2] ? newVal[2].name : ''
          }
        }
      }
    },
    computed: {
      role () {
        return this.item.role.role === 'ROLE_USUARIO' ? 'CLIENTE' : this.item.role.role
      },
      fullName () {
        return this.item.firstName + ' ' + this.item.lastName
      },
      location () {
        return this.item.departamento !== null ? this.item.departamento + ', ' + this.item.provincia + ', ' + this.item.distrito : '-'
      },
      locationOffice () {
        return this.item.office.region.name + ', ' + this.item.office.province.name + ', ' + this.item.office.city.name
      },
      isLoading () {
        return this.$store.state.isLoading || this.edit
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      pathDocs () {
        return this.$store.state.Login.FILES_URL
      }
    },
    methods: {
      getDateToDatepicker (date) {
        let toDay = this.$moment(date, 'DD/MM/YYYY')
        let day = toDay.get('date')
        let month = toDay.get('month')
        let year = toDay.get('year')
        return new Date(year, month, day)
      },
      UpdateProfile () {
        this.switchValidate = true
        let invalid = this.$v.item.$invalid
        let user = {}
        if (!invalid) {
          user = JSON.parse(JSON.stringify(this.item))
          console.log(user)
          let url = 'users/updateprofile'
          this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: url, data: user})
          this.edit = true
        } else {
          this.$store.commit('sendNotification', {status: null, message: 'Debe llenar todo el formulario.'})
          this.$v.item.$touch()
        }
      },
      changePassword () {
        this.switchValidate = false
        let invalid = this.$v.itemPass.$invalid
        let user = {}
        if (!invalid) {
          user = {
            oldPassword: this.itemPass.oldPassword,
            newPassword: this.itemPass.rePassword
          }
          let url = 'users/changepassword'
          let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: user})
          self.then((data) => {
            if (data.status) {
              this.itemPass = JSON.parse(JSON.stringify(dataFormPass.post))
              this.$v.itemPass.$reset()
              this.edit = true
            }
          })
        } else {
          this.$v.itemPass.$touch()
        }
      },
      selectDate (pickDate) {
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
        }
        // this.birthDate = newDate
        this.item['birthDate'] = newDate
      },
      returnMain () {
        this.$emit('returnMain', false)
      }
    },
    mounted () {
      let date = this.item.birthDate
      if (date) {
        this.birthDate.value = this.getDateToDatepicker(date)
      }
      this.localidad = [this.item.departamento, this.item.provincia, this.item.distrito]
    }
  }
</script>

<style lang="scss">

  .content-profile{
    input{
      padding: 1.5em 0.2em 0 0;
      background: white !important;
      border: none;
      border-radius: 0;
      height: 3.7em;
      text-align: right;
      color: #ef7b1f;
      font-size: 0.94em;
      box-shadow: none;
    }

    .special-radius{
      width: 90%;
      padding-top: 20px;
      float: right;
    }
    .multiselect__tags{
      background: white !important;
      border: none !important;
      input{
        margin: 0 !important;
        padding: 0 !important;
      }
      /*height: 40px;*/
      /*width: 100% !important;*/
    }
    .multiselect__spinner{
      background: white !important;
    }
    .multiselect__tags-wrap{
      position: absolute;
      z-index: 10;
      right: 40px;
    }
  }


  #profileDetail{
    font-family: 'jmc';

    .numberPolicy{
      color: rgb(100, 193, 222);
      padding-bottom: 0.4em;
      text-decoration: underline;
    }

    .infoPolicy{
      p{
        margin: 0;
        padding: 0;
        font-size: 0.85em;
        &.xsTitle{
          color: #f26f36;
          font-size: 1.2em;
        }
      }
    }
    p.title{
      width: 100%;
      text-align: center;
      //color: #ef7b21;
      font-weight: 500;
      border: 1px solid;
      background: #ffa501;
      color: white;
      border-radius: 0.5em;
      font-size: 1.1em;
    }
    p{
      margin: 0;
      padding: 0;
      text-align: center;
      width: 100%;
    }
    .bolder{
      font-weight: bold;
    }

    .subtitle{
      span{
        position: absolute;
        font-size: 0.9em;
        color: #9c9c9c;
        background: #f4f3ef;
        padding: 0 0.5em;
      }
    }

    .auxHeight{
      .value{
        padding-top: 1.2em;
        input{
          padding-top: 0;
        }
      }
    }

    .value{
      text-align: right;
      font-size: 1.1em;
      color: #444444;
      &.vigente{
        margin-top: 10px;
        font-size: 1.1em;
        span{
          background: #ef7b1f;
          color: #ffffff;
          padding: 0.2em 0.6em;
          border-radius: 2em;
        }
        &.vencido{
          font-size: 1.1em;
          span{
            background: red;
            padding: 0.2em 0.6em;
          }
        }
      }
    }

    .borderChild{
      >.row{
        >div{
          border: 1px dashed rgba(244, 243, 239, 0.62);
          padding: 0.3em 1em;
        }
      }
    }

    .detailPay{
      .subtitle{
        span{
          color: white;
          padding: 0.1em 0.4em;
          border-radius: 1em;
          font-size: 0.9em;
          font-weight: 600;
        }
      }
      .value{
        font-size: 1.3em;
        span{
          color: #a8a8a7;
          font-size: 0.8em;
        }
      }
      .col-md-12{
        overflow: hidden;
      }
    }

    .formPay{
      background: #ffa501;
      padding: 0.5em 1em 1em;
      border-radius: 0.51em;
      div{
        border: none !important;
      }
      .title{
        color: white;
        font-size: 1.4em;
      }
    }
  },

  #contentDetailSale{

    .dropbox {
      color: #546c79 !important;
      outline: 0.1em dashed #cacaca;
      outline-offset: -1.5em;
      background: #f4f3ef;
      color: #ababab;
      padding: 1.8em 2.4em;
      position: relative;
      cursor: pointer;
      border: 0.19em dashed white;
      margin: 0;
      font-weight: 500;
      font-size: 0.8em;
      text-align: justify;
      p span.text-italic {
        color: #64c1de;
        padding: 10px;
        font-size: 1em;
      }
    }

    .avatar{
      span{
        font-size: 2.5em !important;
        font-weight: 500;
        color: white;
      }
    }
  }


</style>
