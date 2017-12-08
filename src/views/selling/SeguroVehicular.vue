<template>
  <div class="wrapper">
    <div class="animated fadeIn" ref="ruleForm">
      <transition-group name="fade" mode="out-in">
        <div v-if="!mySwitch" class="row justify-content-center" key="div1">
          <div class="col-10">
            <b-card>
              <button id="cancelSale" class="input-group-addon bg-primary"
                      @click="eventCancelSale"
                      :disabled="isLoading || disableBtn"
                      title="Cancelar Venta">
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>

              <!-- Wizard Form -->
              <form-wizard id="newSaleWizard" @on-complete="onComplete"
                           nextButtonText="Sig."
                           backButtonText="Ant."
                           finishButtonText="Finalizar"
                           @on-validate="handleValidation"
                           @on-change="onchange"
                           color="#ef7b21" errorColor="#e84c3d"
                           :class="{'bg-white':true, 'saleComplete': isSale}"
                           :start-index="index"
                           :title="'COTIZADOR DE SEGURO VEHICULAR'"
                           :subtitle="'Venta Perzonalizada'">

                <tab-content title="Caracteristicas" icon="fa fa-id-card-o" :before-change="stage" >

                  <form-vehicle-type :item="data.vehicleType.item"
                                     :urlRest="data.vehicleType.urlRest" :restricted="data.vehicleType.formFill"
                                     :keyname="data.vehicleType.name" :index="-1" :update="update" :horizontal="true"
                                     @connection="connectionVehicleType"
                                     :dispatch="data.vehicleType.countAux"></form-vehicle-type>
                </tab-content>

                <tab-content title="Vehiculo" icon="fa fa-car" :before-change="stage0">

                  <form-vehicle :item="data.vehicle.item"
                                :urlRest="data.vehicle.urlRest" :restricted="data.vehicle.formFill"
                                :keyname="data.vehicle.name" :index="0" :update="update"  :horizontal="true"
                                @connection="connectionVehicle"
                                :dispatch="data.vehicle.countAux"></form-vehicle>
                </tab-content>
                <tab-content title="Contratante" icon="fa fa-male" :before-change="stage1">

                  <form-purchaser :item="data.purchaser.item" :itemU="data.user.item"
                                  :urlRest="data.purchaser.urlRest" :restricted="data.purchaser.formFill"
                                  :name="data.purchaser.name" :index="1" :update="update" :horizontal="true"
                                  @connection="connectionUser"
                                  :dispatch="data.purchaser.countAux"></form-purchaser>
                </tab-content>
              </form-wizard>

            </b-card>
          </div>
        </div>

        <div v-else="" class="row" key="div2">
          <div class="col-12 text-primary mb-5 card-insurance">
            <div v-if="switchMessage==0" class="title text-center h3">
              Modulo de Venta Especial
            </div>
            <div v-else-if="switchMessage==1" class="title text-center h3">
              Existe una venta en proceso<br>
              <span class="h5 text-info">Finalice o cancele la venta</span>
            </div>
            <div class="ticket cardWrap mt-5 mx-auto" style="font-size: 1.1em;">
              <div class="card-ticket cardLeft">
                <avatar :username="data.pickPolice.item.insuranceCompanyName ? data.pickPolice.item.insuranceCompanyName: 'xx'"
                        :rounded="true" :size="6.4" sizeUnid="em" :localSrc="false"
                        :src="data.pickPolice.item.insuranceCompanyImage ? path + '/' + data.pickPolice.item.insuranceCompanyImage : ''"
                        :border="true" colorBorder="#f4f3ef" color="#ecedef"
                        backgroundColor="orange" :sizeBorder="0.5"></avatar>
              </div>
              <div class="card-ticket cardCenter">
                <div class="xtitle">
                  {{ data.pickPolice.item.insuranceCompanyName? data.pickPolice.item.insuranceCompanyName: 'xxxx xxxx' }}
                </div>
                <div class="xcontent">
                  <div class="title">
                    <h2>{{ data.pickPolice.item.insuranceTypeName ? data.pickPolice.item.insuranceTypeName : 'xxxxx' }}</h2>
                    <span>Tipo de seguro</span>
                  </div>
                  <div class="seat">
                    <h2>{{ data.pickPolice.item.seatNumber ? data.pickPolice.item.seatNumber : 'xx' }}</h2>
                    <span>Asientos</span>
                  </div>
                  <div class="time">
                    <h2>{{ data.pickPolice.item.validityDate ? data.pickPolice.item.validityDate: 'xx/xx/xxxx' }}</h2>
                    <span>Vigencia</span>
                  </div>
                </div>
              </div>
              <div class="card-ticket cardRight">
                <div class="xtitle text-center">
                  <!--<b-button :pressed="false" size="sm" variant="outline-primary" class="mr-1 my-3"><i class="fa fa-check"></i></b-button>-->
                  <i class="fa fa-car"></i>
                </div>
                <div class="number">
                  <h3>{{ data.pickPolice.item.price ? data.pickPolice.item.price : '0.00' }}</h3>
                  <span>soles</span>
                </div>
              </div>
            </div>
            <div class="row mt-3" :label-sr-only="true">
              <div v-if="switchMessage==0" class="col-12 text-center pr-0">
                <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3 hvr-pulse-grow" @click="mySwitch=false">Nueva Venta Especial</b-button>
              </div>
              <div v-else-if="switchMessage==1" class="col-12 text-center pr-0">
                <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3 hvr-pulse-grow" @click="$router.push('nueva-venta')">Ir a la Venta</b-button>
              </div>
            </div>
            <!--<button @click="mySwitch = !mySwitch">Cambio</button>-->
          </div>
        </div>
      </transition-group>
      <!--<pre>{{data.vehicleType.item}}</pre>-->
      <!--<pre>{{data.vehicle.item}}</pre>-->
      <!--<pre>{{data.purchaser.item}}</pre>-->

      <!--<button @click="mySwitch = !mySwitch">Cambio</button>-->
      <!--<input type="number" v-model="data.vehicle.validate">-->
    </div>
  </div>
