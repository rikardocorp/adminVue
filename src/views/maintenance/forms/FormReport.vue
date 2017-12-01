<template>
  <b-card class="myCard">
    <div slot="header" class="text-left">
      <strong>Reportes</strong> - Filtros de reportes
    </div>
    <b-form :id="name + nameForm" class="row">
      <div class="col-md-12">
        <!-- MULTISELECT -->
        <multiselect :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="insuranceCompany.placeholder"
                     :label="insuranceCompany.params.label" :track-by="insuranceCompany.params.label"
                     :loading="!insuranceCompany.params.activate"
                     :disabled="!insuranceCompany.params.activate || isLoading"
                     :max-height="200"
                     v-model="item.insuranceCompany"
                     :options="insuranceCompany.params.options">
        </multiselect>

        <br>

        <datepicker v-model="datepicker.params.value" :format="datepicker.params.format" language="es" :placeholder="datepicker.placeholder"
                    :clear-button="false" :bootstrapStyling="true" calendar-button-icon="fa fa-calendar"
                    :disabled-picker="isLoading"
                    :highlighted="datepicker.params.highlighted"
                    @input="selectDate" :inline="true"
                    calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"></datepicker>

        <div class="row pt-1">
          <div class="col-6 col-sm-6 text-dark text-right"><span class="text-primary">Del: </span>{{item.dateFrom}}</div>
          <div class="col-6 col-sm-6 text-dark"><span class="text-primary">Al: </span>{{item.dateTo}}</div>
        </div>
        <div slot="footer" class="text-center pt-4">
          <b-button @click="resetForm(name + nameForm)" :disabled="isLoading" size="sm" variant="outline-secondary"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
        </div>
      </div>
    </b-form>
  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  import Mixin from '../../../mixins'
  export default {
    props: ['horizontal', 'item', 'nameForm'],
    mixins: [Mixin],
    components: {
      Multiselect,
      Datepicker
    },
    data () {
      return {
        name: 'report',
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
        },
        insuranceCompany: {
          label: 'Aseguradora',
          placeholder: 'Compañia de Seguro',
          type: 'text',
          input: 'multiselect',
          srOnly: true,
          params: {
            url: 'insurancecompanies',
            key: 'insuranceCompany',
            label: 'name',
            options: [],
            activate: false,
            loadData: true,
            value: ''
          }
        }
      }
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
      getOption (urlRest) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.insuranceCompany.params.options = data.content
            this.insuranceCompany.params.activate = true
          }
        })
      },
      resetDatepicker () {
        this.datepicker.params.highlighted.from = null
        this.datepicker.params.highlighted.to = null
        this.item.dateFrom = ''
        this.item.dateTo = ''
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetDatepicker()
        this.item.insuranceCompany = null
        this.datepicker.params.count = 0
        this.datepicker.params.value = ''
      }
    },
    created () {
      this.getOption(this.insuranceCompany.params.url)
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
