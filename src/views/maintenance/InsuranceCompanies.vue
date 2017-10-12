<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6 col-lg-5">
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

    <b-modal :title="optionPick.title" :class="'modal-'+optionPick.variant" v-model="showModal">
      <div v-if="optionPick.name === btnOption.deleteOpc.name">{{ optionPick.content }}</div>
      <div v-if="optionPick.name === btnOption.uploadOpc.name" class="upload-content">
        <h4 class="text-center text-uppercase">{{ itemPick.name }}</h4>
        <div class="d-flex justify-content-center">
          <ul class="list-unstyled">
            <li>
              <img :src="path + '/' + itemPick.image" :alt="itemPick.name" class="img-responsive img-thumbnail">
            </li>
          </ul>
        </div>
        <upload-image-simple
          :item="itemPick"
          :path="path"
          :multiple="false" @emitCallback="uploadCallBack"></upload-image-simple>
      </div>
      <template slot="modal-footer">
        <b-button :disabled="isLoading" @click="showModal = !showModal">Cancel</b-button>
        <b-button :disabled="isLoading" v-if="optionPick.name === btnOption.deleteOpc.name" @click="deleteData" :variant="optionPick.variant">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import {DATA as nDATA} from '../../data/dnInsuranceCompanies'
  import Form from './forms/FormInsuranceCompanies.vue'
  import Table from '../../components/xTable.vue'
  import UploadImageSimple from '../../components/UploadImageSimple.vue'

  export default {
    name: 'useType',
    components: {
      appForm: Form,
      appTable: Table,
      UploadImageSimple
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
          uploadOpc: {
            name: 'upload',
            title: 'Subir una Imagen',
            content: '',
            variant: 'success',
            selected: false,
            icon: 'fa fa-picture-o'
          },
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
      uploadCallBack (value) {
        this.itemPick.image = value.image
      },
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
        if (this.optionPick.name !== this.btnOption.deleteOpc.name) return false
        alert('delete')
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
  .upload-content{
    img{
      max-width: 250px;
      max-height: 200px;
    }
  }
</style>
