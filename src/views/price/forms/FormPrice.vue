<template>
  <b-card>
    <span id="returnVehicle" class="input-group-addon bg-primary" @click="returnMain">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </span>
    <div slot="header" class="text-center">
      <strong>Registrar Precios</strong>
    </div>
    <p class="color-primary bold h5 text-center">{{ vehicle.vehicleBrand }} - {{ vehicle.vehicleModel}} - Cat. {{ vehicle.category }}</p>
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
                     :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading"
                     v-model="item[index]"
                     :options="option.params.options"

                     @blur.native="$v.item[index]? $v.item[index].$touch(): false">
        </multiselect>

        <!-- DATEPICKER -->
        <datepicker v-else-if="option.input=='datepicker'"
                    v-model="option.params.value" :format="option.params.format" language="es" :placeholder="option.placeholder"
                    :clear-button="false" :bootstrapStyling="true" calendar-button-icon="fa fa-calendar"
                    :disabled-picker="isLoading"
                    :disabled="option.params.disabled"
                    @input="selectDate" calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"
                    @opened="openSelect(option.params.key)"
                    @blur.native="$v.item[index]? $v.item[index].$touch(): false"></datepicker>

        <!-- ERROR MESSAGE-->
        <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
      </b-form-group>

      <div slot="footer">
        <b-form-group :horizontal="horizontal" :label-cols="lCols">
          <template v-if="!update">
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </template>

          <template v-if="update">
            <b-button @click.prevent="processData('UPDATE')" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
          </template>
        </b-form-group>
      </div>

      <!--<pre>{{ item }}</pre>-->
      <!--<pre>{{ vehicle }}</pre>-->

    </b-form>

  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM as dataForm} from '../../../data/dnInsurancePrices'
  //  import Clock from '../../../components/Clock.vue'
  import Mixin from '../../../mixins'
  export default {
    props: ['urlRest', 'item', 'vehicle', 'update', 'horizontal'],
    mixins: [Mixin],
    components: {
      Multiselect,
      Datepicker,
      FormError
    },
    data () {
      return {
        name: 'form-',
        lCols: 4,
        optInput: dataForm.input,
        selectedKey: '',
        multiselectKeys: [],
        datepickerKeys: []
      }
    },
    validations () {
      return dataForm.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      selectDate (pickDate) {
        console.log('pickDate')
        console.log(pickDate)
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
          console.log(newDate)
          console.log(this.tranformFormatToDate(newDate, '/'))
        }
        let key = this.selectedKey
        this.item[key] = newDate
      },
      selectOption (selectedOption) {
        console.log(selectedOption)
        let key = this.selectedKey
        this.item[key] = selectedOption === null ? '' : selectedOption.id
      },
      openSelect (id) {
        console.log('AAAAAAA ' + id)
        this.selectedKey = id
      },
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
      },
      processData (action) {
        let invalid = this.$v.item.$invalid
        let url = !this.item.id ? this.urlRest : this.urlRest + '/' + this.item.id
        if (!invalid) {
          let self = this.$store.dispatch('dispatchHTTP', {type: action, url: url, data: this.item})
          self.then((data) => {
            if (data.status) {
              console.log('DATA-CONTENT ' + action)
              console.log(data.content)
              this.addRow(data.content)
              this.resetForm(this.name + this.urlRest)
            } else {
              console.log('ERRORRR')
              console.log(data)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      },
      setMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          let options = vm.optInput[key].params.options
          let idKey = vm.optInput[key].params.key
          let optionPick = vm.$lodash.filter(options, {'id': vm.item[idKey]})
          if (optionPick.length > 0) {
            vm.optInput[key].params.value = optionPick[0]
          } else {
            vm.optInput[key].params.value = ''
          }
        })
      },
      setDatepicker () {
        let vm = this
        this.$lodash.forEach(this.datepickerKeys, function (key) {
          let optionPick = vm.item[key]
          if (optionPick !== '') {
            let toDay = vm.$moment(optionPick, 'DD/MM/YYYY')
            vm.optInput[key].params.value = toDay.format()
          } else {
            vm.optInput[key].params.value = ''
          }
        })
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.optInput[key].params.value = ''
        })
      },
      resetDatepicker () {
        let vm = this
        this.$lodash.forEach(this.datepickerKeys, function (key) {
          vm.optInput[key].params.value = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetDatepicker()
        this.resetMultiSelect()
        this.$v.item.$reset()
      },
      returnMain () {
        this.resetForm(this.name + this.urlRest)
        this.$emit('returnMain', false)
      }
    },
    watch: {
      item (newVal, oldVal) {
        console.log('WATCH item')
        console.log(newVal)
        console.log(oldVal)
        this.item.vehicleType = this.vehicle
        if (this.update) {
          console.log('WATCH item update')
          this.setMultiSelect()
          this.setDatepicker()
        } else {
          console.log('WATCH item reset')
          this.resetForm(this.name + this.urlRest)
        }
      }
    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optInput, function (value, key) {
        if (vm.optInput[key].input === 'multiselect') {
          vm.multiselectKeys.push(key)
          if (vm.optInput[key].params.loadData) {
            vm.getOption(value.params.url, key)
          } else {
            vm.optInput[key].params.activate = true
          }
        } else if (vm.optInput[key].input === 'datepicker') {
          vm.datepickerKeys.push(key)
          let date = vm.$store.getters.getDateTime.date
          let toDay = vm.$moment(date, 'DD/MM/YYYY').add(1, 'days')
          let day = toDay.get('date')
          let month = toDay.get('month')
          let year = toDay.get('year')
          value.params.disabled.to = new Date(year, month, day)
          value.params.disabled.from = new Date(year + 1, month, day)
        }
      })
    }
  }
</script>

<style lang="scss">
  #returnVehicle{
    position: absolute;
    top: 23px;
    left: -40px;
    font-size: 1rem;
    cursor: pointer;
  }

  .vdp-datepicker{
    .form-control[readonly]{
      background: #f4f3ef;
      border-right: 0;
      z-index: inherit;
    }
    .input-group-addon{
      padding: 0.2rem 0.7rem;
      margin-bottom: 0;
      font-size: 1.4rem;
      color: #999999;
      background-color: #f4f3ef;
      border: 1px solid #e0e0e0;
      border-radius: 0 0.55rem 0.55rem 0;
      border-left: 0;
    }
  }
</style>
