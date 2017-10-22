<template>
  <div class="wrapper">
    <div class="animated fadeIn" ref="ruleForm">
      <transition-group name="fade" mode="out-in">
        <div v-if="!mySwitch" class="row justify-content-center" key="div1">
          <div class="col-10">
            <b-card>
              <button id="cancelSale" class="input-group-addon bg-primary"
                      @click="CancelSale"
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
                           :title="'MODULO DE VENTA ESPECIAL'"
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
                <tab-content title="Pago" icon="fa fa-credit-card" :before-change="stage2">

                  <form-pay :item="data.pay.item" :urlRest="data.pay.urlRest"
                            :data="data" :horizontal="true" :index="2"
                            :restricted="data.pay.formFill" :dispatch="data.pay.countAux"
                            @connection="connectionPay"></form-pay>

                </tab-content>
                <tab-content title="Venta" icon="fa fa-check" :before-change="stage3">
                  <form-success :item="data.payment.item" :data="data" :horizontal="true" :index="3" @paySale="paySale"></form-success>
                </tab-content>
              </form-wizard>

            </b-card>
          </div>
          <!--<pre style="font-size: 0.7em">{{ data.sale}}</pre>-->
          <!--<pre style="font-size: 0.7em">{{ data.pickPolice}}</pre>-->
          <!--<pre style="font-size: 0.7em">{{ data.pickPolice }}</pre>-->
          <!--<pre style="font-size: 0.7em">{{ data.vehicleType  }}</pre>-->
          <!--<pre style="font-size: 0.7em">{{ data.pay }}</pre>-->
          <!--<pre style="font-size: 0.7em">{{ data.user }}</pre>-->
          <!--<pre>{{ data.vehicle }}</pre>-->
          <!--<br>-->
          <!--<pre>{{ data.user }}</pre>-->
          <!--<br><br>-->
          <!--<pre>{{ data.purchaser }}</pre>-->

          <!--<pre>{{ data.vehicle }}</pre>-->
          <!--<br><br>-->
          <!--<pre>{{ data.user }}</pre>-->
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

      <!--<button @click="mySwitch = !mySwitch">Cambio</button>-->
      <!--<input type="number" v-model="data.vehicle.validate">-->
    </div>
  </div>
</template>

