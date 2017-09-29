<template>

  <div class="col-md-8 m-auto pt-3 pb-4 myPoliza">

    <div class="title text-center h3 mb-3 text-primary">
      Seguro SOAT Digital
    </div>

    <div class="d-flex justify-content-center mb-3">
      <div class="img bg-primary d-flex align-items-center ">
        <span class="align-self-center">{{ altError(pickPolice.insuranceCompanyName) }}</span>
        <img :src="'static/img/company/' + pickPolice.insuranceCompanyId + '.png'" alt="">
      </div>
    </div>

    <b-form-group class="text-right"
                  label="Contratante:"
                  :horizontal="horizontal" :label-cols="lCols">
      <p class="p-icon"><i class="fa fa-user text-primary"></i></p>
      <p class="p-text">{{ webuser.razonSocial }}</p>
    </b-form-group>

    <b-form-group class="text-right"
                  label="Numero Poliza:"
                  :horizontal="horizontal" :label-cols="lCols">
      <p class="p-icon"><i class="fa fa-hashtag text-primary"></i></p>
      <p class="p-text">{{ policyNumber }}</p>
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
      <p class="p-text">{{ vehicle.licensePlate }}</p>
    </b-form-group>

    <div class="title text-center mb-1 mt-4" style="color: #2ca710;">
      <span class="fa-1x">Total: s/.</span> <span class="h2">{{ pickPolice.price | currency }}</span>
    </div>

  </div>

</template>

<script>
  export default {
    props: ['horizontal', 'data'],
    data () {
      return {
        lCols: 6,

        purchaser: '',
        policyNumber: '1234567',
        nowDate: '',
        nowTime: '',
        plate: '',

        pickPolice: {},
        vehicle: {},
        webuser: {}
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
      let sale = this.data.sale.item
      this.pickPolice = this.data.pickPolice.item
      this.vehicle = this.data.vehicle.item
      this.webuser = this.data.webuser.item

      //      sale.seatNumber = this.vehicle.seatNumber
      //      sale.cityId = this.pickPolice.cityId
      //      sale.amount = this.pickPolice.price
      //      sale.currency = 'Soles'

      console.log(this.vehicle)
      console.log(this.webuser)
      this.plate = this.vehicle.licensePlate
      this.purchaser = this.webuser.razonSocial
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
