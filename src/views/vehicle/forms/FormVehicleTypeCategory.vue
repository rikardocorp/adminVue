<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Vehiculos</strong> - Clases y Categorias
    </div>
    <b-form :id="name + urlRest">

      <b-form-group v-for="(option, index) in optInput" :key="index"
                    :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-right': true}"
                    :label-cols="lCols"
                    :label="option.label + ':'"
                    :horizontal="horizontal">

        <!-- INPUT -->
        <b-form-input v-if="option.input==undefined || option.input=='input'"
                      :disabled="isLoading" :type="option.type"
                      v-model.trim="item[index]"
                      @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>

        <!-- TEXTAREA -->
        <b-form-textarea v-else-if="option.input=='textarea'"
                         :disabled="isLoading"
                         v-model.trim="item[index]"
                         :placeholder="option.placeholder+'..'"
                         @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                         :rows="3" :max-rows="6"></b-form-textarea>

        <!-- MULTISELECT -->
        <multiselect v-else-if="option.input=='multiselect'"
                     :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading"
                     v-model="item[index]"
                     :options="option.params.options"
                     @input="selectModelVehicle"
                     @open="openSelect(option.params.key)"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false"></multiselect>

        <!-- MULTISELECT TAG -->
        <multiselect v-else-if="option.input=='multiselect-tag'"
                     class="text-uppercase"
                     :close-on-select="true" :hide-selected="true" :preserve-search="true" :taggable="true" select-label=""
                     :placeholder="option.placeholder" tag-placeholder="Presiona enter para agregar"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading || (option.params.editDisable && update)"
                     v-model="item[index]"
                     :options="option.params.options"
                     @input="selectModelVehicle"
                     @open="openSelect(option.params.key)"
                     @tag="addTag"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false"></multiselect>

        <!-- ERROR MESSAGE-->
        <form-error :data="$v.item[index]? $v.item[index] : {} " :async="true"></form-error>
      </b-form-group>

      <div slot="footer">
        <b-form-group :horizontal="horizontal" :label-cols="lCols">
          <template v-if="!update">
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.submit}}</b-button>
            <b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
          </template>

          <template v-if="update">
            <b-button @click.prevent="processData('UPDATE')" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.update}}</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> {{$global.cancel}}</b-button>
          </template>
        </b-form-group>
      </div>

    </b-form>
    <!--<pre>{{ item }}</pre>-->
  </b-card>

</template>

<script>
  import cSwitch from '../../../components/Switch'
  import {DATA_FORM as dataForm} from '../../../data/dnVehicleTypeCategories'
  import FormError from '../../../components/FormError.vue'
  import Multiselect from 'vue-multiselect'
  import { required, numeric, minValue } from 'vuelidate/lib/validators'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      cSwitch: cSwitch,
      FormError,
      Multiselect
    },
    data () {
      return {
        name: 'form-',
        lCols: 3,
        optInput: dataForm.input,
        selectedKey: '',
        multiselectKeys: []
      }
    },
    validations () {
      dataForm.validate.item.seatNumberTo = {
        required,
        numeric,
        minValue: minValue(this.item.seatNumber)
      }
      return dataForm.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
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
      async insertVehicleType (data) {
        console.log('INSERT VEHICLE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'vehicletypes', data: data})
        return self
      },
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
      },
      selectModelVehicle (selectedOption) {
        console.log(selectedOption)
        let key = this.selectedKey
        if (key === 'brand' && selectedOption !== null) {
          let vehicleBrand = selectedOption.vehicleBrand
          let url = this.optInput['vehicleType'].params.url + vehicleBrand
          this.getOption(url, 'vehicleType')
        }
      },
      openSelect (id) {
        this.selectedKey = id
      },
      async processData (action) {
        let invalid = this.$v.item.$invalid
        let url = !this.item.id ? 'vehicletypecategories' : 'vehicletypecategories/' + this.item.id
        if (!invalid) {
          if (this.item.vehicleType.id === undefined) {
            this.item.vehicleType = {
              vehicleBrand: this.item.brand.vehicleBrand,
              vehicleModel: this.item.vehicleType.vehicleModel
            }
            // INSERT NEW VEHICLE TYPE
            let r1 = await this.insertVehicleType(this.item.vehicleType)
            if (!r1.status) return false
            this.item.vehicleType = r1.content
          }
          let self = this.$store.dispatch('dispatchHTTP', {type: action, url: url, data: this.item})
          self.then((data) => {
            if (data.status) {
              console.log('DATA-CONTENT ' + action)
              console.log(data.content)
              this.addRow(data.content)
              this.resetForm(this.name + this.urlRest)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.item[key] = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.localidad = ''
        this.$v.item.$reset()
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.optInput[index].params.localData}})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
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
  .switch-left{
    float: left;
  }
</style>
