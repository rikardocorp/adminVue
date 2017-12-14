 <template>
  <div class="col-md-10 m-auto pt-3 pb-4 myPoliza">
    <!--<div class="title text-center h3 mb-3 text-primary">Venta Registrada</div>-->

    <div class="container abstractPrice pt-3 pb-3" style="background: rgb(255, 165, 5)">
      <div class="title text-center text-white">
        <span class="fa-1x">RESUMEN DE LA VENTA</span>
      </div>
    </div>
    <div class="ticket absolute cardWrap mx-auto pb-4">
      <div class="card-ticket cardLeft">
        <avatar :username="data.pickPolice.item.insuranceCompanyName ? data.pickPolice.item.insuranceCompanyName: 'xx'"
                :rounded="true" :size="6.4" sizeUnid="em" :localSrc="false"
                :src="path + '/' + data.pickPolice.item.insuranceCompanyImage"
                :border="true" colorBorder="#f4f3ef" color="#ecedef"
                backgroundColor="orange" :sizeBorder="0.4"></avatar>
      </div>
      <div class="card-ticket cardCenter">
        <div class="xtitle">
          Poliza #{{ data.sale.item.insurancePolicy ? data.sale.item.insurancePolicy.number : '[PENDIENTE]'  }}
        </div>
        <div class="xcontent">
          <div class="title">
            <h2>{{ data.purchaser.item ? data.purchaser.item.razonSocial: 'xxxxx' }}</h2>
            <span>Contratante</span>
          </div>
          <div v-if="!isClient" class="seat">
            <h2>{{ data.sale.item.validityStart ? data.sale.item.validityStart: 'xx/xx/xxxx' }}</h2>
            <span>Fecha Inicio</span>
          </div>
          <!--<div v-if="!isClient" class="time">-->
            <!--<h2>{{ data.sale.item.validityStart ? data.sale.item.validityStart: 'xx/xx/xxxx' }}</h2>-->
            <!--<span>Fecha Inicio</span>-->
          <!--</div>-->
          <div v-else="" class="time">
            <h2>{{ localDate }}</h2>
            <span>Fecha Inicio</span>
          </div>
        </div>
      </div>
      <!--<div class="card-ticket cardRight">-->
        <!--<div class="xtitle text-center">-->
          <!--&lt;!&ndash;<b-button :pressed="false" size="sm" variant="outline-primary" class="mr-1 my-3"><i class="fa fa-check"></i></b-button>&ndash;&gt;-->
          <!--<i class="fa fa-car"></i>-->
        <!--</div>-->
        <!--<div class="number">-->
          <!--&lt;!&ndash;<h3>{{ x.price | currency }}</h3>&ndash;&gt;-->
          <!--<h3>{{ amountFinal }}</h3>-->
          <!--<span>soles</span>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div v-if="!isClient" class="container abstractPrice pt-3 pb-4">
      <div v-if="data.sale.item.discount > 0">
        <div class="row text-success">
          <div class="col-6">Precio s/.</div>
          <div class="col-6">{{ data.sale.item.amount | currency }}</div>
        </div>
        <div class="row text-danger secundary">
          <div class="col-6">Descuento s/.</div>
          <div class="col-6">{{ data.sale.item.discount | currency }}</div>
        </div>
        <hr>
      </div>
      <div class="row text-info">
        <div class="col-6">Costo Total s/.</div>
        <div class="col-6">{{ amountFinal | currency }}</div>
      </div>
      <div class="row text-warning secundary">
        <div class="col-6">Credito s/.</div>
        <div class="col-6">{{ amountFinal - data.pay.item.amount | currency }}</div>
      </div>
    </div>
    <div class="container abstractPrice pt-3 pb-3" style="background: #35a213">
      <div class="title text-center text-white">
        <span class="fa-1x">Monto a Pagar s/.</span> <span class="h4">{{ data.pay.item.amount | currency }}</span>
      </div>
    </div>
    <b-button v-if="data.payment.item.id == undefined" @click="paySale" :pressed="false" variant="success"
              class="mr-1 mt-3 mb-0 btn-pay hvr-shadow-radial hvr-bob" style="background: #36a113;">
      <i :class="{'fa fa-money': data.pay.item.paymentType===1, 'fa fa-credit-card':  data.pay.item.paymentType==0}" aria-hidden="true"></i> PAGAR
    </b-button>
    <div v-if="!isClient">
      <!-- PARA LA POSITIVA -->
      <!--<div v-if="data.pickPolice.item.insuranceCompanyId==1" class="text-center mt-3">-->
        <!--<toggle-button :labels="{checked: 'Manual', unchecked: 'WEB'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(181, 181, 181)'}"-->
                       <!--:width="85" :height="32" :sync="true"-->
                       <!--v-model="typePositiva" class="mr-2">-->
        <!--</toggle-button>-->
      <!--</div>-->

      <!-- PARA LA AFOCAT 6Y7 -->
      <div v-if="data.pickPolice.item.insuranceCompanyId==6 || data.pickPolice.item.insuranceCompanyId==7" class="text-center mt-3">
        <toggle-button :labels="{checked: 'Centrado', unchecked: 'otro'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(181, 181, 181)'}"
                       :width="85" :height="32" :sync="true"
                       v-model="typeAfocat" class="mr-2">
        </toggle-button>
      </div>

      <!-- ANULAR VENTA O CAMBIAR POLIZA -->
      <!--<div class="container abstractPrice pt-3 pb-3 mt-3" style="background: rgb(255, 82, 80)">-->
        <!--<div class="title text-center text-white">-->
          <!--<span class="fa-1x">Anulación o moficiación de venta</span>-->
        <!--</div>-->
      <!--</div>-->
      <div v-if="data.payment.item.id!==undefined" class="ticket absolute cardWrap mx-auto pb-4 mt-3 postPay">
        <div class="row">
          <div @click="typePostPay=0" :class="{'col-4 text-center postPay-list': true, 'pick': typePostPay==0}">
            <span class="icon bg-primary"><i class="fa fa-print"></i></span>
            <p :class="{'text-primary': typePostPay==0}">IMPRIMIR</p>
          </div>
          <div @click="typePostPay=1" :class="{'col-4 text-center postPay-list': true, 'pick': typePostPay==1}">
            <span class="icon bg-danger"><i class="fa fa-minus-circle"></i></span>
            <p :class="{'text-danger': typePostPay==1}">ANULAR</p>
          </div>
          <div @click="typePostPay=2" :class="{'col-4 text-center postPay-list': true, 'pick': typePostPay==2}">
            <span class="icon bg-info"><i class="fa fa-retweet"></i></span>
            <p :class="{'text-info': typePostPay==2}">PÓLIZA</p>
          </div>
        </div>

        <!-- DELETE SALE -->
        <div v-show="typePostPay==0" class="postPay-item">
          <b-button @click="imprimir" :pressed="false" variant="primary"
                    class="mr-1 my-1 btn-pay hvr-shadow-radial hvr-bob" style="background: #ffa505;">
            <i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR
          </b-button>
        </div>
        <div v-show="typePostPay==1" class="postPay-item">
          <b-input-group class="mb-3 passDelete">
            <b-input-group-addon class="bg-danger"><i class="fa fa-key"></i></b-input-group-addon>
            <b-form-input v-model="password"
                          type="password"
                          style="border: 1px solid #f86c6b;"
                          placeholder="Introduce tu contraseña para eliminar la venta"
                          title="Password para eliminar"></b-form-input>
          </b-input-group>
          <b-button @click="anular" :pressed="false" variant="danger"
                    class="mr-1 my-1 btn-pay hvr-shadow-radial hvr-bob text-white">
            <i class="fa fa-minus-circle" aria-hidden="true"></i> ANULAR
          </b-button>
        </div>

        <div v-show="typePostPay==2" class="postPay-item">
          <div class="d-flex justify-content-center mb-2 mySwitch">
            <toggle-button :labels="{checked: 'Web', unchecked: 'Manual'}" :color="{checked: 'rgb(165, 165, 165)', unchecked: 'rgb(99, 193, 222)'}"
                           :disabled="isLoading" :width="85" :height="28" :sync="true"
                           v-model="policyType" class="mr-2" @change="changePolicy">
            </toggle-button>
          </div>
          <b-input-group class="mb-3">
            <b-input-group-addon class="bg-info"><i class="fa fa-hashtag"></i></b-input-group-addon>
            <multiselect :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                         :placeholder="insurancePolicy.placeholder"
                         class="special_radius"
                         :label="insurancePolicy.params.label" :track-by="insurancePolicy.params.label"
                         :loading="!insurancePolicy.params.activate"
                         :disabled="!insurancePolicy.params.activate || isLoading"
                         v-model="insurancePolicy.params.value"
                         :options="insurancePolicy.params.options"></multiselect>
          </b-input-group>
          <b-input-group class="mb-3 passDelete">
            <b-input-group-addon class="bg-info"><i class="fa fa-key"></i></b-input-group-addon>
            <b-form-input v-model="password"
                          type="password"
                          placeholder="Introduce tu contraseña para eliminar la venta"
                          title="Password para eliminar"></b-form-input>
          </b-input-group>
          <b-button @click="reAsignar" :pressed="false" variant="info"
                    class="mr-1 my-1 btn-pay hvr-shadow-radial hvr-bob text-white">
            <i class="fa fa-retweet" aria-hidden="true"></i> CAMBIAR
          </b-button>
          <p class="text-center pt-2">
            <span class="text-info" style="font-size: 0.8em"><i class="fa fa-asterisk" aria-hidden="true"></i></span>
            Al reasignar una nueva poliza, la poliza
            <span class="text-info" style="font-size: 1.2em; font-weight: bolder;">#{{ data.sale.item.insurancePolicy ? data.sale.item.insurancePolicy.number : '[PENDIENTE]'  }}</span> se anulara</p>
        </div>
      </div>
    </div>

    <!--<p><a :href="pdf" target="_blank">Link pdf >></a></p>-->
    <!--<p>rrrrrr</p>-->
    <!--<pre>{{saveAs}}</pre>-->
    <!--<object width="840" height="650" :data="pdf"></object>-->

    <!--<div class="d-flex justify-content-center mb-2 mySwitch">-->
      <!--<toggle-button :labels="{checked: 'DNI', unchecked: 'RUC'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(181, 181, 181)'}"-->
                     <!--:disabled="isLoading || restricted" :width="75" :height="28" :sync="true"-->
                     <!--v-model="item.typeDocument" @change="dniRUC" class="mr-2">-->
      <!--</toggle-button>-->

      <!--<toggle-button :labels="{checked: 'Email', unchecked: 'Email'}" :color="{checked: 'rgb(99, 193, 222)', unchecked: 'rgb(181, 181, 181)'}"-->
                     <!--:disabled="isLoading || restricted" :width="75" :height="28"-->
                     <!--v-model="hasEmail" class="ml-2" @change="changeEmail">-->
      <!--</toggle-button>-->
    <!--</div>-->
    <!--<pre>{{data.vehicle.item.insurancePolicy.policyType}}</pre>-->
    <!--<pre>{{data.pickPolice.item}}</pre>-->
    <!--<pre>{{data.vehicle.item.insurancePolicy}}</pre>-->
    <!--<pre>{{ data.sale.item}}</pre>-->
    <!--<pre>{{ data.payment.item }}</pre>-->
  </div>

