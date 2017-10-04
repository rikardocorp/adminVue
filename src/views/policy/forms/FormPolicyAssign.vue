<template>
  <b-card>
    <b-form :id="'forms-'" class="col-md-8 m-auto pt-3 pb-4">
      <div>rikardocorp</div>

      <only-multi-select
        :maxHeight="200" v-model="location" :optionList="optType"
        :disabled="isLoading"
        placeholderDefault="AAAAAA">
      </only-multi-select>

    </b-form>
    <pre>{{ location }}</pre>
  </b-card>

</template>

<script>
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'

  export default {
    components: {
      OnlyMultiSelect
    },
    data () {
      return {
        location: 12,
        optType: [
          {
            url: 'regions',
            options: [],
            pickID: null,
            id: 'region',
            keySearch: 'name',
            colorClass: 'badge badge-danger',
            placeholder: 'Departamento',

            backId: 'name'
          },
          {
            url: 'provinces',
            options: [],
            pickID: null,
            id: 'province',
            keySearch: 'name',
            colorClass: 'badge badge-success',
            placeholder: 'Provincia',

            backId: 'name'
          },
          {
            url: 'cities',
            options: [],
            pickID: null,
            id: 'city',
            keySearch: 'name',
            colorClass: 'badge badge-info text-white',
            placeholder: 'Distrito',

            backId: 'name'
          }
        ]
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {

    }
  }
</script>


<style lang="scss">

</style>
