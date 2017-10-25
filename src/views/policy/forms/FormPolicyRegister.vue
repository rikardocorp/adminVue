<template>
  <b-card id="formPolicyRegister" class="exception">
    <!--<span @click="switchForm" class="btn-tool-left input-group-addon bg-info" title="Registrar en grupo">-->
      <!--<i class="fa fa-tag" aria-hidden="true"></i>-->
    <!--</span>-->
    <div slot="header" class="text-center">
      <button @click="switchForm" title="Registro simple" class="btn btn-in-title-left"><i class="fa fa-tag" aria-hidden="true"></i></button>
      <strong>Registrar</strong> Polizas
    </div>
    <b-form :id="name">
      <div class="text-center p-2 pb-3">
        <span class="text-success">Prefijo</span> [<span class="text-primary">Desde</span> - <span class="text-warning">Hasta</span>] <span class="text-info">PostFijo</span>
      </div>

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
                     v-model="option.params.value"
                     :options="option.params.options"
                     @input="selectOption"
                     @open="openSelect(option.params.key)"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false">
        </multiselect>
        <!--:options="getOption(option.params.url,index)"-->
        <!-- ERROR MESSAGE-->
        <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
      </b-form-group>

      <div slot="footer">
        <b-form-group :horizontal="horizontal" :label-cols="lCols">
          <template v-if="!update">
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading"type="submit" size="sm" variant="info" class="text-white"><i class="fa fa-dot-circle-o"></i> Insertar</b-button>
            <b-button @click="resetForm(name)" :disabled="isLoading" size="sm" variant="secondary" class="text-white"><i class="fa fa-ban"></i> Reset</b-button>
          </template>
        </b-form-group>
      </div>
      <!--<p>DPD: {{ DPD }}</p>-->
      <!--<p>Update: {{ update }}</p>-->
    </b-form>
    <!--<pre>{{ name }}</pre>-->
    <!--<pre>{{ item }}</pre>-->

  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM as dataForm} from '../../../data/dnPolicyRegister'
  export default {
    props: ['urlRest', 'item', 'update', 'horizontal', 'switchForm'],
    components: {
      Multiselect,
      FormError
    },
    data () {
      return {
        name: 'form-dnPolicyRegister',
        optInput: dataForm.input,
        lCols: 4,
        selectedKey: '',
        multiselectKeys: []
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
        let key = this.selectedKey
        let keyValue = this.optInput[key].params.keyValue
        console.log(selectedOption)
        console.log(key)
        console.log(keyValue)
        this.item[key] = selectedOption === null ? '' : selectedOption[keyValue]
      },
      openSelect (id) {
        this.selectedKey = id
      },
      addRow (newItems) {
        this.$emit('emit_addRow', newItems)
      },
      processData (action) {
        let invalid = this.$v.item.$invalid
        console.log('inserta')
        if (!invalid) {
          console.log('paso')
          let self = this.$store.dispatch('dispatchHTTP', {type: action, url: this.urlRest, data: this.item})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              console.log('DATA-CONTENT ' + action)
              console.log(data.content)
              this.addRow([data.content])
              this.resetForm(this.name)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      },
      setMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          let options = vm.optInput[key].params.options
          let idKey = vm.optInput[key].params.key
          let optionPick = vm.$lodash.filter(options, {'id': vm.item[idKey]})
          if (optionPick.length > 0) {
            vm.optInput[key].params.value = optionPick[0]
          } else {
            vm.optInput[key].params.value = ''
          }
        })
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.item[key] = ''
          console.log(key)
          console.log(vm.optInput[key].params)
          vm.optInput[key].params.value = ''
          console.log(vm.optInput[key].params.value)
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.$v.item.$reset()
      }
    },
    watch: {
      item (newVal, oldVal) {
        if (this.update) {
          this.setMultiSelect()
        } else {
          this.resetForm(this.name)
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

<style lang="scss" >
  #formPolicyRegister{
    &.card {
      .card-header {
        background: #64c0dd !important;
        color:white;
      }

      .multiselect__option--highlight {
        background: #64c0dd !important;
      }
    }
    .btn-tool-left {
      position: absolute;
      top: 30px;
      left: -40px;
      font-size: 1rem;
      cursor: pointer;
      border: none;
    }
  }

</style>