</template>

<script>
  import ToggleButton from '../../../components/ToggleButton.vue'
  import FileSaver from 'file-saver'
  import Avatar from '../../../components/Avatar.vue'
  import Multiselect from 'vue-multiselect'

  export default {
    props: ['horizontal', 'data', 'item'],
    components: {
      ToggleButton,
      Avatar,
      Multiselect
    },
    data () {
      return {
        lCols: 6,
        notify: {success: false, error: true},
        razonSocial: '',
        policyNumber: '',
        nowDate: '',
        nowTime: '',
        plate: '',

        pickPolice: {},
        vehicle: {},
        purchaser: {},

        manualWeb: '1',
        centrado: '1',
        pdf: '',
        typePositiva: true,
        typeAfocat: true,
        password: '',
        policyType: 0,
        amount: 0,
        typePostPay: 0,
        insurancePolicy: {
          label: 'Póliza',
          placeholder: 'Pólizas disponibles',
          type: 'text',
          icon: 'fa fa-hashtag',
          input: 'multiselect',
          params: {
            url: 'insurancepolicies',
            key: 'insurancePolicy',
            label: 'number',
            options: [],
            activate: true,
            loadData: false,
            value: ''
          }
        },
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      amountFinal () {
        return this.data.sale.item.amount - this.data.sale.item.discount
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      isClient () {
        return this.$store.state.user.isClient
      },
      localDate () {
        return this.$store.state.user.date
      }
    },
    methods: {
      imprimir () {
//       1  positiva: /sales/{id}/printpolicy?positiva=(1: manual, 2: web)
//          rimac: /sales/{id}/printpolicy
//          mapfre: /sales/{id}/printpolicy
//          pacifico: /sales/{id}/printpolicy
//          protecta: /sales/{id}/printpolicy
//       6  afocat unica: /sales/{id}/printpolicy?afocat_manual_centrado=(1: centrado, other: no centrado)
//       7   afocat revisor: /sales/{id}/printpolicy?afocat_manual_centrado=(1: centrado, other: no centrado)
//       8    afocat aqp: /sales/{id}/printpolicy

        //let companyId = this.data.pickPolice.insuranceCompanyId
        //console.log(company)
        // id : 1 POsitiva
        // id : 6,7,8 afocat
        // if (companyId === 1)
        let paymentId = this.data.payment.item.id
        if (paymentId === undefined) {
          this.$store.commit('sendNotification', {status: null, message: 'Debe procesar el pago para imprimir la venta.'})
          return false
        }

        let idCompany = this.data.pickPolice.item.insuranceCompanyId
        let idSale = this.data.sale.item.id
        let url = this.getUrlPrint(idCompany, idSale)
        console.log(url)
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_PDF', url: url})
        self.then((response) => {
          let data = response.content
          FileSaver.saveAs(data.body)
        }).catch(error => {
          console.log('ERROR')
          console.log(error)
        })
      },
      async anular (cancelSale = true) {
        if (this.password === '') {
          this.$store.commit('sendNotification', {status: null, message: 'Debe ingresar su contraseña.'})
          return false
        }

        let anularSale = await this.anularSale(this.data.sale.item.id)
        if (!anularSale.status) return false
        if (cancelSale) {
          this.$emit('cancelSale', false)
          this.$store.commit('sendNotification', {status: true, message: 'Se anulo la venta con exito.'})
        } else {
          this.$store.commit('sendNotification', {status: true, message: 'Se anulo la poliza #' + this.data.sale.item.insurancePolicy.number})
        }
        return true
      },
      async reAsignar () {
        if (this.insurancePolicy.params.value === '') {
          this.$store.commit('sendNotification', {status: null, message: 'Debe seleccionar una nueva poliza.'})
          return false
        }

        console.log(this.data.sale.item)
        let auxAnular = await this.anular(false)
        if (!auxAnular) return false

        this.data.sale.item.vehicle.insurancePolicy = this.insurancePolicy.params.value
        this.data.sale.item.insurancePolicy = this.insurancePolicy.params.value
        this.$delete(this.data.sale.item, 'id')
        this.$delete(this.data.sale.item, 'date')
        this.data.sale.item.state = 2
        // this.data.sale.item.amount = this.amount
        let sale = await this.insertSale()
        if (!sale.status) return false
        this.data.sale.item.id = sale.content.id
        this.data.sale.item.date = sale.content.date
        localStorage.setItem('sale', JSON.stringify(this.data.sale.item))
        console.log(this.data.sale.item)
        // vehicleType
        if (this.data.vehicleType === undefined) {
          // alert('simple')
          this.data.vehicle.item.insurancePolicy = this.insurancePolicy.params.value
          localStorage.setItem('vehicle', JSON.stringify(this.data.vehicle.item))
        } else {
          // alert('especial')
          this.data.vehicleType.item.policyType = (this.policyType === 1) ? {id: 'W', name: 'WEB'} : {id: 'M', name: 'MANUAL'}
          this.data.vehicleType.item.insurancePolicy = this.insurancePolicy.params.value
          localStorage.setItem('vehicleType', JSON.stringify(this.data.vehicleType.item))
        }

        this.changePolicy()
        this.typePostPay = 0
        this.$store.commit('sendNotification', {status: true, message: 'Se genero una nueva venta con la poliza #' + this.data.sale.item.insurancePolicy.number})

        let payment = this.data.payment.item
        // Eliminar Pago
        if (payment.id) {
          this.$delete(this.data.payment.item, 'id')
          this.$delete(this.data.payment.item, 'date')
          this.$delete(this.data.payment.item, 'sale')
          this.$set(this.data.payment.item, 'sale', {id: this.data.sale.item.id})
          this.paySale()
        }
      },
      async insertSale () {
        let dataLocal = this.data.sale.item
        console.log('INSERT SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'sales', data: dataLocal, notify: this.notify})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT SALE?')
        return self
      },
      async updateSale (saleID) {
        let dataLocal = this.data.sale.item
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: 'sales/' + saleID, data: dataLocal, notify: this.notify})
        console.log('RIKAEDOCORO ppppppppp')
        console.log(self)
        console.log('INSERT SALE?')
        return self
      },
      async anularSale (saleID) {
        let dataLocal = {
          password: this.password,
          saleId: saleID,
          state: -1
        }
        console.log(dataLocal)
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: 'sales/cancel', data: dataLocal, notify: this.notify})
        return self
      },
      async deletePay (payID) {
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: 'payments/' + payID})
        return self
      },
      paySale () {
        if (!this.isClient) {
          this.changePolicy()
          this.$emit('paySale')
        } else {
          this.$store.commit('sendNotification', {status: null, message: 'Solo se pueden realizar pagos desde el aplicativo movil, puede desacargar la app desde el PlayStore.'})
        }
      },
      getUrlPrint (idCompany, idSale) {
        let url = ''
        let type = ''
        let typePositiva = this.data.sale.item.insurancePolicy.policyType
        if (idCompany === 1) {
          type = typePositiva === 'M' ? 1 : 2
          url = 'sales/' + idSale + '/printpolicy?positiva=' + type
        } else if (idCompany === 6 || idCompany === 7) {
          type = this.typeAfocat ? 1 : 2
          url = 'sales/' + idSale + '/printpolicy?afocat_manual_centrado=' + type
        } else {
          url = 'sales/' + idSale + '/printpolicy'
        }
        return url
      },
      changePolicy () {
        this.password = ''
        this.insurancePolicy.params.value = ''
        this.item.insurancePolicy = ''
        let companyId = this.data.sale.item.insurancePolicy ? this.data.sale.item.insurancePolicy.insuranceCompany.id : null
        let userId = this.$store.state.user.data.id
        let policyType = this.policyType === 1 ? 'W' : 'M'
        let url = 'insurancepolicies?insuranceCompanyId=' + companyId + '&sold=0&userId=' + userId + '&policyType=' + policyType
        this.getOption(url)
      },
      getOption (urlRest) {
        console.log(urlRest)
        console.log('_________')
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          console.log(data)
          if (data.status) {
            this.insurancePolicy.params.options = data.content
            this.insurancePolicy.params.activate = true
          }
        })
      }
    },
    created () {
      // this.changePolicy()
      // this.amount = this.data.sale.item.amount
      let datetime = this.$store.getters.getDateTime
      this.nowDate = datetime.date
      this.nowTime = datetime.time
    }
  }
