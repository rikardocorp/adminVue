<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Registrar</strong> Contratante
    </div>
    <b-form :id="'forms-'+ urlRest">
      <!--<div class="d-flex justify-content-center">-->
        <!--<b-forms-radio id="btnradios1"-->
                      <!--buttons-->
                      <!--v-model="localItem.typeDocument"-->
                      <!--:options="options" />-->
      <!--</div>-->

      <div class="d-flex justify-content-center mb-2">
        <c-switch type="text"
                  variant="warning"
                  on="DNI" off="RUC"
                  class="switch-lg"
                  :pill="true"
                  @change="rick"
                  v-model="localItem.typeDocument"/>
      </div>

      <b-form-group class="text-right" :label-cols="lCols"
        :label="titleRazonSocial + ':'"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="localItem.razonSocial" placeholder="Ingrese su nombre.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        :label="titledniRuc + ':'"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="localItem.dniRuc" placeholder="Ingrese DNI / RUC.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Email:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="email" :state="null" v-model.trim="localItem.email" placeholder="Ingrese su email.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Dirección:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="localItem.address" placeholder="Ingrese su dirección.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Departamento:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <only-multi-select v-model="DPD" :optionList="optType" :disabled="isLoading" :placeholderDefault="'Departamento-Provincia-Distrito'"></only-multi-select>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Celular:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="localItem.cellPhone" placeholder="Ingrese su nro celular.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Telefono Fijo:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="localItem.phone" placeholder="Ingrese su telefono fijo.."></b-form-input>
      </b-form-group>

      <div slot="footer">
        <b-form-group :horizontal="horizontal" :label-cols="lCols">
          <template v-if="!update">
            <b-button @click="insertData" :disabled="isLoading"type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button @click="resetForm('form'+ urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </template>

          <template v-if="update">
            <b-button @click="updateData" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
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
  import cSwitch from '../../../components/Switch'
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'
  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      cSwitch: cSwitch,
      OnlyMultiSelect: OnlyMultiSelect,
    },
    data () {
      return {
        DPD: '', //[ "230000", "230400", "230404" ],
        localItem: {},
        defaultItem: {},
//        optType: [
//          {
//            url: 'regions',
//            options: [],
//            pickID: null,
//            id: 'regionId',
//            colorClass: 'badge badge-danger',
//            placeholder: 'Departamento',
//            keySearch: 'name'
//          },
//          {
//            url: 'provinces',
//            options: [],
//            pickID: null,
//            id: 'provinceId',
//            colorClass: 'badge badge-success',
//            placeholder: 'Provincia',
//            keySearch: 'name'
//          },
//          {
//            url: 'cities',
//            options: [],
//            pickID: null,
//            id: 'citieId',
//            colorClass: 'badge badge-info text-white',
//            placeholder: 'Distrito',
//            keySearch: 'name'
//          }
//        ],
        optType: [
          {
            url: 'regions',
            options: [],
            pickID: null,
            id: 'region',
            keySearch: 'name',
            colorClass: 'badge badge-danger',
            placeholder: 'Departamento',

            backId: 'name'
          },
          {
            url: 'provinces',
            options: [],
            pickID: null,
            id: 'province',
            keySearch: 'name',
            colorClass: 'badge badge-success',
            placeholder: 'Provincia',

            backId: 'name'
          },
          {
            url: 'cities',
            options: [],
            pickID: null,
            id: 'city',
            keySearch: 'name',
            colorClass: 'badge badge-info text-white',
            placeholder: 'Distrito',

            backId: 'name'
          }
        ],
        titleRazonSocial: 'Nombre Completo',
        titledniRuc: 'DNI',
        titleSwitch: 1,
        lCols: 4
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    watch: {
      DPD (newVal, oldVal) {
        console.log('WARCH DPD?')
        if (Array.isArray(newVal)) {
          console.log('WATCH DPD')
          this.localItem.departamento = newVal[0]
          this.localItem.provincia = newVal[1]
          this.localItem.distrito = newVal[2]
        }
      },
      item (newVal, oldVal) {
        console.log('WATCH update?')
        console.log('update:' + this.update)
        this.localItem = {}
        this.localItem = {...this.localItem, ...this.item}
        if (this.update) {
          console.log('WATCH update')
          this.DPD = [false, this.localItem.departamento, this.localItem.provincia, this.localItem.distrito]
          console.log(this.DPD)
        } else {
          this.DPD = ''
        }
      }
    },
    methods: {
      rick (a) {
        if (a==1) {
          this.titleRazonSocial = 'Nombre Completo'
          this.titledniRuc = 'DNI'
        } else {
          this.titleRazonSocial = 'Razon Social'
          this.titledniRuc = 'RUC'
        }
      },
      addRow (newItem = '') {
        this.$emit('emit_addRow', newItem)
      },
      insertData () {
        console.log('INSERT?')
        console.log(this.localItem)
        console.log(this.urlRest)
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: this.urlRest, data: this.localItem})
        self.then((data) => {
          console.log('INSERT')
          console.log(data)
          if (data.status) {
            this.addRow(data.content)
            this.resetForm('form' + this.urlRest)
          }
        })
      },
      updateData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: this.urlRest + '/' + this.localItem.id, data: this.localItem})
        self.then((data) => {
          console.log('UPDATE')
          console.log(this.localItem)
          console.log(data.content)
          if (data.status) {
            this.addRow(data.content)
            this.resetForm('form' + this.urlRest)
          }
        })
      },
      resetForm (formId) {
        console.log('RESET INN')
        document.getElementById(formId).reset()
        this.localItem = {}
        this.localItem = {...this.localItem, ...this.defaultItem}
        this.DPD = ''
      }
    },
    created () {
      this.defaultItem = {...this.defaultItem, ...this.item}
      this.localItem = {...this.localItem, ...this.item}
    }
  }
</script>

<style lang="scss">

</style>
