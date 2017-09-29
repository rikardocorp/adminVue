<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <!-- loading -->
      <!--<div class="card-overlay modal-backdrop"></div>-->

      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <b-card :border-variant="updateClass"
                  :header="updateClass"
                  :header-bg-variant="updateClass">
            <div slot="header">
              <strong>Ciudad</strong> sucursal <span v-if="update"><b-badge variant="" pill>Editar</b-badge></span>
            </div>

            <b-form-group
              description="Registre el nombre de la ciudad."
              label="Ciudad:"
              feedback="feedback"
              :state="null">
              <b-form-input :disabled="isLoading"
                            :state="null"
                            v-model.trim="city.name"
                            placeholder="Ingrese ciudad.."></b-form-input>
            </b-form-group>

            <b-form-group
              description="Ingrese una descripción."
              label="Descripción:"
              feedback="feedback"
              :state="null">
              <b-form-textarea :disabled="isLoading"
                               v-model="city.description"
                               placeholder="Ingrese descripcion.."
                               :rows="3"
                               :max-rows="6"
                               :state="null"></b-form-textarea>
            </b-form-group>
            <div slot="footer">
              <template v-if="!update">
                <b-button :disabled="isLoading" @click.prevent="insertData" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                <b-button :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
              </template>

              <template v-if="update">
                <b-button :disabled="isLoading" @click.prevent="updateData" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
                <b-button :disabled="isLoading" @click="update=false" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
              </template>
            </div>
          </b-card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <b-card header="Tabla ciudades">
            <!-- Top table element-->
            <div class="my-1 row">
              <div class="col-md-4">
                <b-form-fieldset horizontal label="Filas" :label-cols="6">
                  <b-form-select :options="pageOptions" v-model="perPage" />
                </b-form-fieldset>
              </div>
              <div class="col-md-8">
                <b-form-fieldset horizontal label="Buscar" :label-cols="3">
                  <b-form-input v-model="filter" placeholder="Type text" />
                </b-form-fieldset>
              </div>

              <!-- Main table element -->
              <div class="col-md-12">
                <b-table striped hover show-empty small responsive
                         :items="items"
                         :fields="fields"
                         :current-page="currentPage"
                         :per-page="perPage"
                         :filter="filter"
                         :sort-by.sync="sortBy"
                         :sort-desc.sync="sortDesc"
                         @filtered="onFiltered"
                >
                  <template slot="actions" scope="row">
                    <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
                    <b-button :disabled="isLoading" size="sm" variant="info" @click.stop="optionAction(row.item,'primary')">
                      <i class="fa fa-pencil" aria-hidden="false"></i>
                    </b-button>
                    <b-button :disabled="isLoading" size="sm" variant="danger" @click.stop="optionAction(row.item,'danger')">
                      <i class="fa fa-trash" aria-hidden="false"></i>
                    </b-button>

                    <!--<b-btn size="sm" @click.stop="details(row.item,row.index,$event.target)">Details</b-btn>-->
                  </template>
                </b-table>
              </div>

              <!-- Pagination -->
              <div class="col-sm-12">
                <b-pagination align="center" :total-rows="totalRows" size="sm" :per-page="perPage" v-model="currentPage" />
              </div>
              <!--<div class="col-sm-4 text-md-right">-->
                <!--<b-button :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button>-->
              <!--</div>-->
            </div>

            <p>Sort By: {{ sortBy || 'n/a' }}, Direction: {{ sortDesc ? 'descending' : 'ascending' }}</p>

          </b-card>
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
  import {DATA_CITY} from '../../data/dataNames'

  export default {
    name: 'ciudad',
    data () {
      return {
        // data
        urlRest: DATA_CITY.name,
        city: JSON.parse(JSON.stringify(DATA_CITY.post)),
        fields: JSON.parse(JSON.stringify(DATA_CITY.fieldsTable)),
        items: [],
        itemTarget: {},
        update: false,
        updateClass: '',
        // table
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        pageOptions: [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}, {text: 100, value: 100}],
        sortBy: null,
        sortDesc: false,
        filter: null,
        // modal
        modalDetails: { title: 'Eliminar Registro', data: 'Esta seguro de eliminar esto?' },
        showModal: false,
        action: '',
        ownClass: ''
      }
    },
    watch: {
      update (val, oldval) {
        this.updateClass = val ? 'primary' : ''
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      initData () {
        this.update = false
        this.city = JSON.parse(JSON.stringify(DATA_CITY.post))
        this.itemTarget = {}
      },
      getData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: this.urlRest})
        self.then((data) => {
          this.items = data.status ? data.content : []
          this.totalRows = this.items.length
        })
      },
      insertData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT',  url: this.urlRest, data: this.city})
        self.then((data) => {
          if (data.status) {
            this.initData()
            this.items.unshift(data.content)
          } else {
            console.log(data.content)
          }
        })
      },
      updateData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: this.urlRest + '/' + this.itemTarget.id, data: this.city})
        self.then((data) => {
          if (data.status) {
            let idx = this.$lodash.findIndex(this.items, this.itemTarget)
            this.initData()
            this.items.splice(idx, 1, data.content)
          } else {
            console.log(data.content)
          }
        })
      },
      deleteData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: this.urlRest + '/' + this.itemTarget.id})
        self.then((data) => {
          if (data.status) {
            let idx = this.$lodash.findIndex(this.items, this.itemTarget)
            this.initData()
            this.items.splice(idx, 1)
            this.toggleDialog()
          } else {
            console.log(data.content)
          }
        })
      },
      toggleDialog: function () {
        this.showModal = !this.showModal
      },
      optionAction (item, typeModal) {
        this.initData()
        this.itemTarget = item
        if (typeModal === 'danger') {
          this.ownClass = typeModal
          this.toggleDialog()
        } else {
          this.update = true
          this.city = JSON.parse(JSON.stringify(this.itemTarget))
        }
      },
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style>
  *:focus{
    outline: none;
  }
  table thead th{
    /*padding-top: 0.7rem !important;*/
    /*padding-bottom: 0.7rem !important;*/
  }
</style>

<!-- table-complete-1.vue -->
