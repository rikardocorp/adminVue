<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Registrar</strong> Contratante
    </div>
    <b-form :id="name + urlRest">

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

      <b-form-group v-for="(option, index) in optInput" :key="index"
                    :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-right': true}"
                    :label-cols="lCols"
                    :label="option.label + ':'"
                    :horizontal="horizontal">

        <b-form-input v-if="option.input==undefined || option.input=='input'" :disabled="isLoading" :type="option.type" v-model.trim="item[index]" @blur.native="$v.item[index]? $v.item[index].$touch(): false" :placeholder="option.placeholder+'..'"></b-form-input>
        <b-form-textarea v-else-if="option.input=='textarea'"
                         :disabled="isLoading"
                         v-model.trim="item[index]"
                         :placeholder="option.placeholder+'..'"
                         :rows="3" :max-rows="6"></b-form-textarea>
        <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
      </b-form-group>


      <b-form-group class="text-right" :label-cols="lCols"
                    label="Estado"
                    :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" v-model.trim="item.state" placeholder="Estado de pago.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
                    label="Activo?"
                    :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" v-model.trim="item.active" placeholder="Venta activa?.."></b-form-input>
      </b-form-group>

      <pre>$v: {{ $v }}</pre>

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
  import {DATA_SALE as nDATA} from '../../../data/Sale'
  import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'
  export default {
    props: ['urlRest', 'item', 'update', 'horizontal', 'validate'],
    components: {
      Multiselect,
      FormError
    },
    data () {
      return {
        name: 'form-',
        optType: {
          'insurancepolicies': {
            title: 'Polizas:',
            url: 'insurancepolicies/mypolicies?sold=0',
            key: 'insurancePolicyId',
            value: '',
            options: [],
            label: 'number',
            activate: false,
            placeholder: 'Numero de Poliza',
            icon: 'fa-car',
            loadData: true
          },
          'purchasers': {
            title: 'Cotratante:',
            url: 'purchasers',
            key: 'purchaserId',
            value: '',
            options: [],
            label: 'razonSocial',
            activate: false,
            placeholder: 'Contratante',
            icon: 'fa-car',
            loadData: true
          },
          'vehicles': {
            title: 'Vehiculo:',
            url: 'vehicles',
            key: 'vehicleId',
            value: '',
            options: [],
            label: 'licensePlate',
            activate: false,
            placeholder: 'Vehiculo',
            icon: 'fa-car',
            loadData: true
          },
          'regions': {
            title: 'Ciudad:',
            url: 'regions',
            key: 'regionId',
            value: '',
            options: [],
            label: 'name',
            activate: false,
            placeholder: 'Ciudad',
            icon: 'fa-car',
            loadData: true
          }

        },
        optInput: {
          seatNumber: {
            label: 'Asientos',
            placeholder: 'Numero de asientos',
            type: 'number'
          },
          date: {
            label: 'Fecha',
            placeholder: 'Fecha de la venta',
            type: 'text'
          },
          amount: {
            label: 'Monto',
            placeholder: 'Costo de la venta',
            type: 'number'
          },
          discount: {
            label: 'Descuento',
            placeholder: 'Ingrese descuento',
            type: 'number'
          },
          currency: {
            label: 'Moneda',
            placeholder: 'Tipo de moneda',
            type: 'number'
          },
          invoiceNumber: {
            label: 'Factura',
            placeholder: 'Comprobante de pago',
            type: 'text',
            input: 'input'
          },
          observation: {
            label: 'Observacion',
            placeholder: 'Ingrese alguna observacion',
            type: 'text',
            input: 'textarea'
          }
        },
        lCols: 4,
        selectedKey: ''
      }
    },
    validations () {
      return nDATA.validate
//      item: {
//        seatNumber: {
//          required,
//          numeric,
//          between: between(2, 100)
//        },
//        date: {
//          required
//        },
//        amount: {
//          required,
//          numeric
//        }
//      },
//      validationGroup: ['item', 'optType']
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      selectOption (selectedOption) {
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
      getTypes (urlRest, key) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.optType[key].options = data.content
            this.optType[key].activate = true
            console.log(this.optType[key].options)
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
          console.log('WATCH item update')
          this.setMultiSelect()
        } else {
          console.log('WATCH item reset')
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
