<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Clientes</strong> del Sistema
    </div>
    <b-form :id="name + urlRest">

      <b-form-group v-for="(option, index) in optInput" :key="index"
                    :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-right': true}"
                    :label-cols="lCols"
                    :label="option.label + ':'"
                    :horizontal="horizontal">

        <!-- INPUT -->
        <b-form-input v-if="option.input==undefined || option.input=='input'"
                      :disabled="isLoading || (option.params.editDisable && update)"
                      :type="option.type"
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
                     :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                     :placeholder="option.placeholder"
                     :label="option.params.label" :track-by="option.params.label"
                     :loading="!option.params.activate"
                     :disabled="!option.params.activate || isLoading || (option.params.editDisable && update)"
                     v-model="item[index]"
                     :options="option.params.options"
                     @blur.native="$v.item[index]? $v.item[index].$touch(): false"></multiselect>

        <!-- ERROR MESSAGE-->
        <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
      </b-form-group>

      <div class="row mb-4">
        <div class="col-md-6 mx-auto text-center">
          <toggle-button :labels="{checked: 'Activo', unchecked: 'Inactivo'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(181, 181, 181)'}"
                         :disabled="isLoading" :width="85" :height="28" :sync="true"
                         v-model="item.enabled" class="mr-2"></toggle-button>
        </div>
      </div>

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
    <!--<pre>{{ item }}</pre>-->
  </b-card>

</template>

<script>
  import cSwitch from '../../../components/Switch'
  import {DATA_FORM_CLIENT as dataForm} from '../../../data/dnUser'
  import FormError from '../../../components/FormError.vue'
  import Multiselect from 'vue-multiselect'
  import ToggleButton from '../../../components/ToggleButton.vue'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      cSwitch: cSwitch,
      FormError,
      Multiselect,
      ToggleButton
    },
    data () {
      return {
        name: 'form-',
        lCols: 3,
        optInput: dataForm.input,
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
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
      },
      processData (action) {
        // this.setPassword()
        console.log('this.item')
        console.log(this.item)
        let invalid = this.$v.item.$invalid
        let url = !this.item.id ? this.urlRest : this.urlRest + '/' + this.item.id
        if (!invalid) {
          if (!this.item.role) {
            this.item.role = {
              email: this.item.email,
              role: 'ROLE_USUARIO'
            }
          }
          console.log(this.item)
//          return false

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
          vm.item[key] = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        console.log('BORRARRR')
        this.resetMultiSelect()
        this.localidad = ''
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
      },
      setPassword () {
        this.item.password = this.item.email
        this.item.role = {
          email: this.item.email,
          role: this.item._role.name
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
