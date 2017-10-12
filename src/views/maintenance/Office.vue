<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7 col-lg-5">
          <app-form :item="item" :update="update" :urlRest="urlRest" :horizontal="true" @emit_addRow="addRow"></app-form>
        </div>
      </div>

      <!--<pre>{{ item }}</pre>-->
      <div class="row">
        <div class="col-12">
          <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem" >
            <template slot="title">Locales de Venta</template>
          </app-table>
        </div><!--/.col-->
      </div><!--/.row-->
    </div>

    <b-modal :title="optionPick.title" :class="'modal-'+optionPick.variant" v-model="showModal">
      <div v-if="optionPick.name === btnOption.deleteOpc.name">{{ optionPick.content }}</div>
      <template slot="modal-footer">
        <b-button @click="showModal = !showModal">Cancel</b-button>
        <b-button v-if="optionPick.name === btnOption.deleteOpc.name" @click="deleteData" :variant="optionPick.variant">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import {DATA as nDATA} from '../../data/dnOffices'
  import Form from './forms/FormOffice.vue'
  import Table from '../../components/xTable.vue'

  export default {
    name: 'useType',
    components: {
      appForm: Form,
      appTable: Table
    },
    data: function () {
      return {
        urlRest: nDATA.name,
        item: JSON.parse(JSON.stringify(nDATA.post)),
        fields: nDATA.fieldsTable,
        items: [],
        update: false,
        indexSelected: null,
        btnOption: {
          editOpc: {
            name: 'edit',
            variant: 'primary',
            selected: false,
            icon: 'fa fa-pencil'
          },
          deleteOpc: {
            name: 'delete',
            title: 'Eliminar registro',
            content: 'Esta seguro de eliminar esto?',
            variant: 'danger',
            selected: false,
            icon: 'fa fa-trash'
          }
        },
        itemPick: {},
        optionPick: {},
        showModal: false
      }
    },
    methods: {
      addRow (newItem = '') {
        if (newItem) {
          if (!this.update) {
            this.items.unshift(newItem)
          } else {
            this.items.splice(this.indexSelected, 1, newItem)
          }
        }
        this.initData()
      },
      initData () {
        this.update = false
        this.item = JSON.parse(JSON.stringify(nDATA.post))
        this.indexSelected = null
      },
      getData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        self.then((data) => {
          console.log(data)
          this.items = data.status ? data.content : []
          this.totalRows = this.items.length
        })
      },
      deleteData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: this.urlRest + '/' + this.items[this.indexSelected].id})
        self.then((data) => {
          console.log(data.content)
          if (data.status) {
            this.items.splice(this.indexSelected, 1)
            this.toggleDialog()
            this.initData()
          }
        })
      },
      toggleDialog: function () {
        this.showModal = !this.showModal
      },
      pickItem (item, option) {
        this.initData()
        this.itemPick = item
        this.optionPick = option
        this.indexSelected = this.$lodash.findIndex(this.items, item)

        if (option.name === this.btnOption.editOpc.name) {
          this.item = {...this.item, ...item}
          this.update = true
          this.$scrollTo('body')
        } else {
          this.toggleDialog()
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

<style lang="scss">

</style>
