<template>
  <div class="wrapper">
    <div class="animated fadeIn" ref="ruleForm">
      <transition-group name="fade" mode="out-in">
        <div v-if="!mySwitch" class="row justify-content-center" key="div1">
          <div class="col-10">
            <b-card>
              <button id="cancelSale" class="input-group-addon bg-warning"
                      @click="CancelSale"
                      :disabled="isLoading || disableBtn"
                      title="Cancelar Venta">
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>

              <!-- Wizard Form -->
              <form-wizard @on-complete="onComplete"
                           @on-validate="handleValidation"
                           @on-change="onchange"
                           color="#ef7b21" errorColor="#e84c3d"
                           class="bg-white"
                           :start-index="index" title="Modulo de Venta de Seguros">
                <tab-content title="Automovil" icon="fa fa-car" :before-change="stage0">

                  <form-vehicle :item="data.vehicle.item"
                                :urlRest="data.vehicle.urlRest" :restricted="data.vehicle.formFill"
                                :keyname="data.vehicle.name" :index="0" :update="update"  :horizontal="true"
                                @connection="connectionVehicle"
                                :dispatch="data.vehicle.countAux"></form-vehicle>

                </tab-content>
                <tab-content title="Contratante" icon="fa fa-male" :before-change="stage1">

                  <form-webuser :item="data.purchaser.item"
                                :urlRest="data.purchaser.urlRest" :restricted="data.purchaser.formFill"
                                :name="data.purchaser.name" :index="1" :update="update" :horizontal="true"
                                @connection="connectionWebuser"
                                :dispatch="data.purchaser.countAux"></form-webuser>

                </tab-content>
                <tab-content title="Poliza" icon="fa fa-credit-card" :before-change="stage2">

                  <form-poliza :data="data" :horizontal="true" :index="2"></form-poliza>

                </tab-content>
                <tab-content title="Venta" icon="fa fa-check">
                  <form-success :data="data" :horizontal="true" :index="3"></form-success>
                </tab-content>
              </form-wizard>

            </b-card>
          </div>
          <pre style="font-size: 0.8em">{{ data }}</pre>
          <!--<pre>{{ data.vehicle }}</pre>-->
          <br>
          <!--<pre>{{ data.webuser }}</pre>-->
          <br><br>
          <!--<pre>{{ data.purchaser }}</pre>-->

          <!--<pre>{{ data.vehicle }}</pre>-->
          <!--<br><br>-->
          <!--<pre>{{ data.user }}</pre>-->
        </div>

        <div v-else="" class="row" key="div2">
          <div class="col-12 text-primary mb-5">
            <div v-if="messageTicket" class="title text-center h3">
              Poliza seleccionada - Venta en Proceso
            </div>
            <div v-else="" class="title text-center h3">
              Debe seleccionar una Poliza para continuar
            </div>
            <div :class="{'ticket cardWrap mt-5 mx-auto ' : true, 'localOpacity': !messageTicket}">
                <div class="card-ticket cardLeft">
                  <avatar :username="data.pickPolice.item.insuranceCompanyName ? data.pickPolice.item.insuranceCompanyName: 'xx'"
                          :rounded="true" :size="6.4" sizeUnid="em"
                          :src="'/static/img/company/' + data.pickPolice.item.insuranceCompanyId + '.png'"
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
                      <h2>08</h2>
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
                    <h3>{{ data.pickPolice.item.price ? data.pickPolice.item.price : 'x' }}</h3>
                    <span>soles</span>
                  </div>
                </div>
              </div>
            <div v-if="messageTicket" class="row mt-5" :label-sr-only="true">
              <div class="col-6 text-right pr-0">
                <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3" @click="$router.push('cotizar-admin')">Recotizar</b-button>
              </div>
              <div class="col-6 text-left pl-0">
                <b-button :pressed="false" variant="outline-primary" class="ml-1 my-3" @click="mySwitch = !mySwitch">Continuar</b-button>
              </div>
            </div>

            <div v-else="" class="row mt-5" :label-sr-only="true">
              <div class="col-12 text-center pr-0">
                <b-button :pressed="false" variant="outline-primary" class="mr-1 my-3" @click="$router.push('cotizar-admin')">Cotizar</b-button>
              </div>
            </div>
            <!--<button @click="mySwitch = !mySwitch">Cambio</button>-->
          </div>
        </div>
      </transition-group>

      <!--<button @click="mySwitch = !mySwitch">Cambio</button>-->
      <!--<input type="number" v-model="data.vehicle.validate">-->
      <br><br>
    </div>
  </div>
</template>

<script>
  import FormVehicle from './forms/FormVehicle.vue'
  import FormWebuser from './forms/FormWebuser.vue'
  import FormPoliza from './forms/FormPoliza.vue'
  import FormSuccess from './forms/FormSuccess.vue'
  import {DATA_INSURANCEPRICES as _pickPolice} from '../../data/dataNames'
  import {DATA_VEHICLE as _vehicle, DATA_WEBUSER as _webuser, DATA_PURCHASER as _purchaser, DATA_SALE as _sale} from '../../data/dnNewSales'
  import Avatar from '../../components/Avatar.vue'

