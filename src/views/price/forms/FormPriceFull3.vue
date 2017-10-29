<template>
  <b-card class="myCard fullPrice">
    <div slot="header" class="text-center">
      <slot name="title"></slot>
    </div>

    <b-form :id="id">
      <b-form-group v-for="(option, index) in optInput" :key="index" :label-sr-only="option.srOnly"
                    :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-left': true}"
                    :label-cols="option.srOnly ? null : lCols"
                    :label="option.label"
                    :horizontal="horizontal">

        <!-- INPUT -->
        <b-form-input v-if="option.input==undefined || option.input=='input'"
                      :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[index]"
                      @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>

        <!-- TEXTAREA -->
        <b-form-textarea v-else-if="option.input=='textarea'"
                         :disabled="isLoading || restricted"
                         v-model.trim="item[index]"
                         :placeholder="option.placeholder+'..'"
                         @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                         :rows="3" :max-rows="6"></b-form-textarea>

        <!-- MULTISELECT -->
        <multiselect v-else-if="option.input=='multiselect'"
                     :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder" :allow-empty="false"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading || disabled"
                     :max-height="200"
                     v-model="item[index]"
                     :options="option.params.options"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false">
        </multiselect>

        <!-- MULTISELECT RESTRICTED -->
        <multiselect v-else-if="option.input=='multiselect-restricted'"
                     :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder" :allow-empty="false"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading || restricted"
                     :max-height="200"
                     v-model="item[index]"
                     :options="option.params.options"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false">
        </multiselect>

        <!-- DATEPICKER -->
        <datepicker v-else-if="option.input=='datepicker'"
                    v-model="registerDate" :format="option.params.format" language="es" :placeholder="option.placeholder"
                    :clear-button="false" :bootstrapStyling="true"
                    :disabled-picker="isLoading || restricted"
                    @input="selectDate" calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"
                    @blur.native="$v.item[index]? $v.item[index].$touch(): false"></datepicker>

        <!-- RADIO-GROUP -->
        <b-form-radio-group v-else-if="option.input=='radio-group'" class="radio-group"
                            buttons
                            :button-variant="'outline-' + option.params.variant"
                            :size="option.params.size"
                            v-model="item[index]"
                            :disabled="isLoading || disabled"
                            @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                            :options="option.params.options">
        </b-form-radio-group>

        <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
      </b-form-group>
      <div slot="footer" class="text-right">
        <b-button v-if="restricted" class="float-left" @click="resetForm(id, true)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
        <b-button v-else="" class="float-left" @click="resetForm(id)" :disabled="isLoading" size="sm" variant="outline-secondary"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
        <b-button class="float-right" @click.prevent="eventForm" :disabled="isLoading || restricted" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Generar</b-button>
      </div>
    </b-form>
    <!--<pre>{{item}}</pre>-->
  </b-card>
</template>

<script>
  import CalendarInline from '../../../components/CalendarInline.vue'
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM_PRICE as dataForm} from '../../../data/dnInsurancePrices'
  export default {
    name: 'formPriceFull',
    props: ['horizontal', 'id', 'item', 'listCalendarPrices', 'disabled'],
    components: {
      Multiselect,
      Datepicker,
      FormError,
      CalendarInline
    },
    data () {
      return {
        lCols: 5,
        optInput: dataForm.input,
        multiselectKeys: [],
        restricted: false,
        fecha: ''
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
    watch: {
      listCalendarPrices (newVal) {
        this.optInput.priceCalendar.params.options = newVal
      }
    },
    methods: {
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.optInput[key].params.value = ''
        })
      },
      resetForm (formId, type = false) {
        if (!type) {
          document.getElementById(formId).reset()
          this.resetMultiSelect()
          this.fecha = ''
          this.$v.item.$reset()
          this.$emit('defaulValue')
        } else {
          this.$dialog.confirm('Existen modificaciones sin guardar, ¿Desea continuar?')
            .then((dialog) => {
              this.restricted = false
              this.$emit('defaulValue', true)
              dialog.close()
            })
            .catch(() => {
              console.log('Clicked on cancel')
            })
        }
      },
      eventForm () {
        let invalid = this.$v.item.$invalid
        if (!invalid) {
          this.$emit('eventForm')
          this.restricted = true
        } else {
          this.$v.item.$touch()
        }
      }
    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optInput, function (value, key) {
        if (vm.optInput[key].input === 'multiselect' || vm.optInput[key].input === 'multiselect-restricted') {
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
  .fullPrice{
    .vdp-datepicker{
      width: auto;
    }
    .vdp-datepicker__calendar .cell{
      height: 37px;
    }

    .localOpacity{
      opacity: 0.5;
    }

    .radio-group{
      float: left;
      width: 100%;
      label.btn {
        width: 55%;
        &:first-child{
          width: 45%;
        }
      }
      .active{
        z-index: 0 !important;
      }
    }
  }
</style>
