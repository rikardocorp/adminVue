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
            <app-table :fields="fieldsVTC" :items="itemsVTC" :btnOption="btnOptionVTC" @pickItem="pickItem">
                <span slot="title" class="">
                  Lista de Clase - Categoria [Precios]
                </span>
            </app-table>
            <pre>{{ totalRows }}</pre>
          </div><!--/.col-->
        </div><!--/.row-->

        <!-- INSURANCE PRICES -->
        <div key="div2" v-show="switchPrices">

          <div class="row d-flex justify-content-center">
            <div class="col-md-6">
              <app-form :item="item"
                        :vehicle="itemVTC"
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
                <span slot="title" class="">
                  {{ itemVTC.vehicleBrand }} - {{ itemVTC.vehicleModel}} - Cat. {{ itemVTC.category }}
                </span>
              </app-table>
            </div><!--/.col-->
          </div><!--/.row-->

        </div>

      </transition-group>
    </div>

    <!--<pre>{{ item }}</pre>-->

    <b-modal :title="optionPick.title" :class="'modal-'+optionPick.variant" v-model="showModal">
      <div v-if="optionPick.name === btnOption.deleteOpc.name">{{ optionPick.content }}</div>
      <template slot="modal-footer">
        <b-button @click="showModal = !showModal">Cancel</b-button>
        <b-button v-if="optionPick.name === btnOption.deleteOpc.name" @click="deleteData" :variant="optionPick.variant">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import {DATA as nDATA} from '../../data/dnVehicleTypeCategories'
  import {DATA as PriceData} from '../../data/dnInsurancePrices'
  import Form from './forms/FormPrice.vue'
  import Table from '../../components/xTable.vue'

  export default {
    name: 'useType',
    components: {
      appForm: Form,
      appTable: Table
    },
    data: function () {
      return {
        switchPrices: false,
        urlRest: PriceData.name,
        item: JSON.parse(JSON.stringify(PriceData.post)),
        fields: PriceData.fieldsTable,
        items: [],
        btnOption: {
          editOpc: {
            name: 'edit',
            variant: 'primary',
            selected: false,
            icon: 'fa fa-pencil'
          },
          deleteOpc: {
            name: 'delete',
            title: 'Eliminar registro',
            content: 'Esta seguro de eliminar esto?',
            variant: 'danger',
            selected: false,
            icon: 'fa fa-trash'
          }
        },

        // vehicle type
        urlRestVTC: nDATA.name,
        itemVTC: JSON.parse(JSON.stringify(nDATA.post)),
        fieldsVTC: nDATA.fieldsTablePrice,
        itemsVTC: [],
        btnOptionVTC: {
          plusOpc: {
            name: 'plus',
            variant: 'primary',
            selected: false,
            icon: 'fa fa-plus'
          }
        },

        update: false,
        indexSelected: null,
        itemPick: {},
        optionPick: {},
        showModal: false,
        totalRows: 0
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
          //this.getData()
        }
        //this.initData()
        this.getDataInsurancePrices()
      },
      initData () {
        this.update = false
        this.item = JSON.parse(JSON.stringify(PriceData.post))
        this.indexSelected = null
        if (!this.switchPrices) {
          this.itemVTC = JSON.parse(JSON.stringify(nDATA.post))
        }
      },
      getData () {
        // let url = this.urlRestVTC + '1'
        let url = 'vehicletypecategories/filter?type=0'
        // alert(url)

        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        self.then((data) => {
          console.log(data)
          this.itemsVTC = data.status ? data.content : []
          this.totalRows = this.itemsVTC.length
        })
      },
      getDataInsurancePrices () {
        let item = this.itemPick
        let thisUrl = 'insuranceprices/filter?vehicleTypeCategoryId=' + item.id
        // let thisUrl = 'insuranceprices'
        console.log('URL TIPO VEHICULO')
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
      pickItem (item, option) {
        this.initData()
        this.itemPick = item
        this.optionPick = option
        this.indexSelected = this.$lodash.findIndex(this.items, item)

        if (option.name === this.btnOption.editOpc.name) {
          this.item = {...this.item, ...item}
          this.update = true
          this.$scrollTo('body')
        } else if (option.name === this.btnOption.deleteOpc.name) {
          this.toggleDialog()
        } else if (option.name === this.btnOptionVTC.plusOpc.name) {
          this.initData()
          this.getDataInsurancePrices()
          this.itemVTC = {...this.itemVTC, ...item}
          this.switchPrices = true
        }
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
