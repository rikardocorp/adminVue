<template>

  <div class="col-md-9 m-auto pt-3 pb-4 myPoliza">

    <div class="title text-center h3 mb-3 text-primary">
      Seguro {{ data.pickPolice.item.insuranceTypeName }}
    </div>

    <div class="d-flex justify-content-center mb-3">
      <div class="img bg-primary d-flex align-items-center ">
        <!--<span class="align-self-center">{{ altError(pickPolice.insuranceCompanyName) }}</span>-->
        <img :src="'static/img/company/' + data.pickPolice.item.insuranceCompanyId + '.png'" alt="">
      </div>
    </div>

    <b-form-group class="text-right"
                  label="Contratante:"
                  :horizontal="horizontal" :label-cols="lCols">
      <p class="p-icon"><i class="fa fa-user text-primary"></i></p>
      <p class="p-text">{{ data.purchaser.item.razonSocial }}</p>
    </b-form-group>

    <b-form-group class="text-right"
                  label="Numero Poliza:"
                  :horizontal="horizontal" :label-cols="lCols">
      <p class="p-icon"><i class="fa fa-hashtag text-primary"></i></p>
      <p class="p-text">{{ data.sale.item.insurancePolicy ? data.sale.item.insurancePolicy.number : '???' }}</p>
    </b-form-group>

    <b-form-group class="text-right"
                  label="Fecha:"
                  :horizontal="horizontal" :label-cols="lCols">
      <p class="p-icon"><i class="fa fa-calendar-check-o text-primary"></i></p>
      <p class="p-text">{{ nowDate }} {{ nowTime }}</p>
    </b-form-group>

    <b-form-group class="text-right"
                  label="Vehiculo:"
                  :horizontal="horizontal" :label-cols="lCols">
      <p class="p-icon"><i class="fa fa-car text-primary"></i></p>
      <p class="p-text">{{ data.vehicle.item.licensePlate }}</p>
    </b-form-group>

    <div class="title text-center mb-1 mt-4" style="color: #2ca710;">
      <span class="fa-1x">Total: s/.</span> <span class="h2">{{ data.pickPolice.item.price | currency }}</span>
    </div>

    <!-- formulario -->
    <div class="dropbox  mt-4">
      <b-form-group class="text-right mb-3 mt-2"
                    label="Descuento:"
                    :horizontal="horizontal" :label-cols="lCols">
        <b-form-input :disabled="isLoading" type="text"
                      v-model.trim="item.discount"
                      placeholder="Descuento de venta..."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right mb-3"
                    label="Metodo de Pago:"
                    :horizontal="horizontal" :label-cols="lCols">
        <b-form-input :disabled="isLoading" type="text"
                      v-model.trim="item.currency"
                      placeholder="Metodo de pago..."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right mb-3"
                    label="Observacion:"
                    :horizontal="horizontal" :label-cols="lCols">
        <b-form-textarea :disabled="isLoading"
                         v-model.trim="item.observation"
                         placeholder="Observacion opcional..."
                         :rows="3" :max-rows="6"></b-form-textarea>
      </b-form-group>
    </div>

  </div>

</template>

<script>
  export default {
    props: ['horizontal', 'data', 'item'],
    data () {
      return {
        lCols: 6,

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
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      altError (alt) {
        let cadena = alt.split(' ')
        let newCadena = ''
        this.$lodash.forEach(cadena, function (value, key) {
          newCadena = newCadena + value[0].toUpperCase()
        })
        return newCadena
      }
    },
    created () {
      let datetime = this.$store.getters.getDateTime
      this.nowDate = datetime.date
      this.nowTime = datetime.time
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

    font-size: 1.1em;

    img, .img{
      width: 100px;
      height: 100px;
      border-radius: 1em;
    }

    img {
      position: absolute;
    }

    .img span{
      display: block;
      width: 100%;
      font-size: 2em;
      text-align: center;
    }

    p{
      text-align: left;
      margin-top: 0.4em;
      margin-bottom: 0;
      float: left;

      &.p-icon{
        width: 10%;
      }
      &.p-text{
        width: 90%;
        float: left;
        line-height: 1.3em;
      }
    }

    .form-group{
      margin: 0;
    }
  }
</style>
