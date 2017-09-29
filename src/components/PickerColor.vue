<template>
  <div>
    <b-input-group>
      <b-input-group-addon v-if="iconShow" :class="iconVagrant"><i :class="icon"></i></b-input-group-addon>
      <b-form-input :disabled="disabled" :state="null"
                    v-model.trim="localValue"
                    :placeholder="placeholder"
                    @click.prevent.native="show=true"
                    @focus.prevent.native="show=true"
                    @blur.prevent.native="deactivate"
                    @keyup.esc.native="show=false" autocomplete="off"></b-form-input>
    </b-input-group>
    <div v-show="show" class="pick-color" :style="'width:' + width + '; font-size:' + size +'em'"
         @mouseover="overShow=true"
         @mouseleave="overShow=false">
      <span v-for="color in options" @click="pickColor(color)"
            :title="color.id" :style="'color:' + color.code + '; background:' + color.code  + '; border-color:' + color.border">0</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        default: ''
      },
      placeholder: {
        default: 'Ingrese un color..'
      },
      disabled: {
        default: false
      },
      options: {
        default: []
      },
      width: {
        default: '95%'
      },
      size: {
        default: 1
      },
      iconShow: {
        default: false
      },
      icon: {
        default: 'fa fa-paint-brush'
      },
      iconVagrant: {
        default: 'bg-primary'
      }
    },
    data () {
      return {
        localValue: '',
        show: false,
        overShow: false
      }
    },
    methods: {
      deactivate () {
        if (!this.overShow) {
          this.show = false
        }
      },
      pickColor (value) {
        this.localValue = value.id
      }
    },
    watch: {
      localValue (newVal, oldVal) {
        console.log(newVal)
        this.show = false
        this.$emit('input', newVal)
      },
      value (newVal, oldVal) {
        this.localValue = newVal
      }
    }
  }
</script>


<style lang="scss">
  .pick-color{
    z-index: 1;
    width: 95%;
    text-align: center;
    background: #f4f3ef;
    overflow: hidden;
    padding: 3%;
    border-radius: 0.5em;
    box-shadow: 0px 5px 10px -4px dimgrey;
    border: 1px solid #e0e0e0;
    position: absolute;
    box-sizing: border-box;
    margin-top: 6px;
    span{
      width: 1.6em;
      font-size: 1em;
      display: inline-block;
      margin: 0.2em;
      border-radius: 0.3em;
      cursor: pointer;
      border: 1px solid
    }
  }
</style>
