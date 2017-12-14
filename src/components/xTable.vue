<template>
  <b-card header="Bootstrap Modals">
    <!-- Top table element-->
    <div slot="header" class="text-center">
      <strong> <slot name="title"></slot></strong>
    </div>
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
              <b-button v-for="btn in btnOption" :key="btn.name"  :variant="btn.variant" @click.stop="pickItem(row.item, btn)" size="sm" :disabled="isLoading">
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
      pickItem (item, option) {
        this.$emit('pickItem', item, option)
      },
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

<style lang="scss" scoped="">
  button.btn-sm {
    margin-left: 0.2em;
    &:first-child {
      margin-left: 0;
    }
  }

  .upload-file {
    img {
      max-height: 250px;
      max-width: 250px;
    }
  }
</style>
