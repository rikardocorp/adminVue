<template>
  <label :class="classList">
    <input type="checkbox"
           class="switch-input"
           :value="value"
           :checked="isChecked"
           @change="handleChange">
    <template v-if="isOn">
      <span class="switch-label" :data-on="on" :data-off="off"></span>
    </template>
    <template v-else>
      <span class="switch-label"></span>
    </template>
    <span class="switch-handle"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      default: 1
    },
    uncheckedValue: {
      default: 0
    },
    checked: {
      default: 1
    },
    type: {
      type: String,
      default: 'default'
    },
    variant: {
      type: String,
      default: ''
    },
    pill: {
      type: Boolean,
      default: false
    },
    on: {
      type: String,
      default: null
    },
    off: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    classList () {
      return [
        'switch',
        this.switchType,
        this.switchVariant,
        this.switchPill,
        this.switchSize
      ]
    },
    switchType () {
      return this.type ? `switch-${this.type}` : `switch-default`
    },
    switchVariant () {
      return this.variant ? `switch-${this.variant}` : `switch-secondary`
    },
    switchPill () {
      return !this.pill ? null : `switch-pill`
    },
    switchSize () {
      return this.size ? `switch-${this.size}` : ''
    },
    isChecked () {
      return this.checked === this.value ? this.value : this.uncheckedValue
    },
    isOn () {
      return !this.on ? null : true
    }
  },
  methods: {
    handleChange ({ target: { checked } }) {
      this.$emit('change', checked ? this.value : this.uncheckedValue)
    }
  }
}
</script>
