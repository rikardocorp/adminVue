<template>
  <div class="formTable">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7 col-lg-6 col-xl-5">
        <b-card>
          <div slot="header" class="text-center">
            <slot name="titleForm"><strong>Usuarios</strong> del Sistema</slot>
          </div>

          <b-form :id="formId">
            <b-form-group v-for="(option, index) in inputsForm" :key="index"
                          :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-right': true}"
                          :label-cols="lCols"
                          :label="option.label + ':'"
                          :horizontal="horizontal">

              <!-- INPUT -->
              <b-form-input v-if="option.input==undefined || option.input=='input'"
                            :disabled="isLoading" :type="option.type"
                            v-model.trim="item[index]"
                            @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                            :placeholder="option.placeholder+'..'"></b-form-input>

              <!-- TEXTAREA -->
              <b-form-textarea v-else-if="option.input=='textarea'"
                               :disabled="isLoading"
                               v-model.trim="item[index]"
                               :placeholder="option.placeholder+'..'"
                               @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                               :rows="3" :max-rows="6"></b-form-textarea>

              <!-- MULTISELECT -->
              <multiselect v-else-if="option.input=='multiselect'"
                           :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                           :placeholder="option.placeholder"
                           :label="option.params.label" :track-by="option.params.label"
                           :loading="!option.params.activate"
                           :disabled="!option.params.activate || isLoading"
                           v-model="item[index]"
                           :options="option.params.options"
                           @blur.native="$v.item[index]? $v.item[index].$touch(): false"></multiselect>

              <!-- ERROR MESSAGE-->
              <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
            </b-form-group>

            <div slot="footer">
              <b-form-group :horizontal="horizontal" :label-cols="lCols">
                <template v-if="!update">
                  <b-button @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Insert</b-button>
                  <b-button @click="resetForm(formId)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                </template>

                <template v-if="update">
                  <b-button @click.prevent="processData('UPDATE')" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
                  <b-button @click="resetForm(formId)" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
                </template>
              </b-form-group>
            </div>

          </b-form>
        </b-card>
      </div>
    </div>
    <!--<pre>{{item}}</pre>-->

    <b-card :header="titleTable">
      <!-- Top table element-->
      <div slot="header" class="text-center">
        <slot name="titleTable">Tabla :<strong>Rcorp</strong></slot>
      </div>

      <!-- CONTENT TABLE -->
      <div class="my-1 row">
        <!-- ROWS TABLE SHOW -->
        <div class="col-md-4">
          <b-form-group horizontal label="Filas:" :label-cols="3">
            <b-form-select :options="numRowsOptions" v-model="perPage" />
          </b-form-group>
        </div>
        <!-- INPUT SEARCH -->
        <div class="col-md-5 ml-auto">
          <b-form-group horizontal label="Buscar:" :label-cols="3">
            <b-form-input v-model="filter" placeholder="Type text" />
          </b-form-group>
        </div>
        <!-- MAIN TABLE ELEMENT -->
        <div class="col-md-12">
          <template>
            <b-table striped hover show-empty small responsive
                     :items="items"
                     :fields="fieldsTable"
                     :current-page="currentPage"
                     :per-page="perPage"
                     :filter="filter"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     @filtered="onFiltered"
            >
              <template slot="actions" scope="row">
                <b-button v-for="btn in btnOptionTable" :key="btn.name"  :variant="btn.variant" @click.stop="pickItem(row.item, btn)" size="sm" :disabled="isLoading">
                  <i :class="btn.icon" aria-hidden="false"></i>
                </b-button>
              </template>
            </b-table>
          </template>
        </div>
        <!-- Pagination -->
        <div class="col-sm-12">
          <b-pagination align="center" :total-rows="totalRows" size="sm" :per-page="perPage" v-model="currentPage" />
        </div>

      </div>
    </b-card>

    <b-modal :title="optionPick.title" :class="'modal-'+optionPick.variant" v-model="showModal">
      <div v-if="optionPick.name === btnOptionTable.deleteOpc.name">{{ optionPick.content }}</div>
      <template slot="modal-footer">
        <b-button @click="showModal = !showModal">Cancel</b-button>
        <b-button v-if="optionPick.name === btnOptionTable.deleteOpc.name" @click="deleteData" :variant="optionPick.variant">OK</b-button>
        <!--<b-button v-if="optionPick.name === btnOptionTable.changeKey.name" @click="changePassword" :variant="optionPick.variant">Cambiar</b-button>-->
      </template>
    </b-modal>

  </div>

