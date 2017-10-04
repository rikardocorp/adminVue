<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <app-form v-model="items" :item="item" :pickObject="pickObject" :horizontal="true" :urlRest="urlRest" @isSearching="isSearching"></app-form>
        </div>
      </div>

      <div class="container-fluid">

          <div v-if="isSearch" class="row d-flex justify-content-center pt-4 mt-2 pt-md-2">
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

          <!--<div v-if="items.length" class="card-insurance row">-->
            <!--<div v-for="x in items" :key="x.id" class="item-insurance col-sm-6 col-md-6 col-lg-4 col-xl-4" >-->
              <!--<div class="row">-->
                <!--<div class="col-5 item-img d-flex align-items-center">-->
                  <!--<div>-->
                    <!--<img class="align-middle w-100 " :src="'static/img/company/' + x.insuranceCompanyId + '.png'" :alt="altError(x.insuranceCompanyName)"  @error="imageLoadOnError(x)">-->
                    <!--<p v-if="x.error">rikardocorp</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="col-7 item-content">-->
                  <!--<b-card :title="x.insuranceCompanyName" :sub-title="x.insuranceTypeId + '-' + x.validityDate" class="h-100">-->
                    <!--<p class="card-text item-price"><span>S/.</span> {{ x.price | currency }}</p>-->
                    <!--<b-link href="#" class="card-link" @click="pickInsurance(x)">Seleccionar >></b-link>-->
                  <!--</b-card>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <div v-if="items.length" class="card-insurance row d-flex justify-content-center">
            <div v-for="x in items" :key="x.id"  class="ticket cardWrap m-3 hvr-bounce-in">
              <div class="card-ticket cardLeft">
                <avatar username="Jane Doe" :rounded="true" :size="6.4" sizeUnid="em"
                        :src="'/static/img/company/' + x.insuranceCompanyId + '.png'"
                        :border="true" colorBorder="#f4f3ef" color="#ecedef"
                        backgroundColor="orange" :sizeBorder="0.5"></avatar>
              </div>
              <div class="card-ticket cardCenter">
                <div class="xtitle">
                  {{ x.insuranceCompanyName }}
                </div>
                <div class="xcontent">
                  <div class="title">
                    <h2>{{ x.insuranceTypeName }}</h2>
                    <span>Tipo de seguro</span>
                  </div>
                  <div class="seat">
                    <h2>08</h2>
                    <span>Asientos</span>
                  </div>
                  <div class="time">
                    <h2>{{ x.validityDate }}</h2>
                    <span>Vigencia</span>
                  </div>
                </div>
              </div>
              <div class="card-ticket cardRight">
                <div class="xtitle text-center">
                  <b-button :pressed="false"
                            size="sm" variant="outline-primary"
                            class="mr-1 my-3" @click="pickInsurance(x)"><i class="fa fa-check"></i></b-button>
                  <!--<i class="fa fa-car" @click="pickInsurance(x)"></i>-->
                </div>
                <div class="number">
                  <!--<h3>{{ x.price | currency }}</h3>-->
                  <h3>{{ x.price }}</h3>
                  <span>soles</span>
                </div>
              </div>
            </div>
          </div>

        </div><!--/.col-->

    </div>
  </div>
</template>
<!--https://cdn.pixabay.com/photo/2017/09/04/22/16/grapes-2715711_1280.jpg-->
<script>
  import {DATA as nDATA} from '../../data/dnCotizar'
  import Form from './forms/FormCotizar.vue'
  import Table from '../../components/xTable.vue'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'webUser',
    components: {
      appForm: Form,
      appTable: Table,
      Avatar
    },
    data: function () {
      return {
        src: 'static/img/positiva.png',
        urlRest: nDATA.name,
        item: JSON.parse(JSON.stringify(nDATA.post)),
        items: [
//          {
//            id: 0,
//            src:'static/img/positiva.png',
//            name: 'Positiva',
//            description: 'El seguro mas barato',
//            price: 200
//          },
//          {
//            id: 1,
//            src:'static/img/positiva.png',
//            name: 'Positiva',
//            description: 'El seguro mas barato',
//            price: 200
//          },
//          {
//            id: 2,
//            src:'static/img/positiva.png',
//            name: 'Positiva',
//            description: 'El seguro mas barato',
//            price: 200
//          },
//          {
//            id: 0,
//            src:'static/img/positiva.png',
//            name: 'Positiva',
//            description: 'El seguro mas barato',
//            price: 200
//          },
//          {
//            id: 1,
//            src:'static/img/positiva.png',
//            name: 'Positiva',
//            description: 'El seguro mas barato',
//            price: 200
//          },
//          {
//            id: 2,
//            src:'static/img/positiva.png',
//            name: 'Positiva',
//            description: 'El seguro mas barato',
//            price: 200
//          }
        ],
        update: false,
        isSearch: false,
        pickObject: {}
        // Modal
//        modalDetails: { title: 'Eliminar Registro', data: 'Esta seguro de eliminar esto?' },
//        showModal: false,
//        action: '',
//        ownClass: ''
      }
    },
    methods: {
      pickInsurance (insurance) {
        // Verifica que haya una venta sin finalizar
        let sale = JSON.parse(localStorage.getItem('sale'))
        if (!sale) {
          let data = {
            insurance: insurance,
            object: {
              region: {id: insurance.regionId},
              vehicleType: {id: insurance.vehicleTypeId},
              useType: {id: insurance.useTypeId}
            }
          }
          localStorage.setItem('insurance', JSON.stringify(data))
          this.$router.push('nueva-venta')
          console.log(data)
        } else {
          alert('Debe finalizar la venta')
        }
      },
      altError (alt) {
        let cadena = alt.split(' ')
        let newCadena = ''
        this.$lodash.forEach(cadena, function (value, key) {
          newCadena = newCadena + value[0].toUpperCase()
        })
        return newCadena
      },
      imageLoadOnError (error, x) {
        console.log('ERROR IMG')
        console.log(error)
        console.log(x)
        error.error = true
      },
      initData () {
        this.update = false
        this.item = JSON.parse(JSON.stringify(nDATA.post))
        this.indexSelected = null
      },
      getData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        self.then((data) => {
          console.log('LOAD DATATABLE')
          console.log(data)
          this.items = data.status ? data.content : []
          this.totalRows = this.items.length
        })
      },
      isSearching (value) {
        this.isSearch = value
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    }
  }
</script>

<style lang="scss">
</style>
