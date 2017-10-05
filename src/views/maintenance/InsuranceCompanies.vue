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
          <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem">
            <template slot="title">Lista de aseguradoras</template>
          </app-table>
        </div><!--/.col-->
      </div><!--/.row-->
    </div>

    <b-modal :title="modalDetails.title" :class="'modal-'+ownClass" v-model="showModal">
      {{ modalDetails.data }}
      <upload-image :item="itemPick" :path="path" :multiple="false"></upload-image>
      <template slot="modal-footer">
        <b-button @click="showModal = !showModal">Cancel</b-button>
        <b-button @click="deleteData" :variant="ownClass">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import {DATA as nDATA} from '../../data/dnInsuranceCompanies'
  import Form from './forms/FormInsuranceCompanies.vue'
  import Table from '../../components/xTable.vue'
  import UploadImage from '../../components/UploadImage.vue'

  export default {
    name: 'useType',
    components: {
      appForm: Form,
      appTable: Table,
      UploadImage
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
          editOpc: 'info',
          deleteOpc: 'danger',
          uploadOpc: 'success'
        },

        // Modal
        modalDetails: { title: 'Eliminar Registro', data: 'Esta seguro de eliminar esto?' },
        showModal: false,
        action: '',
        ownClass: '',
        // Upload
        itemPick: {}
      }
    },
    methods: {
      addRow (newItem = '') {
        if (newItem) {
          if (!this.update) {
            alert('insert')
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
        this.itemPick = item
        this.indexSelected = this.$lodash.findIndex(this.items, item)
        console.log('INDEX SELECT')
        console.log(item)
        console.log(this.indexSelected)
        console.log(this.items)

        if (type === this.btnOption.uploadOpc) {
          // this.item = {...this.item, ...item}
          // this.update = true
          this.ownClass = type
          this.toggleDialog()
          // alert(item)
        }

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
      },
      path () {
        return this.$store.state.Login.IMAGES_URL
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style lang="scss">
</style>
