<template>
  <b-form :id="'forms-'+ urlRest" class="col-md-8 m-auto pt-3 pb-4">
    <div class="d-flex justify-content-center mb-2">
      <c-switch type="text"
                variant="warning"
                on="DNI" off="RUC"
                class="switch-lg"
                :pill="true"
                @change="dniRUC"
                v-model="item.typeDocument"/>
    </div>

    <b-form-group class="" :label-cols="lCols"
                  :label="titleRazonSocial + ':'"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal">
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-user-o"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.razonSocial" placeholder="Ingrese su nombre.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group class="" :label-cols="lCols"
                  :label="titledniRuc + ':'"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal">
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-address-card-o"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="item.dniRuc" placeholder="Ingrese DNI / RUC.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group class="" :label-cols="lCols"
                  label="Email:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal">
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-envelope-o"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading" type="email" :state="null" v-model.trim="item.email" placeholder="Ingrese su email.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group class="" :label-cols="lCols"
                  label="Localidad:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal">
      <b-input-group class="special_radius">
        <b-input-group-addon class="bg-primary"><i class="fa fa-map-marker"></i></b-input-group-addon>
        <only-multi-select :maxHeight="200" v-model="DPD" :optionStack="optType" :disabled="isLoading" :placeholderDefault="'Departamento-Provincia-Distrito'"></only-multi-select>
      </b-input-group>
    </b-form-group>

    <b-form-group class="" :label-cols="lCols"
                  label="Dirección:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal">
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-address-book-o"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.address" placeholder="Ingrese su dirección.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group class="" :label-cols="lCols"
                  label="Celular:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal">
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-mobile"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="item.cellPhone" placeholder="Ingrese su nro celular.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group class="" :label-cols="lCols"
                  label="Telefono Fijo:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal">
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-phone"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="item.phone" placeholder="Ingrese su telefono fijo.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <!--<p>DPD: {{ DPD }}</p>-->
    <!--<p>Update: {{ update }}</p>-->

    </b-form>

</template>

<script>
  import cSwitch from '../../../components/Switch'
  import OnlyMultiSelect from '../../../components/OnlyMultiSelect.vue'
  import Multiselect from 'vue-multiselect'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal', 'name'],
    components: {
      cSwitch: cSwitch,
      OnlyMultiSelect: OnlyMultiSelect,
      Multiselect
    },
    data () {
      return {
        DPD: '',
        localItem: {},
        defaultItem: {},
        optType: [
          {
            url: 'regions',
            options: [],
            pickID: null,
            id: 'regionId',
            colorClass: 'badge badge-danger',
            placeholder: 'Departamento',
            keySearch: 'name'
          },
          {
            url: 'provinces',
            options: [],
            pickID: null,
            id: 'provinceId',
            colorClass: 'badge badge-success',
            placeholder: 'Provincia',
            keySearch: 'name'
          },
          {
            url: 'cities',
            options: [],
            pickID: null,
            id: 'citieId',
            colorClass: 'badge badge-info text-white',
            placeholder: 'Distrito',
            keySearch: 'name'
          }
        ],
        titleRazonSocial: 'Nombre',
        titledniRuc: 'DNI',
        titleSwitch: 1,
        lCols: 3
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
          this.item.departamento = newVal[0]
          this.item.provincia = newVal[1]
          this.item.distrito = newVal[2]
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
      dniRUC (value) {
        if (value==1) {
          this.titleRazonSocial = 'Nombre'
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
  .special_radius{
    .multiselect__tags{
      border-radius: 0 0.55em 0.55em 0 !important;
    }
  }
</style>
