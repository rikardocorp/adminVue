<template>
  <div id="contentDetailSale">
    <!--<pre>{{item2.user}}</pre>-->
    <div class="col-md-11 col-sm-12 col-lg-10 col-xl-7 m-auto">
      <b-card>
        <div slot="header" class="text-left">
          <button @click="returnMain" title="Regresar" class="btn btn-in-title-left bg-primary"><i class="fa fa-arrow-left"></i></button>
          <strong>Detalles de la Venta</strong> - Carrito de Compra
          <!--<button @click="imprimir" title="Imprimir" class="btn btn-in-title-right bg-info"><i class="fa fa-print"></i></button>-->
        </div>
        <div class="row">
          <div class="col-md-6 borderChild">
            <!--<h6>SEGURO SOAT - 2017</h6>-->
            <div class="row">
              <div class="col-md-5 text-center">
                <avatar :username="item2.insuranceCompany.name" :rounded="true" :size="7.5" sizeUnid="em"
                        :src="path + '/' + item2.insuranceCompany.image" :alt="item2.insuranceCompany.name"
                        :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"
                        backgroundColor="orange" :sizeBorder="0.5"></avatar>

              </div>

              <div class="col-md-7 text-center infoPolicy">
                <p class="xsTitle">{{ item2.insuranceCompany.name }}</p>
                <P>TIPO DE SEGURO SOAT</P>
                <P>{{ item2.date }}</P>
                <p class="xsTitle">VENDEDOR</p>
                <P>{{ item2.user.firstName ? item2.user.firstName + ' ' + item2.user.lastName : 'vendedor de tienda' }}</P>
                <P>{{ item2.user.email }}</P>
              </div>
            </div>
            <div class="py-2">
              <p class="title">INFORMACION DEL CERTIFICADO</p>
              <p class="fa-2x" style="padding-bottom: 0.4em; padding-top: 0.3em;"># <span class="numberPolicy">{{ 'Sin Asignar' }}</span></p>
              <p class="subtitle value text-center"><span>DESDE:</span>  {{ today }}</p>
              <p class="subtitle value text-center"><span>HASTA:</span>  {{ validityEnd(today) }}</p>
              <p :class="{'subtitle value text-center vigente':true, 'vencido': daysContract < 0}"><span>{{ daysContract >= 0 ? daysContract + ' dias vigentes' : (daysContract*-1) + ' dias vencidos' }}</span></p>
            </div>
            <div class="borderChild py-3">
              <p class="title">DATOS DEL CONTRATANTE</p>
              <div class="row pt-2">
                <div class="col-md-12 container-subtitle">
                  <p class="subtitle text-left"><span>NOMBRE COMPLETO O RAZON SOCIAL</span></p>
                  <p class="value">{{ item2.purchaser.razonSocial }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>DNI / RUC</span></p>
                  <p class="value">{{ item2.purchaser.dniRuc }}</p>
                </div>
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>TELEFONO</span></p>
                  <p class="value">{{ item2.purchaser.cellPhone }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <p class="subtitle text-left"><span>DIRECCION</span></p>
                  <p class="value">{{ item2.purchaser.address }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <p class="subtitle text-left"><span>AMBITO DE APLICACION</span></p>
                  <p class="value">{{ item2.region.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <p class="title" style="margin-top: 0.6em">DATOS DEL VEHICULO</p>
            <div class="borderChild pt-2">
              <div class="row">
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>PLACA</span></p>
                  <p class="value">{{ item2.vehicle.licensePlate }}</p>
                </div>
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>NRO DE SERIE</span></p>
                  <p class="value">{{ item2.vehicle.engineNumber }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>AÑO FABRICACION</span></p>
                  <p class="value">{{ item2.vehicle.manufacturingYear }}</p>
                </div>
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>USO DEL VEHICULO</span></p>
                  <p class="value">{{ item2.vehicle.useType.name }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>MARCA-MODELO</span></p>
                  <p class="value">{{ item2.vehicle.vehicleTypeCategory.vehicleType.vehicleBrand + '-' + item2.vehicle.vehicleTypeCategory.vehicleType.vehicleModel }}</p>
                </div>
                <div class="col-md-6 container-subtitle">
                  <p class="subtitle text-left"><span>CATEGORIA/CLASE</span></p>
                  <p class="value">{{ item2.vehicle.vehicleTypeCategory.vehicleCategory.description + '/' + item2.vehicle.vehicleTypeCategory.vehicleClass.description }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 container-subtitle pt-2">
                  <p class="subtitle text-left"><span>NRO ASIENTOS</span></p>
                  <p class="value">{{ item2.vehicle.seatNumber }}</p>
                </div>
                <div class="col-md-6 container-subtitle pt-2">
                  <p class="subtitle text-left"><span>CHASIS</span></p>
                  <p class="value">{{ item2.bodywork }}</p>
                </div>
              </div>
            </div>
            <div class="row pt-2 detailPay detailPayCart">
              <div class="col-md-12 borderChild">
                <p class="title">PAGOS</p>
                <div class="row pt-2">
                  <div class="col-md-6 container-subtitle">
                    <p class="subtitle text-left"><span class="bg-danger">COMPROBANTE</span></p>
                    <p class="value">{{ 'S/N' }}</p>
                  </div>
                  <div class="col-md-6 container-subtitle">
                    <p class="subtitle text-left"><span class="bg-success">COSTO POLIZA</span></p>
                    <p class="value"><span>s/.</span> {{ item2.amount | currency }}</p>
                  </div>
                </div>
                <!--<div class="row">-->
                  <!--<div class="col-md-6 container-subtitle pb-3">-->
                    <!--<p class="subtitle text-left"><span class="bg-danger">DESCUENTO</span></p>-->
                    <!--<p class="value"><span>s/.</span> {{ 120 | currency }}</p>-->
                  <!--</div>-->
                  <!--<div class="col-md-6 container-subtitle pb-3">-->
                    <!--<p class="subtitle text-left"><span class="bg-warning">A CREDITO</span></p>-->
                    <!--<p class="value"><span>s/.</span> {{ countCredito | currency }}</p>-->
                  <!--</div>-->
                <!--</div>-->
                <div class="formPayCart row mt-3">
                  <p class="title bg-info" style="border: none">
                    <span>Registrar Venta</span>
                    <!--<toggle-button :labels="{checked: 'Ejectivo', unchecked: 'Tarjeta'}" :color="{checked: 'rgb(78, 188, 117)', unchecked: 'rgb(99, 193, 222)'}"-->
                                   <!--:disabled="isLoading" :width="75" :height="25" :sync="true"-->
                                   <!--class="ml-2 mt-2"></toggle-button>-->
                  </p>
                  <div class="col-md-12 container-subtitle mt-2">
                    <input type="text" class="form-control" v-model="numberPolicy" placeholder="Numero de poliza" :disabled="isLoading">
                  </div>
                  <div class="col-md-12 container-subtitle mt-2">
                    <b-button @click="eventAddSalebyCart" class="float-right w-100 p-2" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Registrar</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>


<script>
  import ToggleButton from '../../components/ToggleButton.vue'
  import Avatar from '../../components/Avatar.vue'
//  import {DATA_PAYMENT as dataPay} from '../../data/dnSales'
  import FileSaver from 'file-saver'

  // import {DATA_FORM_PAYMENT as _payment} from '../../data/dnSales'

  export default {
    props: ['item', 'urlRest'],
    components: {
      ToggleButton,
      Avatar
    },
    data () {
      return {
        item2: {
          user: {
            firstName: '',
            lastName: '',
            email: ''
          },
          insuranceCompany: {
            name: ''
          },
          purchaser: {},
          region: {},
          vehicle: {
            useType: {},
            vehicleTypeCategory: {
              vehicleType: {},
              vehicleCategory: {},
              vehicleClass: {}
            }
          },
          amount: 0,
          discount: 0
        },
        today: '',
        numberPolicy: '',
        newSale: {}
      }
    },
    watch: {
      async item (newVal) {
        this.item2 = newVal
        if (!this.item2.user) this.item2.user = this.$store.state.user.data
        let date = this.$store.getters.getDateTime.date
        this.today = this.$moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      daysContract () {
        let date = this.$store.getters.getDateTime.date
        console.log('FECHA PRUEBA DIFFF')
        console.log(date)
        console.log(this.item.validityStart)
        let toDay = this.$moment(date, 'DD/MM/YYYY')
        let day = toDay.get('date')
        let month = toDay.get('month')
        let year = toDay.get('year')
        let A = this.$moment([year, month, day])
        // let toDay = vm.$moment('12/11/1988', 'DD/MM/YYYY').subtract(7, 'days').subtract(1, 'months').subtract(2, 'years')
        toDay = this.$moment(this.item.validityStart, 'DD/MM/YYYY')
        day = toDay.get('date')
        month = toDay.get('month')
        year = toDay.get('year')
        let B = this.$moment([year + 1, month, day])

        let C = B.diff(A, 'days')
        return C ? C : 365
      }
    },
    methods: {
      validityEnd (date) {
        let toDay = this.$moment(date, 'DD/MM/YYYY')
        let day = toDay.get('date')
        let month = toDay.get('month')
        let year = toDay.get('year')
        let newDate = new Date(year + 1, month, day)
        return this.$moment(newDate).format('DD/MM/YYYY')
      },
      async updateSale () {
        let state = 0
        let saleID = this.item.id
        console.log('Estados:::::')
        console.log(state, this.item.state)
        if (this.item.state === state) return false

        this.item.state = state
        console.log('UPDATE SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: this.urlRest + '/' + saleID, data: this.item})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        return self
      },
      async getPayments (idSale) {
        // let url = this.urlPayment + '/' + idSale
        let url = this.urlPayment + '?saleId=' + idSale
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        return self.status ? self.content : []
      },
      eventAddSalebyCart () {
        this.$dialog.confirm('¿Esta seguro de registrar esta venta?').then((dialog) => {
          this.addSalebyCart()
          dialog.close()
        }).catch(() => {
          console.log('Clicked on cancel')
        })
      },
      async addSalebyCart () {
        if (this.item.state) {
          this.$store.commit('sendNotification', {status: null, message: 'Esta venta ya fue procesada, realizar la busqueda en ventas.'})
          return false
        }
        if (this.numberPolicy === '') {
          this.$store.commit('sendNotification', {status: null, message: 'Debe registrar un numero de poliza digital.'})
          return false
        }

        let newSale = {
          amount: this.item.amount,
          active: '',
          discount: 0,
          numFactura: '',
          observation: this.item.observation,
          state: 4, // estado totalmente pagado
          currency: this.item.currency,
          region: this.item.region,
          vehicle: {id: this.item.vehicle.id},
          purchaser: {id: this.item.purchaser.id},
          seatNumber: this.item.seatNumber,
          cart: {id: this.item.id},
          validityStart: this.today,
          insurancePolicy: null,
        }

        let policy = {
          number: this.numberPolicy,
          insuranceCompany: {id: this.item.insuranceCompany.id},
          policyType: 'D',
          user: {id: this.item2.user.id}
        }
        this.newSale = newSale
        // alert('newSale')
        console.log(newSale)
        console.log(policy)
        console.log('INSERT SALE')

        // return false
        // INSERT POLICY
        let self1 = await this.insertPolicy(policy)
        console.log(self1)
        if (!self1.status) return false
        console.log('INSERT POLICY')
        newSale.insurancePolicy = {id: self1.content.id}

        // INSERT SALE
        let self2 = await this.insertSale(newSale)
        console.log(self2)
        if (!self2.status) return false
        let idSale = self2.content.id
        console.log('INSERT SALE')

        // UPDATE CART
        let self3 = await this.updateCart()
        if (!self3.status) return false
        this.$set(this.item, 'state', self3.content.state)
        console.log('UPDATE CART')

        this.$router.push('/polizas-vendidas/' + idSale)
      },
      async insertPolicy (policy) {
        let url = 'insurancepolicies'
        let dataLocal = policy
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: dataLocal})
        return self
      },
      async insertSale (sale) {
        let url = 'sales'
        let dataLocal = sale
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: dataLocal})
        return self
      },
      async updateCart () {
        let dataLocal = JSON.parse(JSON.stringify(this.item))
        dataLocal.state = 1
        let url = 'carts/' + dataLocal.id
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: url, data: dataLocal})
        return self
      },
      imprimir () {
        let idSale = this.item.id
        let url = 'sales/' + idSale + '/printpolicy?positiva=1&afocat_manual_centrado=1'
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_PDF', url: url})
        self.then((response) => {
          let data = response.content
          FileSaver.saveAs(data.body)
        }).catch(error => {
          console.log('ERROR')
          console.log(error)
        })
      },
      returnMain () {
        this.$emit('returnMain', false)
      }
    }
  }
</script>

<style lang="scss">
  #saleDetail{
    font-family: 'jmc';

    .numberPolicy{
      color: rgb(100, 193, 222);
      padding-bottom: 0.4em;
      text-decoration: underline;
    }

    .infoPolicy{
      p{
        margin: 0;
        padding: 0;
        font-size: 0.85em;
        &.xsTitle{
          color: #f26f36;
          font-size: 1.2em;
        }
      }
    }
    p.title{
      width: 100%;
      text-align: center;
      //color: #ef7b21;
      font-weight: 500;
      border: 1px solid;
      background: #ffa501;
      color: white;
      border-radius: 0.5em;
      font-size: 1.1em;
    }
    p{
      margin: 0;
      padding: 0;
      text-align: center;
      width: 100%;
    }
    .bolder{
      font-weight: bold;
    }

    .subtitle{
      span{
        font-size: 0.9em;
        color: #9c9c9c;
        background: #f4f3ef;
        padding: 0 0.5em;
      }
    }

    .value{
      text-align: right;
      font-size: 1.1em;
      color: #444444;
      &.vigente{
        margin-top: 10px;
        font-size: 1.1em;
        span{
          background: #ef7b1f;
          color: #ffffff;
          padding: 0.2em 0.6em;
          border-radius: 2em;
        }
        &.vencido{
          font-size: 1.1em;
          span{
            background: red;
            padding: 0.2em 0.6em;
          }
        }
      }
    }

    .borderChild{
      >.row{
        >div{
          border: 1px dashed rgba(244, 243, 239, 0.62);
          padding: 0.3em 1em;
        }
      }
    }

    .detailPay{
      .subtitle{
        span{
          color: white;
          padding: 0.1em 0.4em;
          border-radius: 1em;
          font-size: 0.9em;
          font-weight: 600;
        }
      }
      .value{
        font-size: 1.3em;
        span{
          color: #a8a8a7;
          font-size: 0.7em;
        }
      }
    }

    .formPayCart{
      width: 90%;
      margin: auto;
      background: #64c1de;
      padding: 0.5em 1em 1em;
      border-radius: 0.51em;
      div{
        border: none !important;
      }
      .title{
        color: white;
        font-size: 1.4em;
      }
    }
  },

  #contentDetailSale{
    .avatar{
      span{
        font-size: 1.5em !important;
        font-weight: 500;
        color: white;
      }
    }

    .card-insurance{
      .ticket{
        overflow: inherit;
        width: 18em;
      }

      .xtitle{
        &.bg-success{
          //width: 104%;
          //margin-left: -4%;
          //border-left: 7px solid #319a57;
          font-weight: 700;
          //border-radius: 0.3em 0 0 0.3em;
        }
        &.bg-info{
          //width: 104%;
          //margin-left: -4%;
          //border-left: 7px solid #25a3ca;
          font-weight: 700;
          //border-radius: 0.3em 0 0 0.3em;
        }
        button{
          padding: 0.1em;
          width: 25px;
          height: 25px;
          border-radius: 1em;
          font-size: 0.9em;
          position: absolute;
          right: 10px;
          top: 8px;
        }
      }
    }
  }

  .detailPayCart{
    .container-subtitle{
      p.value{
        font-size: 1.6em !important;
        padding-top: 0.2em !important;
      }
    }
  }

</style>
