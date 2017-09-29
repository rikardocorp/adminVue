<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Usuarios</strong> del Sistema
    </div>
    <b-form>
      <b-form-group class="text-right" :label-cols="lCols"
        label="Nombres:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.firstName" placeholder="Ingrese su nombre.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Apellidos:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.lastName" placeholder="Ingrese su apellido.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Email:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="email" :state="null" v-model.trim="item.email" placeholder="Ingrese su email.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Telefono:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number" :state="null" v-model.trim="item.phone" placeholder="Ingrese su numero telefonico.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Username:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.username" placeholder="Ingrese un username.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right" :label-cols="lCols"
        label="Password:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="password" :state="null" v-model.trim="item.password" placeholder="Ingrese un password.."></b-form-input>
      </b-form-group>

      <!-- roles -->
      <b-form-group class="text-right" :label-cols="lCols"
        label="ROLES:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-select value-field="id" :disabled="isLoading || !optType['roles'].activate" v-model="item.role" :options="optType['roles'].options"></b-form-select>
      </b-form-group>

      <div class="row">
        <div class="col-xs-6 col-md-6">
          <b-form-group class="text-right"
            label="Gastos:"
            feedback="feedback"
            :state="null"
            :horizontal="horizontal"
            :labelCols="5">
            <c-switch type="text" variant="warning" on="On" off="Off" :pill="true" v-model="item.expense"/>
          </b-form-group>
        </div>
        <div class="col-xs-6 col-md-6">
          <b-form-group class="text-right"
            label="Activo:"
            feedback="feedback"
            :state="null"
            :horizontal="horizontal"
            :labelCols="5">
            <c-switch type="text" variant="warning" on="On" off="Off" :pill="true" v-model="item.enabled"/>
          </b-form-group>
        </div>
      </div>

      <div slot="footer">
        <b-form-group :horizontal="horizontal">
          <template v-if="!update">
            <b-button @click="insertData" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </template>

          <template v-if="update">
            <b-button @click="updateData" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
          </template>
        </b-form-group>
      </div>

    </b-form>
  </b-card>

</template>

<script>
  import cSwitch from '../../../components/Switch'

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
    components: {
      cSwitch: cSwitch
    },
    data () {
      return {
        lCols: 4,
        optType: {
          'roles': {
            options: ['Please select some item'],
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
