<template>
  <div id="contentDetailSale">
    <pre>{{ item2 }}</pre>
    <div id="formDetailSale" :class="'col-md-12 m-auto ' + (item2.state==-1?'state-anulado':'')">
      <b-card>
        <!--<div slot="header" class="text-left">-->
          <!--<button @click="returnMain" title="Regresar" class="btn btn-in-title-left bg-primary"><i class="fa fa-arrow-left"></i></button>-->
          <!--<strong>Detalles de la Venta</strong> - Pagos-->
          <!--<div style="display: inline;">-->
            <!--<p class="fa-2x" style="padding-bottom: 0.4em; padding-top: 0.3em;"># <span class="numberPolicy">{{ item2.insurancePolicy.number }}</span></p>-->
          <!--</div>-->
        <!--</div>-->
        <div class="row">
          <div class="col-md-6 borderChild">
            <!--<h6>SEGURO SOAT - 2017</h6>-->
            <div class="row">
              <pre>{{item2.insurancePolicy.insuranceCompany}}</pre>
              <div class="col-md-5 text-center">
                <avatar :username="item2.insurancePolicy.insuranceCompany.name" :rounded="true" :size="7.5" sizeUnid="em"
                        :src="path + '/' + item2.insurancePolicy.insuranceCompany.image" :alt="item2.insurancePolicy.insuranceCompany.name"
                        :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false" :forceLoad="true"
                        backgroundColor="orange" :sizeBorder="0.5"></avatar>
              </div>
              <div class="col-md-7 text-center infoPolicy">
                <p class="xsTitle">{{ item2.insurancePolicy.insuranceCompany.name }}</p>
                <P>TIPO DE SEGURO SOAT</P>
                <P>{{ item2.date }}</P>
                <!--<p class="xsTitle">VENDEDOR</p>-->
                <!--<P>{{ item2.insurancePolicy.user.firstName ? item2.insurancePolicy.user.firstName + ' ' + item2.insurancePolicy.user.lastName : 'vendedor de tienda' }}</P>-->
                <!--<P>{{ item2.insurancePolicy.user.email }}</P>-->
              </div>
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
                  <p class="subtitle text-left"><span>LOCALIDAD</span></p>
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
            <div class="row pt-2 detailPay">
              <div v-if="item2.cart==null" class="col-md-12 borderChild">
                <p class="title">PAGOS</p>
                <div class="row pt-2">
                  <div class="col-md-6 container-subtitle">
                    <p class="subtitle text-left"><span class="bg-success">COSTO POLIZA</span></p>
                    <p class="value"><span>s/.</span> {{ item2.amount | currency }}</p>
                  </div>
                  <div class="col-md-6 container-subtitle">
                    <p class="subtitle text-left"><span class="bg-info">TOTAL PAGADO</span></p>
                    <p class="value"><span>s/.</span> {{ countTotal | currency }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 container-subtitle pb-3">
                    <p class="subtitle text-left"><span class="bg-danger">DESCUENTO</span></p>
                    <p class="value"><span>s/.</span> {{ item2.discount | currency }}</p>
                  </div>
                  <div class="col-md-6 container-subtitle pb-3">
                    <p class="subtitle text-left"><span class="bg-warning">A CREDITO</span></p>
                    <p class="value"><span>s/.</span> {{ countCredito | currency }}</p>
                  </div>
                </div>
              </div>
              <div v-else="" class="col-md-12 borderChild">
                <p class="title">PAGOS</p>
                <div class="row pt-2">
                  <div class="col-md-6 container-subtitle">
                    <p class="subtitle text-left"><span class="bg-danger">COMPROBANTE</span></p>
                    <p class="value">{{ item2.numFactura == '' ? 'S/N' : item2.numFactura }}</p>
                  </div>
                  <div class="col-md-6 container-subtitle">
                    <p class="subtitle text-left"><span class="bg-success">COSTO POLIZA</span></p>
                    <p class="value"><span>s/.</span> {{ item2.amount | currency }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--<pre>{{ item2 }}</pre>-->
        </div>
      </b-card>
    </div>

    <!-- DELETE SALE -->
    <div v-if="item2.state !== -1 && item2.state !== 2 && item2.cart==null" class="col-md-6 col-sm-12 col-lg-6 col-xl-5 m-auto pt-4">
      <b-input-group class="mb-3 passDelete">
        <b-input-group-addon class="bg-danger"><i class="fa fa-key"></i></b-input-group-addon>
        <b-form-input v-model="password"
                      type="password"
                      style="border: 1px solid #f86c6b;"
                      placeholder="Introduce tu contraseña para anular la venta"
                      title="Password para eliminar"></b-form-input>
        <b-input-group-button>
          <b-btn variant="danger" @click="anularSale">Anular</b-btn>
        </b-input-group-button>
      </b-input-group>
    </div>
    <!--<pre>{{ item }}</pre>-->

  </div>
</template>


<script>
  import ToggleButton from '../../components/ToggleButton.vue'
  import Avatar from '../../components/Avatar.vue'
  import {DATA_PAYMENT as dataPay} from '../../data/dnSales'
  import FileSaver from 'file-saver'
  import UploadSimple from '../../components/UploadFileSimple.vue'

  // import {DATA_FORM_PAYMENT as _payment} from '../../data/dnSales'

  export default {
    name: 'detail-sale-devoluciones',
    props: {
      item: {
        default: () => {}
      },
      count: {
        default: 0
      },
      urlRest: {
        default: ''
      }
    },
    components: {
      ToggleButton,
      Avatar,
      UploadSimple
    },
    data () {
      return {
        item2: {
          insurancePolicy: {
            insuranceCompany: {
              name: ''
            },
            user: {}
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
        listPayment: [],
        payment: dataPay.post,
        urlPayment: dataPay.name,
        urlFile: '',
        optionPrint: false,
        password: ''
      }
    },
    watch: {
      item (newVal) {
        alert('item')
        this.item2 = newVal
        // this.urlFile = 'sales/' + newVal.id + '/uploadpolicydocument'
        // this.optionPrint = false
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading || (this.item2.state === -1)
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      pathDocs () {
        return this.$store.state.Login.FILES_URL
      },
      validityEnd () {
        // Date
        let date = this.item.validityStart
        let toDay = this.$moment(date, 'DD/MM/YYYY')
        let day = toDay.get('date')
        let month = toDay.get('month')
        let year = toDay.get('year')
        let newDate = new Date(year + 1, month, day)
        return this.$moment(newDate).format('DD/MM/YYYY')
      },
      countTotal () {
        console.log('PAYMENT TOTAL')
        let total = 0
        this.listPayment.forEach(function (value) {
          total = total + value.amount
        })
        return total
      },
      countCredito () {
        return this.item.amount - this.item.discount - this.countTotal
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
        return C
      }
    },
    methods: {
      async anularSale () {
        if (this.password === '') {
          this.$store.commit('sendNotification', {status: null, message: 'Debe ingresar su contraseña.'})
          return false
        }

        let dataLocal = {
          password: this.password,
          saleId: this.item2.id,
          state: -1
        }
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'sales/cancel', data: dataLocal})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT SALE?')
        if (self.status) {
          this.password = ''
          this.item2.state = -1
        }
        return self
      },
      uploadCallBack (value) {
        this.item2.policy = value.policy
      },
      async updateSale () {
        let state = this.countCredito > 0 ? 3 : 4
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
      async deletePay (item) {
        let url = this.urlPayment + '/' + item.id
        console.log(url)
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: url})
        console.log(self)
        if (!self.status) return false
        else {
          let indexSelected = this.$lodash.findIndex(this.listPayment, item)
          this.listPayment.splice(indexSelected, 1)
          await this.updateSale()
          console.log('Success')
        }
      },
      returnMain () {
        this.optionPrint = false
        this.$emit('returnMain', false)
      }
    },
    mounted () {
      // this.item2 = {}
    }
  }
</script>

<style lang="scss">
  .card-danger > .card-header{
    background: #f86c6b !important;
  }

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
  }

  #contentDetailSale{
    #formDetailSale{
      border-top: 1.6px dashed #ef7b1f;
      margin-top: 20px !important;
      .card{
        box-shadow: none;
      }
    }
    .state-anulado{
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
    }

    .dropbox {
      color: #546c79 !important;
      outline: 0.1em dashed #cacaca;
      outline-offset: -1.5em;
      background: #f4f3ef;
      color: #ababab;
      padding: 1.8em 2.4em;
      position: relative;
      cursor: pointer;
      border: 0.19em dashed white;
      margin: 0;
      font-weight: 500;
      font-size: 0.8em;
      text-align: justify;
      .upload-file form ap.text-italic {
        color: red !important;
      }
    }

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
          font-weight: 700;
        }
        &.bg-info{
          font-weight: 700;
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
</style>

