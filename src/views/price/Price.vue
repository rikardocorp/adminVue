<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <!--<div class="row d-flex justify-content-center">-->
        <!--<div class="col-md-7">-->
          <!--<app-forms :item="item" :update="update" :urlRest="urlRest" :horizontal="true" @emit_addRow="addRow"></app-forms>-->
        <!--</div>-->
      <!--</div>-->
      <transition-group name="fade" mode="out-in">
        <!-- VEHICLES TYPES -->
        <div key="div1" class="row" v-show="!switchPrices">
          <div class="col-12">
            <vehicle-table :fields="fieldsVT" :items="itemsVT" :btnOption="btnOption" @pickItemVehicle="pickItemVehicle" ></vehicle-table>
          </div><!--/.col-->
        </div><!--/.row-->

        <!-- INSURANCE PRICES -->
        <div key="div2" v-show="switchPrices">

          <div class="row d-flex justify-content-center">
            <div class="col-md-7">
              <app-form :item="item"
                        :vehicle="itemVT"
                        :update="update"
                        :urlRest="urlRest"
                        :horizontal="true"
                        @emit_addRow="addRow"
                        @returnMain="returnMain"></app-form>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem">
                <span slot="title" class="color-primary">
                  {{ itemVT.vehicleBrand }} - {{ itemVT.vehicleModel}} - Cat. {{ itemVT.category }}
                </span>
              </app-table>
            </div><!--/.col-->
          </div><!--/.row-->

        </div>

      </transition-group>
    </div>

    <pre>{{ item }}</pre>

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
  import {DATA_VEHICLETYPE as nDATA} from '../../data/dataNames'
  import {DATA as PriceData} from '../../data/dnInsurancePrices'
  import Form from './forms/FormPrice.vue'
  import vehicleTable from './table/TableVehicleType.vue'
  import Table from '../../components/xTable.vue'

  export default {
    name: 'useType',
    components: {
      appForm: Form,
      vehicleTable: vehicleTable,
      appTable: Table
    },
    data: function () {
      return {
        switchPrices: false,
        urlRest: PriceData.name,
        item: JSON.parse(JSON.stringify(PriceData.post)),
        fields: JSON.parse(JSON.stringify(PriceData.fieldsTable)),
        items: [],

        // vehicle type
        urlRestVT: nDATA.name,
        itemVT: JSON.parse(JSON.stringify(nDATA.post)),
        fieldsVT: JSON.parse(JSON.stringify(nDATA.fieldsTable)),
        itemsVT: [],

        update: false,
        indexSelected: null,
        btnOption: {editOpc: 'info', deleteOpc: 'danger'},

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
          this.getData()
        }
        this.initData()
      },
      initData () {
        this.update = false
        this.item = JSON.parse(JSON.stringify(PriceData.post))
        this.indexSelected = null
        if (!this.switchPrices) {
          this.itemVT = JSON.parse(JSON.stringify(nDATA.post))
        }
      },
      getData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRestVT})
        self.then((data) => {
          console.log(data)
          this.itemsVT = data.status ? data.content : []
          this.totalRows = this.items.length
        })
      },
      getDataInsurancePrices (item) {
        let brand = item.vehicleBrand
        let model = item.vehicleModel
        let thisUrl = 'insuranceprices/filter?vehicleTypeId=' + item.id
        // let thisUrl = 'insuranceprices'
        console.log(thisUrl)
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: thisUrl})
        self.then((data) => {
          console.log('LOAD DATATABLE INSURANCE PRICES')
          console.log(data)
          this.items = data.status ? data.content : []
          //          this.totalRows = this.items.length
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
      pickItemVehicle (item, type) {
        this.initData()
        this.getDataInsurancePrices(item)
        this.itemVT = {...this.itemVT, ...item}
        this.switchPrices = true
      },
      returnMain (a) {
        this.initData()
        this.switchPrices = false
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

<style lang="scss">
</style>
