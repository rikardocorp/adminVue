<template>
  <div>
    <div class="cover" v-if="disabled"></div>
    <datepicker v-model="date" :format="params.format" language="es"
                :clear-button="false" :bootstrapStyling="true" calendar-button-icon="fa fa-calendar"
                :disabled-picker="disabled"
                :highlighted="params.highlighted"
                @input="selectDate" :inline="inline"
                :calendar-class="{'myDatepicker-style': true, 'localOpacity': disabled, 'datepicker-error': error}"
                wrapper-class="myDatepicker-content"></datepicker>
    <div v-if="range" :class="{'row pt-1': true, 'date-error': error}">
      <div class="col-6 col-sm-6 text-dark text-right"><span class="text-primary">Del: </span>{{item.dateFrom}}</div>
      <div class="col-6 col-sm-6 text-dark"><span class="text-primary">Al: </span>{{item.dateTo}}</div>
    </div>
    <!--<pre>{{ value }}</pre>-->
  </div>
</template>


<script>
  import Datepicker from 'vuejs-datepicker'
  export default {
    props: {
      value: {
        default: ''
      },
      disabled: {
        default: false
      },
      range: {
        default: false
      },
      inline: {
        default: true
      },
      error: {
        default: false
      },
      params: {
        default () {
          return {
            highlighted: {
              to: null,
              from: null
            },
            format: 'dd/MM/yyyy',
            count: 0
          }
        }
      }
    },
    watch: {
      value (newVal) {
        if (newVal === '') {
          this.item = {
            dateFrom: '',
            dateTo: ''
          }
          this.$set(this.params, 'count', 0)
          this.$set(this.params, 'highlighted', {to: null, from: null})
          this.date = ''
        } else if (typeof newVal === 'object') {
          if (newVal.dateFrom) {
            this.date = ''
            this.highlighted(newVal)
          }
        }
      }
    },
    data () {
      return {
        item: {
          dateFrom: '',
          dateTo: ''
        },
        date: ''
      }
    },
    components: {
      Datepicker
    },
    methods: {
      tranformDateToFormat (myDate, sep) {
        // myDate -> new Date
        // sep    -> string
        let day = myDate.getDate()
        day = day >= 10 ? day : '0' + day
        let month = myDate.getMonth() + 1
        month = month >= 10 ? month : '0' + month
        let year = myDate.getFullYear()
        return day + sep + month + sep + year
      },
      selectDate (pickDate) {
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
          if (this.range) {
            if (this.params.count === 0) {
              this.params.count++
              this.params.highlighted.from = pickDate
              this.params.highlighted.to = pickDate
              this.$set(this.item, 'dateFrom', newDate)
              this.$set(this.item, 'dateTo', '')
              this.$emit('input', {})
            } else {
              this.params.count = 0
              let a = this.$moment(this.item.dateFrom, 'DD/MM/YYYY')
              let b = this.$moment(newDate, 'DD/MM/YYYY')
              let max = this.$moment.max(a, b)
              let min = this.$moment.min(a, b)
              this.params.highlighted.from = min
              this.params.highlighted.to = max
              this.$set(this.item, 'dateFrom', min._i)
              this.$set(this.item, 'dateTo', max._i)
              this.$emit('input', this.item)
            }
          } else {
            this.$emit('input', newDate)
          }
        }
      },
      highlighted (item) {
        let a = this.$moment(item.dateFrom, 'DD/MM/YYYY')
        let b = this.$moment(item.dateTo, 'DD/MM/YYYY')
        this.params.highlighted.from = a
        this.params.highlighted.to = b
        this.$set(this.item, 'dateFrom', a._i)
        this.$set(this.item, 'dateTo', b._i)
      }
    }
  }
</script>


<style lang="scss">
  .localOpacity{
    opacity: 0.5;
  }
  .datepicker-error{
    border: 1px solid red !important;
  }
  .date-error{
    div{
      span{
        color: red !important;
      }
    }
  }
</style>
