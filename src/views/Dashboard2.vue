<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-sm-6 col-md-2">
        <b-card class="text-white bg-info">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-people"></i>
          </div>
          <div class="h4 mb-0">87.500</div>
          <small class="text-muted text-uppercase font-weight-bold">Visitors</small>
          <b-progress class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-md-2">
        <b-card class="text-white bg-success">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-user-follow"></i>
          </div>
          <div class="h4 mb-0">385</div>
          <small class="text-muted text-uppercase font-weight-bold">New Clients</small>
          <b-progress class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-md-2">
        <b-card class="text-white bg-warning">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-basket-loaded"></i>
          </div>
          <div class="h4 mb-0">1238</div>
          <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
          <b-progress class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-md-2">
        <b-card class="text-white bg-primary">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-pie-chart"></i>
          </div>
          <div class="h4 mb-0">28%</div>
          <small class="text-muted text-uppercase font-weight-bold">Returning Visitors</small>
          <b-progress class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-md-2">
        <b-card class="text-white bg-danger">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-speedometer"></i>
          </div>
          <div class="h4 mb-0">5:34:11</div>
          <small class="text-muted text-uppercase font-weight-bold">Avg. Time</small>
          <b-progress class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-md-2">
        <b-card class="text-white bg-info">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-speech"></i>
          </div>
          <div class="h4 mb-0">972</div>
          <small class="text-muted text-uppercase font-weight-bold">Comments</small>
          <b-progress class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </div><!--/.col-->
    </div>
    <button @click="jump">Jump</button>
    <button @click="rcorp">Notity</button>
    <!--<vue-instagram token="1046700243.1677ed0.095aada488fa4761bba5a2cfc58a2c50" username="3p" :count="10">-->
    <!--<template slot="feeds" scope="props">-->
    <!--<li class="fancy-list"> {{ props.feed.link }} </li>-->
    <!--</template>-->
    <!--<template slot="error" scope="props">-->
    <!--<div class="fancy-alert"> {{ props.error.error_message }} </div>-->
    <!--</template>-->
    <!--</vue-instagram>-->
  </div>
</template>

<script>
  //  import VueInstagram from 'vue-instagram'
  export default {
    name: 'dashboard',
//    components: {
//      VueInstagram
//    },
    methods: {
      jump () {
        console.log('route')
        this.$router.push('login')
      },
      rcorp () {
        this.$notify({
          group: 'foo',
          title: 'Important message fooVelocity',
          text: 'Hello user! This is a notification!'
        })
      }
    }
  }
</script>
