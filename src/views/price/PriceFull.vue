<template>
  <div class="wrapper">
    <b-card class="myCard">
      <div slot="header" class="text-center">
        <strong>Busqueda de Precios</strong>
      </div>
      <b-form :id="name + urlRest">
        <div class="row">
          <b-form-group v-for="(option, index) in optInput" :key="index" :label-sr-only="option.srOnly"
                        :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-right': true, 'col-md-2 float-left': true}"
                        :label-cols="option.srOnly ? null : lCols"
                        :label="option.label + ':'"
                        :horizontal="horizontal">

            <!-- INPUT -->
            <b-form-input v-if="option.input==undefined || option.input=='input'"
                          :disabled="isLoading" :type="option.type"
                          v-model.trim="item[index]"
                          @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                          :placeholder="option.placeholder+'..'"></b-form-input>

            <!-- TEXTAREA -->
            <b-form-textarea v-else-if="option.input=='textarea'"
                             :disabled="isLoading"
                             v-model.trim="item[index]"
                             :placeholder="option.placeholder+'..'"
                             @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                             :rows="3" :max-rows="6"></b-form-textarea>

            <!-- MULTISELECT -->
            <multiselect v-else-if="option.input=='multiselect'"
                         :close-on-select="true" :hide-selected="true" :preserve-search="false" :taggable="false" select-label=""
                         :placeholder="option.placeholder"
                         :label="option.params.label" :track-by="option.params.label"
                         :loading="!option.params.activate"
                         :disabled="!option.params.activate || isLoading"
                         v-model="item[index]"
                         :options="option.params.options"

                         @blur.native="$v.item[index]? $v.item[index].$touch(): false">
            </multiselect>

            <!-- DATEPICKER -->
            <datepicker v-else-if="option.input=='datepicker'"
                        v-model="option.params.value" :format="option.params.format" language="es" :placeholder="option.placeholder"
                        :clear-button="false" :bootstrapStyling="true" calendar-button-icon="fa fa-calendar"
                        :disabled-picker="isLoading"
                        :disabled="option.params.disabled"
                        @input="selectDate" calendar-class="myDatepicker-style" wrapper-class="myDatepicker-content"
                        @opened="openSelect(option.params.key)"
                        @blur.native="$v.item[index]? $v.item[index].$touch(): false"></datepicker>

            <!-- ERROR MESSAGE-->
            <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
          </b-form-group>

          <b-form-group :horizontal="horizontal" :label-cols="null" :label-sr-only="true" class="col-md-2 text-right">
            <b-button @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-search"></i>Buscar</b-button>
            <b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i></b-button>
          </b-form-group>
        </div>
        <div class="row"></div>
        <!--<pre>{{ item }}</pre>-->
        <!--<pre>{{ vehicle }}</pre>-->
      </b-form>
    </b-card>

    <b-card class="myCard">
      <div slot="header" class="text-center">
        Tabla de <strong>Precios</strong>
      </div>
      <div class="col-md-4 mt-1">
          <toggle-button :labels="{checked: 'Edit', unchecked: 'NoEdit'}" :color="{checked: 'rgb(239, 123, 34)', unchecked: 'rgb(113, 113, 113)'}"
                         :width="75" :height="32" v-model="edit" class="mr-2 float-left">
          </toggle-button>
      </div>
      <div class="col-md-5 ml-auto mb-3">
          <b-form-input v-model="filter" placeholder="Buscar"  class="searchInput"/>
      </div>
      <div class="myEditTable">
        <b-table :fields="fields" :items="items" class="editTable bg-white" bordered :filter="filter" @filtered="onFiltered">
          <template v-for="f in fields" :slot="f.key" scope="data">
            <div class="itemEditTable" v-if="f.key==='vehicle'">
              <span class="labelCol">
                {{ data.value.vehicleType.vehicleBrand }}-{{ data.value.vehicleType.vehicleModel }}-{{ data.value.vehicleClass.description}}-{{ data.value.vehicleCategory.description}}
                [{{data.value.seatNumber}}{{data.value.seatNumberTo === data.value.seatNumber ? ']': '-' + data.value.seatNumberTo + ']'}}
              </span>
              <span></span>
            </div>
            <div class="itemEditTable" v-else="">
              <span :class="{'textActive': !edit}">{{ data.value }}</span>
              <b-form-input :id="f.key + '_' + data.item.vehicle.id" type="number" v-model="data.item[f.key]"
                            :class="{'editActive': edit, 'text-center': true}"
                            placeholder="Precio.."
                            @change.native="changeValue($event.target, f.key, data.item.vehicle, data.item[f.key])"></b-form-input>
            </div>
          </template>
        </b-table>
      </div>
      <div class="col-md-5 ml-auto text-right">
        <b-button @click.prevent="processData" :disabled="isLoading" type="submit" size="sm" variant="primary">
          <i class="fa fa-check"></i>Registrar
        </b-button>
      </div>
    </b-card>

    <!--<b-card class="fullPricesCard">-->
      <!--<div class="col-md-5 ml-auto">-->
        <!--<b-button @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-search"></i>Buscar</b-button>-->
        <!--<b-button @click="resetForm(name + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i></b-button>-->
      <!--</div>-->
    <!--</b-card>-->

    <pre>{{ changeList }}</pre>
    <!--<pre>{{ item }}</pre>-->
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  import FormError from '../../components/FormError.vue'
  import ToggleButton from '../../components/ToggleButton.vue'
  import Mixin from '../../mixins'
  import {DATA_FORM_PRICE as dataForm, DATA as nData} from '../../data/dnInsurancePrices'

  export default {
    mixins: [Mixin],
    data () {
      return {
        name: 'form-',
        urlRest: 'fullPrice',
        item: nData.post,
        optInput: dataForm.input,
        selectedKey: '',
        multiselectKeys: [],
        datepickerKeys: [],
        lCols: 4,
        horizontal: false,
        filter: null,

        // Note 'isActive' is left out and will not appear in the rendered table
        changeList: {},
        edit: false,
        fields: [],
        items: []
      }
    },
    validations () {
      return dataForm.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      processData () {
        let invalid = this.$v.item.$invalid
        if (!invalid) {
          let data = this.convertList(this.changeList)
          if (data.length === 0) return false
          let url = 'insuranceprices/multiple'
          let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: url, data: data})
          self.then((data) => {
            console.log(data)
            if (data.status) {
              console.log('SUCCESS')
              console.log(data.content)
            } else {
              console.log('ERROR')
              console.log(data)
            }
          }).catch(error => {
            console.log('ERROR 2')
            console.log(error)
          })
        } else {
          this.$v.item.$touch()
        }
      },
      changeValue (event, column, row, price) {
        event.classList.add('isChange')
        let id = column + '_' + row.id
        let data = {
          price: price,
          insuranceCompany: this.item.insuranceCompany,
          insuranceType: this.item.insuranceType,
          date: this.item.date,
          region: {id: column},
          useType: this.item.useType,
          observation: '',
          validityDate: this.item.validityDate,
          vehicleClass: row.vehicleClass,
          vehicleCategory: row.vehicleCategory
        }
        this.$set(this.changeList, id, data)
        console.log(id)
        console.log(data)
      },
      convertList (list) {
        let newList = []
        this.$lodash.forEach(list, function (value, key) {
          newList.push(value)
        })
        return newList
      },
      async generateFields () {
        let region = await this.getData('regions')
        let fields = [{key: 'vehicle', label: 'Tipos Vehiculos', thStyle: 'width: 300px', variant: 'secondary', 'class': 'text-center'}]
        region.forEach(function (item) {
          fields.push({
            key: item.id,
            label: item.name,
            sortable: true,
            'class': 'text-center'
          })
        })
        this.fields = fields
      },
      async generateItems () {
        let data = await this.getData('vehicletypecategories/filter')
        let items = []
        data.forEach(function (item) {
          items.push({ vehicle: item })
        })
        this.items = items
      },
      async getData (url) {
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        return self.status ? self.content : []
      },
      // form
      selectDate (pickDate) {
        console.log('pickDate')
        console.log(pickDate)
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
          console.log(newDate)
          console.log(this.tranformFormatToDate(newDate, '/'))
        }
        let key = this.selectedKey
        this.item[key] = newDate
      },
      selectOption (selectedOption) {
        console.log(selectedOption)
        let key = this.selectedKey
        this.item[key] = selectedOption === null ? '' : selectedOption.id
      },
      openSelect (id) {
        console.log('AAAAAAA ' + id)
        this.selectedKey = id
      },
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'LOAD_TABLE', url: urlRest, data: {key: this.optInput[index].params.localData}})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      },
      setMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          let options = vm.optInput[key].params.options
          let idKey = vm.optInput[key].params.key
          let optionPick = vm.$lodash.filter(options, {'id': vm.item[idKey]})
          if (optionPick.length > 0) {
            vm.optInput[key].params.value = optionPick[0]
          } else {
            vm.optInput[key].params.value = ''
          }
        })
      },
      setDatepicker () {
        let vm = this
        this.$lodash.forEach(this.datepickerKeys, function (key) {
          let optionPick = vm.item[key]
          if (optionPick !== '') {
            let toDay = vm.$moment(optionPick, 'DD/MM/YYYY')
            vm.optInput[key].params.value = toDay.format()
          } else {
            vm.optInput[key].params.value = ''
          }
        })
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.multiselectKeys, function (key) {
          vm.item[key] = ''
        })
      },
      resetDatepicker () {
        let vm = this
        this.$lodash.forEach(this.datepickerKeys, function (key) {
          vm.optInput[key].params.value = ''
        })
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.resetDatepicker()
        this.resetMultiSelect()
        this.$v.item.$reset()
      },
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    mounted () {
      this.generateFields()
      this.generateItems()
    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optInput, function (value, key) {
        if (vm.optInput[key].input === 'multiselect') {
          vm.multiselectKeys.push(key)
          if (vm.optInput[key].params.loadData) {
            vm.getOption(value.params.url, key)
          } else {
            vm.optInput[key].params.activate = true
          }
        } else if (vm.optInput[key].input === 'datepicker') {
          vm.datepickerKeys.push(key)
          if (value.params.disabled) {
            let date = vm.$store.getters.getDateTime.date
            let toDay = vm.$moment(date, 'DD/MM/YYYY').add(value.params.moreDays, 'days')
            let day = toDay.get('date')
            let month = toDay.get('month')
            let year = toDay.get('year')
            value.params.disabled.to = new Date(year, month, day)
            value.params.disabled.from = new Date(year + 1, month, day)
          }
        }
      })
    },
    components: {
      ToggleButton,
      Multiselect,
      Datepicker,
      FormError
    }
  }
