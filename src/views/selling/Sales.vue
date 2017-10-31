<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <transition-group name="fade" mode="out-in">
        <div v-show="!isDetail" key="div1">
          <div class="row d-flex justify-content-center">
            <div class="col-md-11">
              <app-form :item="itemForm1" :nameForm="nameForm1" :horizontal="true" :params="params"
                        @defaulValue="defaulValueForm1" @resultFilter="resultFilter"></app-form>
            </div>
          </div>
          <div id="getSale" class="container-fluid">
            <div v-if="params.isSearch" class="row d-flex justify-content-center pt-4 mt-2 pt-md-2">
                <span class="fa-stack fa-2x">
                  <i class="fa fa-cog fa-spin-reverse fa-stack-2x text-orange"></i>
                  <i class="fa fa-cog fa-spin fa-stack-1x text-cream"></i>
                </span>
            </div>
            <div v-else-if="items.length==0" class="row d-flex justify-content-center pt-5 mt-4">
                <span class="h3" style="opacity: 0.35">
                  <i class="fa fa-search fa-5x text-orange fa-flip-horizontal" aria-hidden="true"></i>
                </span>
            </div>
            <!--ALL SALES -->
            <div v-if="items.length" class="card-insurance row d-flex justify-content-center pt-3">
              <!-- SALES LIST -->
              <div v-for="(x, index) in items" :key="x.id" >

                <div v-if="x.insurancePolicy !== undefined" :class="{'ticket cardWrap m-2 mb-3 hvr-bounce-in':true, 'pickOption': x.pick}" @click="selectedSale(x, true)">
                  <!--<i class="fa fa-thumb-tack" aria-hidden="true"></i>-->
                  <i v-if="x.cart" class="fa fa-shopping-cart icon-cart" aria-hidden="true"></i>
                  <div class="card-ticket cardLeft">
                    <avatar :username="x.insurancePolicy.insuranceCompany.name" :rounded="true" :size="6.4" sizeUnid="em"
                            :src="path + '/' + x.insurancePolicy.insuranceCompany.image" :alt="x.insurancePolicy.insuranceCompany.name"
                            :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"
                            backgroundColor="orange" :sizeBorder="0.5"></avatar>
                  </div>
                  <div class="card-ticket cardCenter dashed">
                    <div :class="{'xtitle': true, 'bg-danger': x.state==1, 'bg-primary': x.state==2, 'bg-info': x.state==3, 'bg-success': x.state==4, 'bg-blue': x.state==5}">
                      Placa {{ x.vehicle.licensePlate }}
                      <!--<button class="btn btn-danger"><i class="fa fa-trash"></i></button>-->
                    </div>
                    <div class="xcontent">
                      <div class="title">
                        <!--<h2 class="big">{{ x.insurancePolicy.number }}</h2>-->
                        <h2>{{ x.purchaser.razonSocial }}</h2>
                        <span>Contratante</span>
                      </div>
                      <div class="seat">
                        <h2>{{ x.date.split(' ')[0] }}</h2>
                        <span>Compra</span>
                      </div>
                      <div class="seat ml-2">
                        <h2>{{ x.validityStart }}</h2>
                        <span>Inicio</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else="" :class="{'ticket cardWrap m-2 mb-3 hvr-bounce-in':true, 'pickOption': x.pick}" @click="selectedSale(x, false)">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
                  <div class="card-ticket cardLeft">
                    <avatar :username="x.insuranceCompany.name" :rounded="true" :size="6.4" sizeUnid="em"
                            :src="path + '/' + x.insuranceCompany.image" :alt="x.insuranceCompany.name"
                            :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"
                            backgroundColor="orange" :sizeBorder="0.5"></avatar>
                  </div>
                  <div class="card-ticket cardCenter dashed">
                    <div :class="{'xtitle': true, 'bg-cart': true}">
                      Placa {{ x.vehicle.licensePlate }}
                      <!--<button class="btn btn-danger"><i class="fa fa-trash"></i></button>-->
                    </div>
                    <div class="xcontent">
                      <div class="title">
                        <!--<h2 class="big">{{ x.insurancePolicy.number }}</h2>-->
                        <h2>{{ x.purchaser.razonSocial }}</h2>
                        <span>Contratante</span>
                      </div>
                      <div class="seat">
                        <h2>{{ x.seatNumber }}</h2>
                        <span>Asientos</span>
                      </div>
                      <div class="seat ml-2">
                        <h2>{{ x.date.split(' ')[0] }}</h2>
                        <span>Compra</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div><!--/.col-->
        </div>

        <div v-show="isDetail" key="div2" id="saleDetail">
          <div v-show="isSale"  class="col-md-12 m-auto">
            <detail-sale :item="selectedItem" :urlRest="'sales'" @returnMain="returnMain"></detail-sale>
          </div>

          <div v-show="!isSale"  class="col-md-12 m-auto">
            <detail-cart :item="selectedItemCart" :urlRest="'sales'" @returnMain="returnMain"></detail-cart>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>


