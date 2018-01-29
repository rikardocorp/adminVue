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
                       :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                       :placeholder="option.placeholder"
                       :label="option.params.label" :track-by="option.params.label"
                       :loading="!option.params.activate"
                       :disabled="!option.params.activate || isLoading"
                       :max-height="200"
                       v-model="item[index]"
                       :options="option.params.options"
                       @input="selectOption"
                       @open="openSelect(option.params.key)"
                       @blur.native="$v.item[index]? $v.item[index].$touch(): false">
          </multiselect>

          <!-- ERROR MESSAGE-->
          <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
        </b-form-group>

        <div slot="footer" class="mt-3">
            <b-button class="float-left" @click="resetForm(name + nameForm)" :disabled="isLoading" size="sm" variant="outline-secondary"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
            <b-button class="float-right" @click.prevent="assignPolicies" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{$global.assign}}</b-button>
        </div>
      </b-form>
    </b-card>

    <b-input-group class="mb-3 passDelete">
      <b-input-group-addon class="bg-primary"><i class="fa fa-key"></i></b-input-group-addon>
      <b-form-input :disabled="disableDelete" v-model="password" type="password" placeholder="Contraseña para eliminar" title="Contraseña para eliminar"></b-form-input>
      <b-input-group-button>
        <b-btn :disabled="disableDelete" variant="danger" @click="deletePolicies">{{$global.delete}}</b-btn>
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
  import {DATA_FORM_USER as dataForm, DATA_FORM_USER2 as dataForm2} from '../../../data/dnPolicyAssign'
  import EventBus from '../../../event-bus'
  export default {
    props: ['horizontal', 'item', 'nameForm', 'list', 'disableDelete'],
    components: {
      FormError,
      Multiselect
    },
    data () {
      return {
        name: 'form-',
        lCols: 3,
        optInput: null,
        selectedKey: '',
        multiselectKeys: [],
        pickAll: {
          variant: 'primary',
          size: 'sm',
          options: [
            { text: 'Selec. Todos', value: '0' },
            { text: 'Deselecciona', value: '1' }
          ]
        },
        password: ''
      }
    },
    validations () {
      return dataForm.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isPuntoVenta () {
        return this.$store.state.user.isPuntoVenta
      }
    },
    methods: {
      assignPolicies () {
        let invalid = this.$v.item.$invalid
        console.log('assign')
        if (!invalid) {
          let data = this.convertList(this.list)
          if (data.length === 0) return false
          console.log('pasa')
          let userId = this.item.user.id
          let url = 'insurancepolicies/' + userId + '/assignpolicies'
          let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: data})
          self.then((data) => {
            if (data.status) {
              console.log('SUCCESS')
              console.log(data.content)
              EventBus.$emit('FILTER_POLICY')
            } else {
              console.log('ERROR')
              console.log(data)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      deletePolicies () {
        let data = {
          policies: this.convertListDelete(this.list),
          password: this.password
        }
        if (data.password !== '' && data.policies !== '') {
          let url = 'insurancepolicies/deletepolicies'
          console.log(data)
          let self = this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: url, data: data})
          self.then((data) => {
            if (data.status) {
              console.log('SUCCESS')
              console.log(data.content)
              this.password = ''
              EventBus.$emit('FILTER_POLICY')
            } else {
              console.log('ERROR')
              console.log(data)
            }
          })
        } else {
          this.$store.commit('sendNotification', {status: null, message: 'Debe ingresar su contraseña.'})
        }
      },
      convertList (list) {
        let newList = []
        this.$lodash.forEach(list, function (value, key) {
          newList.push(value)
        })
        return newList
      },
      convertListDelete (list) {
        let newList = []
        this.$lodash.forEach(list, function (value, key) {
          newList.push(key)
        })
        return newList.join(',')
      },
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
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
        // alert(selectedOption)
        let key = this.selectedKey
        let officeId = this.item.office ? this.item.office.id : ''
        let roleName = this.item.role ? this.item.role.name : ''

        if (!this.isPuntoVenta) {
          if (selectedOption == null) {
            this.resetForm(this.name + this.nameForm)
          }

          if (officeId !== '' && roleName !== '' && key !== 'user') {
            let url = 'users?system=1&role=' + roleName + '&officeId=' + officeId
            this.getOption(url, 'user')
          }
        }
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
      if (this.isPuntoVenta) {
        this.optInput = dataForm2.input
      } else {
        this.optInput = dataForm.input
      }
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
