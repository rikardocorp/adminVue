<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <!--<breadcrumb :list="list"/>-->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
    <notifications group="foo"
                   position="top right"
                   animation-type="velocity"
                   :speed="500" />
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'

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
      nav: nav.items
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
      console.log('ISLOADING')
      console.log(newVal)
      console.log(oldVal)
      this.$notify({
        group: 'foo',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      })
    }
  }
}
</script>
