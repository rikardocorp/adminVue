<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Registrar</strong> Polizas
    </div>
    <b-form :id="name + urlRest">

      <!--<pre>{{ $v.item }}</pre>-->
      <b-form-group :class="{ 'form-group--error': $v.item.number.$error, 'text-right': true}"
                    :label-cols="lCols"
                    label="Poliza"
                    :horizontal="horizontal">
        <b-form-input :disabled="isLoading" v-model.trim="item.number" @blur.native="$v.item.number.$touch()" placeholder="Ingrese numero de poliza.."></b-form-input>
        <form-error :data="$v.item.number"></form-error>
      </b-form-group>

      <b-form-group v-for="(option, index) in optType" :key="index"
                    :class="{ 'form-group--error': $v.optType[index].$error, 'text-right': true}"
                    :label="option.title"
                    :horizontal="horizontal" :label-cols="lCols">

        <multiselect :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="false" :taggable="false"
                     select-label=""
                     :label="option.label" :track-by="option.label"
                     :loading="!option.activate"
                     :disabled="!option.activate"
                     :placeholder="option.placeholder"
                     v-model="option.value"
                     :options="option.options"
                     @input="selectOption"
                     @blur.native="$v.optType[index].value.$touch()"
                     @open="openSelect(option.key)" >
        </multiselect>
        <form-error :data="$v.optType[index].value"></form-error>
      </b-form-group>

      <div slot="footer">
        <b-form-group :horizontal="horizontal" :label-cols="lCols">
          <template v-if="!update">
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading"type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </template>

          <template v-if="update">
            <b-button @click.prevent="processData('UPDATE')" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
          </template>
        </b-form-group>
      </div>
      <!--<p>DPD: {{ DPD }}</p>-->
      <!--<p>Update: {{ update }}</p>-->

    </b-form>
  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'
  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      Multiselect,
      FormError
    },
    data () {
      return {
        name: 'form-',
        optType: {
          'insurancecompanies': {
            title: 'Aseguradoras:',
            url: 'insurancecompanies',
            key: 'insuranceCompanyId',
            value: '',
            options: [],
            label: 'name',
            activate: false,
            placeholder: 'Compañia de Seguro',
            icon: 'fa-car',
            loadData: true
          },
          'users': {
            title: 'Usuarios:',
            url: 'users',
            key: 'userId',
            value: '',
            options: [],
            label: 'username',
            activate: false,
            placeholder: 'Usuarios',
            icon: 'fa-car',
            loadData: true
          }
        },
        lCols: 4,
        selectedKey: ''
      }
    },
    validations: {
      optType: {
        'insurancecompanies': {
          value: {
            required
          }
        },
        'users': {
          value: {
            required
          }
        }
      },
      item: {
        number: {
          required,
          minLength: minLength(3)
        }
      },
      validationGroup: ['item', 'optType']
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
        this.item[key] = selectedOption === null ? '' : selectedOption.id
      },
      openSelect (id) {
        this.selectedKey = id
      },
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
      },
      processData (action) {
        let invalid = this.$v.validationGroup.$invalid
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
          this.$v.validationGroup.$touch()
        }
      },
      updateData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: this.urlRest + '/' + this.item.id, data: this.item})
        self.then((data) => {
          if (data.status) {
            this.addRow(data.content)
            this.resetForm(this.name + this.urlRest)
          }
        })
      },
      getTypes (urlRest, key) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            console.log('OPTIONS:')
            this.optType[key].options = data.content
            this.optType[key].activate = true
            console.log(this.optType[key])
          }
        })
      },
      setMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.optType, function (value, key) {
          let options = vm.optType[key].options
          let idKey = vm.optType[key].key
          let optionPick = vm.$lodash.filter(options, {'id': vm.item[idKey]})
          if (optionPick.length >= 0) {
            vm.optType[key].value = optionPick[0]
          } else {
            vm.optType[key].value = ''
          }
        })
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
        this.$v.validationGroup.$reset()
      }
    },
    watch: {
      item (newVal, oldVal) {
        if (this.update) {
          this.setMultiSelect()
        } else {
          this.resetForm(this.name + this.urlRest)
        }
      }
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
    }
  }
</script>

<style lang="scss">

</style>
