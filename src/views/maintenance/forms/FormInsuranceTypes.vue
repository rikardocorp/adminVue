<template>
  <b-card>
    <div slot="header" class="text-center">
      <strong>Tipo</strong> de Seguros
    </div>
    <b-form>
      <b-form-group class="text-right"
        label="Nombre:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.name" placeholder="Ingrese su nombre.."></b-form-input>
      </b-form-group>

      <b-form-group class="text-right"
        label="Descripción:"
        feedback="feedback"
        :state="null"
        :horizontal="horizontal">
        <b-form-textarea :disabled="isLoading"
                         v-model="item.description"
                         placeholder="Ingrese descripcion.."
                         :rows="3"
                         :max-rows="6"
                         :state="null"></b-form-textarea>
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
    components: {
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
      }
    }
  }
</script>

<style>

</style>
