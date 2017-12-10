<template>
  <div v-show="data.$error" class="form-error-vue">
    <span v-for="item in localData" class="form-group__message" v-if="!data[item.name]"> * {{ item.text }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        default: {}
      },
      async: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        text: {
          required: {
            value: 'Campo requerido!',
            params: []
          },
          minValue: {
            value: 'El valor debe ser >= a $min!',
            params: ['min']
          },
          maxValue: {
            value: 'El valor debe ser <= a $max!',
            params: ['max']
          },
          minLength: {
            value: 'Al menos $min caracteres!',
            params: ['min']
          },
          maxLength: {
            value: 'A lo mucho $max caracteres!',
            params: ['max']
          },
          between: {
            value: 'Debe estar entre $min y $max',
            params: ['min', 'max']
          },
          alpha: {
            value: 'Solo alphabet characters',
            params: []
          },
          alphaNum: {
            value: 'Solo alphanumerics',
            params: []
          },
          numeric: {
            value: 'Solo numeros',
            params: []
          },
          email: {
            value: 'Email invalido',
            params: []
          },
          url: {
            value: 'Solo Urls',
            params: []
          },
          sameAsPassword: {
            value: 'La contraseña debe ser identica',
            params: []
          }
        },
        localData: {}
      }
    },
    watch: {
      'data.$params': function (newVal, oldVal) {
        if (this.async) {
          //          console.log(newVal)
          //          console.log(oldVal)
          //          console.log('---------')
          //          alert('Change Error')
          this.createError()
        }
      }
    },
    methods: {
      existValue (value) {
        if (value === '') {
          alert('undefined')
        } else {
          alert('defined')
        }
      },
      createError () {
        let vm = this
        let params = []
        let newText = ''
        console.log(vm.data.$params)
        for (let [key, value] of Object.entries(this.data)) {
          if (key[0] !== '$') {
            newText = this.text[key].value
            params = this.text[key].params
            // console.log('Total Params ' + params.length)
            if (params.length > 0) {
              params.forEach(function (item) {
                newText = newText.replace('$' + item, vm.data.$params[key][item])
                // console.log(item)
              })
            }
            this.localData[key] = {
              name: key,
              text: newText
            }
            // console.log(key + ' : ' + value)
          }
        }
      }
    },
    created () {
      this.createError()
//      console.log('CREATED ERROR')
//      console.log(this.data.$params)
//      console.log('-------------')
    }
  }
</script>


<style lang="scss" scoped="">
  .form-error-vue{
    color: red;
    text-align: left;

    span {
      display: block;
    }

  }
</style>
