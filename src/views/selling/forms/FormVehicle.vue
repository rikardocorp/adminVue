<template>

  <b-form class="col-md-6 m-auto pt-3 pb-4" :id="'form' + index">
    <b-form-group class=""
                  label="Placa:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal" :label-cols="lCols" >
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-hashtag"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.licensePlate" @blur.native="searchPlate" placeholder="Ingrese su placa.."></b-form-input>
        <b-input-group-button>
          <b-btn :disabled="isLoading" variant="primary" @click="searchPlate"><i class="fa fa-search"></i></b-btn>
        </b-input-group-button>
      </b-input-group>
    </b-form-group>

    <b-form-group class=""
                  label="Nro Serie:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal" :label-cols="lCols" >
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-hashtag"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || owner" :state="null" v-model.trim="item.engineNumber" placeholder="Ingrese numero de serie.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group class=""
                  label="Nro Asientos:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal" :label-cols="lCols" >
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-hashtag"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || owner" type="number" :state="null" v-model.trim="item.seatNumber" placeholder="Ingrese asientos.."></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group class=""
                  label="Año Fabric:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal" :label-cols="lCols" >

      <b-input-group>
        <b-input-group-addon class="bg-primary"><i class="fa fa-calendar-o"></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || owner" type="number" :state="null" v-model.trim="item.manufacturingYear" placeholder="Ingrese año de fabricacion.."></b-form-input>
      </b-input-group>

    </b-form-group>

    <b-form-group class=""
                  label="Color:"
                  feedback="feedback"
                  :state="null"
                  :horizontal="horizontal" :label-cols="lCols" >
      <picker-color :disabled="isLoading || owner" v-model="item.color" :options="options" :size="1.2" :iconShow="true"></picker-color>
    </b-form-group>

    <div class="mt-4">
      <div v-if="owner==null" class="media owner-card" style="font-size: 0.6em;">
        <div class="d-flex align-self-center mr-3 rounded-circle">
          <i class="fa fa-question d-flex align-items-center m-auto fa-3x text-secondary"></i>
        </div>
        <div class="media-body">
          <p class="text-secondary fa-2x text-center pt-2">Vehiculo sin propietario</p>
        </div>
      </div>

      <transition appear mode="out-in" name="custom-classes-transition" enter-active-class="animated pulse">
        <div key="div" v-if="owner==true" class="media owner-card" style="border-color: #ef7b21;">

          <div class="d-flex align-self-center mr-3 hvr-bounce-in" @click="owner=!owner">
            <avatar username="Jane Doe"
                    :size="5" sizeUnid="em"
                    src="/static/img/avatars/5.jpg"
                    :border="true" colorBorder="#ef7b1f" :sizeBorder="0.35" style="cursor: pointer;"></avatar>
          </div>

          <div class="media-body">
            <h6 class="mt-2 mb-1 text-primary">Juana Arco Perez Perez perez</h6>
            <p>Username: rikardo.corp</p>
            <p>Email: rikardo.corp@gmail.como</p>
          </div>
        </div>

        <div key="div2" v-if="owner==false" class="media owner-card opposite ">

          <div class="media-body text-right">
            <h6 class="mt-2 mb-1">Registrar Nuevo Usuario</h6>
            <p>Se creara una cuenta de usuario</p>
            <p>con los datos del contratante.</p>
          </div>

          <div class="d-flex align-self-center ml-3 rounded-circle hvr-bounce-out" @click="owner=!owner">
            <i class="fa fa fa-user-plus d-flex align-items-center m-auto fa-3x text-secondary"></i>
          </div>
        </div>
      </transition>

    </div>

    <!--<div slot="footer">-->
      <!--<b-forms-group :horizontal="horizontal">-->
        <!--<template v-if="!update">-->
          <!--<b-button @click="insertData" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>-->
          <!--<b-button :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>-->
        <!--</template>-->

        <!--<template v-if="update">-->
          <!--<b-button @click="updateData" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>-->
          <!--<b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>-->
        <!--</template>-->
      <!--</b-forms-group>-->
    <!--</div>-->
  </b-form>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import Multiselect from 'vue-multiselect'
  import PickerColor from '../../../components/PickerColor.vue'
  import Avatar from '../../../components/Avatar.vue'
