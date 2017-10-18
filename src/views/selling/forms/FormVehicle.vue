<template>

  <b-form class="col-md-8 col-lg-6 col-xl-5 m-auto pt-3 pb-4" :id="'form' + index">

    <b-form-group v-for="(option, _index) in optInput" :key="_index"
                  :class="{ 'form-group--error': $v.item[_index]? $v.item[_index].$error : false, 'text-left': true}"
                  :label-cols="lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

      <!-- INPUT -->
      <b-input-group v-if="option.input==undefined || option.input=='input'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon  "></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>
      </b-input-group>

      <!-- INPUT-SEARCH -->
      <b-input-group v-if="option.input=='input-search'">
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon  "></i></b-input-group-addon>
        <b-form-input :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.once.native="searchPlate"
                      :placeholder="option.placeholder+'..'"></b-form-input>
        <b-input-group-button>
          <b-btn :disabled="isLoading || restricted" variant="primary" @click="searchPlate"><i class="fa fa-search"></i></b-btn>
        </b-input-group-button>
      </b-input-group>

      <!-- ERROR MESSAGE-->
      <form-error :data="$v.item[_index]? $v.item[_index] : {} "></form-error>
    </b-form-group>

  </b-form>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import Multiselect from 'vue-multiselect'
  import FormError from '../../../components/FormError.vue'
  import Avatar from '../../../components/Avatar.vue'
  import {DATA_VEHICLE as _vehicle} from '../../../data/dnNewSales'

  export default {
    components: {
      Datepicker,
      Multiselect,
      FormError,
      Avatar
    },
    props: ['urlRest', 'item', 'update', 'horizontal', 'index', 'keyname', 'restricted', 'dispatch'],
    data () {
      return {
        optInput: _vehicle.input,
        lCols: 4,
        owner: null,
        value: [],
        color: '',
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isInvalid () {
        return this.$v.item.$invalid
      }
    },
    validations () {
      return _vehicle.validate
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
                this.$set(this.item, 'manufacturingYear', data.content[0].manufacturingYear)
                this.$set(this.item, 'seatNumber', data.content[0].seatNumber)
                this.$set(this.item, 'engineNumber', data.content[0].engineNumber)
//                this.$set(this.item, 'manufacturingYear', data.content.manufacturingYear)
//                this.$emit('connection', this.name, data.content)
                console.log('Tiene duseño')
              } else {
                console.log('No tiene duseño')
                this.owner = false
                this.$emit('connection', this.name, null)
              }
            } else {
              console.log('Error: ' + url)
              console.log(data.content)
            }
          })
        }
      }
    },
    watch: {
      isInvalid (newVal) {
        this.$emit('connection', 'isValid', newVal)
      },
      dispatch () {
        console.log('VALIDAAAAAAAAA')
        console.log(this.isInvalid + ' ffweffw')
        this.$v.item.$touch()
      }
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
