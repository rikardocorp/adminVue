<template>
  <div class="wrapper">
    <div class="animated fadeIn" ref="ruleForm">

      <transition-group name="fade" mode="out-in">
        <div v-if="!mySwitch" class="row" key="div1">
          <div class="col-12">
            <b-card>

              <!-- Wizard Form -->
              <form-wizard @on-complete="onComplete"
                           @on-validate="handleValidation"
                           @on-change="onchange"
                           color="#ef7b21"
                           class="bg-white"
                           :start-index="0" title="Modulo de Venta de Seguros">
                <tab-content title="Automovil" icon="fa fa-car" :before-change="beforeTabSwitch">

                  <form-vehicle :item="data.vehicle.item" :urlRest="data.vehicle.urlRest" :name="data.vehicle.name" :index="0" :update="update"  :horizontal="true" @connection="connection"></form-vehicle>

                </tab-content>
                <tab-content title="Contratante" icon="fa fa-male" >

                  <form-webuser :item="data.webuser.item" :urlRest="data.webuser.urlRest" :name="data.webuser.name" :index="1" :update="update" :horizontal="true" @emit_addRow="addRow"></form-webuser>

                </tab-content>
                <tab-content title="Poliza" icon="fa fa-credit-card" :before-change="processInsertData">

                  <form-poliza :data="data" :horizontal="true" :index="2"></form-poliza>

                </tab-content>
                <tab-content title="Poliza"
                             icon="fa fa-check">
                  Yuhuuu! This seems pretty damn simple
                </tab-content>
              </form-wizard>

            </b-card>
          </div>
          <pre>{{ data }}</pre>
        </div>

        <div v-else="" class="row" key="div2">
          <div class="col-12">
            <b-card>
              Coronado perez
            </b-card>
          </div>
        </div>
      </transition-group>

      <button @click="mySwitch = !mySwitch">Cambio</button>
      <button @click="assigDataSale(12)">Assign</button>
      <br><br>
    </div>
  </div>
</template>

<script>
  import FormVehicle from './forms/FormVehicle.vue'
  import FormWebuser from './forms/FormWebuser.vue'
  import FormPoliza from './forms/FormPoliza.vue'
  import {DATA_INSURANCEPRICES as _pickPolice, DATA_VEHICLE as _vehicle, DATA_WEBUSER as _webuser, DATA_SALE as _sale} from '../../data/dataNames'