<script>
  import FormVehicle from './forms/FormVehicle.vue'
  import FormVehicleType from './forms/FormVehicleType.vue'
  import FormPurchaser from './forms/FormPurchaser.vue'
  import FormPay from './forms/FormPay.vue'
  import FormSuccess from './forms/FormSuccess.vue'
  import {DATA_INSURANCEPRICES as _pickPolice} from '../../data/dataNames'
  import {DATA_VEHICLE as _vehicle, DATA_VEHICLETYPE as _vehicleType, DATA_USER as _user, DATA_PURCHASER as _purchaser, DATA_PAY as _pay, DATA_PAYMENT as _payment, DATA_SALE as _sale} from '../../data/dnNewSales'
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
        localStorage.setItem('typeSell', 1)
        localStorage.setItem('seller', this.$store.state.user.data.id)
        return true
      },
      // INSERTA SALE CON NUMERO DE POLIZA
      async stage0 () {
        // Valida el formulario
        this.data.vehicle.countAux++
        if (!this.data.vehicle.validate) return false

        // MAKE DATA PICKPOLICE
        let pickPolice = {
          insuranceCompanyName: this.data.vehicleType.item.insuranceCompany.name,
          insuranceCompanyImage: this.data.vehicleType.item.insuranceCompany.image,
          insuranceCompanyId: this.data.vehicleType.item.insuranceCompany.id,
          insuranceTypeName: this.data.vehicleType.item.insuranceType.name,
          seatNumber: this.data.vehicle.item.seatNumber,
          price: this.data.vehicleType.item.amount
        }
        this.data.pickPolice.item = pickPolice
        localStorage.setItem('pickPolice', JSON.stringify(this.data.pickPolice.item))

        // VALID LOCALSTORAGE SALE
        let saleId = this.data.sale.item.id
        if (saleId !== undefined) {
          this.setFormFill('sale', true)
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
          return true
        }
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))

        // INSERT SALE
        this.data.sale.item.insurancePolicy = this.data.vehicleType.item.insurancePolicy
        this.data.sale.item.state = 1
        let r1 = await this.insertSale()
        if (!r1.status) return false
        else this.data.sale.item = r1.content
        localStorage.setItem('sale', JSON.stringify(this.data.sale.item))

        return true
      },
      async stage1 () {
        // Valida el formulario
        this.data.purchaser.countAux++
        if (!this.data.purchaser.validate) return false

        // VALID LOCALSTORAGE PURCHASER
        let purchaserId = this.data.purchaser.item.id
        console.log(purchaserId)
        if (purchaserId !== undefined) {
          this.setFormFill('purchaser', true)
          localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
          return true
        }

        localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
        let purchaser = this.data.purchaser.item
        let userId = this.data.user.item.id
        console.log(userId)

        // INSERT USER
        if (userId === undefined) {
          console.log('undefined ' + userId)
          this.data.user.item = {
            dniRuc: purchaser.dniRuc,
            razonSocial: purchaser.razonSocial,
            firstName: purchaser.razonSocial.split(' ')[0],
            lastName: purchaser.razonSocial.split(' ')[1],
            address: purchaser.address,
            distrito: purchaser.distrito,
            departamento: purchaser.departamento,
            provincia: purchaser.provincia,
            cellPhone: purchaser.cellPhone,
            phone: purchaser.phone,
            email: purchaser.email,
            password: purchaser.email,
            role: {
              email: purchaser.email,
              role: 'ROLE_USUARIO'
            }
          }

          let r1 = await this.insertUser()
          console.log('R1: ')
          console.log(r1)
          if (!r1.status) return false
          else this.data.user.item = r1.content
        }
        localStorage.setItem('user', JSON.stringify(this.data.user.item))

        // INSERT VEHICLE TYPE
        let vehicleTypeId = this.data.vehicleType.item.vehicleType.id
        if (vehicleTypeId === undefined) {
          // INSERT NEW VEHICLE TYPE
          let brandModel = {
            vehicleBrand: this.data.vehicleType.item.brand.vehicleBrand,
            vehicleModel: this.data.vehicleType.item.vehicleType.vehicleModel
          }
          let r2 = await this.insertVehicleType(brandModel)
          console.log('R2: ')
          console.log(r2)
          if (!r2.status) return false
          else this.data.vehicleType.item.vehicleType = r2.content
        }
        localStorage.setItem('vehicleType', JSON.stringify(this.data.vehicleType.item))

        // SET USE TYPE VEHICLE
        this.data.vehicle.item.useType = this.data.vehicleType.item.useType
        // INSERT VEHICLE TYPE CATEGORY
        let vehicleTypeCategoryId = this.data.vehicle.item.vehicleTypeCategory.id
        if (vehicleTypeCategoryId === undefined) {
          alert('vehicleTypeCategory undefined')
          // SEARCH VEHICLE TYPE CATEGORY
          let r3 = await this.searchVehicleTypeCategory()
          console.log('R3: ')
          console.log(r3)

          if (!r3.status) return false
          else {
            if (r3.content.length > 0) {
              this.data.vehicle.item.vehicleTypeCategory = r3.content[0]
            } else {
              alert('insert vehicleTypeCategory')
              // INSERT VEHICLE TYPE CATEGORY
              let vehicleTypeCategory = {
                vehicleCategory: this.data.vehicleType.item.vehicleCategory,
                vehicleClass: this.data.vehicleType.item.vehicleClass,
                vehicleType: this.data.vehicleType.item.vehicleType,
                seatNumber: this.data.vehicle.item.seatNumber,
                seatNumberTo: this.data.vehicle.item.seatNumber,
                type: 0
              }
              let r4 = await this.insertVehicleTypeCategory(vehicleTypeCategory)
              if (!r4.status) return false
              else this.data.vehicle.item.vehicleTypeCategory = r4.content
            }
          }
        }
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))

        // INSERT VEHICLE
        let vehicleId = this.data.vehicle.item.id
        if (vehicleId === undefined) {
          this.$delete(this.data.vehicle.item, 'user')
          let r2 = await this.insertVehicleEmail()
          console.log('R2: ')
          console.log(r2)
          if (!r2.status) return false
          else this.data.vehicle.item = r2.content
        } else {
          // alert('Recuperando Datos del VEHICLE')
          console.log('DEFINED ' + userId)
        }

        // INSERT PURCHASER
        purchaserId = this.data.purchaser.item.id
        if (purchaserId === undefined) {
          let r3 = await this.insertPurchaser()
          console.log('R2: ')
          console.log(r3)
          if (!r3.status) return false
          else {
            this.data.purchaser.item = r3.content
            this.data.pay.item.amount = this.data.pickPolice.item.price
          }
        } else {
          console.log('DEFINED ' + userId)
        }

        this.data.vehicleType.item.id = 0
        localStorage.setItem('user', JSON.stringify(this.data.user.item))
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        localStorage.setItem('vehicleType', JSON.stringify(this.data.vehicleType.item))
        localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
        this.setFormFill('vehicle', true)
        this.setFormFill('purchaser', true)
        this.setFormFill('vehicleType', true)
        this.isSale = true
        return true
      },
      async stage2 () {
        // Valida el formulario
        this.data.pay.countAux++
        if (!this.data.pay.validate) return false

        // ACTUALIZAR SALE
        let saleId = this.data.sale.item.id
        this.data.pay.item.discount = this.data.pay.item.discount === '' ? 0 : this.data.pay.item.discount
        this.data.sale.item.discount = this.data.pay.item.discount
        this.data.sale.item.amount = this.data.pickPolice.item.price
        this.data.sale.item.invoiceNumber = this.data.pay.item.invoiceNumber
        this.data.sale.item.validityStart = this.data.pay.item.validityStart
        this.data.sale.item.observation = this.data.pay.item.observation
        this.data.sale.item.bodywork = this.data.pay.item.bodywork
        this.data.sale.item.vehicle = this.data.vehicle.item
        this.data.sale.item.purchaser = this.data.purchaser.item
        this.data.sale.item.seatNumber = this.data.vehicle.item.seatNumber
        this.data.sale.item.state = 2

        // PREPARA PAYMENT
        this.data.payment.item.amount = this.data.pay.item.amount
        this.data.payment.item.paymentType = this.data.pay.item.paymentType
        this.data.payment.item.numFactura = this.data.pay.item.invoiceNumber
        this.data.payment.item.sale = {id: saleId}
        console.log(this.data.payment)

        // VALID CHANGE PAY
        let pay = JSON.parse(localStorage.getItem('pay'))
        let payAux = this.data.pay.item
        if (this.compareObject(payAux, pay)) return true

        let r1 = await this.updateSale(saleId)
        if (!r1.status) return false
        console.log('UPDATE SALE!!!!')
        localStorage.setItem('pay', JSON.stringify(this.data.pay.item))
        localStorage.setItem('sale', JSON.stringify(this.data.sale.item))

        return true
      },
      async stage3 () {
        let paymentId = this.data.payment.item.id
        if (paymentId === undefined) {
          this.$store.commit('sendNotification', {status: null, message: 'Debe procesar el pago para finalizar la venta.'})
          return false
        }
        // this.data.sale.item.amount = this.data.pickPolice.item.price
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
      async searchVehicleTypeCategory () {
        let brand = this.data.vehicleType.item.vehicleType.vehicleBrand
        let model = this.data.vehicleType.item.vehicleType.vehicleModel
        let vehicleCategoryId = this.data.vehicleType.item.vehicleCategory.id
        let vehicleClassId = this.data.vehicleType.item.vehicleClass.id
        let seatNumber = this.data.vehicle.item.seatNumber
        // let url = 'vehicletypecategories/filter?vehicleBrand='+brand+'&vehicleModel='+model
        let url = 'vehicletypecategories/filter?vehicleBrand='+brand+'&vehicleModel='+model+'&vehicleCategoryId='+vehicleCategoryId+'&vehicleClassId='+vehicleClassId+'&seatNumber='+seatNumber
        console.log(url)
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
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
//        localStorage.removeItem('sale')
//        localStorage.removeItem('vehicle')
//        localStorage.removeItem('user')
//        localStorage.removeItem('purchaser')
//        localStorage.removeItem('pickPolice')
//        localStorage.removeItem('location')
//        localStorage.removeItem('vehicleType')
//        localStorage.removeItem('insurance')
//        localStorage.removeItem('payment')
//        localStorage.removeItem('pay')
//
//        this.data.pickPolice.item = JSON.parse(JSON.stringify(this.data.pickPolice.defaultItem))
//        this.data.sale.item = JSON.parse(JSON.stringify(this.data.sale.defaultItem))
//        this.data.vehicle.item = JSON.parse(JSON.stringify(this.data.vehicle.defaultItem))
//        this.data.purchaser.item = JSON.parse(JSON.stringify(this.data.purchaser.defaultItem))
//        this.data.pay.item = JSON.parse(JSON.stringify(this.data.pay.defaultItem))
//        this.data.vehicleType.validate = false
//        this.data.vehicle.validate = false
//        this.data.purchaser.validate = false
//        this.data.pay.validate = false
//        // this.mySwitch = true
        this.setDefault()
        this.initData()
        this.$router.push('cotizar-admin')
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
        this.data.pay.validate = false
        this.isSale = false
        this.setFormFill('vehicleType', false)
        this.setFormFill('vehicle', false)
        this.setFormFill('purchaser', false)
        this.setFormFill('pay', false)
      },
      async CancelSale () {
        let dataLocal = this.data.sale
        let saleId = dataLocal.item.id
        if (saleId !== undefined) {
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: dataLocal.urlRest + '/' + dataLocal.item.id})
          if (!self.status) return false
          this.setDefault()
          this.initData()
          localStorage.removeItem('insurance')
        } else {
          this.setDefault()
          this.initData()
        }
        this.mySwitch = true
      },
      initData () {
        let notification = {}
        let pickPolice = JSON.parse(localStorage.getItem('pickPolice'))
        if (pickPolice) {
          this.data.pickPolice.item = pickPolice
          // SALE
          // this.data.sale.item.region = insuranceObject.region
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
      //localStorage.setItem('seller', this.$store.state.user.data.id)
      // localStorage.setItem('typeSell', 1)
      let oldSellerId = localStorage.getItem('seller')
      let newSellerId = JSON.parse(localStorage.getItem('UserLog')).user.id
      let notification = {}
      let typeSell = localStorage.getItem('typeSell')
      let sale = JSON.parse(localStorage.getItem('sale'))
      console.log('QWERTYYYYYY ')
      console.log(typeSell)
      console.log(sale)
      if (sale !== null && typeSell == 0) {
        this.mySwitch = true
        notification.data = {message: 'Existe una nueva venta en proceso', status: '', success: null, url: ''}
        this.$store.commit('pushNotification', notification)
        let insurance = JSON.parse(localStorage.getItem('insurance')).insurance
        this.data.pickPolice.item = insurance
        this.switchMessage = 1
      } else {
        if (oldSellerId == newSellerId) {
          this.initData()
        } else {
          this.setDefault()
          localStorage.removeItem('insurance')
          //localStorage.removeItem('vehicleType')
          //localStorage.removeItem('pickPolice')
        }
      }
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
