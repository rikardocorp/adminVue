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

              <button :class="{
                        'input-group-addon btn-wizard':true,
                        'bg-info': data.pickPolice.item.exception==0,
                        'bg-danger': data.pickPolice.item.exception==1,
                        'bg-primary': data.pickPolice.item.description=='',
                      }" v-b-tooltip.html.right
                      :title="convertDescription(data.pickPolice.item.description, data.pickPolice.item.exception)">
                <!--:disabled="data.pickPolice.item.description == ''"-->
                <i class="fa fa-info" aria-hidden="true"></i>
              </button>
              <!--{{ $store.state.user.data }}-->
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
                           :title="'MODULO DE VENTA CLIENTE - ' + data.pickPolice.item.insuranceCompanyName"
                           :subtitle="'Seguro ' + data.pickPolice.item.insuranceTypeName">
                <tab-content title="Automovil" icon="fa fa-car" :before-change="stage0">

                  <form-vehicle :item="data.vehicle.item" :pickPolice="data.pickPolice.item"
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
                <!--<tab-content title="Pago" icon="fa fa-credit-card" :before-change="stage2">-->

                  <!--<form-pay :item="data.pay.item" :urlRest="data.pay.urlRest"-->
                            <!--:data="data" :horizontal="true" :index="2"-->
                            <!--:restricted="data.pay.formFill" :dispatch="data.pay.countAux"-->
                            <!--@connection="connectionPay"></form-pay>-->

                <!--</tab-content>-->
                <tab-content title="Venta" icon="fa fa-check" :before-change="stage3">
                  <form-success :item="data.payment.item" :data="data" :horizontal="true" :index="3" @paySale="paySale"></form-success>
                </tab-content>
              </form-wizard>

            </b-card>
          </div>
          <!--<pre style="font-size: 0.7em">{{ data.pickPolice }}</pre>-->
          <!--<pre style="font-size: 0.7em">{{ data.pay }}</pre>-->
          <!--<pre style="font-size: 0.7em">{{ data.sale }}</pre>-->
          <!--<br>-->
          <!--<pre>{{ data.vehicle }}</pre>-->
          <!--<br><br>-->
          <!--<pre>{{ data.purchaser }}</pre>-->

          <!--<pre>{{ data.vehicle }}</pre>-->
          <!--<br><br>-->
          <!--<pre>{{ data.user }}</pre>-->
        </div>

        <div v-else="" class="row" key="div2">
          <div class="col-12 text-primary mb-5 card-insurance">
            <div v-if="switchMessage==0" class="title text-center h3">
              Debe seleccionar una Poliza para continuar
            </div>
            <div v-else-if="switchMessage==1" class="title text-center h3">
              Poliza seleccionada - Venta en Proceso
            </div>
            <div v-else-if="switchMessage==2" class="title text-center h3">
              Existe una venta especial en proceso<br>
              <span class="h5 text-info">Finalice o cancele la venta especial</span>
            </div>
            <div class="ticket cardWrap mt-5 mx-auto" style="font-size: 1.1em;">
              <!--<div :class="{'ticket cardWrap mt-5 mx-auto ' : true, 'localOpacity': !messageTicket}">-->
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
                  <!--<h3>{{ x.price | currency }}</h3>-->
                  <h3>{{ data.pickPolice.item.price ? data.pickPolice.item.price : '0.00' }}</h3>
                  <span>soles</span>
                </div>
              </div>
            </div>
            <div v-if="switchMessage==0" class="row mt-2" :label-sr-only="true">
              <div class="col-12 text-center pr-0">
                <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3" @click="$router.push('cotizar-admin')">Cotizar</b-button>
              </div>
            </div>

            <div v-else-if="switchMessage==1" class="row mt-2" :label-sr-only="true">
              <div class="col-6 text-right pr-0">
                <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3" @click="recotizar">Recotizar</b-button>
              </div>
              <div class="col-6 text-left pl-0">
                <b-button :pressed="false" variant="outline-primary" class="ml-1 my-3" @click="mySwitch = !mySwitch">Continuar</b-button>
              </div>
            </div>

            <div v-else-if="switchMessage==2" class="row mt-2" :label-sr-only="true">
              <div class="col-12 text-center pr-0">
                <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3 hvr-pulse-grow" @click="$router.push('venta-especial')">Ir a la Venta Especial</b-button>
              </div>
            </div>
            <!--<button @click="mySwitch = !mySwitch">Cambio</button>-->
          </div>
        </div>
      </transition-group>
      <!--<pre>{{ data.pickPolice }}</pre>-->

      <!--<button @click="mySwitch = !mySwitch">Cambio</button>-->
      <!--<input type="number" v-model="data.vehicle.validate">-->
      <br><br>
    </div>
  </div>
