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
          <div class="seat">
            <h2>{{ data.vehicle.item.seatNumber }}</h2>
            <span>Asientos</span>
          </div>
          <div v-if="!isClient" class="time">
            <h2>{{ data.sale.item.validityStart ? data.sale.item.validityStart: 'xx/xx/xxxx' }}</h2>
            <span>Fecha Inicio</span>
          </div>
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
    <b-button @click="paySale" :pressed="false" variant="success"
              class="mr-1 mt-3 mb-0 btn-pay hvr-shadow-radial hvr-bob" style="background: #36a113;">
      <i :class="{'fa fa-money': data.pay.item.paymentType===1, 'fa fa-credit-card':  data.pay.item.paymentType==0}" aria-hidden="true"></i> PAGAR
    </b-button>
    <div v-if="!isClient">
      <b-button @click="imprimir" :pressed="false" variant="primary"
                class="mr-1 my-1 btn-pay hvr-shadow-radial hvr-bob" style="background: #ffa505;">
        <i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR
      </b-button>

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
  </div>

</template>

<script>
  import ToggleButton from '../../../components/ToggleButton.vue'
  import FileSaver from 'file-saver'
  import Avatar from '../../../components/Avatar.vue'

  export default {
    props: ['horizontal', 'data', 'item'],
    components: {
      ToggleButton,
      Avatar
    },
    data () {
      return {
        lCols: 6,

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
        typeAfocat: true
      }
    },
    computed: {
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
      paySale () {
        if (!this.isClient) {
          this.$emit('paySale')
        } else {
          this.$store.commit('sendNotification', {status: null, message: 'Solo se pueden realizar pagos desde el aplicativo movil, puede desacar la app desde el Pla.'})
        }
      },
      getUrlPrint (idCompany, idSale) {
        let url = ''
        let type = ''
        let typePositiva = this.data.vehicle.item.insurancePolicy.policyType
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
      }
    },
    created () {
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
</style>
