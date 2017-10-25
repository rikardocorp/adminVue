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
              <div v-for="(x, index) in items" :key="x.id"  :class="{'ticket cardWrap m-2 mb-3 hvr-bounce-in':true, 'pickOption': x.pick}" @click="selectedSale(x)">
                <!--<i class="fa fa-thumb-tack" aria-hidden="true"></i>-->
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
            </div>
          </div><!--/.col-->
        </div>

        <div v-show="isDetail" key="div2" id="saleDetail">
        <div class="col-md-12 m-auto">
          <detail-sale :item="selectedItem" :urlRest="'sales'" @returnMain="returnMain"></detail-sale>
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
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'webUser',
    components: {
      appForm: Form,
      Avatar,
      DetailSale
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
        isDetail: false
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
      selectedSale (item) {
        this.selectedItem = item
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
      async getAll () {
        console.log('GET POLICIS')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        if (!self.status) return true
        this.items = self.content
        console.log(this.items)
        this.params.isSearch = false
      },
      isSearching (value) {
        this.params.isSearch = value
      },
      returnMain () {
        this.isDetail = false
      }
    },
    created () {
    }
  }
</script>

<style lang="scss">

  #getSale {

    .card-insurance {
      .avatar {
        position: absolute !important;
      }
      .zoomPolicy:hover{
        zoom: 2;
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
