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
              <div v-for="(x, index) in items" :key="x.id"
                   :class="{'state-1': x.state==1, 'state-2': x.state==2, 'state-3': x.state==3, 'state-4': x.state==4, 'state-5': x.state==5, 'state-anulado': x.state==-1}">
                <!--<pre>{{ x }}</pre>-->
                <!-- SALES -->
                <div v-if="x.insurancePolicy !== undefined && x.insurancePolicy !== null && x.state !== null"
                     :class="{'ticket cardWrap m-2 mb-3 hvr-bounce-in':true, 'pickOption': x.pick}" @click="selectedSale(x, true)">
                  <!--<i class="fa fa-thumb-tack" aria-hidden="true"></i>-->
                  <i v-if="x.cart" class="fa fa-shopping-cart icon-cart" aria-hidden="true"></i>

                  <div class="card-ticket cardLeft" v-if="x.state !== 0 && x.state !== null">
                    <avatar :username="x.insurancePolicy.insuranceCompany.name" :rounded="true" :size="6.4" sizeUnid="em"
                            :src="path + '/' + x.insurancePolicy.insuranceCompany.image" :alt="x.insurancePolicy.insuranceCompany.name"
                            :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"
                            backgroundColor="orange" :sizeBorder="0.5"></avatar>
                  </div>

                  <div class="card-ticket cardLeft" v-else="">
                    <avatar :username="'S N'" :rounded="true" :size="6.4" sizeUnid="em"
                            :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"
                            backgroundColor="orange" :sizeBorder="0.5"></avatar>
                  </div>

                  <div class="card-ticket cardCenter dashed">
                    <div :class="{'xtitle': true, 'bg-danger': x.state==1, 'bg-primary': x.state==2, 'bg-info': x.state==3, 'bg-success': x.state==4, 'bg-blue': x.state==5}">
                      POLIZA: {{ x.insurancePolicy ? x.insurancePolicy.number : 'S/N' }}
                      <button v-if="(x.insurancePolicy.user.id == $store.state.user.data.id || $store.state.user.role=='ROLE_ADMIN') && (x.state==1 || x.state==2)" @click.stop="deleteSale(x)" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                      <!--<button class="btn btn-danger"><i class="fa fa-trash"></i></button>-->
                    </div>
                    <div class="xcontent">
                      <div class="title">
                        <!--<h2 class="big">{{ x.insurancePolicy.number }}</h2>-->
                        <h2>{{ x.purchaser ? x.purchaser.razonSocial  : 'Sin asignar' }}</h2>
                        <span>Contratante</span>
                      </div>
                      <template v-if="x.state==1 || x.state==2">
                        <div class="seat">
                          <h2>{{ x.date }}</h2>
                          <span>Fecha de Compra</span>
                        </div>
                      </template>
                      <template v-else>
                        <div class="seat">
                          <h2>{{ x.date.split(' ')[0] }}</h2>
                          <span>Compra</span>
                        </div>
                        <div class="seat ml-2">
                          <h2>{{ x.validityStart ? x.validityStart : '--/--/----' }}</h2>
                          <span>Inicio</span>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <!-- CARTS -->
                <div v-else-if="x.state !== null && x.insuranceCompany !== undefined && x.insuranceCompany !== null" :class="{'ticket cardWrap m-2 mb-3 hvr-bounce-in':true, 'pickOption': x.pick}" @click="selectedCart(x, false)">
                  <i class="fa fa-cart-plus icon-cart" aria-hidden="true"></i>
                  <div class="card-ticket cardLeft">
                    <avatar :username="x.insuranceCompany.name" :rounded="true" :size="6.4" sizeUnid="em"
                            :src="path + '/' + x.insuranceCompany.image" :alt="x.insuranceCompany.name"
                            :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"
                            backgroundColor="orange" :sizeBorder="0.5"></avatar>
                  </div>
                  <div class="card-ticket cardCenter dashed">
                    <div :class="{'xtitle': true, 'bg-cart': true}">
                      <!--Placa: {{ x.vehicle.licensePlate }}-->
                      POLIZA: {{ x.insurancePolicy ? x.insurancePolicy.number : 'S/N' }}
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
            <detail-cart-sale :item="selectedItemCart" :urlRest="'sales'" @returnMain="returnMain"></detail-cart-sale>
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
  import DetailCartSale from './DetailCartSale.vue'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'Sales',
    components: {
      appForm: Form,
      Avatar,
      DetailSale,
      DetailCartSale
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
        selectedMyCart: {},
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
      async deletePay (payID) {
        let url = 'payments/' + payID
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: url})
        if (!self.status) return false
        return true
      },
      async deleteSale (item) {
        let url = 'sales/' + item.id
        console.log('DELETE SALE')
        console.log(url)
        console.log(item)
        console.log('--------')
        if (item.vehicle === null && item.purchaser === null) {
          console.log('SALE VACIO')
          let urlPayment = 'payments?saleId=' + item.id
          let selfPayment = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlPayment})
          if (!selfPayment.status) return false
          else {
            console.log('SALE PAYMENTS')
            const payments = selfPayment.content
            payments.map(async it => {
              await this.deletePay(it.id)
            })
            console.log(payments)
          }
        }

        let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: url})
        console.log(self)
        if (!self.status) return false
        else {
          let indexSelected = this.$lodash.findIndex(this.items, item)
          this.items.splice(indexSelected, 1)
          console.log('Success')
        }
      },
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
        // alert(isSale)
        console.log('item.state')
        console.log(item)
        if (item.state === 1 || item.state === 0 || item.state === null) return false

        if (item.state === -1 && (item.purchaser === null || item.vehicle === null)) {
          this.$store.commit('sendNotification', {status: null, message: 'La venta anulada no cuenta con detalles de venta.'})
          return false
        }

        if (isSale) {
          // alert('sale')
          this.selectedItem = item
        } else {
          // alert('cart')
          this.selectedItemCart = item
        }
        this.isSale = isSale
        this.isDetail = true
      },
      async selectedCart (item, isSale) {
        console.log('SelectedCart')
        console.log(item)
        let idCart = item.id
        // let idCart = 14
        let itemSale = await this.getData('sales?cartId=' + idCart)
        console.log(itemSale)
        if (itemSale.length === 0) {
          this.$store.commit('sendNotification', {status: null, message: 'No existe la venta seleccionada.'})
          return false
        }

        itemSale[0]['insuranceCompany'] = item.insuranceCompany
        console.log('ItemSale')
        console.log(itemSale)
        this.selectedItemCart = itemSale[0]
        this.selectedMyCart = item
        this.isSale = false
        this.isDetail = true
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
      i.icon-cart {
        position: absolute;
        color: #3db3e8;
        font-size: 3.3em;
        transform: rotate(17deg);
        bottom: 0.1em;
        left: 5.5em;
        z-index: 2;
        display: block !important;
        color: #4ebc75;
        transform: rotate(0deg);
        font-size: 3em;
        left: 6.2em;
      }
      .state-1 {
        .icon-cart{
          color: #ffa502;
        }
      }
      .state-5 {
        .icon-cart{
          color: #2e85e8;
        }
      }

      .state-anulado {
        -webkit-filter: grayscale(1);
        filter: grayscale(1);
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
            top: 4px;
            border: 1px solid #de5555;
          }
        }
        .xcontent{
          font-size: 1.1em;
        }
      }
    }
  }

</style>
