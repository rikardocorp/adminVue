<template>
  <b-form :id="'forms-'+ urlRest" class="col-md-8 m-auto pt-3 pb-4">
    <div class="d-flex justify-content-center mb-2 mySwitch">
      <c-switch type="text"
                variant="warning"
                on="DNI" off="RUC"
                :disabled="isLoading || restricted"
                class="switch-lg mr-1"
                :pill="true"
                @change="dniRUC"
                v-model="item.typeDocument"/>

      <c-switch type="text"
                variant="warning"
                on="Email" off="off"
                :disabled="isLoading || restricted"
                class="switch-lg ml-1"
                :pill="true"/>
    </div>


    <b-form-group v-for="(option, _index) in optInput" :key="_index"
                  :class="{ 'form-group--error': $v.item[_index]? $v.item[_index].$error : false, 'text-left': true}"
                  :label-cols="lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

      <!-- INPUT -->
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon  "></i></b-input-group-addon>
        <b-form-input v-if="option.input==undefined || option.input=='input'"
                      :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>

        <b-form-input v-if="option.input=='input-email'"
                      :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.native="searchUser"
                      :placeholder="option.placeholder+'..'"></b-form-input>
        <b-input-group-button v-if="option.input=='input-email'">
          <b-btn :disabled="isLoading || restricted" variant="primary" @click="searchUser"><i class="fa fa-search"></i></b-btn>
        </b-input-group-button>

        <b-form-input v-if="option.input=='input-dni'"
                      :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.once.native="searchDNI"
                      :placeholder="option.placeholder+'..'"></b-form-input>
        <b-input-group-button v-if="option.input=='input-dni'">
          <b-btn :disabled="isLoading || restricted" variant="primary" @click="searchDNI"><i class="fa fa-search"></i></b-btn>
        </b-input-group-button>

        <only-multi-select v-if="option.input=='onlyMultiSelect'" class="special_radius"
                           :maxHeight="200" v-model="localidad" :optionList="option.params"
                           :disabled="isLoading || restricted"
                           :placeholderDefault="option.placeholder"></only-multi-select>

      </b-input-group>
      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item[_index]? $v.item[_index] : {} "></form-error>
    </b-form-group>



    <div class="mt-4">
      <!--<div v-if="owner==null" class="media owner-card" style="font-size: 0.6em;">-->
        <!--<div class="d-flex align-self-center mr-3 rounded-circle">-->
          <!--<i class="fa fa-question d-flex align-items-center m-auto fa-3x text-secondary"></i>-->
        <!--</div>-->
        <!--<div class="media-body">-->
          <!--<p class="text-secondary fa-2x text-center pt-2">Vehiculo sin propietario</p>-->
        <!--</div>-->
      <!--</div>-->

      <transition appear mode="out-in" name="custom-classes-transition" enter-active-class="animated pulse">
        <div key="div" v-if="owner==true" class="media owner-card" style="border-color: #ef7b21;">

          <div class="d-flex align-self-center mr-3 hvr-bounce-in">
            <avatar username="Jane Doe"
                    :size="5" sizeUnid="em"
                    src="/static/img/avatars/5.jpg"
                    :border="true" colorBorder="#ef7b1f" :sizeBorder="0.35" style="cursor: pointer;"></avatar>
          </div>

          <div class="media-body">
            <h6 class="mt-2 mb-1 text-primary">Juana Arco Perez Perez perez</h6>
            <p>Username: rikardo.corp</p>
            <p>Email: rikardo.corp@gmail.como</p>
          </div>
        </div>
      </transition>
    </div>
    <!--<pre>{{optType[0].options}}</pre>-->

  </b-form>

</template>

<script>
  import cSwitch from '../../../components/Switch'
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'
  import Multiselect from 'vue-multiselect'
  import Avatar from '../../../components/Avatar.vue'
  import FormError from '../../../components/FormError.vue'
  import {DATA_PURCHASER as _purchaser} from '../../../data/dnNewSales'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal', 'keyname', 'restricted', 'dispatch'],
    components: {
      cSwitch,
      OnlyMultiSelect,
      Multiselect,
      Avatar,
      FormError
    },
    data () {
      return {
        localidad: [],
        optInput: _purchaser.input,
        titleRazonSocial: 'Nombre',
        titledniRuc: 'DNI',
        titleSwitch: 1,
        lCols: 3,
        owner: null
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isInvalid () {
        return this.$v.item.$invalid
      }
    },
    validations () {
      return _purchaser.validate
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
          this.item.departamento = newVal[0] ? newVal[0].name : ''
          this.item.provincia = newVal[1] ? newVal[1].name : ''
          this.item.distrito = newVal[2] ? newVal[2].name : ''
        }
      }
    },
    methods: {
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
        alert('12')
      },
      searchUser () {
        console.log('CONSULTA USER by Email?')
        let email = this.item.email
        if (email !== '') {
          let url = 'webusers?email=' + email
          let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              console.log(data.content)

              if (data.content.length > 0) {
                this.owner = true
                this.$emit('connection', 'webuser', data.content[0])
                console.log('Tiene duseño')
              } else {
                console.log('No tiene duseño')
                this.owner = null
                this.$emit('connection', 'webuser', null)
              }
            } else {
              console.log('Error: ' + url)
              console.log(data.content)
            }
          })
        }
      }
    },
    created () {
      console.log(JSON.parse(localStorage.getItem('location')))
      let purchaser = JSON.parse(localStorage.getItem('purchaser'))
      if (purchaser) this.localidad = JSON.parse(localStorage.getItem('location'))
      this.dniRUC()
    }
  }
</script>

<style lang="scss">
  .special_radius{
    .multiselect__tags{
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
</style>
