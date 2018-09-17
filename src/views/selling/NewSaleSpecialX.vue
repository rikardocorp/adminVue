<template>
  <div class="wrapper">
    <div class="animated fadeIn" ref="ruleForm">
      <transition-group name="fade" mode="out-in">
        <div v-if="!mySwitch" class="row justify-content-center" key="div1">
          <!--<pre>{{ data.vehicle.item }}</pre>-->
          <div class="col-10">
            <b-card>
              <!--<div class="cover"></div>-->
              <button id="cancelSale" class="input-group-addon bg-primary"
                      @click="eventCancelSale"
                      :disabled="isLoading || disableBtn"
                      title="Cancelar Venta">
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>
              <!--<button :class="{-->
                        <!--'input-group-addon btn-wizard':true,-->
                        <!--'bg-info': data.pickPolice.item.exception==0,-->
                        <!--'bg-danger': data.pickPolice.item.exception==1,-->
                        <!--'bg-primary': data.pickPolice.item.description=='',-->
                      <!--}" v-b-tooltip.html.right-->
                      <!--:title="convertDescription(data.pickPolice.item.description, data.pickPolice.item.exception)">-->
                <!--<i class="fa fa-info" aria-hidden="true"></i>-->
              <!--</button>-->

              <!-- Wizard Form -->
              <form-wizard id="newSaleWizard" @on-complete="onComplete"
                           nextButtonText="Sig."
                           backButtonText="Ant."
                           finishButtonText="Finalizar"
                           @on-change="onchange"
                           color="#ef7b21" errorColor="#e84c3d"
                           :class="{'bg-white':true}"
                           :start-index="index"
                           :title="'MODULO DE VENTA ESPECIAL'"
                           :subtitle="'Venta Perzonalizada'">

                <tab-content title="Caracteristicas" icon="fa fa-id-card-o" :before-change="stage" >
                  <form-vehicle-type :name="data.vehicleType.name" :item="data.vehicleType.item"
                                     :urlRest="data.vehicleType.urlRest" :restricted="data.vehicleType.formFill"
                                     :keyname="data.vehicleType.name" :index="-1" :update="update" :horizontal="true"
                                     @connection="connections"
                                     :dispatch="data.vehicleType.countAux"></form-vehicle-type>
                </tab-content>

                <tab-content title="Automovil" icon="fa fa-car" :before-change="stage0">
                  <form-vehicle :name="data.vehicle.name" ref="formVehicle"
                                :item="data.vehicle.item" :pickPolice="data.pickPolice.item"
                                :insurancePolicy="data.sale.item.insurancePolicy"
                                :urlRest="data.vehicle.urlRest" :restricted="data.vehicle.formFill"
                                :keyname="data.vehicle.name" :index="0" :update="update"  :horizontal="true"
                                @connection="connections"
                                :dispatch="data.vehicle.countAux"></form-vehicle>
                </tab-content>

                <tab-content title="Contratante" icon="fa fa-male" :before-change="stage1">
                  <form-purchaser :name="data.purchaser.name" ref="formPurchaser"
                                  :item="data.purchaser.item" :itemU="data.user.item"
                                  :urlRest="data.purchaser.urlRest" :restricted="data.purchaser.formFill"
                                  :index="1" :update="update" :horizontal="true"
                                  @connection="connections"
                                  :dispatch="data.purchaser.countAux"></form-purchaser>
                </tab-content>

                <tab-content :class="{'saleComplete': isSale}" title="Pago" icon="fa fa-credit-card" :before-change="stage2">
                  <form-pay :name="data.pay.name" :item="data.pay.item" :urlRest="data.pay.urlRest"
                            :data="data" :horizontal="true" :index="2" :price="parseFloat(data.vehicleType.item.amount)"
                            :restricted="data.pay.formFill" :dispatch="data.pay.countAux"
                            @connection="connections"></form-pay>
                </tab-content>

                <tab-content title="Venta" icon="fa fa-check" :before-change="stage3">
                  <form-success :name="data.payment.name" :item="data.payment.item"
                                :data="data" :horizontal="true"
                                @connection="connections"
                                :index="3" @paySale="paySale" @deletePaySale="deletePaySale" @cancelSale="cancelSale" ></form-success>
                </tab-content>

              </form-wizard>

            </b-card>
          </div>
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
    </div>
  </div>

