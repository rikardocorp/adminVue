<template>
  <b-card>
    <div slot="header">
      <strong>Registrar</strong> Polizas
    </div>
    <b-form>
      <b-form-group
        label="Placa del auto:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.licensePlate" placeholder="Ingrese su placa.."></b-form-input>
      </b-form-group>

      <b-form-group
        label="Año de fabricación:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="item.manufacturingYear" placeholder="Ingrese el año.."></b-form-input>
      </b-form-group>

      <b-form-group
        label="Cantidad de Asientos:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="item.seatNumber" placeholder="Ingrese nro asientos.."></b-form-input>
      </b-form-group>

      <b-form-group
        label="Color del Auto:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.color" placeholder="Ingrese el color del auto.."></b-form-input>
      </b-form-group>

      <b-form-group
        label="Tipo de Uso:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-select value-field="id" text-field="name" :disabled="isLoading || !optType['usetypes'].activate" v-model="item.useTypeId" :options="optType['usetypes'].options" class="mb-3"></b-form-select>
        <!--<b-forms-input :disabled="isLoading" :state="null" v-model.trim="item.use" placeholder="Elija el tipo de uso.."></b-forms-input>-->
      </b-form-group>

      <b-form-group
        label="Numero de motor:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.engineNumber" placeholder="Ingrese el nro de motor.."></b-form-input>
      </b-form-group>

      <b-form-group
        label="Tipo de vehiculo:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-select value-field="id" text-field="vehicleBrand" :disabled="isLoading || !optType['vehicletypes'].activate" v-model="item.vehicleTypeId" :options="optType['vehicletypes'].options" class="mb-3"></b-form-select>
      </b-form-group>

      <b-form-group
        label="Dueño:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-select value-field="id" text-field="razonSocial" :disabled="isLoading || !optType['webusers'].activate" v-model="item.webUserId" :options="optType['webusers'].options" class="mb-3"></b-form-select>
      </b-form-group>

      <div slot="footer">
        <template v-if="!update">
          <b-button @click="insertData" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
          <b-button :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
        </template>

        <template v-if="update">
          <b-button @click="updateData" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
          <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
        </template>
      </div>

    </b-form>
  </b-card>

</template>

<script>
  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    data () {
      return {
        optType: {
          'usetypes': {
            options: [{ id: '', name: 'Please select some item' }],
            activate: false
          },
          'vehicletypes': {
            options: [{ id: '', vehicleBrand: 'Please select some item' }],
            activate: false
          },
          'webusers': {
            options: [{ id: '', razonSocial: 'Please select some item' }],
            activate: false
          }
        }
      }
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
      insertData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: this.urlRest, data: this.item})
        self.then((data) => {
          console.log('INSERT')
          console.log(data)
          if (data.status) {
            this.addRow(data.content)
          }
        })
      },
      updateData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: this.urlRest + '/' + this.item.id, data: this.item})
        self.then((data) => {
          console.log('UPDATE')
          console.log(data.content)
          if (data.status) {
            this.addRow(data.content)
          }
        })
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
    created () {
      let vm = this
      this.$lodash.forEach(this.optType, function (value, key) {
        console.log(key)
        vm.getTypes(key)
      })
    }
  }
</script>

<style>

</style>
