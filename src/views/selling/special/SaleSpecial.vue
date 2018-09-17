<template>
  <div class="wrapper">
    <div class="formWizardSaleSpecial animated fadeIn" ref="ruleForm">
      <transition-group name="fade" mode="out-in">
        <div class="row justify-content-center" key="div1">
          <div class="col-10">
            <b-card>
              <button id="cancelSale" class="input-group-addon bg-primary"
                      style="right: 0; position: absolute; z-index: 2;"
                      v-b-tooltip.hover
                      @click="eventCancelSale"
                      :disabled="isLoading || disableBtn"
                      title="Cancelar la Venta">
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>

              <form-wizard id="newSaleWizard" @on-complete="onComplete" ref="wizard"
                           nextButtonText="Sig."
                           backButtonText="Ant."
                           finishButtonText="Finalizar"
                           @on-change="onchange"
                           color="#ef7b21" errorColor="#e84c3d"
                           :class="{'bg-white':true}"
                           :start-index.sync="index"
                           :title="'MODULO DE VENTA ESPECIAL'"
                           :subtitle="'Venta Perzonalizada'">

                <tab-content title="Caracteristicas" icon="fa fa-id-card-o" :before-change="completeStage0" >
                  <vehicle-type :ref="data.vehicleType.ref" :name="data.vehicleType.name" :item="data.vehicleType.item"
                                :urlRest="data.vehicleType.urlRest"
                                :restricted="data.vehicleType.formFill" :pickPolice="pickPolice"
                                :keyname="data.vehicleType.name" :horizontal="true"/>
                </tab-content>

                <tab-content title="Automovil" icon="fa fa-car" :before-change="completeStage1">
                  <vehicle :ref="data.vehicle.ref" :name="data.vehicle.name"
                                :item="data.vehicle.item" :pickPolice="data.pickPolice.item"
                                :insurancePolicy="data.sale.item.insurancePolicy"
                                :urlRest="data.vehicle.urlRest" :restricted="data.vehicle.formFill"
                                :keyname="data.vehicle.name" :horizontal="true"/>
                </tab-content>

                <tab-content title="Contratante" icon="fa fa-male" :before-change="completeStage2">
                  <purchaser :ref="data.purchaser.ref" :name="data.purchaser.name"
                             :item="data.purchaser.item"
                             :urlRest="data.purchaser.urlRest" :restricted="data.purchaser.formFill"
                             :horizontal="true"/>
                </tab-content>

                <tab-content :class="{'saleComplete': isSale}" title="Pago" icon="fa fa-credit-card" :before-change="completeStage3">
                  <pay :ref="data.pay.ref" :name="data.pay.name" :item="data.pay.item" :urlRest="data.pay.urlRest"
                       :dateSale="data.sale.item.date"
                       :data="data" :horizontal="true" :price="data.vehicleType.item.price ? data.vehicleType.item.price : 0"
                       :restricted="data.pay.formFill"/>
                </tab-content>

                <tab-content title="Venta" icon="fa fa-check" :before-change="completeStage4">
                  <!--<success :ref="data.payment.ref"  :name="data.payment.name" :item="data.payment.item"-->
                           <!--:data="data" :horizontal="true" @connection="connections"-->
                           <!--@paySale="paySale" @deletePaySale="deletePaySale" @cancelSale="cancelSale"/>-->
                  <success :ref="data.payment.ref"  :name="data.payment.name" :item="data.payment.item"
                           :policy="data.vehicleType.item.insurancePolicy" :company="data.vehicleType.item.insuranceCompany"
                           :data="data" :horizontal="true" @paySale="paySale" @deletePaySale="deletePaySale"
                           @cancelSale="cancelSale" @manageSale="manageSale"/>
                </tab-content>

              </form-wizard>

            </b-card>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import PickPolice from './forms/PickPolice'
  import VehicleType from './forms/VehicleType'
  import Vehicle from './forms/Vehicle'
  import Purchaser from './forms/Purchaser'
  import Pay from './forms/Pay'
  import Success from './forms/Success'

  import {
    DATA_INSURANCEPRICES as _pickPolice,
    DATA_VEHICLETYPE as _vehicleType,
    DATA_VEHICLE as _vehicle,
    DATA_SALE as _sale,
    DATA_PURCHASER as _purchaser,
    DATA_USER as _user,
    DATA_PAY as _pay,
    DATA_PAYMENT as _payment } from '../../../data/dnSaleSpecial'

  const SALE_POLIZA_ASIGNADA = 1
  const SALE_CREDITO = 3
  const SALE_PAGADA = 4

  export default {
    name: 'SaleSpecial',
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
      }
    },
    data () {
      return {
        index: 0,
        pickTabIndex: 0,
        update: false,
        data: {
          pickPolice: {
            name: _pickPolice.name,
            urlRest: _pickPolice.url,
            item: JSON.parse(JSON.stringify(_pickPolice.post)),
            defaultItem: JSON.parse(JSON.stringify(_pickPolice.post)),
            formFill: false
          },
          vehicleType: {
            name: _vehicleType.name,
            urlRest: _vehicleType.url,
            ref: _vehicleType.name,
            item: JSON.parse(JSON.stringify(_vehicleType.post)),
            defaultItem: JSON.parse(JSON.stringify(_vehicleType.post)),
            formFill: false,
            validate: false
          },
          vehicle: {
            name: _vehicle.name,
            urlRest: _vehicle.url,
            ref: _vehicle.name,
            item: JSON.parse(JSON.stringify(_vehicle.post)),
            defaultItem: JSON.parse(JSON.stringify(_vehicle.post)),
            formFill: false,
            validate: false
          },
          purchaser: {
            name: _purchaser.name,
            urlRest: _purchaser.url,
            ref: _purchaser.name,
            item: JSON.parse(JSON.stringify(_purchaser.post)),
            defaultItem: JSON.parse(JSON.stringify(_purchaser.post)),
            formFill: false,
            validate: false
          },
          user: {
            name: _user.name,
            urlRest: _user.url,
            item: JSON.parse(JSON.stringify(_user.post)),
            defaultItem: JSON.parse(JSON.stringify(_user.post)),
            formFill: false
          },
          pay: {
            name: _pay.name,
            urlRest: _pay.name,
            ref: _pay.name,
            item: JSON.parse(JSON.stringify(_pay.post)),
            defaultItem: JSON.parse(JSON.stringify(_pay.post)),
            formFill: false,
            validate: false
          },
          payment: {
            name: _payment.name,
            urlRest: _payment.url,
            ref: _payment.name,
            item: JSON.parse(JSON.stringify(_payment.post)),
            defaultItem: JSON.parse(JSON.stringify(_payment.post)),
            formFill: false,
            validate: false
          },
          sale: {
            name: _sale.name,
            urlRest: _sale.url,
            item: JSON.parse(JSON.stringify(_sale.post)),
            defaultItem: JSON.parse(JSON.stringify(_sale.post)),
            formFill: false
          }
        },
        isSale: false,
        actions: [],
        locationID: null,
        pickPolice: null
      }
    },
    methods: {
      async dispatchAll (method, url, data = null) {
        let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url, data: data})
        console.log('dispatchAll')
        console.log(self)
        if (!self.status) return false
        return self.content
      },
      async completeStage0 () {
        console.log('completeStage0')
        const vehicleType = this.data.vehicleType
        const vehicleTypeREF = this.$refs[vehicleType.ref]
        vehicleTypeREF.$v.item.$touch()
        const isNoValid = vehicleTypeREF.$v.item.$invalid

        if (isNoValid) return false

        // ----------------------     SALE     ----------------------------------
        let older = JSON.parse(localStorage.getItem('sale'))
        older = older ? older.insurancePolicy.id : null
        let newer = this.data.vehicleType.item.insurancePolicy.id
        if (older !== newer) {
          const data = {
            ...this.data.sale.item,
            insurancePolicy: this.data.vehicleType.item.insurancePolicy,
            state: SALE_POLIZA_ASIGNADA,
            amount: this.data.vehicleType.item.price
          }
          let result = await this.manageSale(data)
          if (!result) return false
          this.pickPolice = this.data.vehicleType.item.insurancePolicy
          // RELOAD POLICIES LIST
          vehicleTypeREF.loadPolicies(this.data.vehicleType.item.insurancePolicy.policyType)
        }
        // ------------------------------------------------------------------------

        // RULES
        // vehicleType.id no existe [se debe insertar una nueva marca o vehicleType]
        localStorage.setItem('vehicleType', JSON.stringify(this.data.vehicleType.item))
        localStorage.setItem('typeSell', JSON.stringify(1))
        localStorage.setItem('seller', JSON.stringify(this.$store.state.user.data.id))
        return true
      },
      completeStage1 () {
        console.log('completeStage1')
        const vehicle = this.data.vehicle
        const vehicleREF = this.$refs[vehicle.ref]
        vehicleREF.$v.item.$touch()
        const isNoValid = vehicleREF.$v.item.$invalid

        if (isNoValid) return false
        let _vehicleData = vehicle.item
        console.log('PASS 2')
        console.log(_vehicleData)

        localStorage.setItem('vehicle', JSON.stringify(_vehicleData))

        // RULES
        // vehicle.vehicleTypeCategory se debe buscar si existe en la BD si no se debe insertar
        // un vehicle siempre necesita un vehicleTypeCategory
        return true
      },
      completeStage2 () {
        console.log('completeStage2')
        const purchaser = this.data.purchaser
        const purchaserREF = this.$refs[purchaser.ref]
        purchaserREF.$v.item.$touch()
        const isNoValid = purchaserREF.$v.item.$invalid

        if (isNoValid) return false
        let _purchaserData = purchaser.item
        let _userData = purchaserREF.user
        console.log('PASS 2')
        console.log(_userData)
        this.data.user.item = _userData
        purchaserREF.getRegionID()
        this.locationID = purchaserREF.locationID

        localStorage.setItem('purchaser', JSON.stringify(_purchaserData))
        localStorage.setItem('user', JSON.stringify(_userData))

        // RULES
        // si el user es null se debe registrar un nuevo usuarios con los datos del purchaser
        return true
      },
      completeStage3 () {
        console.log('completeStage2')
        const pay = this.data.pay
        const payREF = this.$refs[pay.ref]
        payREF.$v.item.$touch()
        const isNoValid = payREF.$v.item.$invalid

        if (isNoValid) return false
        let _payData = pay.item
        console.log('PASS 3')
        console.log(_payData)
        localStorage.setItem('pay', JSON.stringify(_payData))
        return true
      },
      async completeStage4 () {
        console.log('completeStage4')
        let payment = this.data.payment.item
        if (payment.id === undefined) {
          this.$store.commit('sendNotification', {status: null, message: 'Debe procesar el pago para finalizar la venta.'})
          return false
        }

        if (!await this.insertVehicleType()) return false
        if (!await this.insertVehicle()) return false
        if (!await this.insertPurchaser()) return false
        if (!await this.insertUpdateSale()) return false
        return true
      },

      async manageSale (data, extern = false) {
        let method = 'INSERT'
        let url = this.data.sale.urlRest
        if (data.id) {
          method = 'UPDATE'
          url = this.data.sale.urlRest + '/' + data.id
          this.actions.push('UPDATE SALE FINAL')
        } else {
          this.actions.push('INSERT NEW SALE')
        }

        let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url, data: data})
        if (!self.status) return false
        else this.data.sale.item = self.content
        localStorage.setItem('sale', JSON.stringify(this.data.sale.item))

        if (extern) {
          this.pickPolice = this.data.sale.item.insurancePolicy
          this.data.vehicleType.item.insurancePolicy = this.data.sale.item.insurancePolicy
          localStorage.setItem('vehicleType', JSON.stringify(this.data.sale.item))
          const vehicleType = this.data.vehicleType
          const vehicleTypeREF = this.$refs[vehicleType.ref]
          vehicleTypeREF.loadPolicies(this.data.vehicleType.item.insurancePolicy.policyType)
        }

        // let dispatchSale = await this.dispatchAll(method, url, data)
        // console.log('MANAGE SALE')
        // console.log(dispatchSale)
        // if (!dispatchSale) return false
        // this.data.sale.item = dispatchSale
        // localStorage.setItem('sale', JSON.stringify(dispatchSale))
        return true
      },
      async manageVehicleTypeCategory () {
        console.log('MANAGE VEHICLE TYPE CATEGORY')
        let vehicleType = this.data.vehicleType.item
        let url = 'vehicletypecategories?type=&vehicleTypeId=' + vehicleType.vehicleType.id + '&vehicleClassId=' + vehicleType.vehicleClass.id + '&vehicleCategoryId=' + vehicleType.vehicleCategory.id + '&seatNumber=&seatNumberTo='
        console.log('URL', url)
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        console.log(self)

        if (!self.status) return false
        if (self.content.length === 0) {
          let vehicle = this.data.vehicle.item
          url = 'vehicletypecategories'
          const vehicleTypeCategory = {
            vehicleCategory: vehicleType.vehicleCategory,
            vehicleClass: vehicleType.vehicleClass,
            vehicleType: vehicleType.vehicleType,
            seatNumber: vehicle.seatNumber,
            seatNumberTo: vehicle.seatNumber,
            type: 1
          }
          console.log('insert vehicle type category ')
          console.log(vehicleTypeCategory)

          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: vehicleTypeCategory})
          if (!self.status) return false
          else this.data.vehicle.item.vehicleTypeCategory = self.content
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
          this.actions.push('INSERT VEHICLE TYPE CATEGORY')
          return true
        } else {
          console.log('ASSIGN VEHICLE TYPE CATEGORY')
          console.log(self.content[0])
          this.data.vehicle.item.vehicleTypeCategory = self.content[0]
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
          this.actions.push('ASSIGN VEHICLE TYPE CATEGORY')
          return true
        }
      },
      async manageUser () {
        const user = this.data.user
        const razonZocial = user.item.razonSocial.split(' ')
        const data = {
          ...user.item,
          password: user.item.email,
          firstName: razonZocial[0],
          lastName: razonZocial.length > 1 ? razonZocial[1] : '',
          role: {
            email: user.item.email,
            role: 'ROLE_USUARIO'
          }
        }
        this.$delete(data, 'birthDate')
        this.$delete(data, 'hasEmail')
        this.$delete(data, 'typeDocument')
        // this.$delete(data, 'razonSocial')

        console.log('MANAGE USER')
        console.log(data)

        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: user.urlRest, data: data})
        if (!self.status) return false
        else this.data.user.item = self.content
        console.log('MANAGE RESPONSE USER')
        console.log(self)
        localStorage.setItem('user', JSON.stringify(this.data.user.item))
        this.actions.push('INSERT USER')
        return true
      },

      async insertPurchaser () {
        console.log('INSERT PURCHASER')
        let purchaserId = this.data.purchaser.item.id
        if (purchaserId === undefined) {
          const purchaser = {...this.data.purchaser}
          const newEmail = purchaser.item.email === '' ? this.data.user.item.email : purchaser.item.email
          const data = {
            ...purchaser.item,
            email: newEmail
          }
          this.$delete(data, 'hasEmail')
          console.log('INSERT PASS PURCHASER')
          console.log(data)
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: purchaser.urlRest, data: data})
          console.log('PURCHASER???')
          console.log(self)
          if (!self.status) return false
          else this.data.purchaser.item = self.content
          localStorage.setItem('purchaser', JSON.stringify(this.data.purchaser.item))
          this.actions.push('INSERT PURCHASER')
        }
        return true
      },
      async insertVehicle () {
        console.log('INSERT VEHICLE')
        let vehicleId = this.data.vehicle.item.id
        if (vehicleId === undefined) {
          // VEHICLE TYPE CATEGORY
          let vehicleTypeCategory = this.data.vehicle.item.vehicleTypeCategory
          if (vehicleTypeCategory == null || vehicleTypeCategory === '') {
            let status = await this.manageVehicleTypeCategory()
            if (!status) return false
          }

          // USER
          let userId = this.data.user.item.id
          if (userId === undefined) {
            let status = await this.manageUser()
            if (!status) return false
          }

          let vehicleType = this.data.vehicleType.item
          const vehicle = this.data.vehicle
          const data = {
            ...vehicle.item,
            useType: vehicleType.useType
          }
          this.$delete(data, 'user')
          console.log('INSERT PASS VEHICLE')
          console.log(data)
          let url = 'vehicles/searchbyemail?email=' + this.data.user.item.email
          console.log(url)
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: data})
          console.log('VEHICLE???')
          console.log(self)
          if (!self.status) return false
          else this.data.vehicle.item = self.content
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
          this.actions.push('INSERT VEHICLE')
        }
        return true
        // this.manageVehicleTypeCategory()

        // let dataLocal = this.data.vehicle
        // let url = 'vehicles/searchbyemail?email=' + extra
        // console.log('INSERT VEHICLE')
        // let self = await this.$store.dispatch('dispatchHTTP', {type: method, url: url, data: dataLocal.item})
      },
      async insertVehicleType () {
        console.log('INSERT VEHICLE TYPE')

        // INSERT VEHICLE TYPE
        let vehicleTypeId = this.data.vehicleType.item.vehicleType.id
        if (vehicleTypeId === undefined) {
          const vehicleType = {
            vehicleBrand: this.data.vehicleType.item.brand.vehicleBrand,
            vehicleModel: this.data.vehicleType.item.vehicleType.vehicleModel,
            seatNumber: null
          }

          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'vehicletypes', data: vehicleType})
          if (!self.status) return false
          else this.data.vehicleType.item.vehicleType = self.content
          localStorage.setItem('vehicleType', JSON.stringify(this.data.vehicleType.item))
          this.actions.push('INSERT VEHICLETYPE')
        }
        return true
      },
      async insertUpdateSale () {
        const sale = {...this.data.sale.item}
        const pay = {...this.data.pay.item}
        const payment = {...this.data.payment.item}
        const vehicle = {...this.data.vehicle.item}
        const vehicleType = {...this.data.vehicleType.item}
        const purchaser = {...this.data.purchaser.item}

        const oldDate = sale.date.split(' ')
        const newDate = pay.date
        this.$delete(pay, 'paymentType')
        this.$delete(pay, 'date')
        const newDateSale = newDate + ' ' + oldDate[1]

        // console.log('DATES')
        // console.log(oldDate[0], newDate, newDateSale)

        let credito = parseFloat(vehicleType.price) - parseFloat(payment.amount) - parseFloat(pay.discount)
        let newState = credito > 0 ? SALE_CREDITO : SALE_PAGADA

        const data = {
          ...sale,
          ...pay,
          date: newDateSale,
          amount: parseFloat(vehicleType.price),
          active: 1,
          state: newState,
          seatNumber: vehicle.seatNumber,
          region: {id: this.locationID},
          vehicle: {id: vehicle.id},
          purchaser: {id: purchaser.id}
        }
        console.log('SALE')
        console.log(data)
        // return false
        let status = await this.manageSale(data)
        if (!status) {
          this.$store.commit('sendNotification', {status: false, message: 'No se encuentra la venta en proceso, intente nuevamente. Si el problema persiste cancelar la venta y volver a intentar.'})
        }
        return status
      },

      formFillAll (value) {
        console.log('FORM FILLL')
        const keys = Object.keys(this.data)
        console.log(keys)
        keys.map(it => {
          console.log(it)
          this.data[it].formFill = value
        })
      },
      async paySale () {
        console.log('PAY SALE')
        let pay = {...this.data.pay.item}
        let sale = {...this.data.sale.item}
        let payment = {...this.data.payment}
        if (payment.item.id === undefined) {
          const data = {
            ...payment.item,
            amount: pay.amount,
            numFactura: pay.numFactura,
            paymentType: pay.paymentType,
            sale: { id: sale.id }
          }
          console.log(data)
          console.log('PAY SALE END')
          console.log('---------------')
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: payment.urlRest, data: data})
          if (!self.status) return false
          else {
            this.data.payment.item = self.content
            this.formFillAll(true)
            // this.setFormFill('pay', true)
            localStorage.setItem('payment', JSON.stringify(this.data.payment.item))
          }
        } else {
          this.$store.commit('sendNotification', {status: true, message: 'El pago ya se encuentra registrado.'})
        }
      },
      async deletePaySale () {
        console.log('DELETE PAYSALE')
        let payment = this.data.payment
        if (payment.item.id === undefined) return false
        let url = payment.urlRest + '/' + payment.item.id
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: url})
        if (!self.status) return false
        else {
          console.log(url)
          console.log('DELETE PAYSALE  EXITO')
          this.data.payment.item = {...this.data.payment.defaultItem}
          this.formFillAll(false)
          localStorage.setItem('payment', JSON.stringify(this.data.payment.item))
        }
      },
      connections: function (type, name, data) {
        console.log(type, name, data)
        if (type === this.data.vehicleType.name) {
          if (name === 'isValid') {
            this.data.vehicleType.validate = !data
          } else {
            if (data) {
              console.log('ENTRA' + name)
              this.data[type].item[name] = data
            } else {
              console.log('NO ENTRA ' + name)
              this.data[type].item = Object.assign({}, this.data[name].defaultItem)
            }
          }
        }
      },
      onchange: function (prevIndex, nextIndex) {
        this.pickTabIndex = nextIndex
        console.log('prev: ' + prevIndex + ' next: ' + nextIndex)
      },
      onComplete: function () {
        console.log('ON Complete')
        this.$store.commit('sendNotification', {status: true, message: 'Se ha realizado la venta exitosamente!!.'})
        this.setDefault()
        this.resetFormWizard()
      },
      recoverStorage () {
        // GET VEHICLETYPE
        let vehicleType = JSON.parse(localStorage.getItem('vehicleType'))
        if (vehicleType) {
          this.data.vehicleType.item = vehicleType
          this.data.vehicleType.validate = true
        }

        // GET VEHICLE
        let vehicle = JSON.parse(localStorage.getItem('vehicle'))
        if (vehicle) {
          this.data.vehicle.item = vehicle
          this.data.vehicle.validate = true
        }

        // GET PURCHASER
        let purchaser = JSON.parse(localStorage.getItem('purchaser'))
        if (purchaser) {
          this.data.purchaser.item = purchaser
          // if (this.data.purchaser.item.id !== undefined) {
          //   this.isSale = true
          //   this.setFormFill('purchaser', true)
            // notification.data = {message: 'Existe una venta registrada sin finalizar', status: '', success: null, url: ''}
            // this.$store.commit('pushNotification', notification)
          // } else this.setFormFill('purchaser', false)
          this.data.purchaser.validate = true
        }

        // GET USER
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
          this.data.user.item = user
        }

        // GET PAY
        let pay = JSON.parse(localStorage.getItem('pay'))
        if (pay) {
          this.data.pay.item = pay
          this.data.pay.validate = true
        }

        // GET SALE
        let sale = JSON.parse(localStorage.getItem('sale'))
        if (sale) {
          this.data.sale.item = sale
          if (this.data.sale.item.id !== undefined) {
            // this.setFormFill('sale', true)
            this.pickPolice = this.data.sale.item.insurancePolicy
            this.$store.commit('sendNotification', {status: null, message: 'Existe una nueva venta en proceso.'})
          }
        }

        // GET PAYMENT
        let payment = JSON.parse(localStorage.getItem('payment'))
        if (payment) {
          this.data.payment.item = payment
          if (this.data.payment.item.id !== undefined) {
            this.resetFormWizard(true)
            this.formFillAll(true)
          }
        }

        // LOCATION ID
        let locationID = JSON.parse(localStorage.getItem('locationID'))
        if (locationID) {
          this.locationID = locationID
        }
      },
      eventCancelSale () {
        this.$dialog.confirm('¿Desea cancelar esta venta en proceso?').then((dialog) => {
          this.cancelSale()
          dialog.close()
        }).catch(() => {
          console.log('Clicked on cancel')
        })
      },
      async cancelSale (type = true) {
        let dataLocal = this.data.sale
        let saleId = dataLocal.item.id
        if (saleId !== undefined) {
          await this.deletePaySale()
          await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: dataLocal.urlRest + '/' + saleId})
          // localStorage.removeItem('insurance')
        } else {
          // this.setDefault()
          // this.initData()
        }
        if (type) {
          this.setDefault()
          this.resetFormWizard()
        }
        // this.mySwitch = true
      },
      resetFormWizard (value = false) {
        let fw = this.$refs['wizard']
        fw.maxStep = 0
        fw.tabs.forEach((tab) => {
          if (tab.$children[0].$v) tab.$children[0].$v.item.$reset()
          tab.checked = value
        })
        fw.navigateToTab(0)
      },
      setDefault () {
        localStorage.removeItem('pickPolice')
        localStorage.removeItem('vehicleType')
        localStorage.removeItem('vehicle')
        localStorage.removeItem('purchaser')
        localStorage.removeItem('user')
        localStorage.removeItem('pay')
        localStorage.removeItem('payment')
        localStorage.removeItem('sale')
        localStorage.removeItem('location')
        localStorage.removeItem('locationID')

        this.data.pickPolice.item = JSON.parse(JSON.stringify(this.data.pickPolice.defaultItem))
        this.data.vehicleType.item = JSON.parse(JSON.stringify(this.data.vehicleType.defaultItem))
        this.data.vehicle.item = JSON.parse(JSON.stringify(this.data.vehicle.defaultItem))
        this.data.purchaser.item = JSON.parse(JSON.stringify(this.data.purchaser.defaultItem))
        this.data.user.item = JSON.parse(JSON.stringify(this.data.user.defaultItem))
        this.data.pay.item = JSON.parse(JSON.stringify(this.data.pay.defaultItem))
        this.data.payment.item = JSON.parse(JSON.stringify(this.data.payment.defaultItem))
        this.data.sale.item = JSON.parse(JSON.stringify(this.data.sale.defaultItem))
        this.data.vehicleType.validate = false
        this.data.vehicle.validate = false
        this.data.purchaser.validate = false
        this.data.pay.validate = false
        this.setFormFill('vehicleType', false)
        this.setFormFill('vehicle', false)
        this.setFormFill('purchaser', false)
        this.setFormFill('pay', false)

        this.pickPolice = null
        this.isSale = false

        const purchaser = this.data.purchaser
        const purchaserREF = this.$refs[purchaser.ref]
        purchaserREF.defaultPurchaser()

        const pay = this.data.pay
        const payREF = this.$refs[pay.ref]
        payREF.defaultPay()
      },
      setFormFill (index, value) {
        this.data[index].formFill = value
      }
    },
    mounted () {
      let oldSellerId = localStorage.getItem('seller')
      let newSellerId = JSON.parse(localStorage.getItem('UserLog')).user.id
      let sale = JSON.parse(localStorage.getItem('sale'))
      let typeSell = localStorage.getItem('typeSell')
      if (sale !== null && typeSell == 0) {
        this.mySwitch = true
        this.$store.commit('sendNotification', {status: null, message: 'Existe una nueva venta en proceso.'})
      } else {
        if (oldSellerId == newSellerId) {
          this.recoverStorage()
        } else {
          this.setDefault()
        }
      }
    },
    created () {
      let date = this.$store.getters.getDateTime.date

      // date = '18/09/2018'
      console.log('CREATED SPECIAL SALE')
      console.log(date)
      let toDay = this.$moment(date, 'DD/MM/YYYY')
      let nowDate = this.$moment()

      if (nowDate > toDay) {
        console.log('ACTUALIZAR')
        let day = nowDate.get('date')
        let month = nowDate.get('month') + 1
        let year = nowDate.get('year')
        let actualdate = day + '/' + (month < 10 ? '0' + month : month) + '/' + year
        console.log(actualdate)
        this.$store.dispatch('setUpdateDate', actualdate)

      } else {
        console.log('No ACTUALIZAR')
      }

      // console.log('CREATED SPECIAL SALE')
      // console.log(date)
      // const nowDate = this.$moment()
      // let day = nowDate.get('date')
      // let month = nowDate.get('month') + 1
      // let year = nowDate.get('year')
      // let actualdate = day + '/' + (month < 10 ? '0' + month : month) + '/' + year
      // console.log(actualdate)
    },
    components: {
      PickPolice,
      VehicleType,
      Vehicle,
      Purchaser,
      Pay,
      Success
    }
  }
</script>

<style lang="scss">
  .formWizardSaleSpecial{
    .vdp-datepicker {
      width: 100%;
      .input-group input{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .special_radius .multiselect,
    .multiselect.special_radius{
      .multiselect__tags{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  div{
  }
</style>
