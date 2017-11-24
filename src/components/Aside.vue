<template>
  <aside class="aside-menu">
    <b-tabs>
      <b-tab title="<i class='icon-user'></i>" class="tab-cars-sales">
        <Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">
          <small><b>Datos del Usuario</b></small>
        </Callout>
        <hr class="transparent mx-3 my-0">
        <Callout variant="warning" class="m-0 py-3 text-center">
          <avatar :username="fullName" :rounded="true" :size="7.5" sizeUnid="em"
                  :border="true" colorBorder="#f4f3ef" color="#ecedef"
                  backgroundColor="orange" :sizeBorder="0.5"></avatar>
          <br>
          <div><strong>{{ role }}</strong></div>
          <div>{{ fullName }}</div>
          <small class="text-muted mr-3"><i class="icon-envelope"></i>&nbsp; {{ userLocal.email }}</small> <br>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; {{ location }} </small> <br>
          <small class="text-muted"><i class="icon-phone"></i>&nbsp; {{ userLocal.cellPhone }} </small> <br> <br>
          <b-button :size="'sm'" :variant="''" class="text-white" @click="routePerfil">Editar Perfil</b-button>
        </Callout>
        <hr class="mx-3 my-0">

        <div v-if="!isClient">
          <Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">
            <small><b>Oficina</b></small>
          </Callout>
          <hr class="transparent mx-3 my-0">
          <Callout variant="info" class="m-0 py-3 text-center">
            <div><strong>{{ userLocal.office ? userLocal.office.officeType.description : '' }}</strong></div>
            <div>{{ userLocal.office ? userLocal.office.description : '' }}</div>
            <small class="text-muted mr-3"><i class="icon-directions"></i>&nbsp; {{ userLocal.office ? userLocal.office.address : '' }}</small> <br>
            <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; {{ locationOffice }} </small> <br>
            <small class="text-muted"><i class="icon-phone"></i>&nbsp; {{ userLocal.phone }} </small>
          </Callout>
          <hr class="mx-3 my-0">
        </div>
        <!--<pre>{{ userLocal}}</pre>-->
      </b-tab>

      <b-tab v-if="!isClient" title="<i class='fa fa-car'></i>" @click="getSalesCart" class="tab-cars-sales">
        <!--<pre>{{ listSaleCart }}</pre>-->
        <Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">
          <small><b>Solicitudes de Venta</b></small>
        </Callout>
        <hr class="transparent mx-3 my-0">

        <div v-for="x in listSaleCart" @click="routerToSaleCart(x.id)" class="item-tab-car-sale">
          <Callout variant="warning" class="m-0 py-3">
            <div class="avatar float-right">
              <img :src="path + '/' + x.insuranceCompany.image" class="img-avatar" :alt="x.insuranceCompany.name">
            </div>
            <div>{{ x.purchaser.razonSocial }}<strong>{{ x.dniRuc }}</strong></div>
            <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; {{ x.date }}</small> <br>
            <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; {{ x.region.name }} </small>
          </Callout>
          <hr class="mx-3 my-0">
        </div>
        <Callout v-if="listSaleCart.length==0" variant="warning" class="m-0 py-3">
          <br>
          <div class="text-center" style="opacity: 0.55">No hya solicitudes de ventas <strong>mobiles</strong></div>
          <br>
        </Callout>

        <!--<Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">-->
          <!--<small><b>Tomorrow</b></small>-->
        <!--</Callout>-->
        <!--<hr class="transparent mx-3 my-0">-->
        <!--<Callout variant="danger" class="m-0 py-3">-->
          <!--<div>New UI Project - <strong>deadline</strong></div>-->
          <!--<small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 10 - 11pm</small>-->
          <!--<small class="text-muted"><i class="icon-home"></i>&nbsp; creativeLabs HQ </small>-->
          <!--<div class="avatars-stack mt-2">-->
            <!--<div class="avatar avatar-xs">-->
              <!--<img src="static/img/avatars/2.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
            <!--</div>-->
            <!--<div class="avatar avatar-xs">-->
              <!--<img src="static/img/avatars/3.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
            <!--</div>-->
            <!--<div class="avatar avatar-xs">-->
              <!--<img src="static/img/avatars/4.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
            <!--</div>-->
            <!--<div class="avatar avatar-xs">-->
              <!--<img src="static/img/avatars/5.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
            <!--</div>-->
            <!--<div class="avatar avatar-xs">-->
              <!--<img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
            <!--</div>-->
          <!--</div>-->
        <!--</Callout>-->
        <!--<hr class="mx-3 my-0">-->
      </b-tab>


      <!--<b-tab title="<i class='icon-speech'></i>">-->
        <!--<div class="p-3">-->
          <!--<div class="message">-->
            <!--<div class="py-3 pb-5 mr-3 float-left">-->
              <!--<div class="avatar">-->
                <!--<img src="static/img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
                <!--<span class="avatar-status badge-success"></span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<small class="text-muted">Lukasz Holeczek</small>-->
              <!--<small class="text-muted float-right mt-1">1:52 PM</small>-->
            <!--</div>-->
            <!--<div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>-->
            <!--<small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>-->
          <!--</div>-->
          <!--<hr>-->
          <!--<div class="message">-->
            <!--<div class="py-3 pb-5 mr-3 float-left">-->
              <!--<div class="avatar">-->
                <!--<img src="static/img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
                <!--<span class="avatar-status badge-success"></span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<small class="text-muted">Lukasz Holeczek</small>-->
              <!--<small class="text-muted float-right mt-1">1:52 PM</small>-->
            <!--</div>-->
            <!--<div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>-->
            <!--<small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>-->
          <!--</div>-->
          <!--<hr>-->
          <!--<div class="message">-->
            <!--<div class="py-3 pb-5 mr-3 float-left">-->
              <!--<div class="avatar">-->
                <!--<img src="static/img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
                <!--<span class="avatar-status badge-success"></span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<small class="text-muted">Lukasz Holeczek</small>-->
              <!--<small class="text-muted float-right mt-1">1:52 PM</small>-->
            <!--</div>-->
            <!--<div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>-->
            <!--<small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>-->
          <!--</div>-->
          <!--<hr>-->
          <!--<div class="message">-->
            <!--<div class="py-3 pb-5 mr-3 float-left">-->
              <!--<div class="avatar">-->
                <!--<img src="static/img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
                <!--<span class="avatar-status badge-success"></span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<small class="text-muted">Lukasz Holeczek</small>-->
              <!--<small class="text-muted float-right mt-1">1:52 PM</small>-->
            <!--</div>-->
            <!--<div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>-->
            <!--<small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>-->
          <!--</div>-->
          <!--<hr>-->
          <!--<div class="message">-->
            <!--<div class="py-3 pb-5 mr-3 float-left">-->
              <!--<div class="avatar">-->
                <!--<img src="static/img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
                <!--<span class="avatar-status badge-success"></span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<small class="text-muted">Lukasz Holeczek</small>-->
              <!--<small class="text-muted float-right mt-1">1:52 PM</small>-->
            <!--</div>-->
            <!--<div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>-->
            <!--<small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>-->
          <!--</div>-->
        <!--</div>-->
      <!--</b-tab>-->
      <!--<b-tab title="<i class='icon-settings'></i>">-->
        <!--<div class="p-3">-->
          <!--<h6>Settings</h6>-->
          <!--<div class="aside-options">-->
            <!--<div class="clearfix mt-4">-->
              <!--<small><b>Option 1</b></small>-->
              <!--<c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right" :checked="true"/>-->
            <!--</div>-->
            <!--<div>-->
              <!--<small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="aside-options">-->
            <!--<div class="clearfix mt-3">-->
              <!--<small><b>Option 2</b></small>-->
              <!--<c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right"/>-->
            <!--</div>-->
            <!--<div>-->
              <!--<small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="aside-options">-->
            <!--<div class="clearfix mt-3">-->
              <!--<small><b>Option 3</b></small>-->
              <!--<c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right"/>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="aside-options">-->
            <!--<div class="clearfix mt-3">-->
              <!--<small><b>Option 4</b></small>-->
              <!--<c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right" :checked="true"/>-->
            <!--</div>-->
          <!--</div>-->
          <!--<hr>-->
          <!--<h6>System Utilization</h6>-->
          <!--<div class="text-uppercase mb-1 mt-4"><small><b>CPU Usage</b></small></div>-->
          <!--<b-progress class="progress-xs" variant="info" :value="25"></b-progress>-->
          <!--<small class="text-muted">348 Processes. 1/4 Cores.</small>-->
          <!--<div class="text-uppercase mb-1 mt-2"><small><b>Memory Usage</b></small></div>-->
          <!--<b-progress class="progress-xs" variant="warning" :value="70"></b-progress>-->
          <!--<small class="text-muted">11444GB/16384MB</small>-->
          <!--<div class="text-uppercase mb-1 mt-2"><small><b>SSD 1 Usage</b></small></div>-->
          <!--<b-progress class="progress-xs" variant="danger" :value="95"></b-progress>-->
          <!--<small class="text-muted">243GB/256GB</small>-->
          <!--<div class="text-uppercase mb-1 mt-2"><small><b>SSD 2 Usage</b></small></div>-->
          <!--<b-progress class="progress-xs" variant="success" :value="10"></b-progress>-->
          <!--<small class="text-muted">25GB/256GB</small>-->
        <!--</div>-->
      <!--</b-tab>-->
    </b-tabs>

    <!--<router-link tag="li" to="/mantenimiento/usuarios">-->
      <!--<a>/foo</a>-->
    <!--</router-link>-->
    <!--this.$router.push({ path: 'polizas-vendidas' })-->
  </aside>
