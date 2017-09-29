<template>
  <div v-show="data.$error" class="form-error-vue">
    <span v-for="item in localData" class="form-group__message" v-if="!data[item.name]"> * {{ item.text }}</span>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        text: {
          required: {
            value: 'Campo requerido!',
            params: []
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
          }
        },
        localData: {}
      }
    },
    methods: {
      existValue (value) {
        if (value == '') {
          alert('undefined')
        } else {
          alert('defined')
        }
      }
    },
    created () {
      console.log('CREATED ERROR')
      let vm = this
      let params = []
      let newText = ''
      for (let [key, value] of Object.entries(this.data)) {
        if (key[0] != '$') {
          newText = this.text[key].value
          params = this.text[key].params
          console.log('Total Params ' + params.length)
          if (params.length > 0) {
            params.forEach(function (item) {
              newText = newText.replace('$' + item, vm.data.$params[key][item])
              console.log(item)
            })
          }
          this.localData[key] = {
            name: key,
            text: newText
          }
          console.log(key + ' : ' + value)
        }
      }
      console.log(this.localData)
      console.log('-------------')
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