</template>


<script>
  import FormError from './FormError.vue'
  import ToggleButton from './ToggleButton.vue'
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'FormTable',
    components: {
      FormError,
      ToggleButton,
      Multiselect
    },
    props: {
      urlREST: {
        default: 'algo'
      },
      titleTable: {
        default: ''
      },
      numRowsOptions: {
        default () {
          return [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}, {text: 100, value: 100}]
        }
      },
      itemObj: {
        default () {
          return []
        }
      },
      itemsTable: {
        default () {
          return []
        }
      },
      fieldsTable: {
        default () {
          return {}
        }
      },
      btnOptionTable: {
        default () {
          return []
        }
      },
      isLoading: {
        default: false
      },
      formId: {
        default: 'myForm'
      },
      inputsForm: {
        default () {
          return {}
        }
      },
      validate: {
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        // FORMS
        item: this.itemObj,
        items: [],
        itemDefault: {},
        lCols: 4,
        // VAR TABLES
        perPage: 10,
        filter: null,
        sortBy: null,
        sortDesc: false,
        currentPage: 1,
        totalRows: 0,
        update: false,
        horizontal: true,
        multiselectKeys: [],
        itemPick: {},
        optionPick: '',
        indexSelected: '',
        showModal: false
      }
    },
    validations () {
      return this.validate
    },
    computed: {

    },
    methods: {
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      pickItem (item, option) {
        console.log(item)
        this.initData()
        this.itemPick = item
        this.optionPick = option
        this.indexSelected = this.$lodash.findIndex(this.items, item)

        if (option.name === this.btnOptionTable.editOpc.name) {
          this.item = {...this.item, ...item}
          this.update = true
          this.$scrollTo('body')
        } else {
          this.toggleDialog()
        }
      },
      toggleDialog: function () {
        this.showModal = !this.showModal
      },
      initData () {
        this.update = false
        this.item = JSON.parse(JSON.stringify(this.itemDefault))
        this.indexSelected = null
      },
      processData (action) {
        // this.setPassword()
        let invalid = this.$v.item.$invalid
        let url = !this.item.id ? this.urlREST : this.urlREST + '/' + this.item.id
        if (!invalid) {
          let self = this.$store.dispatch('dispatchHTTP', {type: action, url: url, data: this.item})
          self.then((data) => {
            if (data.status) {
              console.log('DATA-CONTENT ' + action)
              console.log(data.content)
              // this.addRow(data.content)
              this.resetForm(this.formId)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      deleteData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: this.urlREST + '/' + this.items[this.indexSelected].id})
        self.then((data) => {
          console.log(data.content)
          if (data.status) {
            this.items.splice(this.indexSelected, 1)
            this.toggleDialog()
            this.initData()
          }
        })
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.inputsForm[index].params.localData}})
        self.then((data) => {
          if (data.status) {
            this.inputsForm[index].params.options = data.content
            this.inputsForm[index].params.activate = true
          }
        })
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.item[key] = ''
        })
      },
      resetForm (formId) {
        this.initData()
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.localidad = ''
        this.$v.item.$reset()
      }
    },
    watch: {
      itemsTable (newVal) {
        console.log('newVal@@@@@@@')
        console.log(newVal)

        this.items = this.itemsTable
        this.totalRows = this.itemsTable.length
      }
    },
    created () {
      this.itemDefault = JSON.parse(JSON.stringify(this.item))
      let vm = this
      this.$lodash.forEach(this.inputsForm, function (value, key) {
        if (vm.inputsForm[key].input === 'multiselect') {
          vm.multiselectKeys.push(key)
          if (vm.inputsForm[key].params.loadData) {
            vm.getOption(value.params.url, key)
          } else {
            vm.inputsForm[key].params.activate = true
          }
        }
      })
    }
  }
</script>


<style>
  .formTable{

  }
</style>

<!-- Examples OBject -->

