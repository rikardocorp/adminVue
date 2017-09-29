<template>
  <div style="width: 100%;">
    <multiselect :hideSelected="false"
                 :multiple="true"
                 :close-on-select="false"
                 :ClearOnSelect="false"
                 :preserve-search="false"
                 :internal-search="false"
                 @search-change="searchOption"
                 :loading="(disabled || localDisabled)"
                 select-label=""
                 :disabled="disabled || localDisabled"
                 @input="emitValue" @select="pickOption"
                 @open="openSelect" @remove="removeTag"
                 :max="this.optType.length"
                 :placeholder="placeholder"
                 v-model="localValue"
                 :max-height="maxHeight"
                 :options="options">

      <template slot="tag" scope="props"><span :class="props.option.color">{{ props.option[keySearch] }}</span></template>
      <template slot="option" scope="props"><span class="option__small">{{ props.option[keySearch] }}</span></template>
      <template slot="maxElements" scope="props">Departamento-Provincia-Distrito</template>
    </multiselect>
    <!--<pre class="text-left">{{ selectValue }}</pre>-->
    <!--<p>DPD: {{value}}</p>-->
    <!--<p>LOCAL DPD: {{localValue}}</p>-->
  </div>

  <!--<pre class="language-json"><code>{{ value  }}</code></pre>-->
</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    props: ['value', 'optionStack', 'disabled', 'placeholderDefault', 'maxHeight'],
    components: {
      Multiselect: Multiselect
    },
    data () {
      return {
        optType: this.optionStack,
        localValue: [],
        options: [],
        optionsAux: [],
        indexSelect: -1,
        cen: 0,
        placeholder: '',
        keySearch: '',
        localDisabled: true,
        countLoad: 0,
        selectValue: ''
      }
    },
    methods: {
      searchOption (query) {
        let keySearch = this.keySearch
        console.log(keySearch)
        this.options = this.$lodash.filter(this.optionsAux, function (item) {
          return item[keySearch].toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      },
      loadLocalValue () {
        let vm = this
        let count = 0
        vm.localValue = []
        vm.localDisabled = false
        if (Array.isArray(this.value) && (this.value.length == this.optType.length)) {
          for (let i = 0; i < this.value.length; i++) {
            let optionType = vm.optType[i]
            let optionPick = vm.$lodash.filter(optionType.options, {'id': this.value[i]})
            // Verificamos que existe el item
            if (optionPick.length) {
              count++
              optionType.pickID = this.value[i]
              optionPick[0]['color'] = optionType.colorClass
              vm.localValue.push(optionPick[0])
            } else {
              break
            }
          }
          this.indexSelect = count
          if (count < this.optType.length) {
            this.setOptions(this.indexSelect)
          }
        }
      },
      pickOption (selectedOption) {
        this.localDisabled = true
        let vm = this
        let optionType = vm.optType[vm.indexSelect]
        optionType.pickID = selectedOption.id
        let optionPick = vm.$lodash.filter(optionType.options, {'id': selectedOption.id})
        optionPick[0]['color'] = optionType.colorClass

        this.indexSelect++
        if (this.indexSelect < this.optType.length) {
          this.setOptions(this.indexSelect)
        }
      },
      removeTag (removedOption) {
        this.localDisabled = true
        if (this.indexSelect > 0) {
          this.indexSelect--
          this.setOptions(this.indexSelect)
        }
      },
      setOptions (indexSelect) {
        let opt
        let query = {}
        for (let i = 0; i < indexSelect; i++) {
          opt = this.optType[i]
          query[opt.id] = opt.pickID
        }

        console.log(query)
        let optionType = this.optType[indexSelect]
        this.options = this.$lodash.filter(optionType.options, query)
        this.optionsAux = this.options
        console.log('OPCIONES BUSCAR ' + optionType)
        console.log(this.options)
        this.placeholder = optionType.placeholder
        this.keySearch = optionType.keySearch
      },
      openSelect () {
        if (this.indexSelect == -1) {
          this.indexSelect++
          let optionType = this.optType[this.indexSelect]
          this.options = optionType.options
          this.optionsAux = this.options
          this.placeholder = optionType.placeholder
          this.keySearch = optionType.keySearch
        }
      },
      emitValue (selectValue) {
        console.log('AAAAABBBCCCC')
        console.log(selectValue)
        this.selectValue = selectValue
        if (selectValue.length == this.optType.length) {
          let eValue = []
          for (let i = 0; i < this.optType.length; i++) {
            eValue.push(selectValue[i].id)
          }
          this.$emit('input', eValue)
          this.placeholder = ''
        }
        this.localDisabled = false
      },
      getTypes (index) {
        let url = this.optType[index].url
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        self.then((data) => {
          if (data.status) {
            console.log(data.content)
            let optionPick = this.$lodash.filter(data.content, {'id': '230101'})

            console.log('CIUDAD ' + url)
            console.log(optionPick)
            this.countLoad++
            this.optType[index].options = data.content
          }
        })
      }
    },
    watch: {
      countLoad () {
        if (this.countLoad == this.optType.length) {
          this.loadLocalValue()
        }
      },
      value (newVal) {
        console.log('WATCH DPD')
        if (this.countLoad == this.optType.length && (this.optType.length + 1 == newVal.length || newVal == '')) {
          if (newVal != '') {
            this.value.splice(0, 1)
            this.loadLocalValue()
          } else {
            this.localValue = []
            this.indexSelect = -1
          }
        }
      }
    },
    mounted () {
      let vm = this
      this.$lodash.forEach(this.optType, function (value, key) {
        vm.getTypes(key)
      })
      this.placeholder = this.placeholderDefault
    }
  }
</script>

<style scoped="">
  .badge{
    font-size: 87%;
    font-weight: 600;
    margin-left: 3px;
    border-radius: 0.3rem;
    padding: 0.25em;
    margin-bottom: 8px;
  }
</style>
