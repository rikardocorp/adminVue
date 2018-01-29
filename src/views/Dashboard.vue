<template>
  <div class="animated fadeIn">
    <div class="row d-flex justify-content-center">
      <!--<pre>{{ $store.state.user }}</pre>-->
      <div v-if="isAdmin" class="col-sm-6 col-lg-3">
        <b-card class="bg-primary" :no-block="true">
          <div class="card-body pb-0  px-0 text-center">
            <!--<b-dropdown class="float-right" variant="transparent p-0" right>-->
              <!--<template slot="button-content">-->
                <!--<i class="icon-settings"></i>-->
              <!--</template>-->
              <!--<b-dropdown-item>Action</b-dropdown-item>-->
              <!--<b-dropdown-item>Another action</b-dropdown-item>-->
              <!--<b-dropdown-item>Something else here...</b-dropdown-item>-->
              <!--<b-dropdown-item disabled>Disabled action</b-dropdown-item>-->
            <!--</b-dropdown>-->
            <h5>USUARIOS</h5>
            <h4 class="mb-0">{{ data.usuariosRegistrados }}</h4>
            <p>Registrados</p>
          </div>
          <!--<card-line1-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>-->
        </b-card>
      </div><!--/.col-->
      <div v-if="isAdmin || isPuntoVenta" class="col-sm-6 col-lg-3">
        <b-card class="bg-danger" :no-block="true">
          <div class="card-body pb-0  px-0 text-center">
            <!--<b-dropdown class="float-right" variant="transparent p-0" right>-->
            <!--<template slot="button-content">-->
            <!--<i class="icon-settings"></i>-->
            <!--</template>-->
            <!--<b-dropdown-item>Action</b-dropdown-item>-->
            <!--<b-dropdown-item>Another action</b-dropdown-item>-->
            <!--<b-dropdown-item>Something else here...</b-dropdown-item>-->
            <!--<b-dropdown-item disabled>Disabled action</b-dropdown-item>-->
            <!--</b-dropdown>-->
            <h5>VENDEDORES</h5>
            <h4 class="mb-0">{{ data.totalVendedores }}</h4>
            <p>Registrados</p>
          </div>
          <!--<card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>-->
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-lg-3">
        <b-card class="bg-info" :no-block="true">
          <div class="card-body pb-0  px-0 text-center">
            <!--<b-dropdown class="float-right" variant="transparent p-0" right>-->
              <!--<template slot="button-content">-->
                <!--<i class="icon-settings"></i>-->
              <!--</template>-->
              <!--<b-dropdown-item>Action</b-dropdown-item>-->
              <!--<b-dropdown-item>Another action</b-dropdown-item>-->
              <!--<b-dropdown-item>Something else here...</b-dropdown-item>-->
              <!--<b-dropdown-item disabled>Disabled action</b-dropdown-item>-->
            <!--</b-dropdown>-->
            <h5>VENTAS</h5>
            <h4 class="mb-0">{{data.ventasDia}} / {{data.ventasMesActual}}</h4>
            <p>Día / Mes</p>
          </div>
          <!--<card-line2-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>-->
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-lg-3">
        <b-card class="bg-warning" :no-block="true">
          <div class="card-body pb-0 px-0 text-center">
            <!--<b-dropdown class="float-right" variant="transparent p-0" right>-->
              <!--<template slot="button-content">-->
                <!--<i class="icon-settings"></i>-->
              <!--</template>-->
              <!--<b-dropdown-item>Action</b-dropdown-item>-->
              <!--<b-dropdown-item>Another action</b-dropdown-item>-->
              <!--<b-dropdown-item>Something else here...</b-dropdown-item>-->
              <!--<b-dropdown-item disabled>Disabled action</b-dropdown-item>-->
            <!--</b-dropdown>-->
            <h5>POLIZAS</h5>
            <h4 class="mb-0">{{data.polizasDisponibles + ' / ' + data.polizasAnuladas}}</h4>
            <p>Dispon. / Anuladas</p>
          </div>
          <!--<card-line3-chart-example class="chart-wrapper" style="height:70px;" height="70"/>-->
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->

    <b-card>
      <div class="row">
        <div class="col-sm-5">
          <h4 class="card-title mb-0">Ventas</h4>
          <div class="small text-muted">2017</div>
        </div><!--/.col-->
        <div class="col-sm-7 hidden-sm-down">
          <!--<b-button type="button" variant="primary" class="float-right"><i class="icon-cloud-download"></i></b-button>-->
          <b-button-toolbar class="float-right" aria-label="Toolbar with button groups">
            <b-button-group class="mr-3" aria-label="First group">
              <b-button @click="plotDataPick('ventasOficinaMeses')" variant="outline-secondary">Oficinas</b-button>
              <b-button @click="plotDataPick('ventasPorMes')" variant="outline-secondary">Mes</b-button>
              <b-button @click="plotDataPick('ventasUsuariosMeses')" variant="outline-secondary">Usuarios</b-button>
            </b-button-group>
          </b-button-toolbar>
        </div><!--/.col-->
      </div><!--/.row-->
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" :height="450" :data="plotData"></main-chart-example>
    </b-card>
  </div>
