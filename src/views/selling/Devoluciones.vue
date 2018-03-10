<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <!--<pre>{{ itemPick }}</pre>-->
      <div class="row">
        <div class="col-12">
          <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem">
            <template slot="title">Lista de aseguradoras</template>
          </app-table>
        </div><!--/.col-->
      </div><!--/.row-->
    </div>

    <!--<b-modal id="saleDetail" centered size="lg" :title="optionPick.title" :class="'modal-'+optionPick.variant + ' col-md-10'" v-model="showModal">-->
      <!--<div v-if="optionPick.name === btnOption.showOpc.name">-->
        <!--<div class="text-center">-->
          <!--<h4><b-badge variant="primary" v-for="(el, index) in itemPick"><i class="fa fa-ticket"></i> {{index + 1}}</b-badge></h4>-->
        <!--</div>-->

        <!--<div v-if="itemPick.length === 0" class="text-center">No hay ventas, relacionadas</div>-->
        <!--<detail-sale v-if="itemPick.length >= 1" :item="itemPick[0]" :count="count"></detail-sale>-->

        <!--&lt;!&ndash;<div v-else>&ndash;&gt;-->
          <!--&lt;!&ndash;<pre>{{ itemPick.sales[0] }}</pre>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<pre>{{ itemPick.sales }}</pre>&ndash;&gt;-->
        <!--&lt;!&ndash;<detail-sale :item="itemPick.sales[0]"></detail-sale>&ndash;&gt;-->
      <!--</div>-->
      <!--<template slot="modal-footer">-->
        <!--<b-button @click="showModal = !showModal">Cancel</b-button>-->
        <!--&lt;!&ndash;<b-button v-if="optionPick.name === btnOption.deleteOpc.name" @click="deleteData" :variant="optionPick.variant">OK</b-button>&ndash;&gt;-->
      <!--</template>-->
    <!--</b-modal>-->

  </div>
</template>

<script>
  import {DATA as nDATA} from '../../data/dnDevoluciones'
  import Table from '../../components/xTable.vue'
  // import DetailSale from './DetailSaleDevoluciones.vue'

  export default {
    name: 'devoluciones',
    components: {
      appTable: Table,
      // DetailSale
    },
    data: function () {
      return {
        urlRest: 'culqi/charges',
        item: JSON.parse(JSON.stringify(nDATA.post)),
        fields: nDATA.fieldsTable,
        items: [],
        totalRows: 0,
        count: 0,
        btnOption: {
          // editOpc: {
          //   name: 'edit',
          //   variant: 'primary',
          //   selected: false,
          //   icon: 'fa fa-pencil'
          // },
          // showOpc: {
          //   name: 'show',
          //   title: 'Ventas',
          //   content: '',
          //   variant: 'primary',
          //   selected: false,
          //   icon: 'fa fa-eye'
          // }
        },
        itemPick: {},
        optionPick: {},
        showModal: null
      }
    },
    methods: {
      getData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        self.then((data) => {
          console.log(data)
          this.items = data.status ? data.content : []
          this.totalRows = this.items.length
        })
      },
      toggleDialog: function () {
        this.showModal = !this.showModal
      },
      pickItem (item, option) {
        // this.initData()
        this.itemPick = item.sales
        this.optionPick = option
        this.indexSelected = this.$lodash.findIndex(this.items, item)

        if (option.name === this.btnOption.showOpc.name) {
          this.item = {...this.item, ...item}
          console.log('##### this.itemPick')
          console.log(this.itemPick)
          // console.log(this.$refs.detailsale)
          this.toggleDialog()
          this.count = this.count + 1
          alert(this.count)
          // this.update = true
          // this.$scrollTo('body')
        }
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style scoped>

</style>