</template>

<script>
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import FormVehicle from './formsx/FormVehicleSpecial.vue'
  import FormVehicleType from './formsx/FormVehicleType.vue'
  import FormPurchaser from './formsx/FormPurchaser.vue'
  import FormPay from './formsx/FormPay.vue'
  import FormSuccess from './formsx/FormSuccess.vue'

  import {DATA_INSURANCEPRICES as _pickPolice} from '../../data/dataNames'
  import {DATA_VEHICLE2 as _vehicle, DATA_VEHICLETYPE as _vehicleType, DATA_USER as _user, DATA_PURCHASER as _purchaser, DATA_PAY as _pay, DATA_PAYMENT as _payment, DATA_SALE as _sale} from '../../data/dnNewSales'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'NewSaleSpecialX',
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
          let state = this.data.sale.item.state
          return !(state <= 2)
        }
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
      // EVENTOS
      async stage () {
        // alert('STAGE')
        // Valida el formulario
        this.data.vehicleType.countAux++
        if (!this.data.vehicleType.validate) return false
        localStorage.setItem('vehicleType', JSON.stringify(this.data.vehicleType.item))
        localStorage.setItem('typeSell', 1)
        localStorage.setItem('seller', this.$store.state.user.data.id)
        return true
      },
      async stage0 () {
        this.data.vehicle.countAux++
        console.log('STAGE 0')
        if (!this.data.vehicle.validate) return false
        // VALID LOCALSTORAGE SALE
        console.log('continue')
        let sale = this.data.sale.item
        console.log('SALE: ', this.data.sale)
        console.log('rcorp')
        let vehicle = this.data.vehicle.item
        let getVehicleTypeCategory = await this.dispatchAll('GET', 'vehicleTypeCategory')
        if (!getVehicleTypeCategory.status) return false
        let vehicleTypeCategory = getVehicleTypeCategory.content
        vehicle['useType'] = this.data.vehicleType.item.useType
        vehicle['vehicleTypeCategory'] = vehicleTypeCategory

        console.log('vehicleTypeCategory')
        console.log(vehicleTypeCategory)
        console.log(vehicle)
        console.log('*****************')
        console.log(this.data.sale.item)

        if (sale.id !== undefined) {
          let oldSale = JSON.parse(localStorage.getItem('sale'))
          this.setFormFill('sale', true)
          let vehicleType = this.data.vehicleType.item
          if (vehicleType.insurancePolicy.id === oldSale.insurancePolicy.id) {
            console.log('rcorp2.3')
          } else {
            console.log('rcorp2.4')
            console.log('UPDATE')
            sale.insurancePolicy = vehicleType.insurancePolicy
            let updateSale = await this.dispatchAll('UPDATE', this.data.sale.name, sale.id)
            console.log(updateSale)
            if (!updateSale.status) return false
            console.log('UPDATE continue')
            localStorage.setItem('sale', JSON.stringify(sale))
            this.$refs.formVehicle.loadOptionsPolicy(sale.insurancePolicy)
          }
          localStorage.setItem('vehicle', JSON.stringify(vehicle))
          console.log('VEHICLE rcorp')
          console.log(vehicle)
          return true
        }

        console.log('rcorp4')
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        // GET POLICY NUMBER
        let policyObject = this.data.vehicleType.item.insurancePolicy
        // INSERT SALE
        this.data.sale.item.insurancePolicy = policyObject
        this.data.sale.item.state = 1
        this.data.sale.item.amount = this.data.vehicleType.item.amount
        console.log('INSERT')
        let r1 = await this.dispatchAll('INSERT', this.data.sale.name)
        console.log(r1)
        if (!r1.status) return false
        else this.data.sale.item = r1.content
        console.log('CREATED LOCALSTORAGE: SALE')
        localStorage.setItem('sale', JSON.stringify(this.data.sale.item))
        return true
      },
      async stage1 () {
        let hasEmail = ''
        // Valida el formulario
        this.data.purchaser.countAux++
        if (!this.data.purchaser.validate) return false

        // // VALID LOCALSTORAGE PURCHASER
        // let purchaser = this.data.purchaser.item
        // console.log('STAGE1: PURCHASER')
        // if (purchaser.id !== undefined) {
        //   // COMPARAMOS OBJETOS
        //   let oldPurchaser = JSON.parse(localStorage.getItem('purchaser'))
        //   if (!this.compareObject(oldPurchaser, purchaser)) {
        //     // UPDATE PURCHASER
        //     hasEmail = this.data.purchaser.item.hasEmail
        //     let updatePurchaser = await this.dispatchAll('UPDATE', this.data.purchaser.name, purchaser.id)
        //     if (!updatePurchaser.status) return false
        //     else {
        //       this.data.purchaser.item = updatePurchaser.content
        //       this.data.purchaser.item.hasEmail = hasEmail
        //     }
        //   }
        // }
        // localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))

        // VALID LOCALSTORAGE USER
        console.log('STAGE1: USER')
        let user = this.data.user.item
        let purchaser = this.data.purchaser.item
        if (user.id === undefined) {
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
          // INSERT USER
          let r1 = await this.dispatchAll('INSERT', this.data.user.name)
          console.log('R1: ')
          console.log(r1)
          if (!r1.status) return false
          else {
            this.data.user.item = r1.content
            this.$refs.formPurchaser.searchUser(null)
          }
        }

        // INSERT LOCALSTORAGE VEHICLE
        console.log('STAGE1: VEHICLE')
        let policyObject = this.data.vehicle.item.insurancePolicy
        let vehicle = this.data.vehicle.item
        if (vehicle.id === undefined) {
          console.log(vehicle)
          console.log('-- ---- ---- ---')
          this.$delete(this.data.vehicle.item, 'user')
          let r2 = await this.dispatchAll('INSERT', this.data.vehicle.name, this.data.user.item.email)
          console.log('R2: ')
          console.log(r2)
          if (!r2.status) return false
          else {
            this.data.vehicle.item = r2.content
            this.data.vehicle.item.insurancePolicy = policyObject
          }
        } else {
          console.log('Recuperando Datos del VEHICLE')
          console.log(vehicle)
          console.log('-------------------')
        }

        // INSERT PURCHASER
        purchaser = this.data.purchaser.item
        if (purchaser.id === undefined) {
          hasEmail = this.data.purchaser.item.hasEmail
          let r3 = await this.dispatchAll('INSERT', this.data.purchaser.name)
          console.log('R2: ')
          console.log(r3)
          if (!r3.status) return false
          else {
            this.data.purchaser.item = r3.content
            this.data.purchaser.item.hasEmail = hasEmail
            this.data.pay.item.amount = this.data.vehicleType.item.amount
          }
        } else {
          console.log('Recuperando Datos del PURCHASER')
          console.log('DEFINED ' + purchaser)
          console.log('-------------------')
          let oldPurchaser = JSON.parse(localStorage.getItem('purchaser'))
          if (!this.compareObject(oldPurchaser, purchaser)) {
            // UPDATE PURCHASER
            console.log('compareObject :: FALSE')
            hasEmail = this.data.purchaser.item.hasEmail
            let updatePurchaser = await this.dispatchAll('UPDATE', this.data.purchaser.name, purchaser.id)
            if (!updatePurchaser.status) return false
            else {
              console.log('compareObject :: UPDATE')
              this.data.purchaser.item = updatePurchaser.content
              this.data.purchaser.item.hasEmail = hasEmail
            }
          }
          console.log('compareObject :: TRUE')
        }

        console.log('PAY ----')
        console.log(this.data.pay.item)
        console.log(this.data.vehicleType.item)
        // this.data.pay.item.amount = parseFloat(this.data.vehicleType.item.amount)

        // SAVE LOCAL STORAGE
        localStorage.setItem('user', JSON.stringify(this.data.user.item))
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
        // this.setFormFill('vehicle', true)
        // this.setFormFill('purchaser', true)
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
        this.data.sale.item.amount = this.data.vehicleType.item.amount
        this.data.sale.item.invoiceNumber = this.data.pay.item.invoiceNumber
        this.data.sale.item.validityStart = this.data.pay.item.validityStart
        this.data.sale.item.observation = this.data.pay.item.observation
        this.data.sale.item.bodywork = this.data.pay.item.bodywork
        this.data.sale.item.vehicle = this.data.vehicle.item
        this.data.sale.item.purchaser = this.data.purchaser.item
        this.data.sale.item.seatNumber = this.data.vehicle.item.seatNumber
        this.data.sale.item.state = 2
        this.data.sale.item.active = 1

        // PREPARA PAYMENT
        this.data.payment.item.amount = this.data.pay.item.amount
        this.data.payment.item.paymentType = this.data.pay.item.paymentType
        this.data.payment.item.numFactura = this.data.pay.item.invoiceNumber
        this.data.payment.item.sale = {id: saleId}
        console.log('PAYMENT !!!!')
        console.log(this.data.payment)

        // VALID CHANGE PAY
        let oldPay = JSON.parse(localStorage.getItem('pay'))
        let oldSale = JSON.parse(localStorage.getItem('sale'))
        let payAux = this.data.pay.item
        let saleAux = this.data.sale.item

        console.log('STAGE :: 2')
        if (this.compareObject(payAux, oldPay)) {
          if (this.compareObject(saleAux, oldSale)) {
            console.log('   compareObject:: TRUE')
            return true
          }
        } else {}

        console.log('   compareObject:: False')

        // let r1 = await this.updateSale(saleId)
        let r1 = await this.dispatchAll('UPDATE', this.data.sale.name, saleId)
        console.log(r1)
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
      eventCancelSale () {
        this.$dialog.confirm('¿Desea cancelar esta venta en proceso?').then((dialog) => {
          this.cancelSale()
          dialog.close()
        }).catch(() => {
          console.log('Clicked on cancel')
        })
      },
      connectionVehicleType: function (name, data) {
        console.log('connection:::::')
        console.log(name)
        console.log(data)
        this.data.vehicleType.validate = !data
      },
      connections: function (type, name, data) {
        console.log(type, name, data)
        if (type === this.data.vehicleType.name) {
          // alert('connections')
          if (name === 'isValid') {
            // alert('isValid')
            this.data.vehicleType.validate = !data
          } else {
            if (data) {
              console.log('ENTRA' + name)
              this.data[type].item[name] = data
            } else {
              console.log('NO ENTRA ' + name)
              this.data[type].item = Object.assign({}, this.data[name].defaultItem)
              // this.$delete(this.data.vehicle.item, 'id')
              // this.data.vehicle.item.user = ''
            }
          }
        } else if (type === this.data.vehicle.name) {
          console.log('connection::::: vehicle')
          console.log(name)
          console.log(data)
          if (name === 'isValid') {
            this.data.vehicle.validate = !data
          } else {
            if (data) {
              console.log('ENTRA' + name)
              this.data[type].item[name] = data
            } else {
              console.log('NO ENTRA ' + name)
              this.data[type].item = Object.assign({}, this.data[name].defaultItem)
              // this.$delete(this.data.vehicle.item, 'id')
              // this.data.vehicle.item.user = ''
            }
          }
          this.data.vehicle.validate = !data
        } else if (type === this.data.purchaser.name) {
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
        } else if (type === this.data.pay.name) {
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
        } else if (type === this.data.payment.name) {
          console.log('CONNECTIONS PAYMENTS')
          if (name === 'disableForm') {
            this.setFormFill('pay', data)
          } else {
            if (data !== null) {
              console.log('ENTRA ' + name)
              this.data[type].item[name] = data
            } else {
              console.log('NO ENTRA ' + name)
              this.data[type].item = Object.assign({}, this.data[name].defaultItem)
              // this.$delete(this.data.vehicle.item, 'id')
              // this.data.vehicle.item.user = ''
            }
          }
        }
      },
      async dispatchAll (method, type, extra = null) {
        if (type === this.data.sale.name) {
          let dataLocal = this.data.sale
          let url = method === 'INSERT' ? dataLocal.urlRest : dataLocal.urlRest + '/' + extra
          let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url, data: dataLocal.item})
          return self
        } else if (type === this.data.user.name) {
          let dataLocal = this.data.user
          let url = method === 'INSERT' ? dataLocal.urlRest : dataLocal.urlRest + '/' + extra
          console.log('INSERT USER')
          let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url, data: dataLocal.item})
          console.log('RIKAEDOCORO ppppppppp')
          console.log(self)
          console.log('INSERT USER?')
          return self
        } else if (type === this.data.vehicle.name) {
          let dataLocal = this.data.vehicle
          let url = 'vehicles/searchbyemail?email=' + extra
          console.log('INSERT VEHICLE')
          let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url, data: dataLocal.item})
          return self
        } else if (type === this.data.purchaser.name) {
          let dataLocal = this.data.purchaser
          let url = method === 'INSERT' ? dataLocal.urlRest : dataLocal.urlRest + '/' + extra
          let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url, data: dataLocal.item})
          console.log('RIKAEDOCORO PURCHASER')
          console.log(self)
          console.log('INSERT PURCHASER?')
          return self
        } else if (type === 'vehicleTypeCategory') {
          let dataVT = this.data.vehicleType.item
          let url = 'vehicletypecategories?type=&vehicleTypeId=' + dataVT.vehicleType.id + '&vehicleClassId=' + dataVT.vehicleClass.id + '&vehicleCategoryId=' + dataVT.vehicleCategory.id + '&seatNumber=&seatNumberTo='
          console.log('URL', url)
          let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url})

          if (!self.status) return self
          if (self.content.length === 0) {
            let url2 = 'vehicletypecategories'
            let data = {
              vehicleType: {id: dataVT.vehicleType.id},
              seatNumber: 0,
              seatNumberTo: 0,
              type: 0,
              vehicleClass: {id: dataVT.vehicleClass.id},
              vehicleCategory: {id: dataVT.vehicleCategory.id}
            }
            console.log('vehicletypecategories INSERT')
            let self2 = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url2, data: data})
            return self2
          } else {
            return {
              status: true,
              content: self.content[0]
            }
          }
        }
      },
      // FUNCTIONS
      onchange: function (prevIndex, nextIndex) {
        this.pickTabIndex = nextIndex
        console.log('prev: ' + prevIndex + ' next: ' + nextIndex)
      },
      onComplete: function () {
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
      async cancelSale (type = true) {
        let dataLocal = this.data.sale
        let saleId = dataLocal.item.id
        if (saleId !== undefined && type) {
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
      async paySale () {
        let paymentId = this.data.payment.item.id
        if (paymentId === undefined) {
          let dataLocal = this.data.payment
          console.log('PAYSALE !!!!')
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
          if (!self.status) return false
          else {
            this.data.payment.item = self.content
            this.setFormFill('pay', true)
          }
          console.log(self)
          console.log('----------------')
          localStorage.setItem('payment', JSON.stringify(this.data.payment.item))
          // UPDATE STATE SALE
          let saleId = this.data.sale.item.id
          let amountTotal = (this.data.sale.item.amount - this.data.pay.item.discount) - this.data.pay.item.amount
          this.data.sale.item.state = amountTotal > 0 ? 3 : 4
          console.log('SALE FINAl')
          console.log(amountTotal)
          console.log(this.data.sale.item)
          console.log('__--------____')
          // let r1 = await this.updateSale(saleId)
          let r1 = await this.dispatchAll('UPDATE', this.data.sale.name, saleId)
          console.log(r1)
          if (!r1.status) return false
          console.log('UPDATE SALE!!!!')
          localStorage.setItem('sale', JSON.stringify(this.data.sale.item))
        } else {
          this.$store.commit('sendNotification', {status: true, message: 'El pago ya se encuentra registrado'})
        }
      },
      async deletePaySale () {
        let item = this.data.payment.item
        if (item.id === undefined) return false
        let url = 'payments/' + item.id
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: url})
        if (!self.status) return false
        else {
          let amount = item.amount
          let paymentType = item.paymentType
          let numFactura = item.numFactura
          let sale = item.sale

          this.data.payment.item = Object.assign({}, this.data.payment.defaultItem)
          this.data.payment.item.amount = amount
          this.data.payment.item.paymentType = paymentType
          this.data.payment.item.numFactura = numFactura
          this.data.payment.item.sale = sale
          this.setFormFill('pay', false)
          localStorage.setItem('payment', JSON.stringify(this.data.payment.item))
        }
      },
      setFormFill (index, value) {
        this.data[index].formFill = value
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
        } else {
          this.data.pay.item.amount = this.data.vehicleType.item.amount
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
      },
      // initData () {
      //   let notification = {}
      //
      //   // GET INSURANCE
      //   let data = JSON.parse(localStorage.getItem('insurance'))
      //   if (data) {
      //     let insurance = data.insurance
      //     let insuranceObject = data.object
      //     this.data.pickPolice.item = insurance
      //     this.data.vehicle.item.vehicleTypeCategory = insuranceObject.vehicleTypeCategory
      //     this.data.vehicle.item.useType = insuranceObject.useType
      //     this.data.vehicle.defaultItem.vehicleTypeCategory = insuranceObject.vehicleTypeCategory
      //     this.data.vehicle.defaultItem.useType = insuranceObject.useType
      //     this.data.sale.item.region = insuranceObject.region
      //   } else {
      //     console.log('vacio')
      //     this.mySwitch = true
      //   }
      //
      //   // GET SALE
      //   let sale = JSON.parse(localStorage.getItem('sale'))
      //   if (sale) {
      //     this.data.sale.item = sale
      //     if (this.data.sale.item.id !== undefined) {
      //       this.setFormFill('sale', true)
      //       notification.data = {message: 'Existe una venta en proceso', status: '', success: null, url: ''}
      //       this.$store.commit('pushNotification', notification)
      //     }
      //   }
      //
      //   // GET USER
      //   let user = JSON.parse(localStorage.getItem('user'))
      //   if (user) {
      //     this.data.user.item = user
      //     if (this.data.user.item.id !== undefined) this.setFormFill('user', true)
      //   }
      //
      //   // GET VEHICLE
      //   let vehicle = JSON.parse(localStorage.getItem('vehicle'))
      //   console.log('GET VEHICLE')
      //   console.log(vehicle)
      //   if (vehicle) {
      //     this.data.vehicle.item = vehicle
      //     if (this.data.vehicle.item.id !== undefined) {
      //       // this.setFormFill('vehicle', true)
      //     } else this.setFormFill('vehicle', false)
      //     this.data.vehicle.validate = true
      //   }
      //
      //   // GET PURCHASER
      //   let purchaser = JSON.parse(localStorage.getItem('purchaser'))
      //   console.log('GET PURCHASER')
      //   console.log(purchaser)
      //   if (purchaser) {
      //     this.data.purchaser.item = purchaser
      //     if (this.data.purchaser.item.id !== undefined) {
      //       this.isSale = true
      //       // this.setFormFill('purchaser', true)
      //       notification.data = {message: 'Existe una venta registrada sin finalizar', status: '', success: null, url: ''}
      //       this.$store.commit('pushNotification', notification)
      //     } else this.setFormFill('purchaser', false)
      //     this.data.purchaser.validate = true
      //   }
      //
      //   // GET PAY
      //   let pay = JSON.parse(localStorage.getItem('pay'))
      //   if (pay) {
      //     this.data.pay.item = pay
      //     this.data.pay.validate = true
      //   } else {
      //     this.data.pay.item.amount = this.data.pickPolice.item.price
      //   }
      //
      //   // GET PAYMENT
      //   let payment = JSON.parse(localStorage.getItem('payment'))
      //   if (payment) {
      //     this.data.payment.item = payment
      //     if (this.data.payment.item.id !== undefined) {
      //       this.setFormFill('pay', true)
      //     } else {
      //       this.setFormFill('pay', false)
      //     }
      //   }
      // },
      convertDescription (data, exception) {
        if (data === '') return ''
        let list = JSON.parse(data)
        let text = exception === 1 ? '<h6 class="text-danger pt-2">Autos Restringuidos</h6>' : '<h6 class="text-info pt-2">Autos Permitidos</h6>'
        this.$lodash.forEach(list, function (value, key) {
          text = text + value.brand + ' ' + value.model + ', '
        })
        return text
      },
      compareObject (obj1, obj2, deep = 2, iter = 0) {
        console.log('INIT compareObject - ', obj1, obj2)
        let cen = true
        let vm = this
        obj2 = obj2 === null ? {} : obj2
        // console.log('compareObject::::')
        this.$lodash.forEach(obj1, function (value, key) {
          // console.log(typeof obj1[key])
          // console.log(key, obj1[key], '::', obj2[key], obj1[key] == obj2[key])
          // console.log('isObjectX', vm.isObjectX(obj1[key]))
          if (!vm.isObjectX(obj1[key])) {
            if (obj1[key] !== obj2[key]) {
              cen = false
              return false
            }
          } else {
            // console.log('compare OBJECT')
            let limit = iter + 1
            if (limit < deep) {
              let isEqual = vm.compareObject(obj1[key], obj2[key], deep, limit)
              if (!isEqual) {
                cen = false
                return false
              }
            }
          }
        })
        console.log('COMPARE TRUE')
        return cen
      },
      isObjectX (value) {
        return value && typeof value === 'object' && value.constructor === Object
      },
      recotizar () {
        this.$set(this.$store.state, 'visibleNewSale', false)
        localStorage.removeItem('insurance')
        this.$router.push('cotizar-admin')
      }
    },
    created () {
      let oldSellerId = localStorage.getItem('seller')
      let newSellerId = JSON.parse(localStorage.getItem('UserLog')).user.id
      let notification = {}
      let typeSell = localStorage.getItem('typeSell')
      let sale = JSON.parse(localStorage.getItem('sale'))

      console.log('RIKARDOCORP')
      console.log(typeSell)
      console.log(sale)
      console.log(sale !== null && typeSell == 0)

      if (sale !== null && typeSell == 0) {
        console.log('PASOOOOo')
        this.mySwitch = true
        // notification.data = {message: 'Existe una nueva venta en proceso', status: '', success: null, url: ''}
        // this.$store.commit('pushNotification', notification)
        let insurance = JSON.parse(localStorage.getItem('insurance')).insurance
        this.data.pickPolice.item = insurance
        this.switchMessage = 1
      } else {
        if (oldSellerId == newSellerId) {
          this.initData()
        } else {
          this.setDefault()
          localStorage.removeItem('insurance')
        }
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .cover{
    border-radius: 0.8em;
    background: rgba(255, 135, 0, 0.85);
    border: 2px solid #ef7c21;
  }
</style>

<style lang="scss">
  .special_radius{
    .multiselect__tags, input{
      border-radius: 0 0.55em 0.55em 0 !important;
    }
  }

  form{
    .vdp-datepicker{
      width: 100% !important;
    }
  }

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
    .saleComplete{
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
