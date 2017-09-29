<template>
  <b-card header="Bootstrap Modals">
    <!-- Top table element-->
    <div class="my-1 row">
      <!-- Top input table-->
      <div class="col-md-4">
        <b-form-group horizontal label="Filas:" :label-cols="3">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </div>
      <div class="col-md-5 ml-auto">
        <b-form-group horizontal label="Buscar:" :label-cols="3">
          <b-form-input v-model="filter" placeholder="Type text" />
        </b-form-group>
      </div>

      <!-- Main table element -->
      <div class="col-md-12">
        <template>
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
            <slot></slot>
            <template slot="actions" scope="row">
              <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
              <b-button v-if="btnOption.editOpc" :disabled="isLoading" size="sm" variant="primary" @click.stop="selectItem(row.item, btnOption.editOpc)">
                <i class="fa fa-plus" aria-hidden="false"></i>
              </b-button>
              <!--<b-button v-if="btnOption.deleteOpc" :disabled="isLoading" size="sm" variant="danger" @click.stop="pickItem(row.item, btnOption.deleteOpc)">-->
                <!--<i class="fa fa-trash" aria-hidden="false"></i>-->
              <!--</b-button>-->
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

</template>

<script>
  export default {
    props: ['items', 'fields', 'btnOption'],
    data () {
      return {
        // top table option
        pageOptions: [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}, {text: 100, value: 100}],
        perPage: 10,
        filter: null,
        // table option
        sortBy: null,
        sortDesc: false,
        currentPage: 1,
        totalRows: 0
      }
    },
    methods: {
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      selectItem (item, type) {
        this.$emit('pickItemVehicle', item, type)
      },

      pickItem (item, type) {
        this.$emit('pickItem', item, type)
      },
      changeSwitch (item, type) {
        console.log(item)
        this.$emit('pickItem2', false)
      }
    },
    watch: {
      items () {
        console.log('ITEM table watch')
        console.log(this.items.length)
        this.totalRows = this.items.length
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    }
  }
</script>

<style>

</style>