//  import Fullscreen from "vue-fullscreen/src/component.vue"
  export default {
    components: {
      FormVehicle,
      FormWebuser,
      FormPoliza,
      FormSuccess,
      Avatar
    },
    data () {
      return {
        index: 0,
        update: false,
        mySwitch: false,
        pickTabIndex: 0,

        data: {
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
          webuser: {
            name: 'webuser',
            urlRest: _webuser.name,
            item: JSON.parse(JSON.stringify(_webuser.post)),
            defaultItem: JSON.parse(JSON.stringify(_webuser.post)),
            formFill: false
          },
          sale: {
            name: 'sale',
            urlRest: _sale.name,
            item: JSON.parse(JSON.stringify(_sale.post)),
            defaultItem: JSON.parse(JSON.stringify(_sale.post)),
            formFill: false
          }
        }
      }
    },
    computed: {
      disableBtn () {
        let saleId = this.data.sale.item.id
        if (saleId !== undefined) {
          // existe
          let purchaser = this.data.sale.item.purchaser
          return purchaser !== null
        } else {
          // No existe
          return true
        }
      },
      isLoading () {
        return this.$store.state.isLoading
      },
      messageTicket () {
        let data = JSON.parse(localStorage.getItem('insurance'))
        return data ? true : false
      }
    },
    methods: {
      setFormFill (index, value) {
        this.data[index].formFill = value
      },
      async getInsurancePolicy () {
        // let dataLocal = this.data.sale
        let companyId = this.data.pickPolice.item.insuranceCompanyId
        let url = 'insurancepolicies/mypolicies?sold=0&insuranceCompanyId=' + companyId
        console.log('GET INSURANCE')
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
        console.log(saleId)
        if (saleId !== undefined) {
          this.setFormFill('sale', true)
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
          return true
        }
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        // GET POLICY NUMBER
        let policyObject = ''
        let policy = await this.getInsurancePolicy()
        console.log('My LIST POLICIES')
        console.log(policy)
        if (!policy.status) return false
        else policyObject = policy.content[0]
        console.log(policyObject)
        // INSERT SALE
        this.data.sale.item.insurancePolicy = policyObject
        let r1 = await this.insertSale()
        console.log('R-Sale1: ')
        console.log(r1)
        if (!r1.status) return false
        else this.data.sale.item = r1.content
        console.log('CREATED LOCALSTORAGE: SALE')
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
        let webuserId = this.data.webuser.item.id
        console.log(webuserId)
        if (webuserId === undefined) {
          console.log('undefined ' + webuserId)
          this.data.webuser.item = {
            dniRuc: purchaser.dniRuc,
            razonSocial: purchaser.razonSocial,
            address: purchaser.address,
            distrito: purchaser.distrito,
            departamento: purchaser.departamento,
            provincia: purchaser.provincia,
            cellPhone: purchaser.cellPhone,
            user: {
              email: purchaser.email
            }
          }

          // INSERT WEBUSER
          let r1 = await this.insertWebuser()
          console.log('R1: ')
          console.log(r1)
          if (!r1.status) return false
          else this.data.webuser.item = r1.content
        } else {
//          alert('Recuperando Datos del WEBUSER')
          console.log('DEFINED ' + webuserId)
        }

        // INSERT VEHICLE
        let vehicleId = this.data.vehicle.item.id
        if (vehicleId == undefined) {
          this.$delete(this.data.vehicle.item, 'webUser')
          let r2 = await this.insertVehicleEmail()
          console.log('R2: ')
          console.log(r2)
          if (!r2.status) return false
          else this.data.vehicle.item = r2.content
        } else {
//          alert('Recuperando Datos del VEHICLE')
          console.log('DEFINED ' + webuserId)
        }

        // INSERT PURCHASER
        purchaserId = this.data.purchaser.item.id
        if (purchaserId == undefined) {
          let r3 = await this.insertPurchaser()
          console.log('R2: ')
          console.log(r3)
          if (!r3.status) return false
          else this.data.purchaser.item = r3.content
        } else {
//          alert('Recuperando Datos del VEHICLE')
          console.log('DEFINED ' + webuserId)
        }

        localStorage.setItem('webuser', JSON.stringify(this.data.webuser.item))
        localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
        this.setFormFill('vehicle', true)
        this.setFormFill('purchaser', true)
        return true
      },
      async stage2 () {

        // VALID LOCALSTORAGE PURCHASER
        let salePurchaser = this.data.sale.item.purchaser
        if (salePurchaser !== null) {
//          alert('VENTA TERMINADA')
          return true
        }

        let saleId = this.data.sale.item.id
        let sale = this.data.sale.item
        let vehicle = this.data.vehicle.item
        let purchaser = this.data.purchaser.item
        let pickPolice = this.data.pickPolice

        sale.amount = pickPolice.price
        sale.seatNumber = vehicle.seatNumber
        sale.vehicle = vehicle
        sale.purchaser = purchaser
        sale.currency = 'soles'

        let r3 = await this.updateSale(saleId)
        console.log('VENTAS EXITOSA')
        console.log(r3)
        if (!r3.status) return false

        localStorage.setItem('sale', JSON.stringify(this.data.sale.item))
        return true
        // sale.observation = null
        // sale.discount = null
        // sale.invoiceNumber = null
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
        console.log('INSERT SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: dataLocal.urlRest + '/' + saleID, data: dataLocal.item})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT SALE?')
        return self
      },
      async insertWebuser () {
        let dataLocal = this.data.webuser
        console.log('INSERT WEBUSER')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT WEBUSER?')
        return self
      },
      async insertVehicleEmail () {
        let dataLocal = this.data.vehicle
        let url = 'vehicles/searchbyemail?email=' + this.data.webuser.item.user.email
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

      connectionWebuser: function (name, data) {
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
            // this.data.vehicle.item.webUser = ''
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
        localStorage.removeItem('webuser')
        localStorage.removeItem('purchaser')
        localStorage.removeItem('insurance')
        localStorage.removeItem('location')

        this.data.pickPolice.item = this.data.pickPolice.defaultItem
        this.data.sale.item = this.data.sale.defaultItem
        this.data.vehicle.item = this.data.vehicle.defaultItem
        this.data.purchaser.item = this.data.purchaser.defaultItem
        this.data.vehicle.validate = false
        this.data.purchaser.validate = false
        // this.mySwitch = true
        this.initData()
        this.$router.push('cotizar-admin')
      },
      async CancelSale () {
        let dataLocal = this.data.sale
        let saleId = dataLocal.item.id
        if (saleId !== undefined) {
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: dataLocal.urlRest + '/' + dataLocal.item.id})
          if (!self.status) return false
          console.log('Cancel Sale')
          console.log(self)
          localStorage.removeItem('sale')
          localStorage.removeItem('vehicle')
          localStorage.removeItem('webuser')
          localStorage.removeItem('purchaser')
          localStorage.removeItem('location')
          this.data.sale.item = this.data.sale.defaultItem
          this.data.vehicle.item = this.data.vehicle.defaultItem
          this.data.purchaser.item = this.data.purchaser.defaultItem
          this.data.vehicle.validate = false
          this.data.purchaser.validate = false
          this.mySwitch = true

          this.setFormFill('vehicle', false)
          this.setFormFill('purchaser', false)
          this.initData()
        } else {
//          alert('ddddd')
        }
      },
      initData () {
        let notification = {}
        let data = JSON.parse(localStorage.getItem('insurance'))
        if (data) {
          let insurance = data.insurance
          let insuranceObject = data.object
          console.log('lleno')
          console.log(insurance)
          this.data.pickPolice.item = insurance
          this.data.vehicle.item.vehicleType = insuranceObject.vehicleType
          this.data.vehicle.item.useType = insuranceObject.useType
          this.data.vehicle.defaultItem.vehicleType = insuranceObject.vehicleType
          this.data.vehicle.defaultItem.useType = insuranceObject.useType

          // SALE
          this.data.sale.item.region = insuranceObject.region
        } else {
          console.log('vacio')
          this.mySwitch = true
        }

        let sale = JSON.parse(localStorage.getItem('sale'))
        if (sale) {
          this.data.sale.item = sale
          if (this.data.sale.item.id !== undefined) {
            this.setFormFill('sale', true)

            notification.data = {message: 'Existe una venta en proceso', status: '', success: null, url: ''}
            this.$store.commit('pushNotification', notification)
          }
        }

        let webuser = JSON.parse(localStorage.getItem('webuser'))
        if (webuser) {
          this.data.webuser.item = webuser
          if (this.data.webuser.item.id !== undefined) this.setFormFill('webuser', true)
        }

        let vehicle = JSON.parse(localStorage.getItem('vehicle'))
        if (vehicle) {
          this.data.vehicle.item = vehicle
          if (this.data.vehicle.item.id !== undefined) {
            this.setFormFill('vehicle', true)
          } else this.setFormFill('vehicle', false)
          this.data.vehicle.validate = true
        }

        let purchaser = JSON.parse(localStorage.getItem('purchaser'))
        if (purchaser) {
          this.data.purchaser.item = purchaser
          if (this.data.purchaser.item.id !== undefined) {
            this.setFormFill('purchaser', true)
            notification.data = {message: 'Existe una venta registrada sin finalizar', status: '', success: null, url: ''}
            this.$store.commit('pushNotification', notification)
          } else this.setFormFill('purchaser', false)
          this.data.purchaser.validate = true

        }
      }
    },
    created () {
      this.initData()
      // delete this.data.vehicle.defaultItem.licensePlate
    },
    mounted () {
    }
  }
</script>


<style lang="scss">

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
    font-size: 1.3em;
    overflow: hidden;
    width: 460px;
  }
</style>
