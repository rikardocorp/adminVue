<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <!--<pre>{{ user }}</pre>-->
        <!--<breadcrumb :list="list"/>-->
        <div class="container-fluid newStyle">
          <!--<div class="container-fluid">-->
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
    <notifications group="foo"
                   position="top right"
                   animation-type="velocity"
                   :speed="500" :duration="3000" :max="5">
    </notifications>
  </div>
</template>

<script>
  import navADMIN from '../roles/_nav_ADMIN'
  import navPUNTOVENTA from '../roles/_nav_PUNTO_VENTA'
  import navVENDEDOR from '../roles/_nav_VENDEDOR'
  import navUSUARIO from '../roles/_nav_USUARIO'
  import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'

  const _user = JSON.parse(localStorage.getItem('UserLog'))
  const _ROLE = _user ? _user.authorities[0].authority : ''
  const nav = {
    'ROLE_ADMIN': navADMIN,
    'ROLE_PUNTO_VENTA': navPUNTOVENTA,
    'ROLE_VENDEDOR': navVENDEDOR,
    'ROLE_USUARIO': navUSUARIO
  }

  export default {
    name: 'full',
    components: {
      AppHeader,
      Sidebar,
      AppAside,
      AppFooter,
      Breadcrumb
    },
    data () {
      return {
        nav: {}
      }
    },
    computed: {
      name () {
        return this.$route.name
      },
      list () {
        return this.$route.matched
      },
      notification () {
        return this.$store.state.notification
      },
      user () {
        return this.$store.state.user
      }
    },
    watch: {
      notification (newVal, oldVal) {
        console.log('NOTIFICATION')
        console.log(newVal)
        console.log(oldVal)
        let type = ''
        let content = newVal.content.data
        if (content.success === true) {
          type = 'success'
        } else if (content.success === false) {
          type = 'error'
        } else if (content.success === null) {
          type = 'warn'
        }

        this.$notify({
          group: 'foo',
          title: 'Mensaje Importante',
          text: content.message,
          type: type
        })
      }
    },
    created () {
      let localRole = this.user.role ? this.user.role : _ROLE
      this.nav = nav[localRole].items
    }
  }
</script>

<style lang="scss">
  .vue-notification {
    border-radius: 0.55rem;
    border-left: none;
    box-shadow: 1px 1px 3px #3e3e3e;

    .notification-title{
      font-size: 1.1em;
    }
    .notification-content{
      font-size: 1.1em;
    }
  }

</style>
