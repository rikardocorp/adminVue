<template>
  <b-form :id="'forms-'+ urlRest" class="col-md-8 col-lg-7 col-xl-6 m-auto pt-3">
    <div class="d-flex justify-content-center mb-2 mySwitch">
      <toggle-button :labels="{checked: 'DNI', unchecked: 'RUC'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(181, 181, 181)'}"
                     :disabled="isLoading || restricted" :width="75" :height="28" :sync="true"
                     v-model="item.typeDocument" @change="dniRUC" class="mr-2">
      </toggle-button>

      <toggle-button v-if="!hiddenEmail" :labels="{checked: 'Email', unchecked: 'Email'}" :color="{checked: 'rgb(99, 193, 222)', unchecked: 'rgb(181, 181, 181)'}"
                     :disabled="isLoading || restricted" :width="75" :height="28"
                     v-model="item.hasEmail" class="ml-2" @change="changeEmail">
      </toggle-button>
    </div>

    <b-form-group v-show="item['hasEmail']"
                  :class="{ 'form-group--error': $v.item['email']? $v.item['email'].$error : false, 'text-left': true}"
                  :label-cols="lCols"
                  :label="optInput['email'].label + ':'"
                  :horizontal="horizontal">
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + optInput['email'].icon"></i></b-input-group-addon>
        <b-form-input v-if="optInput['email'].input=='input-email'"
                      :disabled="isLoading || restricted" :type="optInput['email'].type"
                      v-model.trim="item['email']"
                      @blur.native="searchUser(null)"
                      :placeholder="optInput['email'].placeholder+'..'"></b-form-input>
        <b-input-group-button>
          <b-btn :disabled="isLoading || restricted" variant="primary" @click="searchUser(null)"><i class="fa fa-search"></i></b-btn>
        </b-input-group-button>
      </b-input-group>
      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item['email']? $v.item['email'] : {} "></form-error>
    </b-form-group>

    <b-form-group v-for="(option, _index) in optInput" :key="_index" :label-sr-only="option.srOnly"
                  v-if="option.input!=='input-email'"
                  :class="{ 'form-group--error': $v.item[_index]? $v.item[_index].$error : false, 'text-left': true}"
                  :label-cols="option.srOnly ? null : lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

      <!-- INPUT -->
      <b-input-group v-if="option.input==undefined || option.input=='input'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>
      </b-input-group>

      <b-input-group v-if="option.input=='input-dni'">
          <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
          <b-form-input :disabled="isLoading || restricted" :type="option.type"
                        v-model.trim="item[_index]"
                        @blur.once.native="searchDNI"
                        :placeholder="option.placeholder+'..'"></b-form-input>
          <b-input-group-button v-if="option.input=='input-dni'">
            <b-btn :disabled="isLoading || restricted" variant="primary" @click="searchDNI"><i class="fa fa-search"></i></b-btn>
          </b-input-group-button>
      </b-input-group>

      <b-input-group v-if="option.input=='onlyMultiSelect'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <only-multi-select class="special_radius"
                             :maxHeight="200" v-model="localidad" :optionList="option.params"
                             :disabled="isLoading || restricted"
                             :placeholderDefault="option.placeholder"></only-multi-select>
      </b-input-group>

      <b-input-group v-if="option.input=='datepicker'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <!-- DATEPICKER -->
        <datepicker v-model="birthDate" :format="option.params.format" language="es" :placeholder="option.placeholder"
                    class="special_radius" initial-view="year"
                    :clear-button="false" :bootstrapStyling="true"
                    :disabled-picker="isLoading || restricted"
                    :disabled="option.params.disabled"
                    @input="selectDate" calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"
                    @blur.native="$v.item[index]? $v.item[index].$touch(): false"></datepicker>

      </b-input-group>
      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item[_index]? $v.item[_index] : {} "></form-error>
    </b-form-group>


    <div class="mt-4">
      <!--<pre>{{ item.hasEmail }}</pre>-->
      <!--<pre>{{ usernameWU }}</pre>-->
      <!--<pre>{{ itemU }}</pre>-->
      <!--<div v-if="!item.hasEmail" class="media owner-card" style="font-size: 0.6em;">-->
        <!--<div class="d-flex align-self-center mr-3 rounded-circle">-->
          <!--<i class="fa fa-question d-flex align-items-center m-auto fa-3x text-secondary"></i>-->
        <!--</div>-->
        <!--<div class="media-body">-->
          <!--<p class="text-secondary fa-2x text-center pt-2">Vehiculo sin propietario</p>-->
        <!--</div>-->
      <!--</div>-->

      <transition appear mode="out-in" name="custom-classes-transition" enter-active-class="animated pulse">
        <div key="div" v-if="owner==true" class="media owner-card col-sm-12 col-md-11 col-lg-10 col-xl-9 m-auto" style="border-color: #ef7b21;">
          <div class="d-flex align-self-center mr-3 hvr-bounce-in">
            <avatar :username="usernameU"
                    :size="5.5" sizeUnid="em" :localSrc="false" color="#ffffff" backgroundColor="orange" colorBorder="#ef7b1f"
                    :border="true" :sizeBorder="0.35" style="cursor: pointer;"></avatar>
            <!--<avatar :username="usernameWU"-->
                    <!--:size="5" sizeUnid="em"-->
                    <!--src="/static/img/avatars/5.jpg"-->
                    <!--:border="true" colorBorder="#ef7b1f" :sizeBorder="0.35" style="cursor: pointer;"></avatar>-->
          </div>
          <div class="media-body">
            <h6 class="mt-1 mb-1 text-primary">{{ usernameU }}</h6>
            <p>Email: {{ itemU.email }}</p>
            <p>DNI/RUC: {{ itemU.dniRuc }}</p>
            <p>Celular: {{ itemU.cellPhone }}</p>
          </div>
        </div>
      </transition>
    </div>
    <!--<pre>{{optType[0].options}}</pre>-->
    <!--<pre>{{item}}</pre>-->
  </b-form>
