<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <app-form :item="item" :update="update" :urlRest="urlRest" :horizontal="true" @emit_addRow="addRow"></app-form>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem" >
            <template slot="title">Tipos de Seguros</template>
            <!--<template slot="expense" >sddsd</template>-->
            <!--<template slot="enabled" >wewe</template>-->
          </app-table>
        </div><!--/.col-->
      </div><!--/.row-->
    </div>

    <b-modal :title="modalDetails.title" :class="'modal-'+ownClass" v-model="showModal">
      {{ modalDetails.data }}
      <template slot="modal-footer">
        <b-button @click="showModal = !showModal">Cancel</b-button>
        <b-button @click="deleteData" :variant="ownClass">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import {DATA as nDATA} from '../../data/dnInsuranceTypes'
  import Form from './forms/FormInsuranceTypes.vue'
  import Table from '../../components/xTable.vue'

  export default {
    name: 'insuranceTypes',
    components: {
      appForm: Form,
      appTable: Table
    },
    data: function () {
      return {
        urlRest: nDATA.name,
        item: JSON.parse(JSON.stringify(nDATA.post)),
        fields: JSON.parse(JSON.stringify(nDATA.fieldsTable)),
        items: [],
        update: false,
        indexSelected: null,
        btnOption: {editOpc: 'info', deleteOpc: 'danger'},

        // Modal
        modalDetails: { title: 'Eliminar Registro', data: 'Esta seguro de eliminar esto?' },
        showModal: false,
        action: '',
        ownClass: ''
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
      pickItem (item, type) {
        this.initData()
        this.indexSelected = this.$lodash.findIndex(this.items, item)
        console.log('INDEX SELECT')
        console.log(this.indexSelected)
        console.log(this.items)

        if (type === this.btnOption.editOpc) {
          this.item = {...this.item, ...item}
          this.update = true
        }

        if (type === this.btnOption.deleteOpc) {
          this.ownClass = type
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

<style>

</style>
