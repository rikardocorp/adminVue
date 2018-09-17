<template>
  <div class="wrapper">
    <!-- FORMULARIOS -->
    <div class="row d-flex justify-content-center">

      <!-- FORM SEARCH PRICES -->
      <!--<div class="col-md-12">-->
        <!--<section>-->
          <!--<pre>-->
            <!--{{ rdata }}-->
          <!--</pre>-->
          <!--<button @click="mostrarID">MOstrar IDS Tabla</button>-->
          <!--<textarea name="" id="" cols="30" rows="10">-->
            <!--{{rixip}}-->
          <!--</textarea>-->
        <!--</section>-->
      <!--</div>-->
      <div class="col-md-4 col-lg-4 col-xl-3">
        <app-form :id="'formPrices'" :listCalendarPrices="listCalendarPrices"
                  :item="itemPrices" :horizontal="true" :disabled="copyDisabled"
                  @defaulValue="defaulValueForm"
                  @eventForm="searchTablePrices">
          <template slot="title"><strong>Registro</strong> de <strong>Precios</strong></template>
        </app-form>
      </div>

      <!-- FORM FORM CALENDAR PRICES -->
      <div class="col-md-8 col-lg-8 col-xl-6">
        <form-calendar :id="'formCalendar'" :item="itemCalendar" :horizontal="true" :restricted="restrictedCalendarPrices"
                       @listCalendar="fillListCalendar" @modal="showModalDelete=true">
          <template slot="title"><strong>Calendario</strong> de <strong>Precios</strong></template>
        </form-calendar>
      </div>
    </div>

    <!-- TABLE -->
    <b-card class="myCard">
      <div slot="header" class="text-center">Tabla de <strong>Precios</strong></div>
      <div class="col-md-7 mt-1">
        <!--<datepicker ref="datepicker" v-model="datepicker.params.value" :format="datepicker.params.format" language="es" :placeholder="datepicker.placeholder"-->
                    <!--:clear-button="false" :bootstrapStyling="true" class="float-left"-->
                    <!--:disabled-picker="isLoading" @input="selectDate" :disabled="datepicker.params.disabled"-->
                    <!--calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"></datepicker>-->
        <!--<b-button v-if="btnForm.switchForm"  class="float-left ml-2" @click="saveTable" :disabled="isLoading" size="sm" variant="success"><i class="fa fa-ban"></i> Actualizar</b-button>-->
        <b-button class="float-left ml-2" @click="saveTable" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-ban"></i> Guardar</b-button>
        <b-button class="float-left ml-2" @click="copyPrices" :disabled="isLoading" size="sm" variant="info"><i class="fa fa-ban"></i> Copiar</b-button>
        <!--<b-button class="float-left ml-2" @click="cleanPrices" :disabled="isLoading" size="sm" variant="info"><i class="fa fa-ban"></i> Limpiar BD</b-button>-->
      </div>

      <div class="col-md-5 ml-auto mb-3">
        <b-form-input v-model="filter" placeholder="Buscar" :ref="'search'"  class="searchInput"/>
      </div>

      <!-- TABLE -->
      <div class="myEditTable">
        <b-table :fields="fields" :items="items" class="editTable bg-white" bordered :filter="filter" @filtered="onFiltered"
                 :show-empty="true" empty-text="No hay resultados en lista de precios.">

          <template v-for="f in fields" :slot="f.key" scope="data" :class="{'exception': data.item._vehicle.exception===1}">

            <div v-if="f.key==='actions'" >
              <template v-if="data.item._vehicle.exception===0">
                <b-button v-b-tooltip.hover.auto
                          :title="data.item._vehicle.exceptionBtn? 'Lista de excepcionados':'Lista de autos'"
                          :variant="data.item._vehicle.exceptionBtn? 'danger':'success'"
                          @click.stop="getListCar(data.item._vehicle, true, false)"
                          size="sm" :disabled="isLoading">
                  <i class="fa fa-car" aria-hidden="false"></i>
                </b-button>
                <b-button  v-b-tooltip.hover.auto
                           :ref="'btn_' + data.item._vehicle.id"
                           :title="'Agregar excepcion'" variant="danger" @click.stop="addException(data.item._vehicle)" size="sm" :disabled="isLoading">
                  <i class="fa fa-plus" aria-hidden="false"></i>
                </b-button>
              </template>
              <template v-else="">
                <div class="union-line"></div>
                <b-button style="padding: 0px; background: none; font-size: 1.5em; width: 40px;" v-b-tooltip.hover.auto :title="'Lista de excepciones'" variant="secundary" @click.stop="getListCar(data.item._vehicle, true, true)" size="sm" :disabled="isLoading">
                  <span class="fa-stack fa-lg" style="font-size: 1.1em">
                    <i class="fa fa-car fa-stack-1x" style="color: white;"></i>
                    <i :class="'fa fa-circle-o fa-stack-2x ' + (data.item._vehicle.btnCircleCar ? 'text-warning':'text-success')"></i>
                  </span>
                </b-button>
              </template>
            </div>

            <!-- ONLY CLASS CATEGORY -->
            <div class="itemEditTable" v-else-if="f.key==='_vehicle'">
              <!--<b-badge v-if="data.item.vehicle.exception===1" variant="primary">New</b-badge>-->
              <p class="labelCol m-0" style="padding-top: 1.2em !important;">
                {{ data.value.vehicleClass.description}}-{{ data.value.vehicleCategory.description}}
                [{{data.value.seatNumber}}{{data.value.seatNumberTo === data.value.seatNumber ? ']': '-' + data.value.seatNumberTo + ']'}}
              </p>
            </div>

            <!-- DEPARTAMENTOS COLUMN -->
            <div :class="{'itemEditTable':true, 'isChange': changeList[f.key+'_'+data.item._vehicle.id] ? true : false}" v-else="">
              <span :class="{'textActive': !(changeList[f.key+'_'+data.item._vehicle.id] ? changeList[f.key+'_'+data.item._vehicle.id].edit : false)}"
                    @click="activeInput(f.key+'_'+data.item._vehicle.id, data.item[f.key])">{{ data.value ? data.value.price : '' }}</span>
              <b-form-input :ref="f.key+'_'+data.item._vehicle.id"
                            type="number" v-model="itemPrice"
                            :class="{
                              'editActive': changeList[f.key+'_'+data.item._vehicle.id] ? changeList[f.key+'_'+data.item._vehicle.id].edit : false,
                              'text-center': true
                            }"
                            @blur.native="deactiveInput"
                            @change.native="changeValue(data.item._vehicle.id, f.key, data.item._vehicle)"
                            placeholder="Precio.." :autofocus="true">
              </b-form-input>
            </div>
          </template>

          <!--<template slot="empty">rikardocorp</template>-->
        </b-table>
      </div>
    </b-card>
    <b-modal :title="pickRowItem.exception==0 ? 'Lista de Autos' + (pickRowItem.exceptionBtn? ' - Excepcionados':'') : 'Lista de Autos - Excepciones'"
             :class="{'modal-success': (pickRowItem.exception==1 || !pickRowItem.exceptionBtn), 'modal-danger': (pickRowItem.exception==0 && pickRowItem.exceptionBtn), 'modal-list-car': true}" v-model="showModal" :hide-footer="true">
      <!--<template slot="modal-header">-->
      <!--</template>-->
      <div class="text-center">
        <span :class="{'text-success': (pickRowItem.exception==1 || !pickRowItem.exceptionBtn), 'text-danger': (pickRowItem.exception==0 && pickRowItem.exceptionBtn), 'pb-2 d-block h5': true}">
          {{ pickRowItem.vehicleClass ? pickRowItem.vehicleClass.description : ''}}-{{ pickRowItem.vehicleCategory ? pickRowItem.vehicleCategory.description: ''}}
          [{{pickRowItem.seatNumber}}{{pickRowItem.seatNumberTo === pickRowItem.seatNumber ? ']': '-' + pickRowItem.seatNumberTo + ']'}}
        </span>
        <input class="form-control text-center w-75 m-auto"
               type="text" v-model="search" style="margin-bottom: 0.51em !important;background-color: #e5e5e5 !important;" placeholder="Buscar marca y modelo">
        <div v-if="pickRowItem.exception===1" class="pt-2 content-list-car">
          <b-badge v-for="car in filteredCars" pill
                   :key="car.id" :class="{'hvr-pulse-grow': true, 'bg-success': listDescription[car.id] ? false : true}"
                   @click="addItemDescription(car, true)">{{ car.vehicleType.vehicleBrand }}-{{ car.vehicleType.vehicleModel }}</b-badge>
        </div>
        <div v-else-if="pickRowItem.exceptionBtn" class="pt-2 content-list-car">
          <b-badge v-for="car in filteredCars" pill v-if="listDescriptionHidden[car.id] || itemsIndex[auxIDItems]==undefined"
                   :key="car.id" :class="{'hvr-pulse-grow': true, 'bg-danger': listDescription[car.id] ? true : false}">{{ car.vehicleType.vehicleBrand }}-{{ car.vehicleType.vehicleModel }}</b-badge>
        </div>
        <div v-else="" class="pt-2 content-list-car">
          <b-badge v-for="car in filteredCars" pill v-if="listDescriptionHidden[car.id] || itemsIndex[auxIDItems]==undefined"
                   :key="car.id" :class="{'hvr-pulse-grow': true, 'bg-success': listDescription[car.id] ? true : false}"
                   @click="addItemDescription(car, false)">{{ car.vehicleType.vehicleBrand }}-{{ car.vehicleType.vehicleModel }}</b-badge>
        </div>

        <div v-if="pickRowItem.exception===1" class="mt-3 p-1 pt-2 row mx-auto w-100" style="border-top: 1px solid #4dbd74;">
          <div class="col-6">
            Todos los <b-badge pill class="bg-success" style="width: 20px;height: 20px; margin: 0;">&nbsp;</b-badge> se consideran como seleccionados.
          </div>
          <div class="col-6">
            Todos los <b-badge pill style="width: 20px;height: 20px; margin: 0; background: #e2e2e2;">&nbsp;</b-badge> se consideran como excepciones.
          </div>
        </div>
        <div v-else-if="pickRowItem.exceptionBtn" class="mt-3 p-1 pt-2 row mx-auto w-100" style="border-top: 1px solid #f86c6b;">
          <div class="col-12">
            Todos los <b-badge pill style="width: 20px;height: 20px; margin: 0;" class="bg-danger">&nbsp;</b-badge> se consideran como seleccionados.
          </div>
        </div>
        <div v-else="" class="mt-3 p-1 pt-2 row mx-auto w-100" style="border-top: 1px solid #4dbd74;">
          <div class="col-6">
            Si todos son <b-badge pill style="width: 20px;height: 20px; margin: 0; background: #e2e2e2;">&nbsp;</b-badge>, todos son seleccionados.
          </div>
          <div class="col-6">
            Si existe algun <b-badge pill style="width: 20px;height: 20px; margin: 0;" class="bg-success">&nbsp;</b-badge>, solo se consideran esos seleccionados.
          </div>
        </div>
      </div>
    </b-modal>

    <!--<pre>{{ changeList }}</pre>-->
    <!--<pre>{{countWrong}}</pre>-->
    <!--<pre>{{ itemsIndex }}</pre>-->
    <!--<pre>{{ items }}</pre>-->
  </div>
</template>

<script>
  import ToggleButton from '../../components/ToggleButton.vue'
  import CalendarInline from '../../components/CalendarInline.vue'
  import {DATA as nData} from '../../data/dnInsurancePrices'
  import {DATA as nDataCalendar} from '../../data/dnPriceCalendar'
  import Form from './forms/FormPriceFull3.vue'
  import FormCalendar from './forms/FormPriceCalendar.vue'
  import Datepicker from 'vuejs-datepicker'
  import Mixin from '../../mixins'

  export default {
    name: 'priceFull',
    components: {
      appForm: Form,
      ToggleButton,
      Datepicker,
      CalendarInline,
      FormCalendar
    },
    mixins: [Mixin],
    data () {
      return {
        rixip: '',
        rdata: '',
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
        itemPrices: JSON.parse(JSON.stringify(nData.post)),
        itemCalendar: JSON.parse(JSON.stringify(nDataCalendar.post)),
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
        fields: [],
        items: [],
        itemsIndex: {},
        filter: null,
        showModal: false,
        carsVTC: [],
        search: '',
        pickRowItem: {},
        pickRowItemOther: {},
        changeList: {},
        pickCellId: '',
        rick: [],
        insuranceType: {},
        listDescription: {},
        listDescriptionHidden: {},
        listCalendarPrices: [],
        itemPrice: [],
        restrictedCalendarPrices: false,
        prices: [],
        copyDisabled: false,
        itemCopy: {},
        auxDeleteItemDescription: 0,
        auxIDItems: '',
        isFillTable: true,
        isClickBadge: false,
        countWrong: 0
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
      }
    },
    watch: {
      showModal (newVal) {
        this.$root.$emit('bv::hide::tooltip')
        if (!newVal) {
          // HIDDEN
          this.pickRowItem['description_' + this.pickRowItem.exception] = JSON.stringify(this.listDescription)
          if (this.pickRowItem.exception === 1) {
            this.pickRowItemOther['description_0'] = JSON.stringify(this.listDescription)
            if (JSON.stringify(this.listDescription) === '{}') {
              if (!this.pickRowItem.btnCircleCar) {
                this.pickRowItem.btnCircleCar = true
                this.countWrong = this.countWrong + 1
              }
            } else {
              if (this.pickRowItem.btnCircleCar) {
                this.pickRowItem.btnCircleCar = false
                this.countWrong = this.countWrong - 1
              }
            }
          }
          this.listDescription = {}
          this.listDescriptionHidden = {}
          if (this.isClickBadge) {
            this.activeRowPrices(this.pickRowItem.id)
            if (this.pickRowItemOther.id) this.activeRowPrices(this.pickRowItemOther.id)
            this.isClickBadge = false
          }
        } else {
          // SHOW
          console.log(this.filteredCars)
          if (this.pickRowItem.exception === 0) {
            let id = this.generateVCCId(this.pickRowItem, 1)
            let index = this.itemsIndex[id]
            console.log('EXCEPITION 0')
            console.log(index)
            if (index !== undefined) {
              // excepciones
              let row = this.items[index]._vehicle
              this.listDescriptionHidden = row['description_1'] ? JSON.parse(row['description_1']) : {}
              this.listDescription = this.pickRowItem['description_0'] ? JSON.parse(this.pickRowItem['description_0']) : {}
            } else {
              // sin excepciones
              id = this.generateVCCId(this.pickRowItem)
              index = this.itemsIndex[id]
              this.listDescription = this.pickRowItem['description_0'] ? JSON.parse(this.pickRowItem['description_0']) : {}
            }
          } else {
            this.listDescription = this.pickRowItem['description_1'] ? JSON.parse(this.pickRowItem['description_1']) : {}
          }
        }
      }
    },
    methods: {
      activeRowPrices (IDRowItem) {
        let vm = this
        let id = IDRowItem
        let indexItems = this.itemsIndex[id]
        let vehicle = this.items[indexItems]._vehicle
        this.$lodash.forEach(this.items[indexItems], function (value, key) {
          if (key[0] !== '_') {
            console.log(key, value)
            vm.itemPrice = value.price
            vm.changeValue(id, key, vehicle)
          }
        })
      },
      fillListCalendar (value) {
        this.listCalendarPrices = value
      },
      // Funciones basicas
      async getData (url) {
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        return self.status ? self.content : []
      },
      generateVCCId (data, exception = 0) {
        return data.vehicleCategory.id + '_' + data.vehicleClass.id + '_' + data.seatNumber + '_' + data.seatNumberTo + '_' + exception
      },
      generateIndexRow (list) {
        let itemsIndex = {}
        list.forEach(function (item, index) {
          itemsIndex[item._vehicle.id] = index
        })
        this.itemsIndex = itemsIndex
      },
      initData () {
        // initData
        this.items = []
        this.carsVTC = []
        this.search = ''
        this.pickRowItem = {}
        this.pickRowItemOther = {}
        this.changeList = {}
        this.pickCellId = ''
      },
      defaulValueForm (type = false) {
        if (!type) {
          this.itemPrices = JSON.parse(JSON.stringify(nData.post))
          this.item = this.itemPrices
        }
        this.copyDisabled = false
        this.restrictedCalendarPrices = false
        this.initData()
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
      convertList (list) {
        let newList = []
        let vm = this
        this.$lodash.forEach(list, function (value, key) {
          let id = vm.generateVCCId(value, value.exception)
          let index = vm.itemsIndex[id]
          let row = vm.items[index]._vehicle
          console.log(index, id)
          console.log(row)
          value.validityDate = vm.item.validityDate
          value.priceCalendar = {id: vm.item.priceCalendar.id}
          value.insuranceType = {id: vm.insuranceType[0].id}
          value.insuranceCompany = {id: vm.item.insuranceCompany.id}
          value.priceType = vm.item.priceType
          value.useType = {id: vm.item.useType.id}
          value.description = row['description_' + row.exception] ? row['description_' + row.exception] : ''
          newList.push(value)
        })
        return newList
      },
      compareObject (obj1, obj2) {
        let cen = true
        obj2 = obj2 === null ? {} : obj2
        this.$lodash.forEach(obj1, function (value, key) {
          console.log(key)
          if (obj1[key] !== obj2[key]) {
            cen = false
            return false
          }
        })
        return cen
      },
      // Generate Table
      copyPrices () {
        let total = Object.keys(this.changeList).length
        if (total > 0) {
          this.$dialog.confirm('Existen modificaciones sin guardar, ¿Desea continuar?')
            .then((dialog) => {
              this.copyDisabled = false
              this.fillTable(this.prices, true)
              this.restrictedCalendarPrices = false
              dialog.close()
            })
            .catch(() => {
              console.log('Clicked on cancel')
            })
        } else {
          this.copyDisabled = false
          this.fillTable(this.prices, true)
          this.restrictedCalendarPrices = false
        }
      },
      // cleanPrices () {
      //   if (this.rixip === '') {
      //     alert('no hay IDs')
      //     return false
      //   }
      //
      //   let data = {
      //     priceCalendarId: this.item.priceCalendar.id,
      //     insuranceCompanyId: this.item.insuranceCompany.id,
      //     priceType: this.item.priceType,
      //     useTypeId: this.item.useType.id,
      //     vehicleClassId: this.item.vehicleClass.id,
      //     vehicleCategoryId: this.item.vehicleCategory ? this.item.vehicleCategory.id : '',
      //     validos: this.rixip.slice(0, -1)
      //   }
      //
      //   this.rdata = data
      //   console.log('---------------')
      //   console.log(data)
      //   let url = 'insuranceprices/delete'
      //   let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: data})
      //   self.then((data) => {
      //     console.log(data)
      //     if (data.status) {
      //       console.log('SUCCESS')
      //       this.rixip = ''
      //     } else {
      //       console.log('ERROR')
      //     }
      //   }).catch(error => {
      //     console.log('ERROR 2')
      //   })
      // },
      fillTable (prices, copy = false) {
        this.isFillTable = true
        let vm = this
        let id = 0
        let indexItems = 0
        let count = 0
        if (!copy) {
          prices.forEach(function (item, index) {
            console.log(count++)
            if (item.exception === 1) {
              let idaux = vm.generateVCCId(item)
              if (vm.$refs['btn_' + idaux]) {
                vm.$refs['btn_' + idaux][0].click()
              }
            }
            id = vm.generateVCCId(item, item.exception)
            indexItems = vm.itemsIndex[id]
            if (indexItems !== undefined) {
              if (vm.items[indexItems][item.region.id] === undefined) {
                let data = {
                  id: item.id,
                  price: item.price
                }
                vm.$set(vm.items[indexItems], item.region.id, data)
                vm.getDescription(indexItems, item.description, item.exception)
                vm.rixip = vm.rixip + item.id + ','
              }
            }
          })
        } else {
          prices.forEach(function (item, index) {
            // console.log(item, index)
//            if (item.exception === 1) {
//              vm.addException(item, false)
//            }
            id = vm.generateVCCId(item, item.exception)
            indexItems = vm.itemsIndex[id]

            if (indexItems !== undefined) {
              if (vm.items[indexItems][item.region.id].id !== undefined) {
                // console.log(vm.items[indexItems][item.region.id])
                let data = {
                  // id: item.id,
                  price: item.price
                }
                vm.$set(vm.items[indexItems], item.region.id, data)
                vm.getDescription(indexItems, item.description, item.exception)
                // Volver a registrar todos los precios
                vm.itemPrice = item.price
                vm.changeValue(id, item.region.id, item)
                // count1++
              }
            }
          })
          console.log('COunt validos', this.rixip)
          // console.log('COunt repetidos', count2)
          // console.log('COunt fuera', count3)
        }
        this.isFillTable = false
      },
      async searchTablePrices () {
        await this.generateItems()
        let obj = {
          priceCalendarId: this.item.priceCalendar.id,
          insuranceCompanyId: this.item.insuranceCompany.id,
          useTypeId: this.item.useType.id,
          priceType: this.item.priceType,
          vehicleClassId: this.item.vehicleClass.id,
          vehicleCategoryId: this.item.vehicleCategory ? this.item.vehicleCategory.id : ''
        }
        let url = 'insuranceprices?priceCalendarId='+obj.priceCalendarId+'&insuranceCompanyId='+obj.insuranceCompanyId+'&priceType='+obj.priceType+'&useTypeId='+obj.useTypeId+'&vehicleClassId='+obj.vehicleClassId+'&vehicleCategoryId='+obj.vehicleCategoryId
        let prices = await this.getData(url)
        console.log('PRECIOS')
        console.log(prices)
        this.prices = prices
        this.fillTable(prices)
        this.itemCopy = JSON.parse(JSON.stringify(obj))
      },
      async generateFields () {
        let region = await this.getData('regions')
        let fields = [
          {key: 'actions', label: '&nbsp;', thStyle: 'width:50px'},
          {key: '_vehicle', label: 'Tipos Vehiculos', thStyle: 'width: 300px', variant: 'secondary', 'class': 'text-center'}
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
        this.copyDisabled = true
        this.restrictedCalendarPrices = true
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
          items.push({ _vehicle: item })
          // Generate struct load data
          itemsIndex[item.id] = index
        })
//        if (items.length === 0) {
//          if (this.$refs.form1) this.$refs.form1.restricted = false
//          if (this.$refs.form2) this.$refs.form2.restricted = false
//        }
        this.items = items
        this.itemsIndex = itemsIndex
      },
      async getListCar (item, async = true, exception = false) {
        this.pickRowItem = item
        this.pickRowItemException = {}
        this.auxIDItems = this.generateVCCId(item, 1)

        if (exception) {
          let id0 = this.generateVCCId(item)
          this.pickRowItemOther = this.items[this.itemsIndex[id0]]._vehicle
        }

        console.log(this.pickRowItemOther)
        console.log(this.pickRowItem)

        // return false

        this.search = ''
        if (async) {
          let url = 'vehicletypecategories?type=0&vehicleClassId='+item.vehicleClass.id+'&vehicleCategoryId'+item.vehicleCategory.id+'&seatNumber='+item.seatNumber+'&seatNumberTo='+item.seatNumberTo
          this.carsVTC = await this.getData(url)
        }
        this.toggleDialog()
      },
      getDescription (index, description, exception) {
        let localDescription = this.items[index]._vehicle['description_' + exception]
        if (localDescription !== undefined) return false
        if (description !== '') {
          this.items[index]._vehicle['description_' + exception] = description
          if (exception === 1) {
            this.items[index + 1]._vehicle['description_0'] = description
          }
        }
      },
      addItemDescription (car, exception) {
        this.isClickBadge = true
        if (this.listDescription[car.id]) {
          if (exception) {
            let auxID = this.generateVCCId(this.pickRowItem, 0)
            let description0 = JSON.parse(this.items[this.itemsIndex[auxID]]._vehicle['description_0'])
            let idDelete = car.id
            this.$delete(description0, idDelete)
            this.items[this.itemsIndex[auxID]]._vehicle['description_0'] = JSON.stringify(description0)
          }
          this.$delete(this.listDescription, car.id)
        } else {
          this.$set(this.listDescription, car.id, car)
          this.listDescription[car.id] = [car.vehicleType.vehicleBrand, car.vehicleType.vehicleModel]
          this.listDescription[car.id] = {
            brand: car.vehicleType.vehicleBrand,
            model: car.vehicleType.vehicleModel
          }
        }
      },
      addException (item, _alert = true) {
        item.exceptionBtn = true
        let id = this.generateVCCId(item)
        let newId = this.generateVCCId(item, 1)
        let indexItems = this.itemsIndex[id]
        let remove = true

        if (!this.isFillTable) this.$set(item, 'description_0', '{}')
        if (this.itemsIndex[newId] !== undefined) {
          let vm = this
          let newIndex = indexItems - 1
          let idv = this.items[newIndex]._vehicle.id
          this.$lodash.forEach(this.items[newIndex], function (value, key) {
            if (key[0] !== '_') {
              let auxID = key + '_' + idv
              if (value.id === undefined) {
                vm.$delete(vm.changeList, auxID)
                vm.$delete(vm.items[newIndex], key)
              } else {
                remove = false
              }
            }
          })

          if (remove) {
            this.$delete(this.items[indexItems], '_rowVariant')
            this.items.splice(newIndex, 1)
            this.generateIndexRow(this.items)
            item.exceptionBtn = false
            this.countWrong = this.countWrong - 1
          } else {
            if (_alert && !this.isFillTable) this.$store.commit('sendNotification', {status: null, message: 'No podemos eliminar esta fila de exepciones, ya que cuenta con precios registrados.'})
          }
          return false
        }

        let newRow = {
          _rowVariant: 'success',
          _vehicle: JSON.parse(JSON.stringify(item))
        }
        newRow._vehicle.id = newId
        newRow._vehicle.exception = 1
//        console.log(this.items, indexItems)
        this.$set(this.items[indexItems], '_rowVariant', 'danger')
        this.items.splice(indexItems, 0, newRow)
        this.generateIndexRow(this.items)

        if (!this.items[indexItems]._vehicle.btnCircleCar && !this.isFillTable) {
          this.items[indexItems]._vehicle.btnCircleCar = true
          this.countWrong = this.countWrong + 1
        }
      },
      saveTable () {
        if (this.countWrong > 0) {
          this.$store.commit('sendNotification', {
            status: null,
            message: 'Se han añadido listas de excepciones vacias. <span class="fa-stack fa-lg" style="font-size: 1.1em">\n' +
            '                    <i class="fa fa-car fa-stack-1x" style="color: white;"></i>\n' +
            '                    <i class="fa fa-circle-o fa-stack-2x text-warning"></i>\n' +
            '                  </span>'})
          return false
        }

        let data = this.convertList(this.changeList)
        if (data.length === 0) {
          this.$store.commit('sendNotification', {status: null, message: 'No ha realizado ningun cambios en los precios.'})
          return false
        }

//        if (this.datepicker.params.value === '') {
//          this.$store.commit('sendNotification', {status: null, message: 'Debe ingresar la fecha de caducidad para los precios.'})
//          return false
//        }

        let obj = {
          priceCalendarId: this.item.priceCalendar.id,
          insuranceCompanyId: this.item.insuranceCompany.id,
          useTypeId: this.item.useType.id,
          priceType: this.item.priceType,
          vehicleClassId: this.item.vehicleClass.id,
          vehicleCategoryId: this.item.vehicleCategory ? this.item.vehicleCategory.id : ''
        }

        if (this.compareObject(this.itemCopy, obj) && !this.copyDisabled) {
          this.$store.commit('sendNotification', {status: null, message: 'No puede copiar los datos en la misma table, debe modificar los campos del formulario.'})
          return false
        }

        this.rick = data
        console.log(this.item.validityDate)

        let url = 'insuranceprices/multiple'
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: data})
        self.then((data) => {
          console.log(data)
          if (data.status) {
            console.log('SUCCESS')
            this.changeList = {}
            this.datepicker.params.value = ''
            console.log(data.content)
            this.searchTablePrices()
          } else {
            console.log('ERROR')
            console.log(data)
          }
        }).catch(error => {
          console.log('ERROR 2')
          console.log(error)
        })
      },

      // Events Table Prices
      activeInput (id, itemPrice) {
        this.itemPrice = itemPrice ? itemPrice.price : ''
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
      changeValue (id, column, row) {
        let newId = column + '_' + id
        let indexItems = this.itemsIndex[id]
        let xData = this.items[indexItems]
        if (xData[column]) {
          xData[column].price = this.itemPrice
        } else {
          xData[column] = {price: this.itemPrice}
        }

        let data = {
          price: this.itemPrice,
          exception: row.exception,
          region: {id: column},
          vehicleClass: row.vehicleClass,
          vehicleCategory: row.vehicleCategory,
          seatNumber: row.seatNumber,
          seatNumberTo: row.seatNumberTo,
          edit: false
        }

        if (xData[column].id) data.id = xData[column].id
        this.$set(this.changeList, newId, data)
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
      this.item = this.itemPrices
    }
  }
</script>

<style lang="scss">
  .myEditTable{
    width: 100%;
    overflow: scroll;
    table{
      tr.table-success{
        // background: #0170ba !important;
        td:first-child{
          position: relative;
          // background: red !important;
          span{
            background: none !important;
          }
        }
      }
    }
  }

  .vdp-datepicker{
    width: auto !important;
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
        div:not(.union-line){
          width: 80px !important;
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
      cursor: pointer;
      border-radius: 10rem;
      font-size: 1em;
      font-weight: 100;
      background: #e2e2e2;
      margin-right: 1em;
      margin-bottom: 0.4em;
      padding: 0.5em 0.6em;
      &:hover{
        background: #63c1de;
      }
    }
  }

  .union-line{
    background: white;
    position: absolute;
    width: 2px;
    height: 45px;
    top: 29px;
    left: 48%;
  }
</style>