</template>

<script>
  import Callout from './Callout'
  import cSwitch from './Switch'
  import Avatar from './Avatar.vue'

  export default {
    name: 'aside',
    components: {
      Callout,
      cSwitch,
      Avatar
    },
    data () {
      return {
        listSaleCart: [],
        userLocal: {},
        role: ''
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      user () {
        return this.$store.state.user.data
      },
      fullName () {
        return this.userLocal.firstName + ' ' + this.userLocal.lastName
      },
      location () {
        return this.userLocal.departamento !== null ? this.userLocal.departamento + ', ' + this.userLocal.provincia + ', ' + this.userLocal.distrito : '-'
      },
      locationOffice () {
        if (this.userLocal.office) {
          return this.userLocal.office.region.name + ', ' + this.userLocal.office.province.name + ', ' + this.userLocal.office.city.name
        } else {
          return ''
        }
      },
      isClient () {
        return this.$store.state.user.isClient
      }
    },
    watch: {
      user (newVal) {
        this.userLocal = JSON.parse(JSON.stringify(newVal))
      }
    },
    methods: {
      routePerfil () {
        this.$router.push({name: 'PerfilUsuario'})
      },
      routerToSaleCart (id) {
        this.$router.push({name: 'VentasId', params: { idSale: id, type: 0 }})
//        this.$router.push('/polizas-vendidas/' + id + '/0')
      },
      async getData (url) {
        console.log('GET SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        console.log(self)
        return self.status ? self.content : null
      },
      async getSalesCart () {
        this.listSaleCart = await this.getData('carts?state=1')
        console.log(this.listSaleCart)
      }
    },
    created () {
      this.userLocal = JSON.parse(localStorage.getItem('UserLog')).user
      this.role = this.userLocal.role.role
    }
  }
</script>

<style lang="scss">
  .aside-menu{
    .tabs ul li {
      a{
        border-radius: 0;
      }
    }
    .callout{
      border-radius: 0;
    }
  }

  .tab-cars-sales{
    .item-tab-car-sale{
      cursor: pointer;
    }
  }
</style>