</script>

<style lang="scss">
  .fullPricesCard{
    background: #212120;
    .searchInput{
      background: #717171;
      border: #212120 1px solid;
      color: white;
    }
  }

  #form-fullPrice{
    .form-group{
      margin: 0;
      padding: 0;
    }
    .myDatepicker-content{
      input{
        height: 2.85em;
      }
    }
    /*.multiselect__tags,*/
    /*.multiselect__tags input,*/
    /*input.form-control{*/
      /*background: #ffa501;*/
      /*border-color: black;*/
      /*color: black;*/
    /*}*/
    .multiselect__content-wrapper{
      border: none;
    }
    .multiselect--disabled,
    .multiselect--disabled .multiselect__select{
      background: none;
    }
    input::-webkit-input-placeholder{
      color: #3a3a3a;
    }
    button.btn{
      padding: 0.5rem;
    }
  }

  .myEditTable{
    width: 100%;
    overflow: scroll;
  }
  .editTable{
    font-size: 0.8em;
    thead{
      tr th:first-child{
        /*background: #212120;*/
        /*color: #c7c7c7;*/
        background: #717171;
        color: #ffffff;
        div {
          width: 210px;
          font-size: 1em;
        }
      }
      tr th{
        background: #717171;
        color: white;
        /*background: #ffa501;*/
        /*color: black;*/
        font-weight: 400;
        border: 1px solid #333332 !important;
        div {
          width: 75px;
          font-size: 0.9em;
        }
      }
    }

    tbody{
      tr td:first-child{
        //border: 1px solid #ef7b1f;
        font-weight: 700;
      }
    }

    .itemEditTable{
      span{
        display: none;
        padding: 12px 8px;
        height: 44px;
        line-height: 2em;
        &.textActive{
          display: block;
        }
        &.labelCol{
          display: block;
          background: #f4f3ef;
          /*color: #c7c7c7;*/
          //background: #ffa501;
          color: #717171;
        }
      }
      input{
        font-weight: 500;
        background: white;
        display: none;
        height: 44px;
        border-radius: initial;
        border: none;
        color: #ef7b22;
        font-size: 1.2em;
        &.editActive{
          display: block;
          &:visited, &:focus{
            color: #49abca;
          }
        }
        &.isChange{
          color: orange;
        }
      }
    }
    td{
      padding: 0;
      // border: 1px solid #212120;
    }
  }
</style>
