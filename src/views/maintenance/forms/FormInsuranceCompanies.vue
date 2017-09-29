<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Compañias</strong> Aseguradoras
    </div>
    <b-form>
      <b-form-group class="text-right"
        label="Compañia:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.name" placeholder="Ingrese nombre.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right"
        label="Telefono:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="number"  :state="null" v-model.trim="item.phone" placeholder="Ingrese numero telefonico.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right"
        label="Direccion:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.address" placeholder="Ingrese una direccion.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right"
        label="Email:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" type="email" :state="null" v-model.trim="item.email" placeholder="Ingrese un email.."></b-form-input>
      </b-form-group>

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

  export default {
    props: ['urlRest', 'item', 'update', 'horizontal'],
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
      }
    }
  }
</script>

<style>

</style>