<script>
  import {DATA as nDATA} from '../../data/dnInsurancePolicies'
  import {DATA_FILTER as dataSale} from '../../data/dnSales'
  import Form from './forms/FormSales.vue'
  import DetailSale from './DetailSale.vue'
  import DetailCart from './DetailCart.vue'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'webUser',
    components: {
      appForm: Form,
      Avatar,
      DetailSale,
      DetailCart
    },
    data: function () {
      return {
        // pick policy
        urlRest: nDATA.name,
        item: JSON.parse(JSON.stringify(nDATA.post)),

        nameForm1: dataSale.name,
        itemForm1: JSON.parse(JSON.stringify(dataSale.post)),

        items: [],
        update: false,
        params: {
          isSearch: false
        },
        selected: null,
        selectedItem: {},
        selectedItemCart: {},
        isDetail: false,
        isSale: false
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      }
    },
    methods: {
      defaulValueForm1 () {
        this.itemForm1 = JSON.parse(JSON.stringify(dataSale.post))
      },
      resultFilter (items) {
        console.log(items)
        this.selectedList = {}
        this.items = items
      },
      selectedAll (value = true) {
        let policy = ''
        let vm = this
        if (value) {
          this.items.forEach(function (item, index) {
            policy = {id: item.id}
            vm.$set(item, 'pick', true)
            vm.$set(vm.selectedList, item.id, policy)
            console.log(item, index)
          })
        } else {
          this.items.forEach(function (item, index) {
            policy = {id: item.id}
            vm.$set(item, 'pick', false)
            vm.$delete(vm.selectedList, item.id)
            console.log(item, index)
          })
        }
      },
      selectedSale (item, isSale) {
        if (isSale) {
          this.selectedItem = item
        } else {
          this.selectedItemCart = item
        }
        this.isSale = isSale
        this.isDetail = true
//        let policy = {id: item.id}
//        if (item.pick) {
//          value = false
//          this.$delete(this.selectedList, item.id)
//        } else {
//          value = true
//          this.$set(this.selectedList, item.id, policy)
//        }
//        this.$set(item, 'pick', value)
      },
      async getData (url) {
        console.log('GET SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        console.log(self)
        return self.status ? self.content : null
      },
      isSearching (value) {
        this.params.isSearch = value
      },
      returnMain () {
        this.isDetail = false
      }
    },
    async mounted () {
//      if (this.$route.params.idSale !== undefined) {
//        let url = this.nameForm1 + '/' + this.$route.params.idSale
//        let sale = await this.getData(url)
//        console.log('bandera')
//        console.log(sale.insurancePolicy !== undefined)
//        if (sale) this.selectedSale(sale, sale.insurancePolicy !== undefined)
//      }
    }
  }
</script>

<style lang="scss">

  #getSale {

    .bg-cart{
      background: #ffe956 !important;
      color: #ef7b22;
      border: 1px dashed #ffa501;
    }

    .card-insurance {
      .avatar {
        position: absolute !important;
      }
      .zoomPolicy:hover{
        zoom: 2;
      }
      i {
        position: absolute;
        color: #3db3e8;
        font-size: 3.3em;
        transform: rotate(17deg);
        bottom: 0.1em;
        left: 5.5em;
        z-index: 2;
        display: block !important;

        &.icon-cart{
          color: #4ebc75;
          transform: rotate(0deg);
          font-size: 3em;
          left: 5.9em;
        }
      }
    }

    .ticket {
      width: 21em;
      cursor: pointer;
      font-size: 0.9em;
      .cardCenter{
        width: 18em;
      }
      .card-ticket{
        height: 12em;
        .xtitle{
          font-size: 1.3em;
          height: 2.2em;
          padding: 0.4em 0.4em 0.4em 0.6em;
          button{
            display: block !important;
            padding: 0.1em;
            width: 25px;
            height: 25px;
            border-radius: 1em;
            font-size: 0.9em;
            position: absolute;
            right: 10px;
            top: 8px;
          }
        }
        .xcontent{
          font-size: 1.1em;
        }
      }
    }
  }

</style>