</template>

<script>
  import FormVehicle from './forms/FormVehicleSeguro.vue'
  import FormVehicleType from './forms/FormVehicleTypeSeguro.vue'
  import FormPurchaser from './forms/FormPurchaserSeguro.vue'
  import FormPay from './forms/FormPay.vue'
  import FormSuccess from './forms/FormSuccess.vue'
  import {DATA_INSURANCEPRICES as _pickPolice} from '../../data/dataNames'
  import {DATA_VEHICLE as _vehicle, DATA_VEHICLETYPE as _vehicleType, DATA_USER as _user, DATA_PURCHASER as _purchaser, DATA_PAY as _pay, DATA_PAYMENT as _payment, DATA_SALE as _sale} from '../../data/dnSeguroVehicular'
  import Avatar from '../../components/Avatar.vue'

  //  import Fullscreen from "vue-fullscreen/src/component.vue"
  export default {
    components: {
      FormVehicleType,
      FormVehicle,
      FormPurchaser,
      FormPay,
      FormSuccess,
      Avatar
    },
    data () {
      return {
        index: 0,
        update: false,
        mySwitch: false,
        pickTabIndex: 0,
        isSale: false,
        data: {
          pickPolice: {
            name: 'pickPolice',
            urlRest: _pickPolice.name,
            item: JSON.parse(JSON.stringify(_pickPolice.post)),
            defaultItem: JSON.parse(JSON.stringify(_pickPolice.post)),
            formFill: false
          },
          vehicleType: {
            name: 'vehicleType',
            urlRest: _vehicleType.name,
            item: JSON.parse(JSON.stringify(_vehicleType.post)),
            defaultItem: JSON.parse(JSON.stringify(_vehicleType.post)),
            formFill: false,
            validate: false,
            countAux: 0
          },
          vehicle: {
            name: 'vehicle',
            urlRest: _vehicle.name,
            item: JSON.parse(JSON.stringify(_vehicle.post)),
            defaultItem: JSON.parse(JSON.stringify(_vehicle.post)),
            formFill: false,
            validate: false,
            countAux: 0
          },
          purchaser: {
            name: 'purchaser',
            urlRest: _purchaser.name,
            item: JSON.parse(JSON.stringify(_purchaser.post)),
            defaultItem: JSON.parse(JSON.stringify(_purchaser.post)),
            formFill: false,
            validate: false,
            countAux: 0
          },
          user: {
            name: 'user',
            urlRest: _user.name,
            item: JSON.parse(JSON.stringify(_user.post)),
            defaultItem: JSON.parse(JSON.stringify(_user.post)),
            formFill: false
          },
          pay: {
            name: 'pay',
            urlRest: _pay.name,
            item: JSON.parse(JSON.stringify(_pay.post)),
            defaultItem: JSON.parse(JSON.stringify(_pay.post)),
            formFill: false,
            validate: false,
            countAux: 0
          },
          payment: {
            name: 'payment',
            urlRest: _payment.name,
            item: JSON.parse(JSON.stringify(_payment.post)),
            defaultItem: JSON.parse(JSON.stringify(_payment.post)),
            formFill: false,
            validate: false,
            countAux: 0
          },
          sale: {
            name: 'sale',
            urlRest: _sale.name,
            item: JSON.parse(JSON.stringify(_sale.post)),
            defaultItem: JSON.parse(JSON.stringify(_sale.post)),
            formFill: false
          }
        },
        switchMessage: 0
      }
    },
    computed: {
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      disableBtn () {
        let saleId = this.data.sale.item.id
        if (saleId !== undefined) {
          // existe
          let state = this.data.sale.item.state
          return !(state <= 2)
        } else {
          // No existe
          return false
        }
      },
      isLoading () {
        return this.$store.state.isLoading
      },
      messageTicket () {
        let data = JSON.parse(localStorage.getItem('pickPolice'))
        return data ? true : false
      }
    },
    methods: {
      setFormFill (index, value) {
        this.data[index].formFill = value
      },
      async stage () {
        // Valida el formulario
        this.data.vehicleType.countAux++
        if (!this.data.vehicleType.validate) return false
        localStorage.setItem('vehicleType', JSON.stringify(this.data.vehicleType.item))
        return true
      },
      async stage0 () {
        // Valida el formulario
        this.data.vehicle.countAux++
        if (!this.data.vehicle.validate) return false
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        return true
      },
      async stage1 () {
        // Valida el formulario
        this.data.purchaser.countAux++
        if (!this.data.purchaser.validate) return false

        // INSERT PURCHASER
        let purchaserId = this.data.purchaser.item.id
        if (purchaserId === undefined) {
          let r3 = await this.insertPurchaser()
          console.log('R2: ')
          console.log(r3)
          localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
          if (!r3.status) return false
          else {
            this.data.purchaser.item = r3.content
          }
        }
        localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
        let r4 = await this.submitSeguroVehicular()
        if (!r4.status) return false
        this.$store.commit('sendNotification', {status: true, message: 'Cotización Exitosa, Nos contactaremos con ud. dentro las proximas 24 horas, con su cotización.'})
        return true
      },
      async submitSeguroVehicular () {
        let dataLocal = {
          engineNumber: this.data.vehicle.item.engineNumber,
          marketValue: this.data.vehicleType.item.amount,
          manufacturingYear: this.data.vehicle.item.manufacturingYear,
          seatNumber: this.data.vehicle.item.seatNumber,
          vehicleType: {id: this.data.vehicleType.item.vehicleType.id},
          vehicleCategory: {id: this.data.vehicleType.item.vehicleCategory.id},
          vehicleClass: {id: this.data.vehicleType.item.vehicleClass.id},
          useType: {id: this.data.vehicleType.item.useType.id},
          purchaser: {id: this.data.purchaser.item.id}
        }
        console.log('insurancevehicles')
        console.log(dataLocal)
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'insurancevehicles', data: dataLocal})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT insurancevehicles?')
        return self
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
      async insertSale () {
        let dataLocal = this.data.sale
        console.log('INSERT SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT SALE?')
        return self
      },
      async updateSale (saleID) {
        let dataLocal = this.data.sale
        console.log('UPDATE SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: dataLocal.urlRest + '/' + saleID, data: dataLocal.item})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT SALE?')
        return self
      },
      async insertUser () {
        let dataLocal = this.data.user
        console.log('INSERT USER')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT USER?')
        return self
      },
      async insertVehicleEmail () {
        let dataLocal = this.data.vehicle
        let url = 'vehicles/searchbyemail?email=' + this.data.user.item.email
        console.log('INSERT VEHICLE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: dataLocal.item})
        return self
      },
      async insertVehicleType (data) {
        console.log('INSERT VEHICLE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'vehicletypes', data: data})
        return self
      },
      async insertVehicleTypeCategory (data) {
        console.log('INSERT VEHICLE TYPE CATEGORY')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'vehicletypecategories', data: data})
        return self
      },
      async insertPurchaser () {
        this.data.purchaser.item.email = this.$store.state.user.data.email
        let dataLocal = this.data.purchaser

        console.log('INSERT PURCHASER')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        console.log('RIKAEDOCORO PURCHASER')
        console.log(self)
        console.log('INSERT PURCHASER?')
        return self
      },

      connectionVehicleType: function (name, data) {
        console.log('connection:::::')
        console.log(name)
        console.log(data)
        this.data.vehicleType.validate = !data
      },

      connectionVehicle: function (name, data) {
        console.log('connection:::::')
        console.log(name)
        console.log(data)
        this.data.vehicle.validate = !data
      },

      connectionUser: function (name, data) {
        console.log('connection:::::')
        console.log(name)
        console.log(data)
        if (name === 'isValid') {
          this.data.purchaser.validate = !data
        } else {
          if (data) {
            console.log('ENTRA' + name)
            this.data[name].item = data
          } else {
            console.log('NO ENTRA ' + name)
            this.data[name].item = Object.assign({}, this.data[name].defaultItem)
          }
          console.log('NAME ITEM' + name)
          console.log(this.data[name].item)
        }
      },
      connectionPay: function (name, data) {
        if (name === 'isValid') {
          this.data.pay.validate = !data
        } else {
          if (data) {
            console.log('ENTRA' + name)
            this.data[name].item = data
          } else {
            console.log('NO ENTRA ' + name)
            this.data[name].item = Object.assign({}, this.data[name].defaultItem)
            // this.$delete(this.data.vehicle.item, 'id')
            // this.data.vehicle.item.user = ''
          }
          console.log('NAME ITEM' + name)
          console.log(this.data[name].item)
        }
      },
      handleValidation: function (isValid, tabIndex) {
        console.log('Tab: ' + tabIndex + ' valid: ' + isValid)
      },
      beforeTabSwitch: function () {
        let idForm = 'form' + this.pickTabIndex
        let form = document.getElementById(idForm)
        return true
      },
      onchange: function (prevIndex, nextIndex) {
        this.pickTabIndex = nextIndex
        console.log('prev: ' + prevIndex + ' next: ' + nextIndex)
      },
      onComplete: function () {
        this.setDefault()
        this.initData()
        this.$router.push('cliente')
      },
      setDefault () {
        localStorage.removeItem('sale')
        localStorage.removeItem('vehicle')
        localStorage.removeItem('user')
        localStorage.removeItem('purchaser')
        localStorage.removeItem('location')
        localStorage.removeItem('pay')
        localStorage.removeItem('payment')
        localStorage.removeItem('vehicleType')
        localStorage.removeItem('pickPolice')
        this.data.sale.item = JSON.parse(JSON.stringify(this.data.sale.defaultItem))
        this.data.vehicleType.item = JSON.parse(JSON.stringify(this.data.vehicleType.defaultItem))
        this.data.vehicle.item = JSON.parse(JSON.stringify(this.data.vehicle.defaultItem))
        this.data.purchaser.item = JSON.parse(JSON.stringify(this.data.purchaser.defaultItem))
        this.data.pay.item = JSON.parse(JSON.stringify(this.data.pay.defaultItem))
        this.data.pickPolice.item = JSON.parse(JSON.stringify(this.data.pickPolice.defaultItem))
        this.data.vehicleType.validate = false
        this.data.vehicle.validate = false
        this.data.purchaser.validate = false
        this.setFormFill('vehicleType', false)
        this.setFormFill('vehicle', false)
        this.setFormFill('purchaser', false)
        this.setFormFill('pay', false)
      },
      async CancelSale () {
        this.setDefault()
        this.initData()
        this.$router.push('cliente')
      },
      eventCancelSale () {
        this.$dialog.confirm('¿Desea cancelar esta venta en proceso?').then((dialog) => {
          this.CancelSale()
          dialog.close()
        }).catch(() => {
          console.log('Clicked on cancel')
        })
      },
      initData () {
        let notification = {}

        // GET VEHICLE
        let vehicle = JSON.parse(localStorage.getItem('vehicle'))
        console.log('Vehicle')
        console.log(vehicle)
        if (vehicle) {
          this.data.vehicle.item = vehicle
          if (this.data.vehicle.item.id !== undefined) {
            this.setFormFill('vehicle', true)
          } else this.setFormFill('vehicle', false)
          this.data.vehicle.validate = true
        }

        // GET VEHICLETYPE
        let vehicleType = JSON.parse(localStorage.getItem('vehicleType'))
        if (vehicleType) {
          this.data.vehicleType.item = vehicleType
          if (this.data.vehicleType.item.id !== undefined) {
            this.setFormFill('vehicleType', true)
          } else this.setFormFill('vehicleType', false)
          this.data.vehicleType.validate = true
        }

        // GET PURCHASER
        let purchaser = JSON.parse(localStorage.getItem('purchaser'))
        if (purchaser) {
          this.data.purchaser.item = purchaser
          if (this.data.purchaser.item.id !== undefined) {
            this.setFormFill('purchaser', true)
            notification.data = {message: 'Existe una solicitud de seguro vehicular sin finalizar', status: '', success: null, url: ''}
            this.$store.commit('pushNotification', notification)
          } else this.setFormFill('purchaser', false)
          this.data.purchaser.validate = true
        }
      }
    },
    created () {
      this.initData()
//      let oldSellerId = localStorage.getItem('seller')
//      let newSellerId = JSON.parse(localStorage.getItem('UserLog')).user.id
//      let notification = {}
//      let typeSell = localStorage.getItem('typeSell')
//      let sale = JSON.parse(localStorage.getItem('sale'))
//      if (sale !== null && typeSell == 0) {
//        this.mySwitch = true
//        notification.data = {message: 'Existe una nueva venta en proceso', status: '', success: null, url: ''}
//        this.$store.commit('pushNotification', notification)
//        let insurance = JSON.parse(localStorage.getItem('insurance')).insurance
//        this.data.pickPolice.item = insurance
//        this.switchMessage = 1
//      } else {
//        if (oldSellerId == newSellerId) {
//          this.initData()
//        } else {
//          this.setDefault()
//          localStorage.removeItem('insurance')
//          //localStorage.removeItem('vehicleType')
//          //localStorage.removeItem('pickPolice')
//        }
//      }
      // delete this.data.vehicle.defaultItem.licensePlate
    },
    mounted () {
    }
  }
