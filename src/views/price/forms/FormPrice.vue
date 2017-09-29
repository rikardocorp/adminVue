<template>
  <b-card>
    <span id="returnVehicle" class="input-group-addon bg-primary" @click="returnMain">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </span>
    <div slot="header" class="text-center">
      Registrar Precios
      <strong>
        <p class="color-primary bold">{{ vehicle.vehicleBrand }} - {{ vehicle.vehicleModel}} - Cat. {{ vehicle.category }}</p>
      </strong>
    </div>
    <b-form :id="'forms-'+ urlRest">

      <b-form-group v-for="(option, index) in optType" :key="index"
                    feedback="feedback"
                    :state="null"
                    :label="option.title"
                    :horizontal="horizontal" :label-cols="3" class="text-right">

        <multiselect :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="false" :taggable="false"
                     select-label=""
                     :label="option.label" :track-by="option.label"
                     :loading="!option.activate"
                     :disabled="!option.activate"
                     :placeholder="option.placeholder"
                     v-model="option.value"
                     :options="option.options"
                     @input="selectOption"
                     @open="openSelect(option.key)">
        </multiselect>
      </b-form-group>

      <b-form-group class="text-right"
                    label="Precio:"
                    feedback="feedback"
                    :state="null"
                    :horizontal="horizontal">
        <b-form-input :disabled="isLoading" :state="null" v-model.trim="item.price" placeholder="Ingrese el precio.."></b-form-input>
      </b-form-group>

      <!--<b-forms-group class="text-right"-->
                    <!--label="Precio:"-->
                    <!--feedback="feedback"-->
                    <!--:state="null"-->
                    <!--:horizontal="horizontal">-->
        <!--<b-forms-input :disabled="isLoading" :state="null" v-model.trim="item.validityDate" placeholder="Ingrese el precio.."></b-forms-input>-->
      <!--</b-forms-group>-->

      <!--<b-forms-group class="text-right"-->
                    <!--label="Fecha Valida:"-->
                    <!--feedback="feedback"-->
                    <!--:state="null"-->
                    <!--:horizontal="horizontal">-->

        <!--<calendar :value="value"-->
                  <!--:disabled-days-of-week="disabled"-->
                  <!--:format="format" :clear-button="clear"-->
                  <!--:placeholder="placeholder" :width="'100%'"></calendar>-->

      <!--</b-forms-group>-->

      <!--<b-forms-group class="text-right"-->
                    <!--label="Fecha Valida:"-->
                    <!--feedback="feedback"-->
                    <!--:state="null"-->
                    <!--:horizontal="horizontal">-->

        <!--<datepicker v-model="date" min="25/09/2017" max="29/09/2017"></datepicker>-->
      <!--</b-forms-group>-->

      <b-form-group class="text-right"
                    label="Fecha Valida:"
                    feedback="feedback"
                    :state="null"
                    :horizontal="horizontal">

        <datepicker v-model="calendar.localDate" :format="calendar.format" language="es" :placeholder="calendar.placeholder"
                     :clear-button="false"
                     :bootstrapStyling="true"
                     calendar-button-icon="fa fa-calendar"
                     :disabled-picker="isLoading"
                     :disabled="calendar.disabled" @input="selectedDate"></datepicker>
      </b-form-group>

      <div slot="footer">
        <b-form-group :horizontal="horizontal">
          <template v-if="!update">
            <b-button @click="insertData" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button @click="resetForm('forms-' + urlRest)" :disabled="isLoading" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </template>

          <template v-if="update">
            <b-button @click="updateData" :disabled="isLoading" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Update</b-button>
            <b-button @click="addRow()" :disabled="isLoading" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Cancel</b-button>
          </template>
        </b-form-group>
      </div>

      <p>{{ item }}</p>
      <p>{{ vehicle }}</p>
      <p>{{ optType['region'].value }}</p>
      <button @click.stop="optType['region'].value = { id: '040000', name: 'Arequipa' }" >lugar</button>

    </b-form>

  </b-card>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  //  import Clock from '../../../components/Clock.vue'
  import Mixin from '../../../mixins'
  export default {
    props: ['urlRest', 'item', 'vehicle', 'update', 'horizontal'],
    mixins: [Mixin],
    components: {
      Multiselect: Multiselect,
      Datepicker: Datepicker
    },
    data () {
      return {
        calendar: {
          localDate: '',
          disabled: {
            to: new Date(2017, 8, 19),
            from: new Date(2019, 6, 1)
          },
          format: 'dd/MM/yyyy',
          placeholder: 'Ingrese una fecha valida..'
        },
        optType: {
          'region': {
            title: 'Ciudad:',
            url: 'regions',
            key: 'regionId',
            value: '',
            options: [],
            label: 'name',
            activate: false,
            placeholder: 'CIUDAD',
            icon: 'fa-map-marker',
            loadData: true
          },
          'insurancecompanies': {
            title: 'Aseguradora:',
            url: 'insurancecompanies',
            key: 'insuranceCompanyId',
            value: '',
            options: [],
            label: 'name',
            activate: false,
            placeholder: 'ASEGURADORA',
            icon: 'fa-bookmark',
            loadData: true
          },
          'insurancetypes': {
            title: 'Tipo seguro:',
            url: 'insurancetypes',
            key: 'insuranceTypeId',
            value: '',
            options: [],
            label: 'name',
            activate: false,
            placeholder: 'TIPO SEGURO',
            icon: 'fa-car',
            loadData: true
          },
          'usetypes': {
            title: 'Tipo uso:',
            url: 'usetypes',
            key: 'useTypeId',
            value: '',
            options: [],
            label: 'name',
            activate: false,
            placeholder: 'TIPO DE USO',
            icon: 'fa-id-card-o',
            loadData: true
          }
        },
        selectedKey: ''
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    methods: {
      selectedDate (pickDate) {
        console.log('pickDate')
        console.log(pickDate)
        let newDate = ''
        if (pickDate) {
          newDate = this.tranformDateToFormat(pickDate, '/')
          console.log(newDate)
          console.log(this.tranformFormatToDate(newDate, '/'))
        }
        this.item.validityDate = newDate
      },
      selectOption (selectedOption) {
        let key = this.selectedKey
        this.item[key] = selectedOption === null ? '' : selectedOption.id
      },
      openSelect (id) {
        this.selectedKey = id
      },
      addRow (newItem) {
        this.$emit('emit_addRow', newItem)
      },
      insertData () {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: this.urlRest, data: this.item})
        self.then((data) => {
          console.log('INSERT')
          console.log(data)
          if (data.status) {
            this.addRow(data.content)
            this.resetForm('forms-' + this.urlRest)
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
            this.resetForm('forms-' + this.urlRest)
          }
        })
      },
      getTypes (urlRest, key) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            console.log('OPTIONS:')
            console.log(data.content)
            console.log(key)
            console.log(this.optType[key])
            console.log('-------')
            this.optType[key].options = data.content
            this.optType[key].activate = true
            console.log(this.optType[key].options)
          }
        })
      },
      setMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.optType, function (value, key) {
          let options = vm.optType[key].options
          let idKey = vm.optType[key].key
          let optionPick = vm.$lodash.filter(options, {'id': vm.item[idKey]})
          if (optionPick.length >= 0) {
            vm.optType[key].value = optionPick[0]
          } else {
            vm.optType[key].value = ''
          }

          console.log(idKey)
          console.log(options)
          console.log(optionPick)
        })
      },
      resetMultiSelect () {
        let vm = this
        this.$lodash.forEach(this.optType, function (value, key) {
          vm.optType[key].value = ''
        })
      },
      returnMain () {
        this.resetForm('forms-' + this.urlRest)
        this.$emit('returnMain', false)
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.calendar.localDate = ''
        this.resetMultiSelect()
      }
    },
    watch: {
      item (newVal, oldVal) {
        console.log('WATCH item')
        console.log(newVal)
        console.log(oldVal)
        this.item.vehicleTypeId = this.vehicle.id
        if (this.update) {
          console.log('WATCH item update')
          this.setMultiSelect()
          console.log(newVal)
          let toDay = this.$moment(newVal.validityDate, 'DD/MM/YYYY')
          this.calendar.localDate = toDay.format()
        } else {
          console.log('WATCH item reset')
          this.resetForm('forms-' + this.urlRest)
        }
      }
    },
    created () {
      let vm = this
      this.$lodash.forEach(this.optType, function (value, key) {
        if (vm.optType[key].loadData) {
          vm.getTypes(value.url, key)
        } else {
          vm.optType[key].activate = true
        }
      })

      console.log('TIEMPO:::::')
      console.log(this.$store.getters.getDateTime)
      console.log('MOMENT:::::')

      let date = this.$store.getters.getDateTime.date
      let toDay = this.$moment(date, 'DD/MM/YYYY').add(1, 'days')
      let day = toDay.get('date')
      let month = toDay.get('month')
      let year = toDay.get('year')
      console.log(toDay.format())
      console.log(day, month, year)
//      this.calendar.disabled.to = new Date(year, month, day)
//      this.calendar.disabled.from = new Date(year + 1, month, day)
      // this.calendar.localDate = toDay.format()
    }
  }
</script>

<style lang="scss">
  #returnVehicle{
    position: absolute;
    top: 23px;
    left: -40px;
    font-size: 1rem;
    cursor: pointer;
  }

  .vdp-datepicker{
    .form-control[readonly]{
      background: #f4f3ef;
      border-right: 0;
      z-index: inherit;
    }
    .input-group-addon{
      padding: 0.2rem 0.7rem;
      margin-bottom: 0;
      font-size: 1.4rem;
      color: #999999;
      background-color: #f4f3ef;
      border: 1px solid #e0e0e0;
      border-radius: 0 0.55rem 0.55rem 0;
      border-left: 0;
    }
  }
</style>
