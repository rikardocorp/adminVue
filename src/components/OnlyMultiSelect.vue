<template>
  <div style="width: 100%;">
    <!--<pre>{{ localValue }}</pre>-->
    <multiselect :hideSelected="false" :multiple="true" :close-on-select="false" :ClearOnSelect="false"
                 :preserve-search="false" :internal-search="false" select-label=""
                 :loading="localIsloading"
                 :disabled="disabled || localDisabled"
                 :max="this.optionList.length"
                 :placeholder="placeholder"
                 v-model="localValue"
                 :max-height="maxHeight"
                 :options="options"
                 @select="pickOption"
                 @remove="removeOption"
                 @search-change="searchOption"
                 @input="emitValue">

      <!--@open="openSelect" @remove="removeTag"-->
      <!--@search-change="searchOption"-->

      <template slot="tag" scope="props"><span :class="props.option.color">{{ props.option[keySearch] }}</span></template>
      <template slot="option" scope="props"><span class="option__small">{{ props.option[keySearch] }}</span></template>
      <template slot="maxElements" scope="props">Departamento-Provincia-Distrito</template>
      <template slot="noResult"></template>
    </multiselect>
    <!--<pre class="text-left">{{ selectValue }}</pre>-->
    <!--<pre class="text-left">DPD: {{value}}</pre>-->
    <!--<button @click.prevent="resetSelect">reset</button>-->
    <!--<button @click.prevent="loadInitValue(value)">Init</button>-->
    <!--<pre>LOCAL DPD: {{localValue}}</pre>-->
  </div>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    props: ['value', 'optionList', 'disabled', 'placeholderDefault', 'maxHeight'],
    components: {
      Multiselect: Multiselect
    },
    data () {
      return {
        localValue: [],
        options: [],
        optionsAux: [],
        indexSelect: -1,
        placeholder: '',
        keySearch: '',
        localIsloading: true,
        localDisabled: true,
        countLoad: 0,
        selectValue: '',
        centinela: true,

        xvalue: []
      }
    },
    methods: {
      async getTypes (index) {
        let url = this.optionList[index].url
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: url, data: {key: this.optionList[index].localData}})
        if (!self.status) return false
        this.countLoad++
        this.optionList[index].options = self.content
      },
      initOption () {
        // alert('initOption')
        this.indexSelect = 0
        let optionIndex = this.optionList[this.indexSelect]
        this.keySearch = optionIndex.keySearch
        this.options = optionIndex.options
        this.optionsAux = optionIndex.options
      },
      pickOption (selectedOption) {
        this.xvalue.push(selectedOption)
        // alert('pickOption')
        this.centinela = false
        let optionIndex = this.optionList[this.indexSelect]
        optionIndex.pickID = JSON.parse(JSON.stringify(selectedOption))
        let optionPick = this.$lodash.filter(optionIndex.options, selectedOption)

        if (optionPick[0]) {
          optionPick[0]['color'] = optionIndex.colorClass
        }
        // console.log('COLOR CORLO')
        // console.log({...optionPick[0]})
        // console.log(optionIndex)
        // console.log('-----------')

        this.indexSelect++
        if (this.indexSelect < this.optionList.length) this.setOptions(this.indexSelect)
      },
      removeOption (removedOption) {
        // console.log('REMOVE OPTION')
        // console.log(removedOption)
        // console.log('---------------')
        if (this.indexSelect > 0) {
          // console.log('this.indexSelect', this.indexSelect)
          this.indexSelect--
          let optionIndex = this.optionList[this.indexSelect]
          // console.log('optionIndex', optionIndex)

          let optionPick = this.$lodash.filter(optionIndex.options, removedOption)
          // console.log('optionPick', optionPick)
          this.$delete(optionPick[0], 'color')
          this.setOptions(this.indexSelect)

          // console.log(this.indexSelect)
          let temp = this.localValue
          // console.log('temp', temp)
          temp.splice(this.indexSelect, 1)
          this.$set(this, 'localValue', temp)
          // this.value.splice(this.indexSelect, 1)
          let aux = this.localValue
          this.xvalue = aux
          // console.log(this.localValue)
          // console.log(aux)
          // console.log('---------------')
        }
        // this.$emit('input', [])
      },
      setOptions (indexSelect) {
        let opt
        let query = {}
        for (let i = 0; i < indexSelect; i++) {
          opt = this.optionList[i]
          query[opt.id] = opt.pickID
          this.$delete(query[opt.id], 'color')
        }
        let optionIndex = this.optionList[indexSelect]
        this.options = this.$lodash.filter(optionIndex.options, query)
        this.optionsAux = this.options
        this.placeholder = optionIndex.placeholder
        this.keySearch = optionIndex.keySearch
      },
      searchOption (query) {
        let keySearch = this.keySearch
        console.log(keySearch)
        console.log(this.optionsAux)
        this.options = this.$lodash.filter(this.optionsAux, function (item) {
          return item[keySearch].toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      },
      emitValue (selectValue) {
        // console.log('@@@@@ selectValue @@@@@')
        // console.log(selectValue)
        // console.log('------------------')
        // let aux = {...this.localValue}
        // let aux2 = {...this.value}
        // console.log('localValue', aux)
        // console.log('Value', aux2)
        // console.log('XVALUE', this.xvalue)
        // console.log('------------------')
        this.centinela = false
        let localValue = JSON.parse(JSON.stringify(this.xvalue))
        // console.log(localValue)
        // this.selectValue = this.value
        let eValue = []
        for (let i = 0; i < localValue.length; i++) {
          this.$delete(localValue[i], 'color')
          eValue.push(localValue[i])
        }
        // console.log('emitValue')
        // console.log(eValue)
        this.$emit('input', eValue)
        this.localValue = this.xvalue
        // console.log([])
      },
      loadInitValue (initValue) {
        console.log('@@@@@@  loadInitValue @@@@@@')
        console.log(initValue)
        if (!Array.isArray(initValue)) {
          // eslo ultimo rikardocorp
          this.xvalue = []
          this.countLoad = 0
          return false
        }

        if (typeof initValue[0] !== 'object') {
          initValue = this.textToObject(initValue)
        }
        this.resetSelect()
        let optionIndex = ''
        // console.log('loadInitValue')
        if (initValue[0] == undefined) {
          // eslo ultimo rikardocorp
          this.xvalue = []
          this.countLoad = 0
          return false
        }
        // console.log('loadInitValue pass')

        let localValue = JSON.parse(JSON.stringify(initValue))
        let vm = this
        localValue.forEach(function (value, index) {
          optionIndex = vm.optionList[index]
          vm.pickOption(value)
          value['color'] = optionIndex.colorClass
          vm.localValue.push(value)
        })
      },
      resetSelect () {
        this.placeholder = this.placeholderDefault
        this.localIsloading = false
        this.localDisabled = false
        this.initOption()
        this.localValue = []
        this.setOptions(this.indexSelect)
      },
      textToObject (location) {
        let vm = this
        let newLocation = []
        location.forEach(function (item, index) {
          let optionIndex = vm.optionList[index].options
          let obj = vm.$lodash.filter(optionIndex, function (x) {
            if (x.name === item) return x
          })
          newLocation.push(obj[0])
        })
        return newLocation
      }
    },
    watch: {
      countLoad (newVal, oldVal) {
        console.log('countLoad')
        console.log(newVal)
        if (newVal === this.optionList.length) {
          this.localIsloading = false
          this.localDisabled = false
          this.initOption()
          this.loadInitValue(this.value)
        }
      },
      value (newVal, oldVal) {
        console.log('value')
        console.log(newVal)
        console.log(this.centinela)
        if (this.centinela) {
//          if (typeof newVal[0] !== 'object') {
//            newVal = this.textToObject(newVal)
//          }
          this.loadInitValue(newVal)
        }
        this.centinela = true
      }
    },
    created () {
      let vm = this
      this.optionList.forEach(function (value, key) {
        vm.getTypes(key)
      })
      this.placeholder = this.placeholderDefault
    }
  }
</script>

<style lang="scss" scoped="">
  .multiselect__tags-wrap{
    span{
      padding: 0.4em;
      margin-left: 0.2em;
      border-radius: 0.55em;
      &:first-child{
        margin-left: 0;
      }
    }
  }
</style>
