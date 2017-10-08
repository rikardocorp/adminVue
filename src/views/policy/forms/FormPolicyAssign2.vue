<template>
  <div>
    <b-card class="myCard">
      <div slot="header" class="text-left">
        <strong>Polizas</strong> - Asignacion
      </div>
      <b-form :id="name + nameForm">

        <b-form-group v-for="(option, index) in optInput" :key="index" :label-sr-only="true"
                      :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false}"
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
                       :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                       :placeholder="option.placeholder"
                       :label="option.params.label" :track-by="option.params.label"
                       :loading="!option.params.activate"
                       :disabled="!option.params.activate || isLoading"
                       :max-height="200"
                       v-model="item[index]"
                       :options="option.params.options"
                       @blur.native="$v.item[index]? $v.item[index].$touch(): false">
          </multiselect>

          <!-- ERROR MESSAGE-->
          <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
        </b-form-group>

        <div slot="footer" class="mt-3">
            <b-button class="float-left" @click="resetForm(name + nameForm)" :disabled="isLoading" size="sm" variant="outline-secondary"><i class="fa fa-ban"></i> Reset</b-button>
            <b-button class="float-right" @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
        </div>
      </b-form>
    </b-card>

    <b-input-group class="mb-3 passDelete">
      <b-input-group-addon class="bg-primary"><i class="fa fa-key"></i></b-input-group-addon>
      <b-form-input type="password" placeholde="Password para eliminar" title="Password para eliminar"></b-form-input>
      <b-input-group-button>
        <b-btn variant="danger">Eliminar</b-btn>
      </b-input-group-button>
    </b-input-group>

    <b-form-radio-group class="radio-group2" buttons
                        :button-variant="pickAll.variant"
                        :size="pickAll.size"
                        v-model="item.extra"
                        :options="pickAll.options">
    </b-form-radio-group>

  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM_USER as dataForm} from '../../../data/dnPolicyAssign'
  export default {
    props: ['horizontal', 'item', 'nameForm'],
    components: {
      FormError,
      Multiselect
    },
    data () {
      return {
        name: 'form-',
        lCols: 3,
        optInput: dataForm.input,
        selectedKey: '',
        multiselectKeys: [],
        pickAll: {
          variant: 'primary',
          size: 'sm',
          options: [
            { text: 'Selec. Todos', value: '0' },
            { text: 'Deselecciona', value: '1' }
          ]
        }
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
              console.log('DATA-CONTENT ' + action)
              console.log(data.content)
              this.addRow(data.content)
              this.resetForm(this.name + this.urlRest)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.optInput[key].params.value = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetMultiSelect()
        this.$v.item.$reset()
        this.$emit('defaulValue')
      },
      selectOption (selectedOption) {
        console.log(selectedOption)
        let key = this.selectedKey
        this.item[key] = selectedOption === null ? '' : selectedOption.id
      },
      openSelect (id) {
        this.selectedKey = id
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
  .radio-group2{
    background: white;
    width: 100%;
    label{
      padding: 6px !important;
      width: 50% !important;
    }
    .active{
      z-index: 0 !important;
    }
  }

  .passDelete{
    input,
    .input-group-addon,
    .input-group-btn .btn{
      border: 1px solid #ef7b1f;
    }

    .input-group-addon{
      border-radius: 0.45em 0 0 0.45rem;
    }

    .input-group-btn .btn{
      border-radius: 0 0.45em 0.45rem 0;
    }
  }
</style>
