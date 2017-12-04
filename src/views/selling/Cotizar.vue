<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6 col-lg-5">
          <app-form v-model="items" :item="item" :pickObject="pickObject" :horizontal="true" :urlRest="urlRest" @isSearching="isSearching"></app-form>
        </div>
      </div>
      <!--<pre>{{ $store.state.Login.LOAD_TABLE.regions }}</pre>-->
      <!--<pre>{{ items }}</pre>-->
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

          <div v-if="items.length" class="card-insurance row d-flex justify-content-center">
            <!--<div v-for="x in items" :key="x.id"  class="ticket cardWrap m-3 hvr-bounce-in"-->
                 <!--v-b-tooltip.html.top :title="convertDescription(x.description, x.exception)">-->
            <div v-for="x in items" :key="x.id"  class="ticket cardWrap m-3 hvr-bounce-in">
              <div class="card-ticket cardLeft">
                <avatar :username="x.insuranceCompanyName" :rounded="true" :size="6.4" sizeUnid="em"
                        :src="path + '/' + x.insuranceCompanyImage" :alt="x.insuranceCompanyName"
                        :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"
                        backgroundColor="orange" :sizeBorder="0.5"></avatar>
              </div>
              <div class="card-ticket cardCenter">
                <!--<div class="xtitle"> <i :class="'fa fa-info-circle info-exception ' + (x.exception==1 ? 'true' : 'false')"></i>-->
                <div class="xtitle">
                  {{ x.insuranceCompanyName }}
                </div>
                <div class="xcontent">
                  <div class="title">
                    <h2>{{ x.insuranceTypeName }}</h2>
                    <span>Tipo de seguro</span>
                  </div>
                  <div class="seat">
                    <h2>[{{ x.seatNumber }}{{ x.seatNumberTo==x.seatNumber ? ']' : '-' +x.seatNumberTo + ']'  }}</h2>
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
        items: [],
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
      convertDescription (data, exception) {
        if (data === '') return ''
        let list = JSON.parse(data)
        let text = exception === 1 ? '<h6 class="text-danger pt-2">Autos Restringuidos</h6>' : '<h6 class="text-info pt-2">Autos Permitidos</h6>'
        this.$lodash.forEach(list, function (value, key) {
          text = text + value.brand + ' ' + value.model + ', '
        })
        return text
      },
      pickInsurance (insurance) {
        // Verifica que haya una venta sin finalizar
        let notification = {}
        let sale = JSON.parse(localStorage.getItem('sale'))
        if (!sale) {
          let data = {
            insurance: insurance,
            object: {
              region: {id: insurance.regionId},
              vehicleTypeCategory: {id: insurance.vehicleTypeCategoryId},
              useType: {id: insurance.useTypeId}
            }
          }
          localStorage.setItem('insurance', JSON.stringify(data))
          localStorage.setItem('seller', this.$store.state.user.data.id)
          localStorage.setItem('typeSell', 0)
          this.$set(this.$store.state, 'visibleNewSale', true)
          if (this.isClient) {
            this.$router.push('venta-cliente')
          } else {
            this.$router.push('nueva-venta')
          }
          console.log(data)
        } else {
          notification.data = {message: 'Debe finalizar la venta en proceso.', status: '', success: null, url: ''}
          this.$store.commit('pushNotification', notification)
        }
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
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      isClient () {
        return this.$store.state.user.isClient
      }
    }
  }
</script>

<style lang="scss">
  .card-insurance {
    .avatar {
      position: absolute;
    }
    .xtitle{
      font-weight: 700;
    }

    .info-exception{
      font-size: 2em;
      float: left;
      margin-right: 10px;
      text-shadow: 1px 1px 1px #ef7b1f;
      &.true{
        color: #e53439 !important
      }
      &.false{
        color: #63c1de !important;
      }
    }
  }
</style>
