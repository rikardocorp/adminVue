<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <!--<pre>{{ $store.state.Login.LOAD_TABLE.roles }}</pre>-->
        <!--<pre>{{ $store.state.Login.LOAD_TABLE.regions }}</pre>-->
        <div class="col-md-8">
          <!--<app-form v-model="items" :item="item" :pickObject="pickObject" :horizontal="true" :urlRest="urlRest" @isSearching="isSearching"></app-form>-->
          <app-form :item="itemForm1" :nameForm="nameForm1" :horizontal="true"
                    @defaulValue="defaulValueForm1" @resultFilter="resultFilter"></app-form>
        </div>
        <div class="col-md-4">
          <!--<app-form v-model="items" :item="item" :pickObject="pickObject" :horizontal="true" :urlRest="urlRest" @isSearching="isSearching"></app-form>-->
          <app-form2 :item="itemForm2" :nameForm="nameForm2"  :horizontal="false" @defaulValue="defaulValueForm2"></app-form2>
        </div>
      </div>

      <!--<pre>{{ itemForm2}}</pre>-->
      <div class="container-fluid">
        <!-- SEARCH ICON  -->
        <div v-if="isSearch" class="row d-flex justify-content-center pt-4 mt-2 pt-md-2">
            <span class="fa-stack fa-2x">
              <i class="fa fa-cog fa-spin-reverse fa-stack-2x text-orange"></i>
              <i class="fa fa-cog fa-spin fa-stack-1x text-cream"></i>
            </span>
        </div>
        <div v-else-if="items.length==0" class="row d-flex justify-content-center pt-5 mt-4">
            <span class="h3" style="opacity: 0.35">
              <i class="fa fa-search fa-5x text-orange fa-flip-horizontal" aria-hidden="true"></i>
            </span>
        </div>

        <!--ALL POLICIES -->
        <div v-if="items.length" class="card-insurance row d-flex justify-content-center pt-3">
          <div v-for="(x, index) in items" :key="x.id"  :class="{'ticket cardWrap m-2 mb-3 hvr-bounce-in':true, 'pickOption': x.pick}" @click="selectedPolice(x)">
            <i class="fa fa-thumb-tack" aria-hidden="true"></i>
            <div class="card-ticket cardLeft">
              <avatar :username="x.insuranceCompany.name" :rounded="true" :size="6.4" sizeUnid="em"
                      :src="'/static/img/company/' + x.insuranceCompany.id + '.png'"
                      :border="true" colorBorder="#f4f3ef" color="#ecedef"
                      backgroundColor="orange" :sizeBorder="0.5"></avatar>
            </div>
            <div class="card-ticket cardCenter dashed">
              <div class="xtitle">
                {{ x.insuranceCompany.name }}
              </div>
              <div class="xcontent">
                <div class="title">
                  <h2 class="big"># {{ x.number }}</h2>
                  <span>Numero Poliza</span>
                </div>
                <div class="seat">
                  <h2>{{ x.user.id ? x.user.firstName + ' ' + x.user.lastName : 'LIBRE'   }}</h2>
                  <span>Usuario</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--/.col-->

    </div>
  </div>
</template>


<script>
  import {DATA as nDATA} from '../../data/dnInsurancePolicies'
  import {DATA as dataPolicy, DATA_USER as dataUser} from '../../data/dnPolicyAssign'
  import Form from './forms/FormPolicyAssign.vue'
  import Form2 from './forms/FormPolicyAssign2.vue'
  import Avatar from '../../components/Avatar.vue'

  export default {
    name: 'webUser',
    components: {
      appForm: Form,
      appForm2: Form2,
      Avatar
    },
    data: function () {
      return {
        // pick policy
        urlRest: nDATA.name,
        item: JSON.parse(JSON.stringify(nDATA.post)),

        nameForm1: dataPolicy.name,
        itemForm1: JSON.parse(JSON.stringify(dataPolicy.post)),
        nameForm2: dataUser.name,
        itemForm2: JSON.parse(JSON.stringify(dataUser.post)),

        items: [],
        update: false,
        isSearch: false,
        selected: null,
        selectedList: {}
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      defaulValueForm1 () {
        this.itemForm1 = JSON.parse(JSON.stringify(dataPolicy.post))
      },
      defaulValueForm2 () {
        this.itemForm2 = JSON.parse(JSON.stringify(dataUser.post))
      },
      resultFilter (items) {
        console.log(items)
        alert('12')
        this.selectedList = {}
        this.items = items
      },
      pickItem (item, type) {
        this.initData()
        this.indexSelected = this.$lodash.findIndex(this.items, item)
        console.log('INDEX SELECT')
        console.log(this.update)
        if (type === this.btnOption.editOpc) {
          console.log('INDEX update')
          this.item = {...this.item, ...item}
          this.update = true
        }

        if (type === this.btnOption.deleteOpc) {
          this.ownClass = type
          this.toggleDialog()
        }
      },

      selectedAll (value = true) {
        let policy = ''
        let vm = this
        if (value) {
          this.items.forEach(function (item, index) {
            policy = {id: item.id}
            vm.$set(item, 'pick', true)
            vm.$set(vm.selectedList, item.id, policy)
            console.log(item, index)
          })
        } else {
          this.items.forEach(function (item, index) {
            policy = {id: item.id}
            vm.$set(item, 'pick', false)
            vm.$delete(vm.selectedList, item.id)
            console.log(item, index)
          })
        }
      },
      selectedPolice (item) {
        let value = null
        this.selected = item
        let policy = {id: item.id}
        if (item.pick) {
          value = false
          this.$delete(this.selectedList, item.id)
        } else {
          value = true
          this.$set(this.selectedList, item.id, policy)
        }
        this.$set(item, 'pick', value)
      },
      async getAll () {
        console.log('GET POLICIS')
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        if (!self.status) return true
        this.items = self.content
        console.log(this.items)
        this.isSearch = false
      },
      isSearching (value) {
        this.isSearch = value
      }
    },
    watch: {
      'itemForm2.extra': function (newVal) {
        let value = newVal === '0'
        this.selectedAll(value)
      }
    },
    created () {
      this.isSearch = true
      this.getAll()
    }
  }
</script>

<style lang="scss" scoped="">
  .ticket {
    width: 18em;
    cursor: pointer;
    font-size: 0.85em;
    i {
      display: none;
    }
  }

  .pickOption{
    transform: rotateZ(2deg) rotateY(-0.3deg);
    /*.avatar{*/
      /*<!--transform: rotateZ(-3deg);-->*/
    /*}*/
    .cardCenter {
      border: 2px solid rgb(255, 165, 1);
    }
    i {
      position: absolute;
      color: #3db3e8;
      font-size: 2.3em;
      transform: rotate(23deg);
      bottom: 0.4em;
      left: 6.7em;
      z-index: 2;
      display: block;
    }
  }

  .card-insurance {
    .avatar {
      position: absolute;
    }
  }
</style>
