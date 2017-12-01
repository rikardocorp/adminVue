<template>
    <header class="app-header navbar" v-show="!$store.state.fullscreen">
      <div class="progress-line" v-if="isLoading"></div>
      <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
      <b-link class="navbar-brand" to="#"></b-link>
      <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarMinimize">&#9776;</button>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <avatar class="avatar-header" :username="username" :rounded="true" :size="3.1" sizeUnid="em"
                    :alt="user.data.email" :border="true" :localSrc="false" color="#ecedef" backgroundColor="orange"
                    :sizeBorder="0.2"></avatar>
            <!--<avatar :username="user.data.firstName + ' ' + user.data.lastName" :rounded="true" :size="6.4" sizeUnid="em"-->
                    <!--:alt="user.data.email" :border="true" colorBorder="#f4f3ef" color="#ecedef" :localSrc="false"-->
                    <!--backgroundColor="orange" :sizeBorder="0.5"></avatar>-->
            <!--<img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">-->
            <span class="d-md-down-none">{{ username }}</span>
          </template>
          <b-dropdown-header tag="div" class="text-center"><strong>Cuenta</strong></b-dropdown-header>
          <!--<b-dropdown-item><i class="fa fa-bell-o"></i> Updates<span class="badge badge-info">42</span></b-dropdown-item>-->
          <!--<b-dropdown-item><i class="fa fa-envelope-o"></i> Messages<span class="badge badge-success">42</span></b-dropdown-item>-->
          <!--<b-dropdown-item><i class="fa fa-tasks"></i> Tasks<span class="badge badge-danger">42</span></b-dropdown-item>-->
          <!--<b-dropdown-item><i class="fa fa-comments"></i> Comments<span class="badge badge-warning">42</span></b-dropdown-item>-->
          <!--<b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>-->
          <!--<b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>-->
          <!--<b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>-->
          <!--<b-dropdown-item><i class="fa fa-usd"></i> Payments<span class="badge badge-default">42</span></b-dropdown-item>-->
          <!--<b-dropdown-item><i class="fa fa-file"></i> Projects<span class="badge badge-primary">42</span></b-dropdown-item>-->
          <!--<b-dropdown-divider></b-dropdown-divider>-->
          <!--<b-dropdown-item><i class="fa fa-shield"></i> Lock Account</b-dropdown-item>-->
          <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Salir</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <button v-if="!isClient" class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">&#9776;</button>
    </header>
</template>
<script>
  import Avatar from '../components/Avatar.vue'

  export default {
    name: 'header',
    components: {
      Avatar
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      user () {
        return this.$store.state.user
      },
      username () {
        let firtName = this.user.data.firstName ? this.user.data.firstName : ''
        let lastName = this.user.data.lastName ? this.user.data.lastName : ''
        return firtName + ' ' + lastName
      },
      isClient () {
        return this.$store.state.user.isClient
      }
    },
    methods: {
      sidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
      },
      sidebarMinimize (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
        if (!document.body.classList.contains('aside-menu-hidden')) {
          document.body.classList.toggle('aside-menu-hidden')
        }
      },
      mobileSidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
      },
      asideToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('aside-menu-hidden')
        if (!document.body.classList.contains('sidebar-minimized')) {
          document.body.classList.toggle('sidebar-minimized')
        }
      },
      logout () {
        console.log('Exit')
        this.$store.commit('logout')
      }
    }
  }
</script>

<style>
  .navbar-brand{
    /*background-image: url('../../../static/img/logo2.png');*/
  }
</style>

<style lang="scss">
  .avatar-header{
    display: inline;
    margin: 0 5px;
  }

  header,
  .navbar-brand{
    /*overflow: hidden;*/
    /*background-image: url(../../../static/img/logo2.86aa719.png);*/
    /*background-image: url('../../static/img/logo2.png');*/
    border-bottom: 1px solid #e0e0e0 !important;
  }

  button.navbar-toggler{
    box-shadow: none;
    outline: none;
  }

  .progress-line, .progress-line:before, .progress-line:after {
    height: 3px;
    width: 100%;
    margin: 0;
    position: absolute;
    z-index: 1;
    top: 0;

  }
  .progress-line {
    background-color: #ef7b1f;
    display: -webkit-flex;
    display: flex;
  }
  .progress-line:before {
    background-color: #21a8d8;
    content: '';
    -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  /*.progress-line:after {*/
  /*background-color: rgb(33, 33, 32);*/
  /*content: '';*/
  /*-webkit-animation: running-progress 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;*/
  /*animation: running-progress 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;*/
  /*}*/
  @-webkit-keyframes running-progress {
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }
  }
  @keyframes running-progress {
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }
  }
</style>
