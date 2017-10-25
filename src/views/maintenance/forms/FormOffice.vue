<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Oficinas</strong> de Venta
    </div>
    <b-form :id="name + urlRest">

      <b-form-group v-for="(option, index) in optInput" :key="index"
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

        <!-- ONLYMULTISELECT -->
        <only-multi-select v-if="option.input=='onlyMultiSelect'"
                           :maxHeight="200" v-model="localidad" :optionList="option.params"
                           :disabled="isLoading"
                           :placeholderDefault="option.placeholder"></only-multi-select>


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
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.submit}}</b-button>
            <b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
          </template>

          <template v-if="update">
            <b-button @click.prevent="processData('UPDATE')" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.update}}</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> {{$global.cancel}}</b-button>
          </template>
        </b-form-group>
      </div>

    </b-form>
    <!--<pre>{{ localidad }}</pre>-->
  </b-card>

</template>

<script>
  import cSwitch from '../../../components/Switch'
  import {DATA_FORM as dataForm} from '../../../data/dnOffices'
  import FormError from '../../../components/FormError.vue'
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'
  import Multiselect from 'vue-multiselect'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      cSwitch: cSwitch,
      FormError,
      OnlyMultiSelect,
      Multiselect
    },
    data () {
      return {
        name: 'form-',
        lCols: 4,
        optInput: dataForm.input,
        selectedKey: '',
        multiselectKeys: [],
        localidad: []
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
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
        this.resetForm(this.name + this.urlRest)
      },
      processData (action) {
        let invalid = this.$v.item.$invalid
        let url = !this.item.id ? this.urlRest : this.urlRest + '/' + this.item.id
        if (!invalid) {
          let self = this.$store.dispatch('dispatchHTTP', {type: action, url: url, data: this.item})
          self.then((data) => {
            if (data.status) {
              this.addRow(data.content)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.item[key] = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.localidad = []
        this.$v.item.$reset()
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.optInput[index].params.localData}})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      }
    },
    watch: {
      localidad (newVal) {
        if (Array.isArray(newVal)) {
          this.item.region = newVal[0] ? newVal[0] : null
          this.item.province = newVal[1] ? newVal[1] : null
          this.item.city = newVal[2] ? newVal[2] : null
        }
      },
      item (newVal, oldVal) {
        if (this.update) {
          this.localidad = [this.item.region, this.item.province, this.item.city]
        } else {
          this.resetForm(this.name + this.urlRest)
        }
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
    }
  }
</script>

<style lang="scss">
  .switch-left{
    float: left;
  }
</style>
