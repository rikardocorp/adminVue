<template>
  <b-card class="myCard fullPrice">
    <div slot="header" class="text-center">
      <slot name="title"></slot>
    </div>

    <b-form :id="id" class="row">
      <div class="col-md-7 col-lg-6">
        <!-- FORMULARIO -->
        <b-form-group v-for="(option, index) in optInput" :key="index" :label-sr-only="option.srOnly"
                      :class="{ 'form-group--error': $v.item[index]? $v.item[index].$error : false, 'text-left': true}"
                      :label-cols="option.srOnly ? null : lCols"
                      :label="option.label"
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

          <!-- RADIO-GROUP -->
          <b-form-radio-group v-else-if="option.input=='radio-group'" class="radio-group"
                              buttons
                              :button-variant="'outline-' + option.params.variant"
                              :size="option.params.size"
                              v-model="item[index]"
                              :disabled="isLoading"
                              @blur.native="$v.item[index]? $v.item[index].$touch(): false"
                              :options="option.params.options">
          </b-form-radio-group>

          <form-error :data="$v.item[index]? $v.item[index] : {} "></form-error>
        </b-form-group>

        <!-- CALENDARIO -->
        <calendar-inline v-model="item.date" :disabled="isLoading" :range="true" :error="$v.item['date']? $v.item['date'].$error : false"></calendar-inline>
        <div slot="footer" class="text-right mt-2">
          <b-button class="float-left" @click="resetForm(id)" :disabled="isLoading" size="sm" variant="outline-secondary"><i class="fa fa-ban"></i> {{$global.reset}}</b-button>
          <b-button v-if="!update" class="float-right" @click.prevent="processData('INSERT')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Añadir</b-button>
          <b-button v-else="update" class="float-right" @click.prevent="processData('UPDATE')" :disabled="isLoading" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{ $global.update }}</b-button>
        </div>
      </div>
      <!-- FORM SELECT VALUES-->
      <div class="col-md-5 col-lg-6">
        <div class="list-calendar-prices">
          <ul class="list-group">
            <li v-for="(x,index) in listCalendar" :class="{'list-group-item':true, 'active': x.active==1}" >
              <div class="row title">
                <p class="col-8">
                  <span @click="pickItem(x,index)">{{ x.description }}</span>
                </p>
                <p v-if="x.active==0" class="col-4" >
                  <button v-b-tooltip.hover.auto title="Eliminar" @click="deleteItem(x,index)" :disabled="isLoading"
                          class="btn btn-in-title-right btn-small bg-danger" ><i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                  <button v-b-tooltip.hover.auto title="Seleccionar" @click="updateItem(x,index)" :disabled="isLoading"
                          class="btn btn-in-title-right btn-small bg-success" ><i class="fa fa-check" aria-hidden="true"></i>
                  </button>
                </p>
                <p v-else="">
                  <b-badge variant="primary">Activo</b-badge>
                </p>
              </div>
              <div class="row">
                <p class="col-6"><span>De: </span>{{ x.dateFrom }}</p>
                <p class="col-6"><span>A: </span>{{ x.dateTo }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </b-form>
    <!--<pre>{{listCalendar}}</pre>-->
  </b-card>
</template>

<script>
  import CalendarInline from '../../../components/CalendarInline.vue'
  import Multiselect from 'vue-multiselect'
  import Datepicker from 'vuejs-datepicker'
  import FormError from '../../../components/FormError.vue'
  import {DATA_FORM as dataForm, DATA as nData} from '../../../data/dnPriceCalendar'
  export default {
    name: 'formPriceCalendar',
    props: ['horizontal', 'id', 'restricted'],
    components: {
      Multiselect,
      Datepicker,
      FormError,
      CalendarInline
    },
    data () {
      return {
        lCols: 5,
        optInput: dataForm.input,
        multiselectKeys: [],
        listCalendar: [],
        item: JSON.parse(JSON.stringify(nData.post)),
        urlRest: nData.name,
        fecha: '',
        update: false,
        indexSelected: 0
      }
    },
    validations () {
      return dataForm.validate
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading || this.restricted
      },
      listCalendarOptions () {
        return this.listCalendar
      }
    },
    watch: {
      listCalendar (newVal) {
        this.$emit('listCalendar', newVal)
      }
    },
    methods: {
      getOption (urlRest, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'GET', url: urlRest})
        self.then((data) => {
          if (data.status) {
            this.optInput[index].params.options = data.content
            this.optInput[index].params.activate = true
          }
        })
      },
      async getData (url) {
        let self = await this.$store.dispatch('dispatchHTTP', {type: 'GET', url: url})
        return self.status ? self.content : []
      },
      resetForm (formId) {
        console.log('reset reset')
        document.getElementById(formId).reset()
        this.item = JSON.parse(JSON.stringify(nData.post))
        this.$v.item.$reset()
        this.update = false
      },
      eventForm () {
        let invalid = this.$v.item.$invalid
        if (!invalid) {
          this.addCalendar()
        } else {
          this.$v.item.$touch()
        }
      },
      addCalendar () {
        let dates = this.item.date
        this.item.dateFrom = dates.dateFrom
        this.item.dateTo = dates.dateTo
        console.log('ITEM')
        console.log(this.item)
        let self = this.$store.dispatch('dispatchHTTP', {type: 'INSERT', url: this.urlRest, data: this.item})
        self.then((data) => {
          if (data.status) {
            // this.listCalendar.push(data.content)
            this.listCalendar.splice(1, 0, data.content)
            this.item = JSON.parse(JSON.stringify(nData.post))
            this.resetForm(this.id)
          } else {
            console.log('ERROR')
            console.log(data)
          }
        }).catch(error => {
          console.log('ERROR 2')
          console.log(error)
        })
      },
      deleteItem (item, index) {
        let self = this.$store.dispatch('dispatchHTTP', {type: 'DELETE', url: this.urlRest + '/' + item.id})
        self.then((data) => {
          if (data.status) {
            this.listCalendar.splice(index, 1)
          } else {
            console.log('ERROR')
            console.log(data)
          }
        })
      },
      updateItem (item, index) {
        let data = JSON.parse(JSON.stringify(item))
        data.active = 1
        let self = this.$store.dispatch('dispatchHTTP', {type: 'UPDATE', url: this.urlRest + '/' + item.id, data: data})
        self.then((data) => {
          if (data.status) {
            console.log('success')
            this.listCalendar[0].active = 0
            this.listCalendar.splice(index, 1)
            this.listCalendar.unshift(data.content)
          } else {
            console.log('ERROR')
            console.log(data)
          }
        })
      },
      processData (action) {
        let invalid = this.$v.item.$invalid
        let url = !this.item.id ? this.urlRest : this.urlRest + '/' + this.item.id
        if (!invalid) {
          let dates = this.item.date
          this.item.dateFrom = dates.dateFrom
          this.item.dateTo = dates.dateTo
          console.log('ITEM')
          console.log(this.item)
          let self = this.$store.dispatch('dispatchHTTP', {type: action, url: url, data: this.item})
          self.then((data) => {
            if (data.status) {
              console.log('DATA-CONTENT ' + action)
              console.log(data.content)
              if (!this.update) {
                this.listCalendar.splice(1, 0, data.content)
                this.item = JSON.parse(JSON.stringify(nData.post))
              } else {
                this.listCalendar.splice(this.indexSelected, 1, data.content)
              }
              // this.addRow(data.content)
              this.resetForm(this.id)
            }
          })
        } else {
          this.$v.item.$touch()
        }
      },
      pickItem (item, index) {
        this.indexSelected = index
        this.item = {...this.item, ...item}
        this.item.date = {
          dateFrom: item.dateFrom,
          dateTo: item.dateTo
        }
        this.update = true
        // this.item =
        console.log(item, index)
      }
    },
    async created () {
      let vm = this
      this.$lodash.forEach(this.optInput, function (value, key) {
        if (vm.optInput[key].input === 'multiselect') {
          vm.multiselectKeys.push(key)
          if (vm.optInput[key].params.loadData) {
            vm.getOption(value.params.url, key)
          } else {
            vm.optInput[key].params.activate = true
          }
        }
      })
      this.listCalendar = await this.getData('pricecalendars')
      let active = this.$lodash.findIndex(this.listCalendar, function (o) { return o.active === 1 })
      let firstItem = this.listCalendar.splice(active, 1)
      if (firstItem.length > 0) this.listCalendar.unshift(firstItem[0])
    }
  }
</script>

<style lang="scss">
  .fullPrice{
    .vdp-datepicker{
      width: auto;
    }
    .vdp-datepicker__calendar .cell{
      height: 31px;
      line-height: 2.4em;
    }

    .localOpacity{
      opacity: 0.5;
    }

    .radio-group{
      float: left;
      width: 100%;
      label.btn {
        width: 55%;
        &:first-child{
          width: 45%;
        }
      }
      .active{
        z-index: 0 !important;
      }
    }
  }
  .list-calendar-prices{
    background: #f4f3ef;
    border-radius: 0.78em;
    font-size: 0.85em;
    text-align: center;
    overflow: scroll;
    height: 340px;
    border-bottom: 1px solid #e0e0e0;
    ul{
      li{
        &.active{
          background: #ffface;
          p {
            color: #212120;
          }
        }
        .title{
          p{
            text-align: left;
            font-size: 1.4em;
            padding: 0 0.5em 0.4em;
            color: #ef7b1f;

            &:first-child{
              span{
                cursor: pointer;
              }
            }
          }
        }
        p{
          margin: 0;
          padding: 0;
        }
      }
    }
  }
</style>
