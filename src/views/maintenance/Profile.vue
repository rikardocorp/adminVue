<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div id="profileDetail">
        <div class="col-md-12 m-auto">
          <!--<pre>{{userLocal}}</pre>-->
          <form-profile :item="userLocal" :urlRest="'sales'" @returnMain="returnMain"></form-profile>
        </div>
      </div>
      <!--<div v-if="isLoading" class="row d-flex justify-content-center pt-5 mt-5 pt-md-2">-->
        <!--<span class="fa-stack fa-2x">-->
          <!--<i class="fa fa-cog fa-spin-reverse fa-stack-2x text-orange"></i>-->
          <!--<i class="fa fa-cog fa-spin fa-stack-1x text-cream"></i>-->
        <!--</span>-->
      <!--</div>-->
    </div>
  </div>
</template>


<script>
  // import {DATA_FILTER as dataSale} from '../../data/dnSales'
  import formProfile from './forms/FormProfile.vue'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'webUser',
    components: {
      Avatar,
      formProfile
    },
    data: function () {
      return {
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
      }
    },
    watch: {
      user (newVal) {
        this.userLocal = JSON.parse(JSON.stringify(newVal))
      }
    },
    methods: {
      async getData (url) {
        console.log('GET SALE')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        console.log(self)
        return self.status ? self.content : null
      },
      selectedSale (item, isSale) {
        if (isSale) {
          this.selectedItem = item
        } else {
          this.selectedItemCart = item
        }
        this.isSale = isSale
      },
      isSearching (value) {
        this.params.isSearch = value
      },
      returnMain () {
        this.$router.push('/polizas-vendidas')
        this.isDetail = false
      }
    },
    created () {
      this.userLocal = JSON.parse(localStorage.getItem('UserLog')).user
      this.role = this.userLocal.role.role
    }
  }
</script>

<style lang="scss">

</style>