<!--itemObj: {-->
<!--firstName: '',-->
<!--lastName: '',-->
<!--email: '',-->
<!--phone: '',-->
<!--password: '',-->
<!--expense: 0,-->
<!--enabled: 1,-->
<!--facebook: '',-->
<!--_role: null,-->
<!--office: null,-->
<!--office2: null,-->
<!--},-->
<!--inputsForm: {-->
<!--firstName: {-->
<!--label: 'Nombres',-->
<!--placeholder: 'Nombre del usuario',-->
<!--type: 'text'-->
<!--},-->
<!--lastName: {-->
<!--label: 'Apellidos',-->
<!--placeholder: 'Apellidos del usuario',-->
<!--type: 'text'-->
<!--},-->
<!--email: {-->
<!--label: 'Email',-->
<!--placeholder: 'Correo electronico',-->
<!--type: 'email'-->
<!--},-->
<!--phone: {-->
<!--label: 'Telefono',-->
<!--placeholder: 'Numero celular',-->
<!--type: 'number'-->
<!--},-->
<!--office: {-->
<!--label: 'Oficina',-->
<!--placeholder: 'Asignar a oficina',-->
<!--type: 'text',-->
<!--input: 'multiselect',-->
<!--params: {-->
<!--url: 'offices',-->
<!--key: 'office',-->
<!--label: 'description',-->
<!--options: [],-->
<!--activate: false,-->
<!--loadData: true,-->
<!--value: ''-->
<!--}-->
<!--},-->
<!--office2: {-->
<!--label: 'Oficina',-->
<!--placeholder: 'Asignar a oficina',-->
<!--type: 'text',-->
<!--input: 'multiselect',-->
<!--params: {-->
<!--url: 'offices',-->
<!--key: 'office',-->
<!--label: 'description',-->
<!--options: [],-->
<!--activate: false,-->
<!--loadData: true,-->
<!--value: ''-->
<!--}-->
<!--},-->
<!--_role: {-->
<!--label: 'ROLES',-->
<!--placeholder: 'ROLES',-->
<!--type: 'text',-->
<!--input: 'multiselect',-->
<!--params: {-->
<!--url: 'roles',-->
<!--key: '_role',-->
<!--label: 'name',-->
<!--options: [],-->
<!--activate: false,-->
<!--loadData: true,-->
<!--localData: 'roles',-->
<!--value: '',-->
<!--editDisable: true-->
<!--}-->
<!--}-->
<!--},-->
<!--validate: {-->
<!--item: {-->
<!--firstName: {-->
<!--required-->
<!--},-->
<!--lastName: {-->
<!--required-->
<!--},-->
<!--email: {-->
<!--required,-->
<!--email-->
<!--},-->
<!--phone: {-->
<!--required,-->
<!--numeric-->
<!--},-->
<!--office: {-->
<!--required-->
<!--},-->
<!--_role: {-->
<!--required-->
<!--},-->
<!--office2: {-->
<!--required-->
<!--}-->
<!--}-->
<!--},-->
<!--fieldsTable: {-->
<!--firstName: {label: 'Nombres', sortable: true, 'class': 'text-center'},-->
<!--lastName: {label: 'Apellidos', sortable: true, 'class': 'text-center'},-->
<!--office: {-->
<!--label: 'Oficina',-->
<!--sortable: true,-->
<!--'class': 'text-center',-->
<!--formatter: (value) => { return value ? value.description : '-' }-->
<!--},-->
<!--email: {label: 'Email', sortable: true, 'class': 'text-center'},-->
<!--phone: {label: 'Celular', sortable: true, 'class': 'text-center'},-->
<!--enabled: {-->
<!--label: 'Activo',-->
<!--sortable: true,-->
<!--'class': 'text-center',-->
<!--formatter: (value) => { return value ? 'SI' : 'NO' }-->
<!--},-->
<!--expense: {-->
<!--label: 'Gastos',-->
<!--sortable: true,-->
<!--'class': 'text-center',-->
<!--formatter: (value) => { return value ? 'SI' : 'NO' }-->
<!--},-->
<!--role: {-->
<!--label: 'ROLE',-->
<!--sortable: true,-->
<!--'class': 'text-center',-->
<!--formatter: (value) => { return value.role }-->
<!--},-->
<!--actions: {label: '', thStyle: 'width:115px', 'class': 'text-center'}-->
<!--},-->
<!--itemsTable: [],-->
<!--btnOptionTable: {-->
<!--editOpc: {-->
<!--name: 'edit',-->
<!--variant: 'primary',-->
<!--selected: false,-->
<!--icon: 'fa fa-pencil'-->
<!--},-->
<!--deleteOpc: {-->
<!--name: 'delete',-->
<!--title: 'Eliminar registro',-->
<!--content: 'Esta seguro de eliminar esto?',-->
<!--variant: 'danger',-->
<!--selected: false,-->
<!--icon: 'fa fa-trash'-->
<!--}-->
<!--},-->