</template>

<script>
  import FormVehicle from './forms/FormVehicle.vue'
  import FormPurchaser from './forms/FormPurchaser.vue'
  import FormPay from './forms/FormPay.vue'
  import FormSuccess from './forms/FormSuccess.vue'
  import {DATA_INSURANCEPRICES as _pickPolice} from '../../data/dataNames'
  import {DATA_CARTS as _carts} from '../../data/dnCarts'
  import {DATA_VEHICLE2 as _vehicle, DATA_USER as _user, DATA_PURCHASER as _purchaser, DATA_PAY as _pay, DATA_PAYMENT as _payment, DATA_SALE as _sale} from '../../data/dnNewSales'
  import Avatar from '../../components/Avatar.vue'

  //  import Fullscreen from "vue-fullscreen/src/component.vue"
  export default {
    components: {
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
          cart: {
            name: 'cart',
            urlRest: _carts.name,
            item: JSON.parse(JSON.stringify(_carts.post)),
            defaultItem: JSON.parse(JSON.stringify(_user.post)),
            formFill: false
          },
          pickPolice: {
            name: 'pickPolice',
            urlRest: _pickPolice.name,
            item: JSON.parse(JSON.stringify(_pickPolice.post)),
            defaultItem: JSON.parse(JSON.stringify(_pickPolice.post)),
            formFill: false
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
        return false
      },
      isLoading () {
        return this.$store.state.isLoading
      },
      messageTicket () {
        let data = JSON.parse(localStorage.getItem('insurance'))
        return data
      }
    },
    methods: {
      recotizar () {
        localStorage.removeItem('insurance')
        this.$router.push('cotizar-admin')
      },
      convertDescription (data, exception) {
        if (data === '') return ''
        let list = JSON.parse(data)
        let text = exception === 1 ? '<h6 class="text-danger pt-2">Autos Restringuidos</h6>' : '<h6 class="text-info pt-2">Autos Permitidos</h6>'
        this.$lodash.forEach(list, function (value, key) {
          text = text + value.brand + ' ' + value.model + ', '
        })
        return text
      },
      setFormFill (index, value) {
        this.data[index].formFill = value
      },
      async getInsurancePolicy () {
        // let dataLocal = this.data.vehicle
        let companyId = this.data.pickPolice.item.insuranceCompanyId
        let myUserID = this.$store.state.user.data.id
        let url = 'insurancepolicies?insuranceCompanyId=' + companyId + '&sold=0&userId=' + myUserID
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        return self
      },

      // INSERTA SALE CON NUMERO DE POLIZA
      async stage0 () {
        // Valida el formulario
        this.data.vehicle.countAux++
        if (!this.data.vehicle.validate) return false

        // VALID LOCALSTORAGE SALE
        let saleId = this.data.sale.item.id
        if (saleId !== undefined) {
          this.setFormFill('sale', true)
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
          return true
        }
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))

        // DEFINE USER
        this.data.user.item = this.$store.state.user.data
        localStorage.setItem('user', JSON.stringify(this.data.user.item))
        return true
      },
      async stage1 () {
        // Valida el formulario
        this.data.purchaser.countAux++
        if (!this.data.purchaser.validate) return false

//        // VALID LOCALSTORAGE PURCHASER
//        let purchaserId = this.data.purchaser.item.id
//        console.log(purchaserId)
//        if (purchaserId !== undefined) {
//          this.setFormFill('purchaser', true)
//          localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
//          return true
//        }
//
//        // VALID LOCALSTORAGE PURCHASER
//        let vehicleId = this.data.vehicle.item.id
//        console.log(vehicleId)
//        if (vehicleId !== undefined) {
//          this.setFormFill('vehicle', true)
//          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
//          return true
//        }

        // INSERT VEHICLE
        let vehicleId = this.data.vehicle.item.id
        if (vehicleId === undefined) {
          this.$delete(this.data.vehicle.item, 'user')
          this.data.vehicle.item.user = {id: this.data.user.item.id}
          let r2 = await this.insertVehicleEmail()
          console.log('R2: ')
          console.log(r2)
          if (!r2.status) return false
          else this.data.vehicle.item = r2.content
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        } else {
          // alert('Recuperando Datos del VEHICLE')
          console.log('DEFINED ' + vehicleId)
        }
        this.setFormFill('vehicle', true)

        // INSERT PURCHASER
        let purchaserId = this.data.purchaser.item.id
        if (purchaserId === undefined) {
          this.data.purchaser.item.email = this.data.user.item.email
          let r3 = await this.insertPurchaser()
          console.log('R2: ')
          console.log(r3)
          if (!r3.status) return false
          else {
            this.data.purchaser.item = r3.content
            this.data.pay.item.amount = this.data.pickPolice.item.price
          }
          localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
        } else {
          console.log('DEFINED ' + purchaserId)
        }
        this.setFormFill('purchaser', true)

        // INSERT CART
        let cartId = this.data.cart.item.id
        if (cartId === undefined) {
          let r3 = await this.insertCart()
          console.log('R2: ')
          console.log(r3)
          if (!r3.status) return false
          else {
            this.data.cart.item = r3.content
            localStorage.setItem('cart', JSON.stringify(this.data.cart.item))
          }
        } else {
          console.log('DEFINED ' + purchaserId)
        }

        // VALID CART
        cartId = this.data.cart.item.id
        if (cartId === undefined) return false
        this.isSale = true
        return true
      },
      async stage3 () {
        return true
      },
      async paySale () {
        let paymentId = this.data.payment.item.id
        if (paymentId === undefined) {
          let dataLocal = this.data.payment
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
          if (!self.status) return false
          else {
            this.data.payment.item = self.content
            this.setFormFill('pay', true)
          }
          localStorage.setItem('payment', JSON.stringify(this.data.payment.item))
          // UPDATE STATE SALE
          let saleId = this.data.sale.item.id
          let amountTotal = (this.data.sale.item.amount - this.data.pay.item.discount) - this.data.pay.item.amount
          this.data.sale.item.state = amountTotal > 0 ? 3 : 4
          let r1 = await this.updateSale(saleId)
          console.log(r1)
          if (!r1.status) return false
          console.log('UPDATE SALE!!!!')
          localStorage.setItem('sale', JSON.stringify(this.data.sale.item))
        } else {
          this.$store.commit('sendNotification', {status: true, message: 'El pago ya se encuentra registrado'})
        }
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
      async insertCart () {
        let dataLocal = this.data.cart
        console.log('INSERT CART')
        dataLocal.item.amount = this.data.pickPolice.item.price
        dataLocal.item.seatNumber = this.data.pickPolice.item.seatNumber
        dataLocal.item.region = {id: this.data.pickPolice.item.regionId}
        dataLocal.item.vehicle = {id: this.data.vehicle.item.id}
        dataLocal.item.purchaser = {id: this.data.purchaser.item.id}
        dataLocal.item.insuranceCompany = {id: this.data.pickPolice.item.insuranceCompanyId}
        dataLocal.item.state = 0

        console.log('CARRRITO')
        console.log(dataLocal.urlRest)
        console.log(dataLocal.item)
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT CART?')
        return self
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
      async insertVehicle () {
        let dataLocal = this.data.vehicle
        console.log('INSERT VEHICLE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        console.log('RIKAEDOCORO VEHICLE')
        console.log(self)
        console.log('INSERT VEHICLE?')
        return self
      },

      async insertPurchaser () {
        let dataLocal = this.data.purchaser
        console.log('INSERT PURCHASER')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        console.log('RIKAEDOCORO PURCHASER')
        console.log(self)
        console.log('INSERT PURCHASER?')
        return self
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
            // this.$delete(this.data.vehicle.item, 'id')
            // this.data.vehicle.item.user = ''
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
        localStorage.removeItem('sale')
        localStorage.removeItem('vehicle')
        localStorage.removeItem('user')
        localStorage.removeItem('purchaser')
        localStorage.removeItem('insurance')
        localStorage.removeItem('location')
        localStorage.removeItem('pay')
        localStorage.removeItem('payment')
        localStorage.removeItem('cart')

        this.data.pickPolice.item = JSON.parse(JSON.stringify(this.data.pickPolice.defaultItem))
        this.data.cart.item = JSON.parse(JSON.stringify(this.data.cart.defaultItem))
        this.data.sale.item = JSON.parse(JSON.stringify(this.data.sale.defaultItem))
        this.data.vehicle.item = JSON.parse(JSON.stringify(this.data.vehicle.defaultItem))
        this.data.purchaser.item = JSON.parse(JSON.stringify(this.data.purchaser.defaultItem))
        this.data.vehicle.validate = false
        this.data.purchaser.validate = false
        // this.mySwitch = true
        this.initData()
        this.$router.push('cotizar-admin')
      },
      setDefault () {
        localStorage.removeItem('cart')
        localStorage.removeItem('sale')
        localStorage.removeItem('vehicle')
        localStorage.removeItem('user')
        localStorage.removeItem('purchaser')
        localStorage.removeItem('location')
        localStorage.removeItem('pay')
        localStorage.removeItem('payment')
        this.data.sale.item = JSON.parse(JSON.stringify(this.data.sale.defaultItem))
        this.data.cart.item = JSON.parse(JSON.stringify(this.data.cart.defaultItem))
        this.data.vehicle.item = JSON.parse(JSON.stringify(this.data.vehicle.defaultItem))
        this.data.purchaser.item = JSON.parse(JSON.stringify(this.data.purchaser.defaultItem))
        this.data.pay.item = JSON.parse(JSON.stringify(this.data.pay.defaultItem))
        this.data.vehicle.validate = false
        this.data.purchaser.validate = false
        this.data.pay.validate = false
        this.mySwitch = true
        this.isSale = false
        this.setFormFill('vehicle', false)
        this.setFormFill('purchaser', false)
        this.setFormFill('pay', false)
      },
      async CancelCart () {
        let dataLocal = this.data.cart
        let saleId = dataLocal.item.id
        if (saleId !== undefined) {
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: dataLocal.urlRest + '/' + dataLocal.item.id})
          if (!self.status) return false
          console.log('Cancel CART')
          console.log(self)
        }
        this.setDefault()
        this.initData()
        this.switchMessage = 1
      },
      eventCancelSale () {
        this.$dialog.confirm('¿Desea cancelar esta venta en proceso?').then((dialog) => {
          this.CancelCart()
          dialog.close()
        }).catch(() => {
          console.log('Clicked on cancel')
        })
      },
      initData () {
        let notification = {}

        let data = JSON.parse(localStorage.getItem('insurance'))
        if (data) {
          let insurance = data.insurance
          let insuranceObject = data.object
          this.data.pickPolice.item = insurance
          this.data.vehicle.item.vehicleTypeCategory = insuranceObject.vehicleTypeCategory
          this.data.vehicle.item.useType = insuranceObject.useType
          this.data.vehicle.defaultItem.vehicleTypeCategory = insuranceObject.vehicleTypeCategory
          this.data.vehicle.defaultItem.useType = insuranceObject.useType
          // SALE
          this.data.sale.item.region = insuranceObject.region
        } else {
          console.log('vacio')
          this.mySwitch = true
        }

        // GET SALE
        let sale = JSON.parse(localStorage.getItem('sale'))
        if (sale) {
          this.data.sale.item = sale
          if (this.data.sale.item.id !== undefined) {
            this.setFormFill('sale', true)
            notification.data = {message: 'Existe una venta en proceso', status: '', success: null, url: ''}
            this.$store.commit('pushNotification', notification)
          }
        }

        // GET CART
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
          this.data.cart.item = cart
          if (this.data.cart.item.id !== undefined) {
            this.setFormFill('cart', true)
            notification.data = {message: 'Existe una compra en proceso', status: '', success: null, url: ''}
            this.$store.commit('pushNotification', notification)
          }
        }

        // GET USER
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
          this.data.user.item = user
          if (this.data.user.item.id !== undefined) this.setFormFill('user', true)
        }

        // GET VEHICLE
        let vehicle = JSON.parse(localStorage.getItem('vehicle'))
        if (vehicle) {
          this.data.vehicle.item = vehicle
          if (this.data.vehicle.item.id !== undefined) {
            this.setFormFill('vehicle', true)
          } else this.setFormFill('vehicle', false)
          this.data.vehicle.validate = true
        }

        // GET PURCHASER
        let purchaser = JSON.parse(localStorage.getItem('purchaser'))
        if (purchaser) {
          this.data.purchaser.item = purchaser
          if (this.data.purchaser.item.id !== undefined) {
            this.isSale = true
            this.setFormFill('purchaser', true)
            notification.data = {message: 'Existe una venta registrada sin finalizar', status: '', success: null, url: ''}
            this.$store.commit('pushNotification', notification)
          } else this.setFormFill('purchaser', false)
          this.data.purchaser.validate = true
        }

        // GET PAY
        let pay = JSON.parse(localStorage.getItem('pay'))
        if (pay) {
          this.data.pay.item = pay
          this.data.pay.validate = true
        } else {
          this.data.pay.item.amount = this.data.pickPolice.item.price
        }

        // GET PAYMENT
        let payment = JSON.parse(localStorage.getItem('payment'))
        if (payment) {
          this.data.payment.item = payment
          if (this.data.payment.item.id !== undefined) {
            this.setFormFill('pay', true)
          } else {
            this.setFormFill('pay', false)
          }
        }
      }
    },
    created () {
      let oldSellerId = localStorage.getItem('seller')
      let newSellerId = JSON.parse(localStorage.getItem('UserLog')).user.id
      let typeSell = localStorage.getItem('typeSell')
      let sale = JSON.parse(localStorage.getItem('sale'))

      if (sale !== null && typeSell == 1) {
        this.mySwitch = true
        let pickPolice = JSON.parse(localStorage.getItem('pickPolice'))
        console.log('pickPolice !!!!!!!!')
        console.log(pickPolice)
        this.data.pickPolice.item = pickPolice
        this.switchMessage = 2
      } else {
        if (oldSellerId == newSellerId) {
          this.initData()
        } else {
          this.setDefault()
          localStorage.removeItem('insurance')
          localStorage.removeItem('vehicleType')
          localStorage.removeItem('pickPolice')
        }
      }
      // this.initData()

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

  /*#newSaleWizard{*/
  /*!*.form-control[readonly]*!*/
  /*&.saleComplete{*/
  /*.form-control:disabled{*/
  /*background-color: rgb(255, 150, 5);*/
  /*color: white;*/
  /*border: 1px solid #ff9508;*/
  /*}*/
  /*.multiselect--disabled{*/
  /*opacity: 1;*/
  /*.multiselect__select,*/
  /*.multiselect__tags {*/
  /*background-color: rgb(255, 150, 5);*/
  /*border: 1px solid #ff9508;*/

  /*}*/
  /*}*/
  /*!*input::-webkit-input-placeholder,*!*/
  /*!*textarea::-webkit-input-placeholder{*!*/
  /*!*color: red*!*/
  /*!*}*!*/
  /*}*/

  /*.vue-js-switch{*/
  /*font-size: 0.9em;*/
  /*}*/
  /*}*/

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

  .btn-wizard{
    border-radius: 0 0.7em 0.7em 0 !important;
    position: absolute;
    top: 23px;
    left: 0px;
    font-size: 1rem;
    cursor: pointer;
    z-index: 1;
    &:focus{
      outline: none !important;
    }
    &.bg-primary{
      background: #ef7b24 !important;
    }
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
