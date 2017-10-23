<template>

  <b-card class="myCard listSales">
    <div slot="header" class="text-left">
      <strong>Polizas</strong> - Filtros de busqueda
    </div>
    <b-form :id="name + nameForm" class="row">
      <div class="col-md-4 myLegend">
        <h6 class="mt-2" style="color: #ffa505;">Leyenda de Estados</h6>
        <ul class="list-group mt-3">
          <li class="list-group-item justify-content-between">
            <span class="badge badge-secondary badge-pill" style="background: #6f6f6f">&nbsp;&nbsp;</span>
            Todos los estados.
          </li>
          <li class="list-group-item justify-content-between">
            <span class="badge badge-danger badge-pill">&nbsp;&nbsp;</span>
            Venta en Proceso - Poliza asignada.
          </li>
          <li class="list-group-item justify-content-between">
            <span class="badge badge-primary badge-pill">&nbsp;&nbsp;</span>
            Venta en Proceso - Contratante.
          </li>
          <li class="list-group-item justify-content-between">
            <span class="badge badge-info badge-pill">&nbsp;&nbsp;</span>
            Venta terminada - Credito
          </li>
          <li class="list-group-item justify-content-between">
            <span class="badge badge-success badge-pill">&nbsp;&nbsp;</span>
            Venta terminada
          </li>
          <li class="list-group-item justify-content-between">
            <span class="badge bg-white badge-pill" style="border: 1px solid gray;">&nbsp;&nbsp;</span>
            Documento PDF asignado
          </li>
          <!--<li class="list-group-item justify-content-between">-->
            <!--<span class="badge badge-default badge-pill">5</span>-->
            <!--Documento PDF asignado-->
          <!--</li>-->
        </ul>
      </div>
      <div class="col-md-4">
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

          <!-- RADIO-GROUP -->
          <b-form-radio-group v-else-if="option.input=='radio-group'" class="radio-group" buttons
                              :button-variant="'outline-' + option.params.variant"
                              :size="option.params.size"
                              v-model="item[index]"
                              :options="option.params.options">
          </b-form-radio-group>

        </b-form-group>
        <div slot="footer" class="text-right">
          <b-button class="float-left" @click="resetForm(name + nameForm)" :disabled="isLoading" size="sm" variant="outline-secondary"><i class="fa fa-ban"></i> Reset</b-button>
          <b-button class="float-right" @click.prevent="processData" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Filtrar</b-button>
        </div>
      </div>
      <div class="col-md-4">
        <datepicker v-model="datepicker.params.value" :format="datepicker.params.format" language="es" :placeholder="datepicker.placeholder"
                    :clear-button="false" :bootstrapStyling="true" calendar-button-icon="fa fa-calendar"
                    :disabled-picker="isLoading"
                    :highlighted="datepicker.params.highlighted"
                    @input="selectDate" :inline="true"
                    calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"></datepicker>

        <div class="row pt-1">
          <div class="col-sm-6 text-dark text-right"><span class="text-primary">Del: </span>{{item.dateFrom}}</div>
          <div class="col-sm-6 text-dark"><span class="text-primary">Al: </span>{{item.dateTo}}</div>
        </div>
      </div>
    </b-form>
    <!--<pre>{{item}}</pre>-->
  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  import {DATA_FORM_FILTER as dataFormFilter} from '../../../data/dnSales'
  import Mixin from '../../../mixins'
  import EventBus from '../../../event-bus'
  export default {
    props: ['horizontal', 'item', 'nameForm', 'params'],
    mixins: [Mixin],
    components: {
      Multiselect,
      Datepicker
    },
    data () {
      return {
        name: 'form-',
        lCols: 3,
        itemDefault: JSON.parse(JSON.stringify(this.item)),
        optInput: dataFormFilter.input,
        selectedKey: '',
        multiselectKeys: [],
        datepicker: {
          label: 'Fecha Valida',
          placeholder: 'Ingrese una fecha valida',
          type: 'text',
          input: 'datepicker',
          params: {
            key: 'date',
            highlighted: {
              to: null,
              from: null
            },
            format: 'dd/MM/yyyy',
            value: '',
            count: 0
          }
        }
      }
    },
    validations () {
      return dataFormFilter.validate
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
        let regionId = this.item.region ? this.item.region.id : ''
        let state = this.item.state
        let number = this.item.number
        let dniRuc = this.item.dniRuc
        let dateFrom = this.item.dateFrom
        let dateTo = this.item.dateTo
        // let url = 'insurancepolicies/mypolicies?sold=' + sold + '&insuranceCompanyId=' + idCompany
        // let url = 'insurancepolicies?number=' + number + '&insuranceCompanyId=' + idCompany + '&userId=' + idUser + '&sold=' + sold + '&free=' + assign + '&fromDate=' + dateFrom + '&toDate=' + dateTo
        let url = 'sales?dateFrom='+dateFrom+'&dateTo='+dateTo+'&regionId='+regionId+'&insurancePolicyNumber='+number+'&purchaserDniRuc='+dniRuc+'&insuranceCompanyId='+idCompany+'&state='+state
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
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
          if (this.datepicker.params.count === 0) {
            this.datepicker.params.count++
            this.datepicker.params.highlighted.from = pickDate
            this.datepicker.params.highlighted.to = pickDate
            this.$set(this.item, 'dateFrom', newDate)
            this.$set(this.item, 'dateTo', '')
          } else {
            this.datepicker.params.count = 0
            let a = this.$moment(this.item.dateFrom, 'DD/MM/YYYY')
            let b = this.$moment(newDate, 'DD/MM/YYYY')
            let max = this.$moment.max(a, b)
            let min = this.$moment.min(a, b)
            this.datepicker.params.highlighted.from = min
            this.datepicker.params.highlighted.to = max
            this.$set(this.item, 'dateFrom', min._i)
            this.$set(this.item, 'dateTo', max._i)
          }
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
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.optInput[key].params.value = ''
        })
      },
      resetDatepicker () {
        this.datepicker.params.highlighted.from = null
        this.datepicker.params.highlighted.to = null
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetDatepicker()
        this.resetMultiSelect()
        this.datepicker.params.count = 0
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
  .listSales{
    .vdp-datepicker__calendar .cell{
      height: 35px;
      line-height: 35px;
    }

    .radio-group{
      label{
        cursor: pointer;
      }
      label:nth-child(1){
        background: #6f6f6f;
      }
      label:nth-child(2){
        background: #f96d6c;
      }
      label:nth-child(3){
        background: #ef7b21;
      }
      label:nth-child(4){
        background: #63c1de;
      }
      label:nth-child(5){
        background: #4ebc75;
      }
      label:nth-child(6){
        background: white;
      }
    }
    .myLegend{
      ul.list-group{
        border: none;
        li.list-group-item{
          border: none;
          padding: 9px 0;
        }

      }
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
