<template>
  <div class="wrapper">

    <!-- FORMULARIOS -->
    <div class="row d-flex justify-content-center">
      <div v-if="btnForm.switchForm" class="col-md-8">
        <app-form ref="form1"  aux="date" :btn_title="btnForm" :order="0" :total="items.length"
                  :item="item1" :nameForm="itemName" :horizontal="true" @defaulValue="defaulValueForm1" @eventForm="searchTablePrices">
          <template slot="title"><strong>BUSQUEDA</strong> de <strong>PRECIOS</strong></template>
          <template slot="title-datepicker">Fecha de Registro</template>
        </app-form>
      </div>
      <div v-if="!btnForm.switchForm" class="col-md-7">
        <app-form ref="form2" aux="validityDate" :btn_title="btnForm" :order="1" :total="items.length"
                  :item="item2" :nameForm="itemName" :horizontal="true" @defaulValue="defaulValueForm2" @eventForm="generateItems">
          <template slot="title"><strong>REGISTRO</strong> de <strong>PRECIOS</strong></template>
          <template slot="title-datepicker">Vigencia de Precios</template>
        </app-form>
      </div>
    </div>

    <!-- TABLE -->
    <b-card class="myCard">
      <div slot="header" class="text-center">Tabla de <strong>Precios</strong></div>
      <div class="col-md-7 mt-1">
        <datepicker ref="datepicker" v-model="datepicker.params.value" :format="datepicker.params.format" language="es" :placeholder="datepicker.placeholder"
                    :clear-button="false" :bootstrapStyling="true" class="float-left"
                    :disabled-picker="isLoading" @input="selectDate" :disabled="datepicker.params.disabled"
                    calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"></datepicker>
        <b-button v-if="btnForm.switchForm"  class="float-left ml-2" @click="saveTable" :disabled="isLoading" size="sm" variant="success"><i class="fa fa-ban"></i> Actualizar</b-button>
        <b-button v-else="" class="float-left ml-2" @click="saveTable" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-ban"></i> Guardar</b-button>
      </div>

      <div class="col-md-5 ml-auto mb-3">
        <b-form-input v-model="filter" placeholder="Buscar" :ref="'search'"  class="searchInput"/>
      </div>

      <!-- TABLE -->
      <div class="myEditTable">
        <b-table :fields="fields" :items="items" class="editTable bg-white" bordered :filter="filter" @filtered="onFiltered">

          <template v-for="f in fields" :slot="f.key" scope="data" :class="{'exception': data.item.vehicle.exception===1}">

            <div v-if="f.key==='actions'" >
              <template v-if="data.item.vehicle.exception===0">
                <b-button v-b-tooltip.hover.auto :title="'Lista de autos'" variant="primary" @click.stop="getListCar(data.item.vehicle)" size="sm" :disabled="isLoading">
                  <i class="fa fa-car" aria-hidden="false"></i>
                </b-button>
                <b-button variant="success" @click.stop="addException(data.item.vehicle)" size="sm" :disabled="isLoading">
                  <i class="fa fa-map-marker" aria-hidden="false"></i>
                </b-button>
              </template>
              <template v-else="">
                <b-button>
                  <i class="fa fa-search" aria-hidden="false"></i>
                </b-button>
              </template>
            </div>

            <!-- ONLY CLASS CATEGORY -->
            <div class="itemEditTable" v-else-if="f.key==='vehicle'">
              <!--<b-badge v-if="data.item.vehicle.exception===1" variant="primary">New</b-badge>-->
              <p class="labelCol p-0 m-0">
                <span v-if="data.item.vehicle.exception===1"  style="display: inline-block" class="fa-stack fa-lg">
                  <i class="fa fa-car fa-stack-1x"></i>
                  <i class="fa fa-ban fa-stack-2x text-danger"></i>
                </span>
                {{ data.value.vehicleClass.description}}-{{ data.value.vehicleCategory.description}}
                [{{data.value.seatNumber}}{{data.value.seatNumberTo === data.value.seatNumber ? ']': '-' + data.value.seatNumberTo + ']'}}
              </p>
            </div>

            <!-- DEPARTAMENTOS COLUMN -->
            <div :class="{'itemEditTable':true, 'isChange': changeList[f.key+'_'+data.item.vehicle.id] ? true : false}" v-else="">
              <span :class="{'textActive': !(changeList[f.key+'_'+data.item.vehicle.id] ? changeList[f.key+'_'+data.item.vehicle.id].edit : false)}"
                    @click="activeInput(f.key+'_'+data.item.vehicle.id)">{{ data.value }} {{data.item.edit}}</span>
              <b-form-input :ref="f.key+'_'+data.item.vehicle.id"
                            type="number" v-model="data.item[f.key]"
                            :class="{
                              'editActive': changeList[f.key+'_'+data.item.vehicle.id] ? changeList[f.key+'_'+data.item.vehicle.id].edit : false,
                              'text-center': true
                            }"
                            @blur.native="deactiveInput"
                            @change.native="changeValue(f.key+'_'+data.item.vehicle.id, f.key, data.item.vehicle, data.item[f.key])"
                            placeholder="Precio.." :autofocus="true">
              </b-form-input>

            </div>
          </template>
        </b-table>
      </div>

    </b-card>

    <b-modal :title="'Lista de Autos'" class="modal-primary modal-list-car" v-model="showModal" :hide-footer="true">
      <!--<template slot="modal-header">-->
      <!--</template>-->
      <div class="text-center">
        <span class="h5 text-primary pb-2 d-block">
          {{ pickRowItem.vehicleClass ? pickRowItem.vehicleClass.description : ''}}-{{ pickRowItem.vehicleCategory ? pickRowItem.vehicleCategory.description: ''}}
          [{{pickRowItem.seatNumber}}{{pickRowItem.seatNumberTo === pickRowItem.seatNumber ? ']': '-' + pickRowItem.seatNumberTo + ']'}}
        </span>
        <input class="form-control text-center w-75 m-auto"
               type="text" v-model="search" style="margin-bottom: 0.51em !important;background-color: #e5e5e5 !important;" placeholder="Buscar marca y modelo">
        <div class="pt-2 content-list-car">
          <b-badge v-for="car in filteredCars" pill :key="car.id">{{ car.vehicleType.vehicleBrand }}-{{ car.vehicleType.vehicleModel }}</b-badge>
        </div>
      </div>
    </b-modal>
    <!--<div class="row">-->
      <!--<div class="col-md-4">-->
        <!--<h1>item</h1>-->
        <!--<pre>{{ item }}</pre>-->
      <!--</div>-->
      <!--<div class="col-md-4">-->
        <!--<h1>item1</h1>-->
        <!--<pre>{{ item1 }}</pre>-->
      <!--</div>-->
      <!--<div class="col-md-4">-->
        <!--<h1>item2</h1>-->
        <!--<pre>{{ item2 }}</pre>-->
      <!--</div>-->
    <!--</div>-->
    <pre>{{ itemsIndex  }}</pre>
    <!--<pre>{{ rick }}</pre>-->
    <!--<pre>{{changeList}}</pre>-->
  </div>
</template>

<script>
  import ToggleButton from '../../components/ToggleButton.vue'
  import {DATA as nData} from '../../data/dnInsurancePrices'
  import Form from './forms/FormPriceFull2.vue'
  import Datepicker from 'vuejs-datepicker'
  import Mixin from '../../mixins'

  export default {
    name: 'priceFull',
    components: {
      appForm: Form,
      ToggleButton,
      Datepicker
    },
    mixins: [Mixin],
    data () {
      return {
        btnForm: {
          opc0: {
            icon: 'fa fa-plus',
            color: 'bg-success',
            title: 'Generar nueva tabla.'
          },
          opc1: {
            icon: 'fa fa-filter',
            color: 'bg-info',
            title: 'Cargar una tabla.'
          },
          switchForm: false
        },
        item1: JSON.parse(JSON.stringify(nData.post)),
        item2: JSON.parse(JSON.stringify(nData.post)),
        item: {},
        datepicker: {
          label: 'Fecha de Caducidad',
          placeholder: 'Fecha de Caducidad',
          type: 'text',
          input: 'datepicker',
          params: {
            key: 'date',
            format: 'dd/MM/yyyy',
            value: '',
            count: 0,
            disabled: {
              to: new Date(2017, 8, 19),
              from: new Date(2019, 6, 1)
            }
          }
        },
        itemName: nData.name,
        fields: [],
        items: [],
        itemsIndex: {},
        filter: null,
        showModal: false,
        carsVTC: [],
        search: '',
        pickRowItem: {},
        changeList: {},
        pickCellId: '',
        rick: [],
        insuranceType: {}
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      filteredCars () {
        return this.carsVTC.filter(item => {
          let text = item.vehicleType.vehicleBrand.toLowerCase() + ' ' + item.vehicleType.vehicleModel.toLowerCase()
          return text.indexOf(this.search.toLowerCase()) > -1
        })
      },
      counterItems () {
        return this.items.length
      }
    },
    watch: {
      'btnForm.switchForm' (newVal) {
        this.item = {}
        this.datepicker.params.value = ''
        if (newVal) {
          this.item = this.item1
        } else {
          this.item = this.item2
        }
      }
    },
    methods: {
      // Funciones basicas
      generateId (region, data) {
        return region + '_' + data.vehicleCategory.id + '_' + data.vehicleClass.id + '_' + data.seatNumber + '_' + data.seatNumberTo
      },
      generateVCCId (data, exception = 0) {
        return data.vehicleCategory.id + '_' + data.vehicleClass.id + '_' + data.seatNumber + '_' + data.seatNumberTo + '_' + exception
      },
      initData () {
        // initData
        this.items = []
        this.carsVTC = []
        this.search = ''
        this.pickRowItem = {}
        this.changeList = {}
        this.pickCellId = ''
      },
      defaulValueForm1 (type = false) {
        this.item1.validityDate = ''
        this.datepicker.params.value = ''
        if (!type) {
          // alert('borra form1')
          this.item1 = JSON.parse(JSON.stringify(nData.post))
          this.item = this.item1
          this.datepicker.params.value = ''
          this.initData()
        } else {
          this.initData()
        }
      },
      defaulValueForm2 (type = false) {
        this.item2.validityDate = ''
        this.datepicker.params.value = ''
        if (!type) {
          // alert('borra form2')
          this.item2 = JSON.parse(JSON.stringify(nData.post))
          this.item = this.item2
          this.initData()
        } else {
          this.initData()
        }
      },
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      toggleDialog: function () {
        this.showModal = !this.showModal
      },
      selectDate (pickDate) {
        let newDate = this.tranformDateToFormat(pickDate, '/')
        this.item['validityDate'] = newDate
      },
      async getData (url) {
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        return self.status ? self.content : []
      },
      convertList (list) {
        let newList = []
        let vm = this
        this.$lodash.forEach(list, function (value, key) {
          value.validityDate = vm.item.validityDate
          value.insuranceType = {id: vm.insuranceType[0].id}
          value.insuranceCompany = {id: vm.item.insuranceCompany.id}
          value.priceType = vm.item.priceType
          value.useType = {id: vm.item.useType.id}
          newList.push(value)
        })
        return newList
      },

      // Generate Table
      fillTable (prices) {
        let vm = this
        let id = 0
        let indexItems = 0
        prices.forEach(function (item, index) {
          id = vm.generateVCCId(item)
          indexItems = vm.itemsIndex[id]
          vm.$set(vm.items[indexItems],item.region.id, item.price)
          vm.changeValue(item.region.id + '_' + id, item.region.id, item, item.price)
        })
      },
      async searchTablePrices () {
        await this.generateItems()
        let obj = {
          date: this.item.date,
          insuranceCompanyId: this.item.insuranceCompany.id,
          useTypeId: this.item.useType.id,
          priceType: this.item.priceType,
          vehicleClassId: this.item.vehicleClass.id,
          vehicleCategoryId: this.item.vehicleCategory ? this.item.vehicleCategory.id : ''
        }
        console.log('OBJETO')
        console.log(obj)
        let url = 'insuranceprices?date='+obj.date+'&insuranceCompanyId='+obj.insuranceCompanyId+'&priceType='+obj.priceType+'&useTypeId='+obj.useTypeId+'&vehicleClassId='+obj.vehicleClassId+'&vehicleCategoryId='+obj.vehicleCategoryId
        console.log(url)
        let prices = await this.getData(url)
        console.log('PRECIOS')
        console.log(prices)
        this.fillTable(prices)
      },
      async generateFields () {
        let region = await this.getData('regions')
        let fields = [
          {key: 'actions', label: '&nbsp;', thStyle: 'width:50px'},
          {key: 'vehicle', label: 'Tipos Vehiculos', thStyle: 'width: 300px', variant: 'secondary', 'class': 'text-center'}
        ]
        region.forEach(function (item) {
          fields.push({
            key: item.id,
            label: item.name,
            'class': 'text-center'
          })
        })
        this.fields = fields
      },
      async generateItems () {
        this.items = []
        let vm = this
        let classId = this.item.vehicleClass.id
        let categoryId = this.item.vehicleCategory ? this.item.vehicleCategory.id : ''
        let url = 'vehicletypecategories/filter?vehicleClassId=' + classId + '&vehicleCategoryId=' + categoryId
        console.log('Local URL')
        console.log(url)
        let data = await this.getData(url)
        let items = []
        let itemsIndex = {}
        data.forEach(function (item, index) {
          console.log(index)
          // Generate Items
          item.id = vm.generateVCCId(item)
          item.exception = 0
          items.push({ vehicle: item })
          // Generate struct load data
          itemsIndex[item.id] = index
        })
        if (items.length === 0) {
          if (this.$refs.form1) this.$refs.form1.restricted = false
          if (this.$refs.form2) this.$refs.form2.restricted = false
        }
        this.items = items
        this.itemsIndex = itemsIndex
        console.log('ROWSSSSSSSS')
        console.log(this.items)
      },
      async getListCar (item) {
        this.pickRowItem = item
        this.search = ''
        this.toggleDialog()
        console.log(item)
        let url = 'vehicletypecategories?type=0&vehicleClassId='+item.vehicleClass.id+'&vehicleCategoryId'+item.vehicleCategory.id+'&seatNumber='+item.seatNumber+'&seatNumberTo='+item.seatNumberTo
        this.carsVTC = await this.getData(url)
        console.log(this.carsVTC)
      },
      saveTable () {
        let data = this.convertList(this.changeList)
        if (data.length === 0) {
          this.$store.commit('sendNotification', {status: null, message: 'No ha realizado ningun cambios en los precios.'})
          return false
        }

        if (this.datepicker.params.value === '') {
          this.$store.commit('sendNotification', {status: null, message: 'Debe ingresar la fecha de caducidad para los precios.'})
          return false
        }
        this.rick = data
        console.log(this.item.validityDate)
        return false
        let url = 'insuranceprices/multiple'
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: data})
        self.then((data) => {
          console.log(data)
          if (data.status) {
            console.log('SUCCESS')
            this.changeList = {}
            this.datepicker.params.value = ''
            console.log(data.content)
          } else {
            console.log('ERROR')
            console.log(data)
          }
        }).catch(error => {
          console.log('ERROR 2')
          console.log(error)
        })
      },
      addException (item) {
        let id = this.generateVCCId(item)
        let newId = this.generateVCCId(item, 1)
        let indexItems = this.itemsIndex[id]

        let newRow = {
          _rowVariant: 'danger',
          _cellVariants: {vehicle: 'warning'},
          vehicle: JSON.parse(JSON.stringify(item))
        }
        newRow.vehicle.id = newId
        newRow.vehicle.exception = 1
        this.items.splice(indexItems + 1, 0, newRow)
        console.log(item)
        console.log(newRow)
        console.log(id)
        console.log(indexItems)
      },

      // Events Table Prices
      activeInput (id) {
        let data = {edit: true}
        // this.deactiveInput()
        if (this.changeList[id]) {
          this.changeList[id].edit = true
        } else {
          this.$set(this.changeList, id, data)
        }
        this.pickCellId = id
        setTimeout(() => {
          this.$refs[id][0].focus()
        }, 100)
      },
      deactiveInput () {
        if (this.changeList[this.pickCellId]) {
          if (this.changeList[this.pickCellId].price) {
            this.changeList[this.pickCellId].edit = false
          } else {
            this.$delete(this.changeList, this.pickCellId)
          }
        }
      },
      changeValue (id, column, row, price) {
        console.log(column)
        console.log(row)
        console.log(price)
        let data = {
          price: price,
          exception: row.exception,
          region: {id: column},
          observation: '',
          vehicleClass: row.vehicleClass,
          vehicleCategory: row.vehicleCategory,
          seatNumber: row.seatNumber,
          seatNumberTo: row.seatNumberTo,
          edit: false
          // insuranceType: {
          //  id: this.insuranceType[0].id
          // },
          // insuranceCompany: {id: this.item.insuranceCompany.id},
          // priceType: this.item.priceType,
          // useType: {id: this.item.useType.id},
          // validityDate: this.item.validityDate,
        }
        this.$set(this.changeList, id, data)
      }
    },
    async created () {
      this.insuranceType = await this.getData('insurancetypes')
    },
    mounted () {
      this.generateFields()
      let vm = this
      let date = vm.$store.getters.getDateTime.date
      let toDay = vm.$moment(date, 'DD/MM/YYYY').add(1, 'days')
      let day = toDay.get('date')
      let month = toDay.get('month')
      let year = toDay.get('year')
      this.datepicker.params.disabled.to = new Date(year, month, day)
      this.datepicker.params.disabled.from = new Date(year + 1, month, day)
      this.item = this.item2
    }
  }
