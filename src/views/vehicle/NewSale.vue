<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row">
        <button @click="$store.state.isLoading = true">LOAding</button>
        <button type="button" @click="toggleFullscreen" >Fullscreen</button>
        <div class="col-md-12">
          <!--<app-fullscreen ref="fullscreen" :fullscreen.sync="fullscreen" background="white" @change="commitFullscreen">-->
            <form-wizard  @on-complete="onComplete" @on-change="onChange" @on-loading="setLoading" color="#20a8d8">
              <tab-content title="Personal details" icon="fa fa-user-circle-o" >
                <div class="col-md-6 mx-auto">
                  <app-webuser :item="item" :update="update" :urlRest="urlRest" :horizontal="false"  @emit_addRow="addRow"></app-webuser>
                </div>
              </tab-content>
              <tab-content title="Additional Info" icon="fa fa-car" >
                <div class="col-md-8 mx-auto">
                  <app-vehicle :item="item" :update="update" :urlRest="urlRest" :horizontal="false"  @emit_addRow="addRow"></app-vehicle>
                </div>
              </tab-content>

              <tab-content title="Additional Info" icon="fa fa-drivers-license-o" >
                <div class="col-md-8 mx-auto">
                  <app-purchaser :item="item" :update="update" :urlRest="urlRest" :horizontal="false"  @emit_addRow="addRow"></app-purchaser>
                </div>
              </tab-content>

              <tab-content title="Additional Info" icon="fa fa-file-text-o" >
                My second tab content
              </tab-content>

              <tab-content title="Last step" icon="fa fa-check">
                Yuhuuu! This seems pretty damn simple
              </tab-content>
              <div class="loader" v-if="loadingWizard"></div>
            </form-wizard>
          <!--</app-fullscreen>-->
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem" ></app-table>
        </div><!--/.col-->
      </div><!--/.row-->
    </div>

    <b-modal :title="modalDetails.title" :class="'modal-'+ownClass" v-model="showModal">
      {{ modalDetails.data }}
      <template slot="modal-footer">
        <b-button @click="showModal = !showModal">Cancel</b-button>
        <b-button @click="deleteData" :variant="ownClass">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import {DATA_WERUSER2, DATA_VEHICLE, DATA_PURCHASER} from '../../data/dataNames'
  import Webuser from './forms/FormWebUser2.vue'
  import Vehicle from './forms/FormVehicle.vue'
  import Purchaser from './forms/FormPurchaser.vue'
  import Table from '../../components/xTable.vue'
