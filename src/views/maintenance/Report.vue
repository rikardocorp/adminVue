<template>
  <div class="animated fadeIn">

    <div class="row d-flex justify-content-center">
      <!--<pre>{{ $store.state.Login.LOAD_TABLE.roles }}</pre>-->
      <!--<pre>{{ $store.state.Login.LOAD_TABLE.regions }}</pre>-->
      <div class="col-md-7 col-xl-4 col-lg-6">
        <!--<app-form v-model="items" :item="item" :pickObject="pickObject" :horizontal="true" :urlRest="urlRest" @isSearching="isSearching"></app-form>-->
        <app-form :ref="'report'" :item="item" nameForm="nameForm1" :horizontal="true"></app-form>
      </div>

      <div class="col-md-5 col-xl-4 col-lg-6 report-btn">
        <div class="row">
          <!--<pre>{{ $store.state.user }}</pre>-->
          <template v-if="!isVendedor">
            <div v-if="!isPuntoVenta" class="col-sm-6 col-md-12 col-xl-12">
              <b-card class="bg-success" :no-block="true" @click="report5">
                <div class="card-body ">
                  <p class="m-0">Reporte</p>
                  <h4 class="mb-0">Diario</h4>
                </div>
              </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-12 col-xl-12">
              <b-card class="bg-danger" :no-block="true" @click="report4">
                <div class="card-body ">
                  <p class="m-0">Reporte Integral</p>
                  <h4 class="mb-0">Por Compañia</h4>
                </div>
              </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-12 col-xl-12">
              <b-card class="bg-warning" :no-block="true" @click="report3">
                <div class="card-body ">
                  <p class="m-0">Reporte Resumen</p>
                  <h4 class="mb-0">Producción por Puntos de Venta</h4>
                </div>
              </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-12 col-xl-12">
              <b-card class="bg-info" :no-block="true" @click="report2">
                <div class="card-body">
                  <!--<p class="m-0">Reporte</p>-->
                  <h4 class="mb-0">Control de Certificados</h4>
                </div>
              </b-card>
            </div><!--/.col-->
          </template>
          <div class="col-sm-6 col-md-12 col-xl-12">
            <b-card class="bg-primary" :no-block="true" @click="report1">
              <div class="card-body">
                <!--<p class="m-0">Reporte</p>-->
                <h4 class="mb-0">Control venta Soat</h4>
              </div>
            </b-card>
          </div><!--/.col-->
        </div><!--/.row-->
      </div>
    </div>
  </div>

</template>

<script>
  import Form from './forms/FormReport.vue'
  import FileSaver from 'file-saver'

  export default {
    name: 'Report',
    components: {
      appForm: Form
    },
    data () {
      return {
        item: {
          dateFrom: '',
          dateTo: '',
          insuranceCompany: '',
          user: ''
        }
      }
    },
    methods: {
      report1 () {
        if (this.item.dateFrom !=='') {
          let dateTo = this.item.dateTo !== '' ? this.item.dateTo : this.item.dateFrom
          let userId = this.item.user.id === undefined ? '' : this.item.user.id
          let url = 'reports/controlsoats?userId=' + userId + '&dateFrom=' + this.item.dateFrom + '&dateTo=' + dateTo
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un dia o un rango de fechas.'})
        }
      },
      report2 () {
        if (this.item.dateFrom !=='') {
          let dateTo = this.item.dateTo !== '' ? this.item.dateTo : this.item.dateFrom
          let companyId = this.item.insuranceCompany.id === undefined ? '' : this.item.insuranceCompany.id
          let url = 'reports/controlcertificados?dateFrom=' + this.item.dateFrom + '&dateTo=' + dateTo + '&insuranceCompanyId=' + companyId
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un rango de fechas.'})
        }
      },
      report3 () {
        if (this.item.dateFrom !=='') {
          let dateTo = this.item.dateTo !== '' ? this.item.dateTo : this.item.dateFrom
          let companyId = this.item.insuranceCompany.id === undefined ? '' : this.item.insuranceCompany.id
          let url = 'reports/puntosventa?dateFrom=' + this.item.dateFrom + '&dateTo=' + dateTo
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un rango de fechas.'})
        }
      },
      report4 () {
        if (this.item.dateFrom !== '' && this.item.insuranceCompany !== '') {
          let dateTo = this.item.dateTo !== '' ? this.item.dateTo : this.item.dateFrom
          let companyId = this.item.insuranceCompany.id === undefined ? '' : this.item.insuranceCompany.id
          let url = 'reports/planillas?dateFrom=' + this.item.dateFrom + '&dateTo=' + dateTo + '&insuranceCompanyId=' + companyId
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un rango de fechas y elegir una compañia.'})
        }
      },
      report5 () {
        if (this.item.dateFrom !== '') {
          let companyId = this.item.insuranceCompany.id === undefined ? '' : this.item.insuranceCompany.id
          let userId = this.item.user.id === undefined ? '' : this.item.user.id
          let url = 'reports/ventas?dateFrom=' + this.item.dateFrom + '&insuranceCompanyId=' + companyId + '&userId=' + userId
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir una fecha valida.'})
        }
      },
      imprimir (url) {
        // console.log(url)
        // console.log(this.$refs.report.datepicker.params.count)
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_PDF', url: url})
        self.then((response) => {
          let data = response.content
          FileSaver.saveAs(data.body, 'reporte.xlsx')
          this.$refs.report.datepicker.params.count = 0
        }).catch(error => {
          console.log('ERROR')
          console.log(error)
        })
      },
      getReport (url) {
        console.log(url)
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        self.then((data) => {
          console.log(data)
          if (data.status) {
            console.log(data)
          } else {
            console.log('Error: ' + url)
            console.log(data.content)
          }
        })
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      isVendedor () {
        return this.$store.state.user.role === 'ROLE_VENDEDOR'
      },
      isPuntoVenta () {
        return this.$store.state.user.role === 'ROLE_PUNTO_VENTA'
      },
      userId () {
        return this.$store.state.user.data.id
      }
    }
  }
</script>


<style lang="scss" scoped="">
  .report-btn{
    .card-body{
      cursor: pointer;
      p, h4 {
        font-family: jmc;
      }
      h4 {
        font-size: 1.5em;
      }
    }

  }
</style>