</template>

<script>
  import cSwitch from '../../../components/Switch'
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'
  import Multiselect from 'vue-multiselect'
  import Avatar from '../../../components/Avatar.vue'
  import FormError from '../../../components/FormError.vue'
  import ToggleButton from '../../../components/ToggleButton.vue'
  import {DATA_PURCHASER as _purchaser} from '../../../data/dnNewSales'
  import Datepicker from 'vuejs-datepicker'
  import Mixin from '../../../mixins'

  export default {
    props: ['urlRest', 'item', 'itemU', 'update', 'horizontal', 'keyname', 'restricted', 'dispatch'],
    mixins: [Mixin],
    components: {
      cSwitch,
      OnlyMultiSelect,
      Multiselect,
      Avatar,
      FormError,
      ToggleButton,
      Datepicker
    },
    data () {
      return {
        birthDate: '',
        localidad: [],
        optInput: _purchaser.input,
        titleRazonSocial: 'Nombre',
        titledniRuc: 'DNI',
        titleSwitch: 1,
        lCols: 3,
        owner: null,
        hiddenEmail: false
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isInvalid () {
        return this.$v.item.$invalid
      },
      usernameU () {
        return this.itemU.firstName ? this.itemU.firstName + ' ' + this.itemU.lastName : this.itemU.email
      },
      isClient () {
        return this.$store.state.user.isClient
      }
    },
    validations () {
      if (this.item.hasEmail) {
        return _purchaser.validate
      } else {
        return _purchaser.validate2
      }
    },
    watch: {
      isInvalid (newVal) {
        this.$emit('connection', 'isValid', newVal)
      },
      dispatch () {
        console.log('VALIDAAAAAAAAA')
        console.log(this.isInvalid + ' ffweffw')
        this.$v.item.$touch()
      },
      localidad (newVal, oldVal) {
        localStorage.setItem('location', JSON.stringify(newVal))
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
    methods: {
      selectDate (pickDate) {
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
        }
        // this.birthDate = newDate
        this.item['birthDate'] = newDate
      },
      changeEmail (value) {
        // this.item.hasEmail = value.value
        // alert(value.value)
        if (value.value) {
          console.log('Email cliente')
          this.item.email = ''
          this.owner = null
          this.$emit('connection', 'user', null)
        } else {
          console.log('Email vendedor')
          this.item.email = this.$store.state.user.data.email
          this.searchUser(this.$store.state.user.data.email)
        }
      },
      dniRUC (value) {
        if (this.item.typeDocument === 1) {
          this.optInput.razonSocial.label = 'Nombre'
          this.optInput.dniRuc.label = 'DNI'
        } else {
          this.optInput.razonSocial.label = 'Razon Socia'
          this.optInput.dniRuc.label = 'RUC'
        }
      },
      searchDNI () {
        console.log('CONSULTA DNI?')
        let dniRUC = this.item.dniRuc
        if (dniRUC !== '') {
          let url = 'purchasers?dniRuc=' + dniRUC
          let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              console.log(data.content)
              let selectData = data.content.pop()

              if (selectData !== undefined) {
                this.$set(this.item, 'razonSocial', selectData.razonSocial)
                this.$set(this.item, 'address', selectData.address)
                this.$set(this.item, 'phone', selectData.phone)
                this.$set(this.item, 'cellPhone', selectData.cellPhone)
                this.$set(this.item, 'typeDocument', selectData.typeDocument)
                this.$set(this.item, 'departamento', selectData.departamento)
                this.$set(this.item, 'provincia', selectData.provincia)
                this.$set(this.item, 'distrito', selectData.distrito)
                this.$set(this.item, 'birthDate', selectData.birthDate)
                this.localidad = [selectData.departamento, selectData.provincia, selectData.distrito]
                this.birthDate = selectData.birthDate ? this.getDateToDatepicker(selectData.birthDate) : ''
                this.dniRUC()
                console.log('Tiene duseño')
              } else {
                console.log('No tiene duseño')
                this.$set(this.item, 'razonSocial', '')
                this.$set(this.item, 'address', '')
                this.$set(this.item, 'phone', '')
                this.$set(this.item, 'cellPhone', '')
                this.$set(this.item, 'typeDocument', 1)
                this.$set(this.item, 'departamento', '')
                this.$set(this.item, 'provincia', '')
                this.$set(this.item, 'distrito', '')
                this.$set(this.item, 'birthDate', '')
                this.localidad = []
                this.birthDate = ''
                this.dniRUC()
              }
            } else {
              console.log('Error: ' + url)
              console.log(data.content)
            }
          })
        }
      },
      searchUser (localEmail = null) {
        let email = (localEmail === null) ? this.item.email : localEmail
        // let email = this.item.email
        // console.log('EMAIL 33333#####')
        // console.log(email)
        // console.log(localEmail)
        if (email !== '') {
          let url = 'users/search?email=' + email
          let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              if (data.content.length > 0) {
                this.owner = localEmail === null ? true : null
                this.$emit('connection', 'user', data.content[0])
              } else {
                this.owner = null
                this.$emit('connection', 'user', null)
              }
            } else {
              console.log('Error: ' + url)
              console.log(data.content)
            }
          })
        }
      },
      getDateToDatepicker (date) {
        let toDay = this.$moment(date, 'DD/MM/YYYY')
        let day = toDay.get('date')
        let month = toDay.get('month')
        let year = toDay.get('year')
        return new Date(year, month, day)
      }
    },
    created () {
      console.log(JSON.parse(localStorage.getItem('location')))
      let purchaser = JSON.parse(localStorage.getItem('purchaser'))
      if (purchaser) {
        this.localidad = JSON.parse(localStorage.getItem('location'))
        let date = purchaser.birthDate
        if (date) this.birthDate = this.getDateToDatepicker(date)
        if (this.item.hasEmail) this.searchUser()
      }
      this.dniRUC()

      // DatePicker
      let date = this.$store.getters.getDateTime.date
      let toDay = this.$moment(date, 'DD/MM/YYYY')
      let day = toDay.get('date')
      let month = toDay.get('month')
      let year = toDay.get('year')
      this.optInput.birthDate.params.disabled.to = new Date(1900, month, day)
      this.optInput.birthDate.params.disabled.from = new Date(year - 17, month, day)
      // this.birthDate = new Date(1900, 0, 1)
      if (this.isClient) {
        this.item.hasEmail = false
        this.hiddenEmail = true
      }
    }
  }
</script>

<style lang="scss">
  .special_radius{
    .multiselect__tags, input{
      border-radius: 0 0.55em 0.55em 0 !important;
    }
  }

  .mySwitch{
    label {
      /*width: 72px !important;*/
      /*span.switch-handle{*/
        /*left: 45px !important;*/
      /*}*/
      /*span.switch-label:after{*/
        /*width: 60% !important;*/
      /*}*/
    }
  }

  form{
    .vdp-datepicker{
      width: 100% !important;
    }
  }

  /*.vdp-datepicker{*/
    /*.form-control[readonly]{*/
      /*background: #f4f3ef;*/
      /*border-right: 0;*/
      /*z-index: inherit;*/
    /*}*/
    /*.input-group-addon{*/
      /*padding: 0.2rem 0.7rem;*/
      /*margin-bottom: 0;*/
      /*font-size: 1.4rem;*/
      /*color: #999999;*/
      /*background-color: #f4f3ef;*/
      /*border: 1px solid #e0e0e0;*/
      /*border-radius: 0 0.55rem 0.55rem 0;*/
      /*border-left: 0;*/
    /*}*/
  /*}*/
</style>
