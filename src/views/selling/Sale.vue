<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div v-show="!isLoading || !flag" id="saleDetail">
        <div v-show="isSale"  class="col-md-12 m-auto">
          <detail-sale :item="selectedItem" :urlRest="'sales'" @returnMain="returnMain"></detail-sale>
        </div>

        <div v-show="!isSale"  class="col-md-12 m-auto">
          <detail-cart-sale :item="selectedItemCart" :urlRest="'sales'" @returnMain="returnMain"></detail-cart-sale>
        </div>
      </div>

      <div v-if="isLoading && flag" class="row d-flex justify-content-center pt-5 mt-5 pt-md-2">
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
  import DetailCartSale from './DetailCartSale.vue'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'webUser',
    components: {
      //appForm: Form,
      Avatar,
      DetailSale,
      DetailCartSale
    },
    data: function () {
      return {
        nameForm1: dataSale.name,
        itemForm1: JSON.parse(JSON.stringify(dataSale.post)),
        update: false,
        selectedItem: {},
        selectedItemCart: {},
        selectedMyCart: {},
        isSale: false,
        type: null,
        flag: true
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
      isSearching (value) {
        this.params.isSearch = value
      },
      returnMain () {
        this.$router.push('/polizas-vendidas')
        this.isDetail = false
      },
      async initData () {
        this.flag = false
        console.log('INIT DATA')
        let data = {}
        if (this.$route.params.idSale !== undefined) {
          let url = ''
          if (this.$route.params.type == 0) {
            url = 'sales?cartId=' + this.$route.params.idSale
            data = await this.getData(url)
            data[0]['insuranceCompany'] = data[0].cart.insuranceCompany
            console.log('CART')
            console.log(data[0])
            this.selectedItemCart = data[0]
            this.isSale = false
            console.log('his.selectedItemCart')
            console.log(this.selectedItemCart)
          } else {
            url = 'sales/' + this.$route.params.idSale
            data = await this.getData(url)
            console.log('SALES')
            console.log(data)
            this.selectedItem = data
            this.isSale = true
            console.log('his.selectedItem')
            console.log(this.selectedItem)
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