//  import Fullscreen from "vue-fullscreen/src/component.vue"
//  @/

  export default {
    name: 'newSale',
    components: {
      appWebuser: Webuser,
      appVehicle: Vehicle,
      appPurchaser: Purchaser,
      appTable: Table,
//      appFullscreen: Fullscreen
    },
    data: function () {
      return {
        dataNames: [DATA_WERUSER2, DATA_VEHICLE, DATA_PURCHASER],
        urlRest: DATA_WERUSER2.name,
        item: JSON.parse(JSON.stringify(DATA_WERUSER2.post)),
        fields: JSON.parse(JSON.stringify(DATA_WERUSER2.fieldsTable)),
        items: [],
        update: false,
        indexSelected: null,
        btnOption: {editOpc: 'info', deleteOpc: 'danger'},
        newWebUser: {},

        // Wizard
        loadingWizard: false,
        // Fullscreen
        fullscreen: false,

        // Modal
        modalDetails: { title: 'Eliminar Registro', data: 'Esta seguro de eliminar esto?' },
        showModal: false,
        action: '',
        ownClass: ''
      }
    },
    methods: {
      addRow (newItem = '') {
        if (newItem) {
          if (!this.update) {
            this.items.unshift(newItem)
          } else {
            this.items.splice(this.indexSelected, 1, newItem)
          }
        }
        this.initData()
      },
      initData () {
        this.update = false
        this.item = JSON.parse(JSON.stringify(DATA_WERUSER2.post))
        this.indexSelected = null
      },
      getData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        self.then((data) => {
          console.log(data)
          this.items = data.status ? data.content : []
          this.totalRows = this.items.length
        })
      },
      deleteData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: this.urlRest + '/' + this.items[this.indexSelected].id})
        self.then((data) => {
          console.log(data.content)
          if (data.status) {
            this.items.splice(this.indexSelected, 1)
            this.toggleDialog()
            this.initData()
          }
        })
      },
      toggleDialog: function () {
        this.showModal = !this.showModal
      },
      pickItem (item, type) {
        this.initData()
        this.indexSelected = this.$lodash.findIndex(this.items, item)
        console.log('INDEX SELECT')
        console.log(this.indexSelected)
        console.log(this.items)

        if (type === this.btnOption.editOpc) {
          this.item = {...this.item, ...item}
          this.update = true
        }

        if (type === this.btnOption.deleteOpc) {
          this.ownClass = type
          this.toggleDialog()
        }
      },
      onChange (prevIndex, nextIndex) {
        console.log('Prev: ' + prevIndex + ' Next: ' + nextIndex)
        this.item = []
        this.items = []
        this.fields = []

        this.urlRest = this.dataNames[nextIndex].name
        this.item = JSON.parse(JSON.stringify(this.dataNames[nextIndex].post))
        this.fields = JSON.parse(JSON.stringify(this.dataNames[nextIndex].fieldsTable))

        this.update = false
        console.log(this.urlRest)
        console.log(this.item)
        this.getData()
      },
      setLoading (value) {
        this.loadingWizard = value
      },
      onComplete: function () {
        alert('Yay. Done!')
      },
      toggleFullscreen () {
        this.$refs['fullscreen'].toggle()
        // this.fullscreen = !this.fullscreen
      },
      commitFullscreen (fullscreen) {
        this.$store.commit('switchFullscreen', fullscreen)
        console.log(fullscreen)
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style>

  /*.app-body .main{*/
    /*background: #20a8d8;*/
  /*}*/
  /*.app-body .main .vue-forms-wizard{*/
    /*background: #f5f5f5;*/
  /*}*/

  /* This is a css loader. It's not related to vue-forms-wizard */
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #e74c3c;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

</style>

<!--<div class="card-group">-->
<!--<b-card>-->
<!--<div class="h1 text-muted text-right mb-4">-->
<!--<i class="icon-people"></i>-->
<!--</div>-->
<!--<div class="h4 mb-0">87.500</div>-->
<!--<small class="text-muted text-uppercase font-weight-bold">Visitors</small>-->
<!--<b-progress class="progress-xs mt-3 mb-0" variant="info" :value="25"/>-->
<!--</b-card>-->
<!--<b-card>-->
<!--<div class="h1 text-muted text-right mb-4">-->
<!--<i class="icon-user-follow"></i>-->
<!--</div>-->
<!--<div class="h4 mb-0">385</div>-->
<!--<small class="text-muted text-uppercase font-weight-bold">New Clients</small>-->
<!--<b-progress class="progress-xs mt-3 mb-0" variant="success" :value="25"/>-->
<!--</b-card>-->
<!--<b-card>-->
<!--<div class="h1 text-muted text-right mb-4">-->
<!--<i class="icon-basket-loaded"></i>-->
<!--</div>-->
<!--<div class="h4 mb-0">1238</div>-->
<!--<small class="text-muted text-uppercase font-weight-bold">Products sold</small>-->
<!--<b-progress class="progress-xs mt-3 mb-0" variant="warning" :value="25"/>-->
<!--</b-card>-->
<!--<b-card>-->
<!--<div class="h1 text-muted text-right mb-4">-->
<!--<i class="icon-pie-chart"></i>-->
<!--</div>-->
<!--<div class="h4 mb-0">28%</div>-->
<!--<small class="text-muted text-uppercase font-weight-bold">Returning Visitors</small>-->
<!--<b-progress class="progress-xs mt-3 mb-0" :value="25"/>-->
<!--</b-card>-->
<!--<b-card>-->
<!--<div class="h1 text-muted text-right mb-4">-->
<!--<i class="icon-speedometer"></i>-->
<!--</div>-->
<!--<div class="h4 mb-0">5:34:11</div>-->
<!--<small class="text-muted text-uppercase font-weight-bold">Avg. Time</small>-->
<!--<b-progress class="progress-xs mt-3 mb-0" variant="danger" :value="25"/>-->
<!--</b-card>-->
<!--</div>-->
