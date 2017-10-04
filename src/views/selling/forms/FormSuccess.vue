<template>

  <div class="col-md-8 m-auto pt-3 pb-4 myPoliza">

    <div class="title text-center h3 mb-3 text-primary">
      Venta Registrada
    </div>
    <div class="title text-center mb-3">
      Poliza #{{  data.sale.item.insurancePolicy ? data.sale.item.insurancePolicy.number : '???'  }}
    </div>

    <div class="d-flex justify-content-center mb-3">
      <div class="img bg-primary d-flex align-items-center ">
        <!--<span class="align-self-center">{{ altError(pickPolice.insuranceCompanyName) }}</span>-->
        <img :src="'static/img/company/' + data.pickPolice.item.insuranceCompanyId + '.png'" alt="">
      </div>
    </div>

    <div class="title text-center mb-1 mt-4" style="color: #2ca710;">
      <span class="fa-1x">Total: s/.</span> <span class="h4">{{ data.pickPolice.item.price | currency }}</span>
    </div>

    <div class="row mt-3" :label-sr-only="true">
      <div class="col-6 text-right pr-0">
        <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3">IMPRIMIR</b-button>
      </div>
      <div class="col-6 text-left pl-0">
        <b-button :pressed="false" variant="outline-primary" class="ml-1 my-3">PAGOS</b-button>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    props: ['horizontal', 'data'],
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
