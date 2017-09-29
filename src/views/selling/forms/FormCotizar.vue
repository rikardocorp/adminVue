<template>
  <b-card>
    <span class="btn-tool-left input-group-addon bg-primary" @click="resetForm('forms-'+ urlRest)" title="Reset">
      <i class="fa fa-eraser" aria-hidden="true"></i>
    </span>
    <div slot="header" class="text-center">
      <strong>Cotizar</strong> Seguros
    </div>

    <b-form :id="'forms-'+ urlRest">
      <b-form-group v-for="(option, index) in optType" :key="index"
                    feedback="feedback"
                    :state="null"
                    :horizontal="horizontal" :label-cols="2" class="text-center">
        <template slot="label">
          <span>
            <i :class="'fa ' + option.icon" aria-hidden="true"></i>
          </span>
        </template>
        <multiselect v-if="option.placeholder=='MARCA'" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="false" :taggable="false"
                     select-label=""
                     :label="option.label" :track-by="option.label"
                     :loading="!option.activate"
                     :disabled="!option.activate"
                     :placeholder="option.placeholder"
                     v-model="option.value"
                     :options="option.options"
                     @select="dispatchAction">
        </multiselect>

        <multiselect v-else :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="false" :taggable="false"
                     select-label=""
                     :label="option.label" :track-by="option.label"
                     :loading="!option.activate"
                     :disabled="!option.activate"
                     :placeholder="option.placeholder"
                     v-model="option.value"
                     :options="option.options">
        </multiselect>
      </b-form-group>


      <div slot="footer">
        <b-form-group :horizontal="true" :label-cols="2">
          <b-button @click.stop="cotizar" :disabled="isLoading" type="submit" variant="warning" class="p-3 btn-block color-theme-1" style="color: white">
            <i v-if="isLoading" class='fa fa-circle-o-notch fa-spin fa-2x fa-fw text-white'></i>
            COTIZAR
          </b-button>
        </b-form-group>
      </div>
    </b-form>

  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    props: ['value', 'item', 'horizontal', 'urlRest'],
    components: {
      Multiselect: Multiselect
    },
    data () {
      return {
        isSearch: false,
        localValue: {},
        optType: {
          'ciudad': {
            url: 'regions',
            value: '',
            options: [],
            label: 'name',
            key: 'regionId',
            keyValue: 'id',
            activate: false,
            placeholder: 'CIUDAD',
            icon: 'fa-map-marker',
            loadData: true
          },
          'marca': {
            url: 'vehicletypes/filter?type=0',
            value: '',
            options: [],
            label: 'vehicleBrand',
            key: 'brand',
            keyValue: 'vehicleBrand',
            activate: false,
            placeholder: 'MARCA',
            icon: 'fa-bookmark',
            loadData: true
          },
          'modelo': {
            url: 'vehicletypes',
            value: '',
            options: [],
            label: 'vehicleModel',
            key: 'model',
            keyValue: 'vehicleModel',
            activate: false,
            placeholder: 'MODELO',
            icon: 'fa-car',
            loadData: false
          },
          'tipoUso': {
            url: 'usetypes',
            value: '',
            options: [],
            label: 'name',
            key: 'useTypeId',
            keyValue: 'id',
            activate: false,
            placeholder: 'TIPO DE USO',
            icon: 'fa-id-card-o',
            loadData: true
          }
        }
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      nameWithLang ({ name, language }) {
        return `${name} — [${language}]`
      },
      getTypes (urlRest, key) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.optType[key].options = data.content
            this.optType[key].activate = true
          }
        })
      },
      dispatchAction (selectedOption, id) {
        let vehicleBrand = selectedOption.vehicleBrand
        let url = 'vehicletypes/filter?type=1&vehicleBrand=' + vehicleBrand
        console.log(url)
        this.getTypes(url, 'modelo')
        console.log(selectedOption)
      },
      cotizar () {
        let item = {}
        let idKey = ''
        let keyValue = ''
        let vm = this
        this.$lodash.forEach(this.optType, function (value, key) {
          idKey = vm.optType[key].key
          keyValue = vm.optType[key].keyValue
          item[idKey] = vm.optType[key].value[keyValue]
        })

        this.isSearch = true
        this.$emit('isSearching', true)
        let myUrl = 'insuranceprices/cotizar?regionId=' + item['regionId'] + '&useTypeId=' + item['useTypeId'] + '&brand=' + item['brand'] + '&model=' + item['model']
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: myUrl})
        self.then((data) => {
          if (data.status) {
            console.log(data.content)
            this.emitResult(data.content)
          } else {
            console.log(data)
          }
          this.isSearch = false
          this.$emit('isSearching', false)
        })
        console.log(myUrl)
        console.log(item)
      },
      emitResult (items) {
        this.$emit('input', items)
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.optType, function (value, key) {
          vm.optType[key].value = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.emitResult([])
      }
    },
    watch: {

    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optType, function (value, key) {
        if (vm.optType[key].loadData) {
          vm.getTypes(value.url, key)
        } else {
          vm.optType[key].activate = true
        }
      })
      console.log('ITEMSSSSSS')
      console.log(this.value)
    }
  }
</script>

<style lang="scss">
  form#form-cotizar{
    i.fa{
      color: #ef7b1f;
      font-size: 1.5em;
    }
  }

  .btn-tool-left {
    position: absolute;
    top: 23px;
    left: -40px;
    font-size: 1rem;
    cursor: pointer;
  }

</style>

