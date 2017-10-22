<template>
  <b-form :id="'forms-'+ urlRest" class="col-md-8 col-lg-8 col-xl-6 m-auto pt-3">
    <div class="col-md-9 m-auto pb-2 myPoliza">
      <!--<div class="d-flex justify-content-center mb-1">-->
        <!--<div class="img bg-primary d-flex align-items-center ">-->
          <!--<img :src="'static/img/company/' + data.pickPolice.item.insuranceCompanyId + '.png'" alt="">-->
        <!--</div>-->
      <!--</div>-->
      <div class="title text-center mb-1 mt-2" style="color: #2ca710;">
        <p class="mb-0">Total</p>
        <span class="fa-1x">s/.</span> <span class="h3">{{ data.pickPolice.item.price | currency }}</span>
      </div>
    </div>

    <div class="d-flex justify-content-center mb-2 mySwitch">
      <toggle-button :labels="{checked: 'Efectivo', unchecked: 'Targeta'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(99, 193, 222)'}"
                     :disabled="isLoading || restricted" :width="85" :height="28" :sync="true"
                     v-model="item.paymentType" @change="" class="mr-2">
      </toggle-button>
    </div>

    <b-form-group v-for="(option, _index) in optInput" :key="_index" :label-sr-only="option.srOnly"
                  v-show="option.show==undefined || option.show"
                  :class="{ 'form-group--error': $v.item[_index]? $v.item[_index].$error : false, 'text-left': true, 'separator': option.input === 'separator'}"
                  :label-cols="option.srOnly ? null : lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

      <!-- INPUT -->
      <b-input-group v-if="option.input==undefined || option.input=='input'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>
      </b-input-group>

      <!-- TEXTAREA -->
      <b-form-textarea v-else-if="option.input=='textarea'"
                       :disabled="isLoading || restricted"
                       v-model.trim="item[_index]"
                       :placeholder="option.placeholder+'..'"
                       @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"
                       :rows="4" :max-rows="8"></b-form-textarea>
      <!-- DATEPICKER -->
      <b-input-group v-else-if="option.input=='datepicker'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon"></i></b-input-group-addon>
        <datepicker v-model="datepicker" :format="option.params.format" language="es" :placeholder="option.placeholder"
                    class="special_radius"
                    :clear-button="false" :bootstrapStyling="true"
                    :disabled-picker="isLoading || restricted"
                    :disabled="option.params.disabled"
                    @input="selectDate" calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"
                    @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"></datepicker>
      </b-input-group>
      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item[_index]? $v.item[_index] : {} " :async="true"></form-error>
    </b-form-group>

    <!--<pre>{{ item }}</pre>-->

    <!--<div class="col-md-9 m-auto pt-3 pb-4 myPoliza">-->
      <!--<div class="title text-center h3 mb-3 text-primary">-->
        <!--Seguro {{ data.pickPolice.item.insuranceTypeName }}-->
      <!--</div>-->

      <!--<div class="d-flex justify-content-center mb-3">-->
        <!--<div class="img bg-primary d-flex align-items-center ">-->
          <!--&lt;!&ndash;<span class="align-self-center">{{ altError(pickPolice.insuranceCompanyName) }}</span>&ndash;&gt;-->
          <!--<img :src="'static/img/company/' + data.pickPolice.item.insuranceCompanyId + '.png'" alt="">-->
        <!--</div>-->
      <!--</div>-->

      <!--<b-form-group class="text-right"-->
                    <!--label="Contratante:"-->
                    <!--:horizontal="horizontal" :label-cols="lCols">-->
        <!--<p class="p-icon"><i class="fa fa-user text-primary"></i></p>-->
        <!--<p class="p-text">{{ data.purchaser.item.razonSocial }}</p>-->
      <!--</b-form-group>-->

      <!--<b-form-group class="text-right"-->
                    <!--label="Numero Poliza:"-->
                    <!--:horizontal="horizontal" :label-cols="lCols">-->
        <!--<p class="p-icon"><i class="fa fa-hashtag text-primary"></i></p>-->
        <!--<p class="p-text">{{ data.sale.item.insurancePolicy ? data.sale.item.insurancePolicy.number : '???' }}</p>-->
      <!--</b-form-group>-->

      <!--<b-form-group class="text-right"-->
                    <!--label="Fecha:"-->
                    <!--:horizontal="horizontal" :label-cols="lCols">-->
        <!--<p class="p-icon"><i class="fa fa-calendar-check-o text-primary"></i></p>-->
        <!--<p class="p-text">{{ nowDate }} {{ nowTime }}</p>-->
      <!--</b-form-group>-->

      <!--<b-form-group class="text-right"-->
                    <!--label="Vehiculo:"-->
                    <!--:horizontal="horizontal" :label-cols="lCols">-->
        <!--<p class="p-icon"><i class="fa fa-car text-primary"></i></p>-->
        <!--<p class="p-text">{{ data.vehicle.item.licensePlate }}</p>-->
      <!--</b-form-group>-->

      <!--<div class="title text-center mb-1 mt-4" style="color: #2ca710;">-->
        <!--<span class="fa-1x">Total: s/.</span> <span class="h2">{{ data.pickPolice.item.price | currency }}</span>-->
      <!--</div>-->

      <!--&lt;!&ndash; formulario &ndash;&gt;-->
      <!--<div class="dropbox  mt-4">-->
        <!--<b-form-group class="text-right mb-3 mt-2"-->
                      <!--label="Descuento:"-->
                      <!--:horizontal="horizontal" :label-cols="lCols">-->
          <!--<b-form-input :disabled="isLoading" type="text"-->
                        <!--v-model.trim="item.discount"-->
                        <!--placeholder="Descuento de venta..."></b-form-input>-->
        <!--</b-form-group>-->

        <!--<b-form-group class="text-right mb-3"-->
                      <!--label="Metodo de Pago:"-->
                      <!--:horizontal="horizontal" :label-cols="lCols">-->
          <!--<b-form-input :disabled="isLoading" type="text"-->
                        <!--v-model.trim="item.currency"-->
                        <!--placeholder="Metodo de pago..."></b-form-input>-->
        <!--</b-form-group>-->

        <!--<b-form-group class="text-right mb-3"-->
                      <!--label="Observacion:"-->
                      <!--:horizontal="horizontal" :label-cols="lCols">-->
          <!--<b-form-textarea :disabled="isLoading"-->
                           <!--v-model.trim="item.observation"-->
                           <!--placeholder="Observacion opcional..."-->
                           <!--:rows="3" :max-rows="6"></b-form-textarea>-->
        <!--</b-form-group>-->
      <!--</div>-->
    <!--</div>-->
  </b-form>
