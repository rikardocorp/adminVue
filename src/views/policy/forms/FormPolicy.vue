<template>
  <b-card>
    <!--<span @click="switchForm" class="btn-tool-left input-group-addon bg-primary" title="Registrar en grupo">-->
      <!--<i class="fa fa-tags" aria-hidden="true"></i>-->
    <!--</span>-->
    <div slot="header" class="text-center">
      <button @click="switchForm" v-b-tooltip.hover.auto title="Registrar en grupo" class="btn btn-in-title-left"><i class="fa fa-tags" aria-hidden="true"></i></button>
      <strong>Registra</strong> una Poliza
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
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading"type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.submit}}</b-button>
            <b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
          </template>

          <template v-if="update">
            <b-button @click.prevent="processData('UPDATE')" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.update}}</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> {{$global.cancel}}</b-button>
          </template>
        </b-form-group>
      </div>
      <!--<p>DPD: {{ DPD }}</p>-->
      <!--<pre>item: {{ $global }}</pre>-->

    </b-form>
  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM as dataForm} from '../../../data/dnInsurancePolicies'
  export default {
    props: ['urlRest', 'item', 'update', 'horizontal', 'switchForm'],
    components: {
      Multiselect,
      FormError
    },
    data () {
      return {
        name: 'form-',
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
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
      },
      processData (action) {
        let invalid = this.$v.item.$invalid
        if (this.item.user === '') this.item.user = null
        let url = !this.item.id ? this.urlRest : this.urlRest + '/' + this.item.id
        if (!invalid) {
          // LOCAL ITEM
          let item = JSON.parse(JSON.stringify(this.item))
          item.policyType = item.policyType.id

          let self = this.$store.dispatch('dispatchHTTP', {type: action, url: url, data: item})
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

<style lang="scss" scoped="">
  .btn-tool-left {
    position: absolute;
    top: 30px;
    left: -40px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
  }
</style>
