<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Locales</strong> de Venta
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
                           :maxHeight="200" v-model="DPD" :optionList="option.params"
                           :disabled="isLoading"
                           :placeholderDefault="option.placeholder"></only-multi-select>

        <!-- ERROR MESSAGE-->
        <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
      </b-form-group>

      <div slot="footer">
        <b-form-group :horizontal="horizontal" :label-cols="lCols">
          <template v-if="!update">
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </template>

          <template v-if="update">
            <b-button @click.prevent="processData('UPDATE')" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
          </template>
        </b-form-group>
      </div>

    </b-form>
    <!--<pre>{{ item }}</pre>-->
  </b-card>

</template>

<script>
  import cSwitch from '../../../components/Switch'
  import {DATA_FORM as dataForm} from '../../../data/dnStores'
  import FormError from '../../../components/FormError.vue'
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      cSwitch: cSwitch,
      FormError,
      OnlyMultiSelect
    },
    data () {
      return {
        DPD: '',
        name: 'form-',
        lCols: 4,
        optInput: dataForm.input
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
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.$v.item.$reset()
      },
      getTypes (urlRest) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            console.log('OPTIONS:')
            console.log(data.content)
            console.log(urlRest)
            console.log(this.optType[urlRest])
            console.log('-------')
            this.optType[urlRest].options = this.optType[urlRest].options.concat(data.content)
            this.optType[urlRest].activate = true
          }
        })
      }
    },
    watch: {
      DPD (newVal, oldVal) {
        localStorage.setItem('location', JSON.stringify(newVal))
        if (Array.isArray(newVal)) {
          this.item.region = newVal[0]
          this.item.province = newVal[1]
          this.item.city = newVal[2]
        }
      }
    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optType, function (value, key) {
        console.log(key)
        vm.getTypes(key)
      })
    }
  }
</script>

<style lang="scss">
  .switch-left{
    float: left;
  }
</style>