//  import { Compact } from 'vue-color'
  export default {
    components: {
      Datepicker,
      Multiselect,
      PickerColor,
      Avatar
    },
    props: ['urlRest', 'item', 'update', 'horizontal', 'index', 'name'],
    data () {
      return {
        lCols: 4,
        owner: null,
        value: [],
        color: '',
        ownerItem: {},
        options: [
          {id: 'Blanco', code: 'white', border: 'gray'},
          { id: 'Negro', code: 'black' },
          { id: 'Gris', code: 'gray' },
          { id: 'Amarillo', code: 'yellow' },
          { id: 'Naranja', code: 'orange' },
          { id: 'Rojo', code: 'red' },
          { id: 'Verde', code: 'green' },
          { id: 'Celeste', code: 'skyblue' },
          { id: 'Azul', code: 'blue' }
        ]
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      searchPlate () {
        console.log('CONSULTA PLACA?')
        let plate = this.item.licensePlate
        if (plate !== '') {
          let url = 'vehicles/filter?licensePlate=' + plate + '&strict=1'
          let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              console.log(data.content)
              if (data.content.length > 0) {
                this.owner = true
                this.$emit('connection', this.name, data.content)
                console.log('Tiene duseño')
                this.searchWebuser(data.content[0].webUserId)
              } else {
                console.log('No tiene duseño')
                this.owner = null
                this.$emit('connection', this.name, null)
              }
            } else {
              console.log('Error: ' + url)
              console.log(data.content)
            }
          })
        }
      },
      searchWebuser (id) {
        let url = 'webusers/' + id
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        self.then((data) => {
          console.log(data)
          if (data.status) {
            console.log(data.content)
            if (data.content.length > 0) {
              this.ownerItem = data.content
            } else {
              console.log('Error Extraño searchWebuser')
            }
          } else {
            console.log('Error: ' + url)
            console.log(data.content)
          }
        })
      },
      addRow (newItem) {
        this.$emit('connection', newItem)
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
      addTag (newTag) {
        const tag = {
          id: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.value = tag
      },
      existImage (src, local = true) {
        let url = local ? window.location.origin + src : src
        let self = this.$store.dispatch('dispatchHTTP', {type: 'FILE', url: url})
        return self.then((data) => {
          console.log('TEST IMG')
          console.log(data)
          return true
        }).catch((data) => {
          console.log('TEST IMG ERRROR')
          console.log(data)
          return false
        })
      }
    },
    created () {
      console.log('PRUEBA RRRCORP')
      console.log(this['options'])
      this.existImage('/static/img/avatars/5.jpg').then((result) => {
        console.log('TEST IMG')
        console.log('TEST IMG')
        console.log('TEST IMG')
        console.log('TEST IMG')
        console.log('TEST IMG')
        console.log('TEST IMG')
        console.log(result)
      })
    }
  }
</script>

<style lang="scss">

  /*.optionColor{*/
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 0;*/
    /*height: 40px;*/
    /*width: 100%;*/
  /*}*/

  .owner-card{
    border-radius: 3.2em 0.5em 0.5em 3.2em;
    background: #f5f5f5;
    border: 1px dashed #b9b9b9;
    padding: 0.4em;

    &.opposite{
      border-radius: 0.5em 3.2em 3.2em 0.5em;
    }

    div.rounded-circle{
      width: 5em;
      height: 5em;
      background: white;
      img{
        margin: 7%;
        width: 86%;
        cursor: pointer;
      }

    }

    .media-body{
      font-size: 0.8em;
      p {
        margin: 0;
      }
      h6 {
        overflow: hidden;
        height: 18px;
      }
    }

  }
</style>