</template>

<script>
  import { required, between, numeric } from 'vuelidate/lib/validators'
  import {DATA_PAY as _pay} from '../../../data/dnNewSales'
  import FormError from '../../../components/FormError.vue'
  import Datepicker from 'vuejs-datepicker'
  import ToggleButton from '../../../components/ToggleButton.vue'
  import Mixin from '../../../mixins'

  export default {
    props: ['horizontal', 'data', 'item', 'urlRest', 'restricted', 'dispatch'],
    mixins: [Mixin],
    components: {
      FormError,
      Datepicker,
      ToggleButton
    },
    data () {
      return {
        lCols: 4,
        datepicker: '',
        optInput: _pay.input,
        razonSocial: '',
        policyNumber: '',
        nowDate: '',
        nowTime: '',
        plate: '',
        pickPolice: {},
        vehicle: {},
        purchaser: {}
      }
    },
    validations () {
      _pay.validate.item.amount = {
        required,
        between: between(0, this.newPrice)
      }
      _pay.validate.item.discount = {
        between: between(0, this.data.pickPolice.item.price)
      }
      return _pay.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isInvalid () {
        return this.$v.item.$invalid
      },
      expenseUser () {
        return this.$store.state.user.data.expense
      },
      newPrice () {
        return this.data.pickPolice.item.price - this.item.discount
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
      },
      expenseUser (newVal, oldVal) {
        if (newVal !== undefined) {
          this.optInput.discount.show = this.expenseUser === 1
        }
      }
    },
    methods: {
      selectDate (pickDate) {
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
        }
        // this.birthDate = newDate
        this.item['validityStart'] = newDate
      },
      getDateToDatepicker (date) {
        let toDay = this.$moment(date, 'DD/MM/YYYY')
        let day = toDay.get('date')
        let month = toDay.get('month')
        let year = toDay.get('year')
        return new Date(year, month, day)
      }
    },
    created () {
      let datetime = this.$store.getters.getDateTime
      this.nowDate = datetime.date
      this.nowTime = datetime.time

      // Permiso discount
      this.optInput.discount.show = this.expenseUser === 1

      // DatePicker
      let date = this.$store.getters.getDateTime.date
      let toDay = this.$moment(date, 'DD/MM/YYYY')
      let day = toDay.get('date')
      let month = toDay.get('month')
      let year = toDay.get('year')
      this.optInput.validityStart.params.disabled.to = new Date(year, month, day)
      this.optInput.validityStart.params.disabled.from = new Date(year, month + 1, day)

      let pay = JSON.parse(localStorage.getItem('pay'))
      if (pay) {
        this.localidad = JSON.parse(localStorage.getItem('location'))
        let date = pay.validityStart
        if (date) {
          this.datepicker = this.getDateToDatepicker(date)
        }
      }
    }
  }
</script>

<style lang="scss" scoped="">

  .dropbox {
    color: #546c79 !important;
    outline: 0.1em dashed #cacaca;
    outline-offset: -1.5em;
    background: #f4f3ef;
    color: #ababab;
    padding: 1.8em 2.4em;
    position: relative;
    cursor: pointer;
    border: 0.19em dashed white;
    margin: 0 2em 2.5em;
    font-weight: 500;
    font-size: 0.8em;
    text-align: justify;
  }

  .myPoliza {

    margin-top: -15px !important;
    font-size: 1.1em;

    img, .img{
      width: 70px;
      height: 70px;
      border-radius: 1em;
    }

    /*img {*/
      /*position: absolute;*/
    /*}*/

    /*.img span{*/
      /*display: block;*/
      /*width: 100%;*/
      /*font-size: 2em;*/
      /*text-align: center;*/
    /*}*/

    /*p{*/
      /*text-align: left;*/
      /*margin-top: 0.4em;*/
      /*margin-bottom: 0;*/
      /*float: left;*/

      /*&.p-icon{*/
        /*width: 10%;*/
      /*}*/
      /*&.p-text{*/
        /*width: 90%;*/
        /*float: left;*/
        /*line-height: 1.3em;*/
      /*}*/
    /*}*/

    /*.form-group{*/
      /*margin: 0;*/
    /*}*/
  }
</style>