</script>


<style lang="scss">
  .card-insurance {
    .avatar {
      position: absolute;
    }
    .h3{
      font-family: 'jmc';
    }
  }

  #newSaleWizard{
    /*.form-control[readonly]*/
    &.saleComplete{
      .form-control:disabled{
        background-color: rgb(255, 150, 5);
        color: white;
        border: 1px solid #ff9508;
      }
      .multiselect--disabled{
        opacity: 1;
        background: none;
        .multiselect__tags,
        .multiselect__tags input{
          color: white;
          background-color: rgb(255, 150, 5);
          border: 1px solid #ff9508;
        }
        .multiselect__select{
          background: none;
          border: none;
        }
      }
      /*input::-webkit-input-placeholder,*/
      /*textarea::-webkit-input-placeholder{*/
      /*color: red*/
      /*}*/
    }
    .vue-js-switch{
      font-size: 0.9em;
    }
    .wizard-tab-content{
      padding-top: 1%;
    }
  }

  .localOpacity{
    opacity: 0.6;
  }

  #cancelSale {
    position: absolute;
    top: 23px;
    right: 0px;
    font-size: 1rem;
    cursor: pointer;
    z-index: 1;

    &:disabled {
      /*background-color: red !important;*/
      opacity: 0.7;
      cursor: auto;
    }
  }

  .ticket{
    font-size: 1em;
    overflow: hidden;
    width: 24.4em;
  }
</style>
