<template>
  <b-form :id="'forms-'+ urlRest" class="col-md-8 col-lg-8 col-xl-6 m-auto pt-3">
    <b-form-group v-for="(option, index) in optInput" :key="index"
                  :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-right': true, 'separator': option.input === 'separator'}"
                  :label-cols="lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

      <!-- INPUT -->
      <b-input-group v-if="option.input==undefined || option.input=='input'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[index]"
                      @blur.native="$v.item[index]? $v.item[index].$touch(): false"
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
                     v-model="item[index]"
                     :options="option.params.options"
                     @input="selectOption"
                     @open="openSelect(option.params.key)"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false"></multiselect>
      </b-input-group>


      <!-- MULTISELECT TAG -->
      <b-input-group v-else-if="option.input=='multiselect-tag'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <multiselect class="text-uppercase special_radius"
                     :close-on-select="true" :hide-selected="true" :preserve-search="true" :taggable="true" select-label=""
                     :placeholder="option.placeholder" tag-placeholder="Presiona enter para agregar"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading || restricted"
                     v-model="item[index]"
                     :options="option.params.options"
                     @input="selectModelVehicle"
                     @open="openSelect(option.params.key)"
                     @tag="addTag"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false"></multiselect>
      </b-input-group>

      <!--<multiselect v-model="value"-->
                   <!--tag-placeholder="Add this as new tag" placeholder="Search or add a tag"-->
                   <!--:label="option.params.label" :track-by="option.params.label"-->
                   <!--:options="options" :multiple="true" :taggable="true"></multiselect>-->
      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
    </b-form-group>

  </b-form>

</template>


<script>
  import {DATA_VEHICLETYPE as _vehicleType} from '../../../data/dnNewSales'
  import FormError from '../../../components/FormError.vue'
  import Multiselect from 'vue-multiselect'

  export default {
    props: ['horizontal', 'data', 'item', 'urlRest', 'restricted', 'dispatch'],
    components: {
      FormError,
      Multiselect
    },
    data () {
      return {
        lCols: 4,
        optInput: _vehicleType.input,
        selectedKey: '',
        multiselectKeys: []
      }
    },
    validations () {
      return _vehicleType.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isInvalid () {
        return this.$v.item.$invalid
      }
    },
    methods: {
      addTag (newTag) {
        newTag = newTag.toUpperCase()
        console.log(newTag)
        let key = this.selectedKey
        let tag = {}
        if (key === 'brand') {
          tag = {
            vehicleBrand: newTag,
            vehicleModel: ''
          }
          this.optInput['vehicleType'].params.options = []
          this.item['vehicleType'] = null
        } else if (key === 'vehicleType') {
          tag = {
            vehicleBrand: '',
            vehicleModel: newTag
          }
        }
        this.optInput[key].params.options.push(tag)
        this.item[key] = tag
      },
      selectOption (selectedOption) {
        let key = this.selectedKey
        console.log(selectedOption)
        if (key === 'policyType') {
          if (selectedOption === null) {
            this.optInput['insurancePolicy'].params.options = []
            this.item['insurancePolicy'] = ''
          } else {
            let companyId = this.item.insuranceCompany.id
            let myUserID = this.$store.state.user.data.id
            let policyType = selectedOption.id
            this.item['insurancePolicy'] = ''
            let url = 'insurancepolicies?insuranceCompanyId=' + companyId + '&sold=0&userId=' + myUserID + '&policyType=' + policyType
            this.getOption(url, 'insurancePolicy')
          }
        } else if (key === 'insuranceCompany') {
          this.optInput['insurancePolicy'].params.options = []
          this.item['insurancePolicy'] = ''
          this.item['policyType'] = ''
        }
      },
      selectModelVehicle (selectedOption) {
        let key = this.selectedKey
        console.log(selectedOption)
        if (key === 'brand') {
          if (selectedOption === null) {
            this.optInput['vehicleType'].params.options = []
            this.item['vehicleType'] = ''
          } else {
            let vehicleBrand = selectedOption.vehicleBrand
            this.item['vehicleType'] = ''
            let url = this.optInput['vehicleType'].params.url + vehicleBrand
            this.getOption(url, 'vehicleType')
          }
        }
      },
      openSelect (id) {
        this.selectedKey = id
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.optInput[index].params.localData}})
        self.then((data) => {
          console.log(data)
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      }
    },
    watch: {
      isInvalid (newVal) {
        // alert('valid :' + newVal)
        this.$emit('connection', 'isValid', newVal)
      },
      dispatch () {
        console.log('VALIDAAAAAAAAA')
        console.log(this.isInvalid + ' ffweffw')
        this.$v.item.$touch()
      }
    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optInput, function (value, key) {
        if (vm.optInput[key].input === 'multiselect' || vm.optInput[key].input === 'multiselect-tag') {
          vm.multiselectKeys.push(key)
          if (vm.optInput[key].params.loadData) {
            vm.getOption(value.params.url, key)
          } else {
            vm.optInput[key].params.activate = true
          }
        }
      })
    }
  }
</script>

<style lang="scss">
  .multiselect.text-uppercase {
    input{
      text-transform: uppercase;
    }
  }

</style>
