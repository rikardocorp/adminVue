<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Registrar</strong> Vehiculos
    </div>
    <b-form :id="name + urlRest">

      <b-form-group v-for="(option, index) in optInput" :key="index" :label-sr-only="option.srOnly"
                    :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-right': true}"
                    :label-cols="option.srOnly ? null : lCols"
                    :label="option.label + ':'"
                    :horizontal="horizontal">

        <!-- INPUT -->
        <b-input-group v-if="option.input==undefined || option.input=='input'">
          <b-form-input
            :disabled="isLoading" :type="option.type"
            v-model.trim="item[index]"
            @blur.native="$v.item[index]? $v.item[index].$touch(): false"
            :placeholder="option.placeholder+'..'"></b-form-input>
        </b-input-group>

        <!-- MULTISELECT -->
        <multiselect v-else-if="option.input=='multiselect'"
                     :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading"
                     v-model="item[index]"
                     :options="option.params.options"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false">
        </multiselect>
        <!--:options="getOption(option.params.url,index)"-->
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
    <!--<pre>{{item}}</pre>-->
  </b-card>

</template>

<script>
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM as dataForm} from '../../../data/dnVehicles'
  import Multiselect from 'vue-multiselect'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      FormError,
      Multiselect
    },
    data () {
      return {
        name: 'form-',
        lCols: 4,
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
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
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
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
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
  form {
    label {
      text-align: right;
    }
  }

</style>
