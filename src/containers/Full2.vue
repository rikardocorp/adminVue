<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <!--<breadcrumb :list="list"/>-->
        <div class="container-fluid newStyle">
          <pre>iuwefihwuuifhwf</pre>
          <pre> {{ nav }}</pre>
          <pre>iuwefihwuuifhwf</pre>
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
                   :speed="500" :duration="3000">
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
        nav: navADMIN
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
          title: 'Important message',
          text: content.message,
          type: type
        })
      }
    }
  }
</script>

<style lang="scss">
  .vue-notification {
    border-radius: 0.55rem;
    border-left: none;
    box-shadow: 1px 1px 3px #3e3e3e;
  }

</style>
