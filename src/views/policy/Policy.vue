<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-5 col-lg-5 col-sm-8">
          <transition-group name="fade" mode="out-in">
            <app-form key="div1" v-if="!switchForm" :item="item" :update="update"
                      :urlRest="urlRest" :horizontal="true" :switchForm="switchFormChange"
                      @emit_addRow="addRow"></app-form>
            <app-form-2 key="div2" v-if="switchForm" :item="item2" :update="update"
                        :urlRest="urlRest2" :horizontal="true" :switchForm="switchFormChange"
                        @emit_addRow="addRow"></app-form-2>
          </transition-group>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem" >
            <template slot="title">Polizas Ingresadas</template>
          </app-table>
        </div><!--/.col-->
      </div><!--/.row-->
    </div>
    <!--<pre>{{ item }}</pre>-->
    <!--<button @click="update=!update">UPDATE</button>-->
    <!--<pre>{{item}}</pre>-->

    <b-modal :title="optionPick.title" :class="'modal-'+optionPick.variant" v-model="showModal">
      <div v-if="optionPick.name === btnOption.deleteOpc.name">{{ optionPick.content }}</div>
      <template slot="modal-footer">
        <b-button :disabled="isLoading" @click="showModal = !showModal">Cancel</b-button>
        <b-button :disabled="isLoading" v-if="optionPick.name === btnOption.deleteOpc.name" @click="deleteData" :variant="optionPick.variant">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import {DATA as nDATA} from '../../data/dnInsurancePolicies'
  import {DATA as nDATA2} from '../../data/dnPolicyRegister'
  import Form from './forms/FormPolicy.vue'
  import Form2 from './forms/FormPolicyRegister.vue'
  import Table from '../../components/xTable.vue'

  export default {
    name: 'webUser',
    components: {
      appForm: Form,
      appForm2: Form2,
      appTable: Table
    },
    data: function () {
      return {
        urlRest2: nDATA2.name,
        item2: JSON.parse(JSON.stringify(nDATA2.post)),

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
        showModal: false,
        switchForm: false
      }
    },
    methods: {
      switchFormChange () {
        this.switchForm = !this.switchForm
        this.initData()
      },
      addRow (newItem = '') {
        if (newItem) {
          if (!this.update) {
            if (Array.isArray(newItem)) {
              this.getData()
            } else {
              this.items.unshift(newItem)
            }
          } else {
            this.items.splice(this.indexSelected, 1, newItem)
          }
        }
        this.initData()
      },
      initData () {
        this.update = false
        this.item = JSON.parse(JSON.stringify(nDATA.post))
        this.item2 = JSON.parse(JSON.stringify(nDATA2.post))
        this.indexSelected = null
      },
      getData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        self.then((data) => {
          console.log('LOAD DATATABLE')
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
        console.log(item)
        this.itemPick = item
        this.optionPick = option
        this.indexSelected = this.$lodash.findIndex(this.items, item)

        if (option.name === this.btnOption.editOpc.name) {
          this.item = {...this.item, ...item}
          this.update = true
          this.switchForm = false
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

<style>

</style>

