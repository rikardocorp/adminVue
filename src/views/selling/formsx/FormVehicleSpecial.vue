<template>

  <b-form class="col-md-9 col-lg-9 col-xl-6 m-auto pt-3 pb-4" :id="'form' + index">
    <!--<pre>this.insurancePolicy {{insurancePolicy == null ? 'rikardocorp': insurancePolicy}}</pre>-->
    <!--<div class="d-flex justify-content-center mb-2 mySwitch">-->
      <!--<toggle-button :labels="{checked: 'Web', unchecked: 'Manual'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(99, 193, 222)'}"-->
                     <!--:disabled="isLoading || restricted" :width="85" :height="28" :sync="true"-->
                     <!--v-model="item.policyType" @change="changePolicy" class="mr-2">-->
      <!--</toggle-button>-->
    <!--</div>-->

    <b-form-group v-for="(option, _index) in optInput" :key="_index"
                  :class="{ 'form-group--error': $v.item[_index]? $v.item[_index].$error : false, 'text-left': true}"
                  :label-cols="lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

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
                      @blur.native="searchPlate"
                      :placeholder="option.placeholder+'..'"></b-form-input>
        <b-input-group-button>
          <b-btn :disabled="isLoading || restricted" variant="primary" @click="searchPlate"><i class="fa fa-search"></i></b-btn>
        </b-input-group-button>
      </b-input-group>
      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item[_index]? $v.item[_index] : {} "></form-error>
    </b-form-group>

  </b-form>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import ToggleButton from '../../../components/ToggleButton.vue'
  import Avatar from '../../../components/Avatar.vue'
  import {DATA_VEHICLE2 as _vehicle} from '../../../data/dnNewSales'
  import { required, between } from 'vuelidate/lib/validators'

  export default {
    components: {
      Datepicker,
      Multiselect,
      FormError,
      Avatar,
      ToggleButton
    },
    props: ['name', 'urlRest', 'item', 'pickPolice', 'insurancePolicy','update', 'horizontal', 'index', 'keyname', 'restricted', 'dispatch'],
    data () {
      return {
        optInput: _vehicle.input,
        lCols: 4,
        owner: null,
        value: [],
        color: '',
        selectedKey: '',
        multiselectKeys: [],
        policyType: ''
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
      return _vehicle.validate
    },
    methods: {
      // loadOptionsPolicy (policyAdd = null) {
      //   let companyId = this.pickPolice.insuranceCompanyId
      //   let user = JSON.parse(localStorage.getItem('UserLog'))
      //   let policyType = this.item.policyType === 1 ? 'W' : 'M'
      //   let url = 'insurancepolicies?insuranceCompanyId=' + companyId + '&sold=0&userId=' + user.user.id + '&policyType=' + policyType
      //   this.getOption(url, 'insurancePolicy', policyAdd)
      // },
      // changePolicy () {
      //   if (this.pickPolice !== undefined) {
      //     let extra = null
      //     this.item.insurancePolicy = ''
      //     let companyId = this.pickPolice.insuranceCompanyId
      //     let user = JSON.parse(localStorage.getItem('UserLog'))
      //     let policyType = this.item.policyType === 1 ? 'W' : 'M'
      //     let url = 'insurancepolicies?insuranceCompanyId=' + companyId + '&sold=0&userId=' + user.user.id + '&policyType=' + policyType
      //     if (this.insurancePolicy != null) {
      //       extra = this.insurancePolicy.policyType === policyType ? this.insurancePolicy : null
      //     }
      //     this.getOption(url, 'insurancePolicy', extra)
      //   }
      // },
      // getOption (urlRest, index, optionAdd = null) {
      //   let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.optInput[index].params.localData}})
      //   self.then((data) => {
      //     console.log(data)
      //     if (data.status) {
      //       if (optionAdd !== null) {
      //         data.content.unshift(optionAdd)
      //       }
      //       this.optInput[index].params.options = data.content
      //       this.optInput[index].params.activate = true
      //     }
      //   })
      // },
      searchPlate () {
        let plate = this.item.licensePlate
        if (plate !== '') {
          let url = 'vehicles/filter?licensePlate=' + plate + '&strict=1'
          let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              let selectData = data.content.pop()
              if (selectData) {
                this.owner = true
                this.$set(this.item, 'manufacturingYear', selectData.manufacturingYear)
                this.$set(this.item, 'seatNumber', selectData.seatNumber)
                this.$set(this.item, 'engineNumber', selectData.engineNumber)
                console.log('Tiene duseño')
              } else {
                // let policy = {...this.item.insurancePolicy}
                let licensePlate = this.item.licensePlate
                this.$emit('connection', this.name, this.name, null)
                // this.$emit('connection', this.name, 'insurancePolicy', policy)
                this.$emit('connection', this.name, 'licensePlate', licensePlate)

                this.$v.item.$reset()
                this.owner = false
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
        this.$emit('connection', this.name, 'isValid', newVal)
      },
      dispatch () {
        this.$v.item.$touch()
      }
    },
    // mounted () {
    //   this.loadOptionsPolicy(this.item.insurancePolicy)
    // }

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