</script>

<style lang="scss" scoped="">
  .myPoliza {
    overflow: scroll;
    .h3 {
      font-family: 'jmc';
    }

    .ticket {
      background: #f4f3ef;
      border: 2px dashed white;
      font-size: 1.1em;
      width: 29.3em;
      padding: 1em 5em;

      .cardCenter{
        width: 15.5em;
        border-right: 3px dashed #f4f3ef;
      }
    }

    .btn-pay{
      width: 40%;
      margin: 30%;
      //background: #37a115;
      padding: 12px;
    }
  }

  .abstractPrice{
    font-size: 1.6em;
    color: #4e4e4e;
    background: #f4f3ef;
    width: 20.1em;
    border: 2px dashed white;
    border-top: none;
    hr{
      width: 75%;
    }
    div.col-6{
      &:first-child{
        text-align: right;
      }
      &:last-child{
        text-align: right;
        padding-right: 20%;
      }
    }
    .secundary{
      font-size: 0.7em;
    }
  }

  .postPay {
    border-radius: 1em !important;
    padding: 1.3em 2em !important;
    overflow: visible !important;

    .postPay-list {
      cursor: pointer;
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
      &.pick {
        -webkit-filter: none;
        filter: none;
      }
    }

    .postPay-item {
      padding: 25px 22px 0;
    }
    span.icon {
      border-radius: 2em;
      width: 25px;
      height: 25px;
      display: inline-block;
      padding-top: 0.1em;
    }

    p {
      color: #545454;
      margin-bottom: 0;
      padding-top: 0.4em;
    }
  }
</style>
<style lang="scss">
  .myPoliza {
    .multiselect__tags, input{
      background: #fff !important;
    }
  }
</style>
