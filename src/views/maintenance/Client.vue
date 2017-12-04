<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7 col-lg-6 col-xl-5">
          <app-form :item="item" :update="update" :urlRest="urlRest" :horizontal="true" @emit_addRow="addRow"></app-form>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <app-table :fields="fields" :items="items" :btnOption="btnOption" @pickItem="pickItem" >
            <template slot="title">Lista de Clientes del Sistema</template>
          </app-table>
        </div><!--/.col-->
      </div><!--/.row-->
    </div>

    <b-modal :title="optionPick.title" :class="'modal-'+optionPick.variant" v-model="showModal">
      <div v-if="optionPick.name === btnOption.deleteOpc.name">{{ optionPick.content }}</div>
      <div v-if="optionPick.name === btnOption.changeKey.name" class="upload-content">
        <h4 class="text-center text-uppercase">{{ itemPick.firstName + ' ' + itemPick.lastName }}</h4>
        <p class="text-center mb-3"><span class=" text-success">{{ itemPick.email }}</span></p>
        <form enctype="multipart/form-data">
          <b-form-group v-for="(option, index) in optInput" :key="index"
                        :class="{ 'form-group--error': $v.itemPass[index]? $v.itemPass[index].$error : false, 'text-right': true}"
                        :label-cols="4"
                        :label="option.label + ':'"
                        :horizontal="true">

            <!-- INPUT -->
            <b-form-input v-if="option.input==undefined || option.input=='input'"
                          :disabled="isLoading" :type="option.type"
                          v-model.trim="itemPass[index]"
                          @blur.native="$v.itemPass[index]? $v.itemPass[index].$touch(): false"
                          :placeholder="option.placeholder+'..'"></b-form-input>
            <form-error :data="$v.itemPass[index] ? $v.itemPass[index] : {} "></form-error>
          </b-form-group>
        </form>
      </div>
      <template slot="modal-footer">
        <b-button @click="showModal = !showModal">Cancel</b-button>
        <b-button v-if="optionPick.name === btnOption.deleteOpc.name" @click="deleteData" :variant="optionPick.variant">OK</b-button>
        <b-button v-if="optionPick.name === btnOption.changeKey.name" @click="changePassword" :variant="optionPick.variant">Cambiar</b-button>
      </template>
    </b-modal>
    <!--<pre>{{item}}</pre>-->
  </div>
</template>

<script>
  import {DATA as nDATA, DATA_FORM_PASSWORD as dataFormPass} from '../../data/dnUser'
  import Form from './forms/FormClient.vue'
  import Table from '../../components/xTable.vue'
  import FormError from '../../components/FormError.vue'

  const _roles = {
    ROLE_ADMIN: {
      id: 0,
      name: 'ROLE_ADMIN'
    },
    ROLE_PUNTO_VENTA: {
      id: 1,
      name: 'ROLE_PUNTO_VENTA'
    },
    ROLE_USUARIO: {
      id: 2,
      name: 'ROLE_USUARIO'
    },
    ROLE_VENDEDOR: {
      id: 3,
      name: 'ROLE_VENDEDOR'
    }
  }

  export default {
    name: 'user',
    components: {
      appForm: Form,
      appTable: Table,
      FormError
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
          changeKey: {
            name: 'changeKey',
            title: 'Cambiar contraseña',
            content: '',
            variant: 'success',
            selected: false,
            icon: 'fa fa-key'
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
        showModal: false,

        optInput: dataFormPass.input,
        itemPass: JSON.parse(JSON.stringify(dataFormPass.post))
      }
    },
    validations () {
      return dataFormPass.validate
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
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest + '?system=0'})
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
      async changePassword () {
        let invalid = this.$v.itemPass.$invalid
        if (!invalid) {
          let url = 'users/' + this.itemPick.id + '/changepassword'
          let formData = new FormData()
          formData.append('password', this.itemPass.rePassword)
          let self = await this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: formData})
          console.log(self)
          if (self.status) {
            this.itemPass = JSON.parse(JSON.stringify(dataFormPass.post))
            this.$v.itemPass.$reset()
            this.toggleDialog()
          }
        } else {
          this.$v.itemPass.$touch()
        }
      },
      toggleDialog: function () {
        this.showModal = !this.showModal
      },
      pickItem (item, option) {
        console.log(item)
        this.initData()
        this.itemPick = item
        this.optionPick = option
        this.indexSelected = this.$lodash.findIndex(this.items, item)

        if (option.name === this.btnOption.editOpc.name) {
          this.item = {...this.item, ...item}
          this.item._role = _roles[this.item.role.role]
          this.update = true
          this.$scrollTo('body')
        } else {
          this.itemPass = JSON.parse(JSON.stringify(dataFormPass.post))
          this.$v.itemPass.$reset()
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
