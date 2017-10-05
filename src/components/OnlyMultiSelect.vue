<template>
  <div style="width: 100%;">
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
    </multiselect>
    <!--<pre class="text-left">{{ selectValue }}</pre>-->
    <!--<pre>DPD: {{value}}</pre>-->
    <!--<pre>LOCAL DPD: {{localValue}}</pre>-->
    <!--<pre class="language-json"><code>{{ localValue  }}</code></pre>-->

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
        cen: 0,
        placeholder: '',
        keySearch: '',
        localIsloading: true,
        localDisabled: true,
        countLoad: 0,
        selectValue: ''
      }
    },
    methods: {
      async getTypes (index) {
        let url = this.optionList[index].url
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        if (!self.status) return false
        this.countLoad++
        this.optionList[index].options = self.content
      },
      initOption () {
        this.indexSelect = 0
        let optionIndex = this.optionList[this.indexSelect]
        this.keySearch = optionIndex.keySearch
        this.options = optionIndex.options
        this.optionsAux = optionIndex.options
        // indexSelect = 0
      },
      pickOption (selectedOption) {
        let optionIndex = this.optionList[this.indexSelect]
        optionIndex.pickID = JSON.parse(JSON.stringify(selectedOption))
        let optionPick = this.$lodash.filter(optionIndex.options, selectedOption)
        optionPick[0]['color'] = optionIndex.colorClass
        this.indexSelect++
        if (this.indexSelect < this.optionList.length) this.setOptions(this.indexSelect)
      },
      removeOption (removedOption) {
        if (this.indexSelect > 0) {
          this.indexSelect--
          let optionIndex = this.optionList[this.indexSelect]
          let optionPick = this.$lodash.filter(optionIndex.options, removedOption)
          this.$delete(optionPick[0], 'color')
          this.setOptions(this.indexSelect)
        }
      },
      setOptions (indexSelect) {
        let opt
        let query = {}
        for (let i = 0; i < indexSelect; i++) {
          opt = this.optionList[i]
          query[opt.id] = opt.pickID
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
        let localValue = JSON.parse(JSON.stringify(selectValue))
        this.selectValue = selectValue
        if (localValue.length === this.optionList.length) {
          let eValue = []
          for (let i = 0; i < this.optionList.length; i++) {
            this.$delete(localValue[i], 'color')
            eValue.push(localValue[i])
          }
          this.$emit('input', eValue)
          this.placeholder = ''
        }
      },
      loadInitValue () {
        if (!Array.isArray(this.value)) return false
        let optionIndex = ''
        let localValue = JSON.parse(JSON.stringify(this.value))
        let vm = this
        localValue.forEach(function (value, index) {
          optionIndex = vm.optionList[index]
          vm.pickOption(value)
          value['color'] = optionIndex.colorClass
          vm.localValue.push(value)
        })
      }
    },
    watch: {
      countLoad (newVal, oldVal) {
        if (newVal === this.optionList.length) {
          this.localIsloading = false
          this.localDisabled = false
          this.initOption()
          this.loadInitValue()
        }
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