</script>

<style lang="scss">
  .myEditTable{
    width: 100%;
    overflow: scroll;
    table{
      tr.table-danger{
        // background: #0170ba !important;
        td.table-warning{
          // background: red !important;
          span{
            background: none !important;
          }
        }
      }
    }
  }
  .editTable{
    font-size: 0.8em;
    thead{
      tr th:first-child{
        div{
          width: 46px;
        }
      }
      tr th:nth-child(2){
        /*background: #212120;*/
        /*color: #c7c7c7;*/
        background: #717171;
        color: #ffffff;
        div {
          width: 210px;
          font-size: 1em;
        }
      }
      tr th{
        background: #717171;
        color: white;
        /*background: #ffa501;*/
        /*color: black;*/
        font-weight: 400;
        border: 1px solid #333332 !important;
        div {
          width: 75px;
          font-size: 0.9em;
        }
      }
    }

    tbody{
      tr td:first-child{
        background: #717171;
        border: none;
        div{
          margin-top: 7%;
          text-align: center;
        }
      }
      tr td:nth-child(2){
        //border: 1px solid #ef7b1f;
        font-weight: 700;
      }
    }

    button{
      font-size: 1.2em;
      width: 30px;
      height: 30px;
    }

    .itemEditTable{
      &.isChange{
        color: #ef7b1f;
        font-weight: 500;
        font-size: 1.2em;
      }
      span{
        display: none;
        padding: 12px 8px;
        height: 44px;
        line-height: 2em;
        &.textActive{
          display: block;
        }
        &.labelCol{
          display: block;
          background: #f4f3ef;
          /*color: #c7c7c7;*/
          //background: #ffa501;
          color: #717171;
        }
      }
      input{
        font-weight: 500;
        background: white;
        display: none;
        height: 44px;
        border-radius: initial;
        border: none;
        color: #ef7b22;
        font-size: 1em;
        &.editActive{
          display: block;
          &:visited, &:focus{
            color: #49abca;
          }
        }
        &.isChange{
          color: orange;
        }
      }
    }
    td{
      padding: 0;
      // border: 1px solid #212120;
    }
  }
  .modal-list-car{
    div.content-list-car {
      max-height: 350px;
      overflow: auto;
    }

    .badge-pill{
      border-radius: 10rem;
      font-size: 1em;
      font-weight: 100;
      background: #e2e2e2;
      margin-right: 1em;
      margin-bottom: 0.4em;
      padding: 0.5em 0.6em;
    }
  }
</style>