//  import Fullscreen from "vue-fullscreen/src/component.vue"
  export default {
    components: {
      FormVehicle,
      FormWebuser,
      FormPoliza
    },
    data () {
      return {
        update: false,
        mySwitch: false,
        pickTabIndex: 0,
        insurancePolicy: {},
        data: {
          pickPolice: {
            name: 'pickPolice',
            urlRest: _pickPolice.name,
            item: JSON.parse(JSON.stringify(_pickPolice.post)),
            defaultItem: '',
            formFill: false
          },
          vehicle: {
            name: 'vehicle',
            urlRest: _vehicle.name,
            item: JSON.parse(JSON.stringify(_vehicle.post)),
            defaultItem: JSON.parse(JSON.stringify(_vehicle.post)),
            formFill: false
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
    methods: {
      processInsertData: function () {
        let vm = this
        let dataLocal = vm.data.webuser
        console.log('AAAAA')
        console.log(dataLocal)

        // INSERT WEBUSER
        let self = vm.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
        return self.then((data) => {
          console.log('INSERT WEBUSER')
          console.log(data)
          if (data.status) {
            console.log(data.content)
            vm.data.vehicle.item.webUserId = data.content.id

            // INSERT VEHICLE
            dataLocal = vm.data.vehicle
            let self2 = vm.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
            return self2.then((data) => {
              console.log('INSERT vehicle')
              console.log(data)
              if (data.status) {
                vm.data.vehicle.item.id = data.content.id
                console.log(data.content)
                return this.processSale()
//                return true
              } else {
                return false
              }
            })
          } else {
            console.log('ERROR')
            console.log(data.content)
            return false
          }
        })
      },
      processSale: function () {
        // INSERT PURCHASER
        let dataLocal = this.data.webuser
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'purchasers', data: dataLocal.item})
        return self.then((data) => {
          console.log(data)
          if (data.status) {
            console.log(data.content)
            let idPurchaser = data.content.id

            // GET INSURANCEPOLICY
            let self2 = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: 'insurancepolicies/mypolicies?sold=0'})
            return self2.then((data) => {
              console.log('GET INSURANCEPOLICY')
              console.log(data)
              if (data.status) {
                console.log(data.content)
                let idPolicy = data.content[0].id
                // INSERT SALE
                this.assigDataSale(idPurchaser, idPolicy)
                dataLocal = this.data.sale
                let self2 = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: dataLocal.urlRest, data: dataLocal.item})
                return self2.then((data) => {
                  console.log('INSERT SALE')
                  console.log(data)
                  if (data.status) {
                    this.data.sale.item = data.content
                    console.log(data.content)
                    return true
                  } else {
                    return false
                  }
                })
              } else {
                console.log('ERROR')
                console.log(data.content)
                return false
              }
            })
          } else {
            console.log('ERROR')
            console.log(data.content)
            return false
          }
        })
      },
      assigDataSale: function (idPurchaser, idPolicy) {
        console.log('ASSIGN SALE')
        this.data.sale.item.purchaserId = idPurchaser
        this.data.sale.item.insurancePolicyId = idPolicy
        this.data.sale.item.vehicleId = this.data.vehicle.item.id
        this.data.sale.item.seatNumber = this.data.vehicle.item.seatNumber
        this.data.sale.item.regionId = this.data.pickPolice.item.regionId
        this.data.sale.item.amount = this.data.pickPolice.item.price
        this.data.sale.item.currency = 'Soles'
      },
      connection: function (name, data) {
        console.log('connection:::::')
        console.log(name)
        console.log(data)
        if (data) {
          this.data[name].item = data[0]
        } else {
          let auxValue = this.data[name].item.licensePlate
          this.data[name].item = Object.assign({}, this.data[name].defaultItem)
          this.data[name].item.licensePlate = auxValue
        }
      },
      handleValidation: function (isValid, tabIndex) {
        console.log('Tab: ' + tabIndex + ' valid: ' + isValid)
      },
      beforeTabSwitch: function () {
        let idForm = 'form' + this.pickTabIndex
        let form = document.getElementById(idForm)

        return true
        //        return new Promise((resolve, reject) => {
        //          forms.validate((valid) => {
        //            resolve(valid)
        //          })
        //        })
      },
      onchange : function (prevIndex, nextIndex) {
        this.pickTabIndex = nextIndex
        console.log('prev: ' + prevIndex + ' next: ' + nextIndex)
      },
      onComplete: function () {
        alert('Yay. Done!')
      },
      addRow (value) {
        console.log('EMIT forms vehicle')
        console.log(value)
      }
    },
    created () {
      let insurance = JSON.parse(localStorage.getItem('insurance'))
      if (insurance) {
        console.log('lleno')
        console.log(insurance)
        this.data.pickPolice.item = insurance
        this.data.vehicle.item.vehicleTypeId = insurance.vehicleTypeId
        this.data.vehicle.item.useTypeId = insurance.useTypeId
        this.data.vehicle.defaultItem.vehicleTypeId = insurance.vehicleTypeId
        this.data.vehicle.defaultItem.useTypeId = insurance.useTypeId
      } else {
        console.log('vacio')
      }

      // delete this.data.vehicle.defaultItem.licensePlate
    },
    mounted () {
      console.log('REF')
      console.log(this.$refs.ruleForm)
      console.log(this.$lodash)
      console.log(this.$format)

//      let a = this.$format('Hello {1}! {0}', 'rikardocorp', 'Marcela')
//      console.log('REF RIKARDOCORP')
//      console.log(a)
    }
  }
</script>


<style lang="scss">

</style>
