<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div id="saleDetail" v-show="!isLoading">
        <div v-show="type==0"  class="col-md-12 m-auto">
          <detail-cart :item="selectedItemCart" :urlRest="'sales'" @returnMain="returnMain"></detail-cart>
        </div>
        <div v-show="type==1"  class="col-md-12 m-auto">
          <detail-sale :item="selectedItem" :urlRest="'sales'" @returnMain="returnMain"></detail-sale>
        </div>
      </div>
      <div v-if="isLoading" class="row d-flex justify-content-center pt-5 mt-5 pt-md-2">
        <span class="fa-stack fa-2x">
          <i class="fa fa-cog fa-spin-reverse fa-stack-2x text-orange"></i>
          <i class="fa fa-cog fa-spin fa-stack-1x text-cream"></i>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
  // import {DATA as nDATA} from '../../data/dnInsurancePolicies'
  import {DATA_FILTER as dataSale} from '../../data/dnSales'
  // import Form from './forms/FormSales.vue'
  import DetailSale from './DetailSale.vue'
  import DetailCart from './DetailCart.vue'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'webUser',
    components: {
      //appForm: Form,
      Avatar,
      DetailSale,
      DetailCart
    },
    data: function () {
      return {
        nameForm1: dataSale.name,
        itemForm1: JSON.parse(JSON.stringify(dataSale.post)),
        update: false,
        selectedItem: {},
        selectedItemCart: {},
        isSale: false,
        type: null
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      },
      load () {
        return this.$route.params.idSale
      }
    },
    watch: {
      load (newVal) {
        this.initData()
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
      },
      async initData () {
        if (this.$route.params.idSale !== undefined) {
          let url = ''
          let localType = null
          if (this.$route.params.type == 0) {
            url = 'carts/' + this.$route.params.idSale
            localType = 0
          } else {
            url = 'sales/' + this.$route.params.idSale
            localType = 1
          }

          let saleCart = await this.getData(url)
          this.type = localType
          if (saleCart) {
            this.selectedSale(saleCart, saleCart.insurancePolicy !== undefined)
          } else {
            this.$router.push('/polizas-vendidas')
          }
        }
      }
    },
    mounted () {
      this.initData()
    }
  }
</script>

<style lang="scss">

</style>
