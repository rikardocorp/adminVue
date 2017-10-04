<template>

  <b-form class="col-md-6 m-auto pt-3 pb-4" :id="'form' + index">

    <b-form-group v-for="(option, _index) in optInput" :key="_index"
                  :class="{ 'form-group--error': $v.item[_index]? $v.item[_index].$error : false, 'text-left': true}"
                  :label-cols="lCols"
                  :label="option.label + ':'"
                  :horizontal="horizontal">

      <!-- INPUT -->
      <b-input-group>
        <b-input-group-addon class="bg-primary"><i :class="'fa ' + option.icon  "></i></b-input-group-addon>
        <b-form-input v-if="option.input==undefined || option.input=='input'"
                      :disabled="isLoading || restricted" :type="option.type"
                      v-model.trim="item[_index]"
                      @blur.native="$v.item[_index]? $v.item[_index].$touch(): false"
                      :placeholder="option.placeholder+'..'"></b-form-input>
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
    watch: {
      isInvalid (newVal) {
        this.$emit('connection', 'isValid', newVal)
      },
      dispatch () {
//        alert(this.isInvalid + ' ffweffw')
        console.log('VALIDAAAAAAAAA')
        console.log(this.isInvalid + ' ffweffw')
        this.$v.item.$touch()
      }
    },
    created () {
      console.log('PRUEBA RRRCORP')
      console.log(this['options'])
      this.existImage('/static/img/avatars/5.jpg').then((result) => {
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
