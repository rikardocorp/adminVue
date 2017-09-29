<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <app-form v-model="items" :item="item" :horizontal="true" :urlRest="urlRest" @isSearching="isSearching"></app-form>
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

          <div v-if="items.length" class="card-insurance row">
            <div v-for="x in items" :key="x.id" class="item-insurance col-sm-6 col-md-6 col-lg-4 col-xl-4" >
              <div class="row">
                <div class="col-5 item-img d-flex align-items-center">
                  <div>
                    <img class="align-middle w-100 " :src="'static/img/company/' + x.insuranceCompanyId + '.png'" :alt="altError(x.insuranceCompanyName)"  @error="imageLoadOnError(x)">
                    <p v-if="x.error">rikardocorp</p>
                  </div>
                </div>
                <div class="col-7 item-content">
                  <b-card :title="x.insuranceCompanyName" :sub-title="x.insuranceTypeId + '-' + x.validityDate" class="h-100">
                    <p class="card-text item-price"><span>S/.</span> {{ x.price | currency }}</p>
                    <b-link href="#" class="card-link" @click="pickInsurance(x)">Seleccionar >></b-link>
                  </b-card>
                </div>
              </div>
            </div>
          </div>
        </div><!--/.col-->


      <!--<pre>{{items}}</pre>-->
    </div>


    <!--<b-modal :title="modalDetails.title" :class="'modal-'+ownClass" v-model="showModal">-->
      <!--{{ modalDetails.data }}-->
      <!--<template slot="modal-footer">-->
        <!--<b-button @click="showModal = !showModal">Cancel</b-button>-->
        <!--<b-button @click="deleteData" :variant="ownClass">OK</b-button>-->
      <!--</template>-->
    <!--</b-modal>-->
  </div>
</template>
<!--https://cdn.pixabay.com/photo/2017/09/04/22/16/grapes-2715711_1280.jpg-->
<script>
  import {DATA_COTIZAR as nDATA} from '../../data/dataNames'
  import Form from './forms/FormCotizar.vue'
  import Table from '../../components/xTable.vue'

  export default {
    name: 'webUser',
    components: {
      appForm: Form,
      appTable: Table
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
        isSearch: false
        // Modal
//        modalDetails: { title: 'Eliminar Registro', data: 'Esta seguro de eliminar esto?' },
//        showModal: false,
//        action: '',
//        ownClass: ''
      }
    },
    methods: {
      pickInsurance (insurance) {
        localStorage.setItem('insurance', JSON.stringify(insurance))
        console.log(insurance)
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
  .card-img-left {
    border-bottom-left-radius: calc(.25rem - 1px);
    border-top-left-radius: calc(.25rem - 1px);
    float: left;
    padding-right: 1em;
    margin-bottom: -1.25em;
  }

  .card-insurance{

    .card{
      box-shadow: none;
      border-radius: initial;
    }

    .item-insurance{
      margin-bottom: 1%;
      margin-top: 3%;
      padding: 0;
      padding-left: 1%;

      >div.row{
        box-shadow: #cccccc 4px 9px 8px -4px;
        border-radius: 0.5rem;
        overflow: hidden;
        margin: 1%;
        padding-bottom: 0;
        padding-top: 0;
      }

      div.item-content{
        padding: 0;
      }

      div.item-img{
        padding-right: 0;
        padding-left: 0;
        background: #ff9700;
      }

      .item-content .card{
        padding: 3%;
        margin-bottom: 0;
        .item-price{
          color: #8BC34A;
          font-size: 1.7em;
          padding-top: 15px;
          text-align: center;
          span{
            font-size: 0.7em;
          }
        }
      }
    }
  }

  img:after {
    content: attr(alt);
    font-size: 3em;
    color: #ffffff;
    position: relative;
    font-weight: 600;
  }

  img:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100%);
    width: 100%;
    background-color: #e53439;
  }
</style>
