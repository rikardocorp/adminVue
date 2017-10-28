<template>
  <b-card id="fullPrice" class="myCard">
    <div slot="header" class="text-left">
      <strong>Precios</strong> - Busqueda de Precios
    </div>
    <b-form :id="name + nameForm" class="row">
      <div class="col-md-5">
        <b-form-group v-for="(option, index) in optInput" :key="index" :label-sr-only="option.srOnly"
                      :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-left': true}"
                      :label-cols="option.srOnly ? null : lCols"
                      :label="option.label"
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
                       :max-height="200"
                       v-model="item[index]"
                       :options="option.params.options"
                       @blur.native="$v.item[index]? $v.item[index].$touch(): false">
          </multiselect>

          <!-- DATEPICKER -->
          <datepicker v-else-if="option.input=='datepicker'"
                      v-model="registerDate" :format="option.params.format" language="es" :placeholder="option.placeholder"
                      :clear-button="false" :bootstrapStyling="true"
                      :disabled-picker="isLoading"
                      @input="selectDate" calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"
                      @blur.native="$v.item[index]? $v.item[index].$touch(): false"></datepicker>

          <!-- RADIO-GROUP -->
          <b-form-radio-group v-else-if="option.input=='radio-group'" class="radio-group"
                              buttons
                              :button-variant="'outline-' + option.params.variant"
                              :size="option.params.size"
                              v-model="item[index]"
                              :options="option.params.options">
          </b-form-radio-group>

          <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
        </b-form-group>

        <!--<b-form-group label="Numeros de Poliza:" :horizontal="false">-->
        <!--<div class="row">-->
        <!--<div class="col-sm-6 pr-1">-->
        <!--<b-form-input :disabled="isLoading" type="text" v-model.trim="item['numberFrom']"-->
        <!--placeholder="# Desde.."></b-form-input>-->
        <!--</div>-->
        <!--<div class="col-sm-6 pl-1">-->
        <!--<b-form-input :disabled="isLoading" type="text" v-model.trim="item['numberTo']"-->
        <!--placeholder="# Hasta.."></b-form-input>-->
        <!--</div>-->
        <!--</div>-->
        <!--</b-form-group>-->

        <div slot="footer" class="text-right">
          <b-button class="float-left" @click="resetForm(name + nameForm)" :disabled="isLoading" size="sm" variant="outline-secondary"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
          <b-button class="float-right" @click.prevent="processData" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.filter}}</b-button>
        </div>
      </div>
      <div class="col-md-7">
        <datepicker v-model="datepicker.params.value" :format="datepicker.params.format" language="es" :placeholder="datepicker.placeholder"
                    :clear-button="false" :bootstrapStyling="true" calendar-button-icon="fa fa-calendar"
                    :disabled-picker="isLoading"
                    :highlighted="datepicker.params.highlighted"
                    @input="selectDate" :inline="true"
                    calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"></datepicker>

        <!--<div class="row pt-1">-->
          <!--<div class="col-sm-6 text-dark text-right"><span class="text-primary">Del: </span>{{item.dateFrom}}</div>-->
          <!--<div class="col-sm-6 text-dark"><span class="text-primary">Al: </span>{{item.dateTo}}</div>-->
        <!--</div>-->
      </div>
    </b-form>
    <pre>{{item}}</pre>
  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  import {DATA_FORM_PRICE as dataForm} from '../../../data/dnInsurancePrices'
  import Mixin from '../../../mixins'
  import EventBus from '../../../event-bus'
  import FormError from '../../../components/FormError.vue'

  export default {
    props: ['horizontal', 'item', 'nameForm', 'params'],
    mixins: [Mixin],
    components: {
      Multiselect,
      Datepicker,
      FormError
    },
    data () {
      return {
        name: 'form-',
        lCols: 5,
        registerDate: '',
        itemDefault: JSON.parse(JSON.stringify(this.item)),
        optInput: dataForm.input,
        selectedKey: '',
        multiselectKeys: [],
        datepicker: {
          label: 'Fecha Valida',
          placeholder: 'Ingrese una fecha valida',
          type: 'text',
          input: 'datepicker',
          params: {
            key: 'date',
            format: 'dd/MM/yyyy',
            value: '',
            count: 0
          }
        }
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
      async processData () {
        this.$set(this.params, 'isSearch', true)
        let idCompany = this.item.insuranceCompany ? this.item.insuranceCompany.id : ''
        let idUser = this.item.user ? this.item.user.id : ''
        let sold = this.item.sold
        let assign = this.item.assign
        let number = this.item.number
        let dateFrom = this.item.dateFrom
        let dateTo = this.item.dateTo
        // let url = 'insurancepolicies/mypolicies?sold=' + sold + '&insuranceCompanyId=' + idCompany
        let url = 'insurancepolicies?number=' + number + '&insuranceCompanyId=' + idCompany + '&userId=' + idUser + '&sold=' + sold + '&free=' + assign + '&fromDate=' + dateFrom + '&toDate=' + dateTo
        console.log('URL-------')
        console.log(url)
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        if (!self.status) return true
        this.items = self.content
        console.log('self.content')
        console.log(self.content)
        this.$emit('resultFilter', self.content)
        this.$set(this.params, 'isSearch', false)
        this.datepicker.params.count = 0
      },
      selectDate (pickDate) {
        console.log('pickDate')
        console.log(pickDate)
        let newDate = this.tranformDateToFormat(pickDate, '/')
        this.item.date = newDate
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
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.optInput[key].params.value = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.datepicker.params.value = ''
        this.$emit('defaulValue')
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
        }
      })
    },
    mounted () {
      let vm = this
      EventBus.$on('FILTER_POLICY', function () {
        vm.processData()
      })
    }

  }
</script>


<style lang="scss">

  /*.myCard.card{*/
  /*border: 1px solid #ef7b1f;*/
  /*.form-group {*/
  /*margin-bottom: 0.8rem;*/
  /*}*/
  /*.card-header{*/
  /*background: #ffa501;*/
  /*color: white;*/
  /*border-radius: 0.5rem 0.5rem 0 0;*/
  /*}*/
  /*}*/
  #fullPrice{
    .vdp-datepicker__calendar .cell{
      height: 37px;
    }
  }


  .radio-group{
    float: left;
    width: 100%;
    label.btn {
      width: 30%;
      &:first-child{
        width: 40%;
      }
    }
    .active{
      z-index: 0 !important;
    }
  }
</style>
