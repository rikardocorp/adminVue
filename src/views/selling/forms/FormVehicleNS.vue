<template>

  <b-form class="col-md-8 col-lg-6 col-xl-5 m-auto pt-3 pb-4" :id="'form' + index">

    <b-form-group v-for="(option, _index) in optInput" :key="_index"
                  :class="{ 'form-group--error': $v.item[_index]? $v.item[_index].$error : false, 'text-left': true}"
                  :label-cols="lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

      <!--<b-form-group class=""-->
      <!--label="Color:"-->
      <!--feedback="feedback"-->
      <!--:state="null"-->
      <!--:horizontal="horizontal" :label-cols="lCols" >-->
      <!--<picker-color :disabled="isLoading || owner" v-model="item.color" :options="options" :size="1.2" :iconShow="true"></picker-color>-->
      <!--</b-form-group>-->

      <!-- INPUT -->
      <b-input-group v-if="option.input==undefined || option.input=='input'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon  "></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>
      </b-input-group>

      <!-- MULTISELECT -->
      <b-input-group v-else-if="option.input=='multiselect'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <multiselect :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder"  class="special_radius"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading || restricted"
                     v-model="item[_index]"
                     :options="option.params.options"
                     @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"></multiselect>
      </b-input-group>

      <!-- INPUT-SEARCH -->
      <b-input-group v-if="option.input=='input-search'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon  "></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.once.native="searchPlate"
                      :placeholder="option.placeholder+'..'"></b-form-input>
        <b-input-group-button>
          <b-btn :disabled="isLoading || restricted" variant="primary" @click="searchPlate"><i class="fa fa-search"></i></b-btn>
        </b-input-group-button>
      </b-input-group>
      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item[_index]? $v.item[_index] : {} "></form-error>
    </b-form-group>
    <!--<pre>{{item}}</pre>-->


  </b-form>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import Avatar from '../../../components/Avatar.vue'
  import {DATA_VEHICLE as _vehicle} from '../../../data/dnNewSales'
  import { required,between } from 'vuelidate/lib/validators'

  export default {
    components: {
      Datepicker,
      Multiselect,
      FormError,
      Avatar
    },
    props: ['urlRest', 'item', 'pickPolice', 'update', 'horizontal', 'index', 'keyname', 'restricted', 'dispatch'],
    data () {
      return {
        optInput: _vehicle.input,
        lCols: 4,
        owner: null,
        value: [],
        color: '',
        selectedKey: '',
        multiselectKeys: []
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isInvalid () {
        return this.$v.item.$invalid
      },
      isClient () {
        return this.$store.state.user.isClient
      }
    },
    validations () {
      if (this.isClient) {
        _vehicle.validate.item.seatNumber = {
          required,
          between: between(this.pickPolice.seatNumber, this.pickPolice.seatNumberTo)
        }
      }
      return _vehicle.validate
    },
    methods: {
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.optInput[index].params.localData}})
        self.then((data) => {
          console.log(data)
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      },
      searchPlate () {
        console.log('CONSULTA PLACA?')
        let plate = this.item.licensePlate
        if (plate !== '') {
          let url = 'vehicles/filter?licensePlate=' + plate + '&strict=1'
          let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              console.log(data.content)
              if (data.content.length > 0) {
                this.owner = true
                this.$set(this.item, 'manufacturingYear', data.content[0].manufacturingYear)
                this.$set(this.item, 'seatNumber', data.content[0].seatNumber)
                this.$set(this.item, 'engineNumber', data.content[0].engineNumber)
//                this.$set(this.item, 'manufacturingYear', data.content.manufacturingYear)
//                this.$emit('connection', this.name, data.content)
                console.log('Tiene duseño')
              } else {
                console.log('No tiene duseño')
                this.owner = false
                this.$emit('connection', this.name, null)
              }
            } else {
              console.log('Error: ' + url)
              console.log(data.content)
            }
          })
        }
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
      }
    },
    created () {
      console.log('this.pickPolice')
      console.log(this.pickPolice)
      if (this.pickPolice !== undefined) {
        let companyId = this.pickPolice.insuranceCompanyId
        // let myUserID = this.$store.state.user.data.id
        let user = JSON.parse(localStorage.getItem('UserLog'))
        // this.item['insurancePolicy'] = ''
        let url = 'insurancepolicies?insuranceCompanyId=' + companyId + '&sold=0&userId=' + user.user.id
        this.getOption(url, 'insurancePolicy')
      }
    }

  }
</script>

<style lang="scss">

  /*.optionColor{*/
  /*position: absolute;*/
  /*right: 0;*/
  /*top: 0;*/
  /*height: 40px;*/
  /*width: 100%;*/
  /*}*/

  .owner-card{
    border-radius: 3.2em 0.5em 0.5em 3.2em;
    background: #f5f5f5;
    border: 1px dashed #b9b9b9;
    padding: 0.4em;

    &.opposite{
      border-radius: 0.5em 3.2em 3.2em 0.5em;
    }

    div.rounded-circle{
      width: 5em;
      height: 5em;
      background: white;
      img{
        margin: 7%;
        width: 86%;
        cursor: pointer;
      }

    }

    .media-body{
      font-size: 0.8em;
      p {
        margin: 0;
      }
      h6 {
        overflow: hidden;
        height: 18px;
      }
    }

  }
</style>