</template>

<script>
  import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
  import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
  import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
  import CardBarChartExample from './dashboard/CardBarChartExample'
  import MainChartExample from './dashboard/MainChartExample'
  import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
  import { Callout } from '../components/'

  export default {
    name: 'dashboard',
    components: {
      Callout,
      CardLine1ChartExample,
      CardLine2ChartExample,
      CardLine3ChartExample,
      CardBarChartExample,
      MainChartExample,
      SocialBoxChartExample
    },
    data: function () {
      return {
        data: {
          totalVendedores: 0,
          usuariosRegistrados: 0,
          ventasDia: 0,
          ventasMesActual: 0,
          polizasDisponibles: 0,
          polizasAnuladas: 0
        },
        plotData: null,
        tableItems: [
          {
            avatar: { url: 'static/img/avatars/1.jpg', status: 'success' },
            user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
            country: { name: 'USA', flag: 'static/img/flags/USA.png' },
            usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
            payment: { name: 'Mastercard', icon: 'fa fa-cc-mastercard' },
            activity: '10 sec ago'
          },
          {
            avatar: { url: 'static/img/avatars/2.jpg', status: 'danger' },
            user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
            country: { name: 'Brazil', flag: 'static/img/flags/Brazil.png' },
            usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
            payment: { name: 'Visa', icon: 'fa fa-cc-visa' },
            activity: '5 minutes ago'
          },
          {
            avatar: { url: 'static/img/avatars/3.jpg', status: 'warning' },
            user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
            country: { name: 'India', flag: 'static/img/flags/India.png' },
            usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
            payment: { name: 'Stripe', icon: 'fa fa-cc-stripe' },
            activity: '1 hour ago'
          },
          {
            avatar: { url: 'static/img/avatars/4.jpg', status: '' },
            user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
            country: { name: 'France', flag: 'static/img/flags/France.png' },
            usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
            payment: { name: 'PayPal', icon: 'fa fa-paypal' },
            activity: 'Last month'
          },
          {
            avatar: { url: 'static/img/avatars/5.jpg', status: 'success' },
            user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
            country: { name: 'Spain', flag: 'static/img/flags/Spain.png' },
            usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
            payment: { name: 'Google Wallet', icon: 'fa fa-google-wallet' },
            activity: 'Last week'
          },
          {
            avatar: { url: 'static/img/avatars/6.jpg', status: 'danger' },
            user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
            country: { name: 'Poland', flag: 'static/img/flags/Poland.png' },
            usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
            payment: { name: 'Amex', icon: 'fa fa-cc-amex' },
            activity: 'Last week'
          }
        ],
        tableFields: {
          avatar: {
            label: '<i class="icon-people"></i>',
            class: 'text-center'
          },
          user: {
            label: 'Usuarios'
          },
          country: {
            label: 'Ciudad',
            class: 'text-center'
          },
          usage: {
            label: 'Ventas'
          },
          payment: {
            label: 'Pagos',
            class: 'text-center'
          },
          activity: {
            label: 'Actividad'
          }
        }
      }
    },
    computed: {
      isAdmin () {
        return this.$store.state.user.role === 'ROLE_ADMIN'
      },
      isPuntoVenta () {
        return this.$store.state.user.isPuntoVenta
      }
    },
    methods: {
      plotDataPick (type) {
        this.plotData = this.data[type]
      },
      async getOption () {
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: 'dashboard', notify: {success: false, error: false}})
        return self
      },
      variant (value) {
        let $variant
        if (value <= 25) {
          $variant = 'info'
        } else if (value > 25 && value <= 50) {
          $variant = 'success'
        } else if (value > 50 && value <= 75) {
          $variant = 'warning'
        } else if (value > 75 && value <= 100) {
          $variant = 'danger'
        }
        return $variant
      }
    },
    created () {
      this.$http.get(this.$store.state.Login.API_URL + 'dashboard').then(response => {
        console.log('DATA ESTADISTICAS')
        console.log(response.data.data)
        this.data = response.data.data
        // alert(this.$store.state.user.role)
        if (this.$store.state.user.role === 'ROLE_ADMIN') {
          this.plotData = response.data.data.ventasOficinaMeses
        } else if (this.$store.state.user.role === 'ROLE_VENDEDOR') {
          this.plotData = response.data.data.ventasPorMes
        } else {
          this.plotData = response.data.data.ventasPorMes
        }
      })
    }
  }
</script>
