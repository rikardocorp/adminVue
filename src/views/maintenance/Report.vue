<template>
  <div class="animated fadeIn">

    <div class="row d-flex justify-content-center">
      <!--<pre>{{ $store.state.Login.LOAD_TABLE.roles }}</pre>-->
      <!--<pre>{{ $store.state.Login.LOAD_TABLE.regions }}</pre>-->
      <div class="col-md-7 col-xl-4 col-lg-6">
        <!--<app-form v-model="items" :item="item" :pickObject="pickObject" :horizontal="true" :urlRest="urlRest" @isSearching="isSearching"></app-form>-->
        <app-form :item="item" nameForm="nameForm1" :horizontal="true"></app-form>
      </div>

      <div class="col-md-5 col-xl-4 col-lg-6 report-btn">
        <div class="row">
          <!--<pre>{{ $store.state.user }}</pre>-->
          <div class="col-sm-6 col-md-12 col-xl-12">
            <b-card class="bg-primary" :no-block="true" @click="report1">
              <div class="card-body">
                <p class="m-0">Reporte</p>
                <h4 class="mb-0">control de soat</h4>
              </div>
            </b-card>
          </div><!--/.col-->
          <div class="col-sm-6 col-md-12 col-xl-12">
            <b-card class="bg-info" :no-block="true" @click="report2">
              <div class="card-body">
                <p class="m-0">Reporte</p>
                <h4 class="mb-0">Control de Certificados</h4>
              </div>
            </b-card>
          </div><!--/.col-->
          <div class="col-sm-6 col-md-12 col-xl-12">
            <b-card class="bg-warning" :no-block="true" @click="report3">
              <div class="card-body ">
                <p class="m-0">Reporte</p>
                <h4 class="mb-0">Venta Total - Puntos de Venta</h4>
              </div>
            </b-card>
          </div><!--/.col-->
          <div class="col-sm-6 col-md-12 col-xl-12">
            <b-card class="bg-danger" :no-block="true" @click="report4">
              <div class="card-body ">
                <p class="m-0">Reporte</p>
                <h4 class="mb-0">Ventas de Soat - Por Compañia</h4>
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
          insuranceCompany: ''
        }
      }
    },
    methods: {
      report1 () {
        if (this.item.dateFrom !=='' && this.item.dateTo !== '') {
          let url = 'reports/controlsoats?dateFrom=' + this.item.dateFrom + '&dateTo=' + this.item.dateTo
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un rango de fechas.'})
        }
      },
      report2 () {
        if (this.item.dateFrom !=='' && this.item.dateTo !== '') {
          let companyId = this.item.insuranceCompany.id === undefined ? '' : this.item.insuranceCompany.id
          let url = 'reports/controlcertificados?dateFrom=' + this.item.dateFrom + '&dateTo=' + this.item.dateTo + '&insuranceCompanyId=' + companyId
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un rango de fechas.'})
        }
      },
      report3 () {
        if (this.item.dateFrom !=='' && this.item.dateTo !== '') {
          let companyId = this.item.insuranceCompany.id === undefined ? '' : this.item.insuranceCompany.id
          let url = 'reports/puntosventa?dateFrom=' + this.item.dateFrom + '&dateTo=' + this.item.dateTo
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un rango de fechas.'})
        }
      },
      report4 () {
        console.log('this.item')
        console.log(this.item)
        if (this.item.dateFrom !=='' && this.item.dateTo !== '' && this.item.insuranceCompany !== '') {
          let companyId = this.item.insuranceCompany.id === undefined ? '' : this.item.insuranceCompany.id
          let url = 'reports/planillas?dateFrom=' + this.item.dateFrom + '&dateTo=' + this.item.dateTo + '&insuranceCompanyId=' + companyId
          this.imprimir(url)
        } else {
          this.$store.commit('sendNotification', {status: false, message: 'Debe elegir un rango de fechas y elegir una compañia.'})
        }
      },
      imprimir (url) {
        console.log(url)
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_PDF', url: url})
        self.then((response) => {
          let data = response.content
          FileSaver.saveAs(data.body, 'reporte.xlsx')
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
