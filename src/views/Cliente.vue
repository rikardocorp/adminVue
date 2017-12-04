<template>
  <div id="dashboard-client"  class="animated fadeIn">

    <div class="row d-flex justify-content-center">
      <div class="col-md-5 col-xl-4 col-lg-6 report-btn">
        <div class="row">
          <!--<pre>{{ $store.state.user }}</pre>-->
          <div class="col-sm-6 col-md-12 col-xl-12">
            <b-card class="bg-primary" :no-block="true" @click="$router.push({name:'cotizar'})">
              <div class="card-body">
                <h4 class="m-0">COTIZACION</h4>
                <p class="mb-0">Adquiere un nuevo Soat Vehicular</p>
              </div>
            </b-card>
          </div><!--/.col-->
          <div class="col-sm-6 col-md-12 col-xl-12">
            <b-card class="bg-info" :no-block="true" @click="$router.push({name:'Seguro'})">
              <div class="card-body">
                <h4 class="m-0">COTIZAR SEGURO VEHICULAR</h4>
                <p class="mb-0">Envianos tu informacion y cotiza tu seguro vehicular con nuestros especialistas</p>
              </div>
            </b-card>
          </div><!--/.col-->
        </div><!--/.row-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>


<style lang="scss">
  #dashboard-client{
    .card{
      cursor: pointer;
    }
  }

</style>
