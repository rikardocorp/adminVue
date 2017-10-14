<template>
  <b-card class="exception">
    <span class="btn-tool-left input-group-addon bg-primary" @click="resetForm(name + urlRest)" title="Reset">
      <i class="fa fa-eraser" aria-hidden="true"></i>
    </span>
    <div slot="header" class="text-center">
      <strong>Cotizar</strong> Seguros
    </div>

    <b-form :id="name + urlRest">

      <b-form-group v-for="(option, index) in optInput" :key="index"
                    :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-center': true}"
                    :label-cols="lCols"
                    :label="option.label + ':'"
                    :horizontal="horizontal">
        <template slot="label">
          <span>
            <i :class="'fa ' + option.params.icon" aria-hidden="true"></i>
          </span>
        </template>

        <!-- INPUT -->
        <b-form-input v-if="option.input==undefined || option.input=='input'"
                      :disabled="isLoading" :type="option.type"
                      v-model.trim="item[index]"
                      @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>

        <!-- MULTISELECT -->
        <multiselect v-else-if="option.input=='multiselect'"
                     :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading"
                     v-model="option.params.value"
                     :options="option.params.options"
                     @input="selectOption"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                     @open="openSelect(option.params.key)" >
        </multiselect>

        <!-- ERROR MESSAGE-->
        <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
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
    <!--<pre>{{ optInput }}</pre>-->

  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM as dataForm} from '../../../data/dnCotizar'
  export default {
    props: ['value', 'item', 'pickObject', 'horizontal', 'urlRest'],
    components: {
      Multiselect,
      FormError
    },
    data () {
      return {
        name: 'form-',
        lCols: 2,
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
        },
        optInput: dataForm.input,
        selectedKey: '',
        multiselectKeys: [],
      }
    },
    validations () {
      return dataForm.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      selectOption (selectedOption) {
        console.log(selectedOption)
        let key = this.selectedKey
        let keyValue = this.optInput[key].params.keyValue
        this.item[key] = selectedOption === null ? '' : selectedOption[keyValue]
        this.pickObject[this.optInput[key].params.objectKey] = selectedOption

        // GET OPTIONS MODEL CAR
        if (key === 'brand') {
          let vehicleBrand = this.item[key]
          let url = this.optInput['model'].params.url + vehicleBrand
          this.getOption(url, 'model')
        }
      },
      openSelect (id) {
        console.log('AAAAAAA ' + id)
        this.selectedKey = id
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.optInput[index].params.localData}})
        self.then((data) => {
          console.log('DATA en COTIZAR')
          console.log(data)
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      },
      cotizar () {
        this.isSearch = true
        this.$emit('isSearching', true)
        let myUrl = 'insuranceprices/cotizar?regionId=' + this.item['regionId'] + '&useTypeId=' + this.item['useTypeId'] + '&brand=' + this.item['brand'] + '&model=' + this.item['model']
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
      },
      emitResult (items) {
        this.$emit('input', items)
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.optInput[key].params.value = ''
          vm.item[key] = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.emitResult([])
        this.$v.item.$reset()
      }
    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optInput, function (value, key) {
        if (vm.optInput[key].input === 'multiselect') {
          vm.multiselectKeys.push(key)
          if (vm.optInput[key].params.loadData) {
            vm.getOption(value.params.url, key)
          } else {
            vm.optInput[key].params.activate = true
          }
        }
      })
    },
    mounted () {
      this.resetForm(this.name + this.urlRest)
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

