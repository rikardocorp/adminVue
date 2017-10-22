<template>
  <div>
    <div class="avatar" v-bind:style="localStyle">
      <span v-if="!hasImage" v-bind:style="localStyleSpan">
        <slot name="content">
          {{ userInitial }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {

    props: {
      username: {
        type: String,
        required: true
      },
      initials: {
        type: String
      },
      backgroundColor: {
        type: String
      },
      color: {
        type: String
      },
      size: {
        type: Number,
        default: 50
      },
      sizeUnid: {
        type: String,
        default: 'px'
      },
      src: {
        type: String
      },
      localSrc: {
        type: Boolean,
        default: true
      },
      rounded: {
        type: Boolean,
        default: true
      },
      lighten: {
        type: Number,
        default: 80
      },
      border: {
        type: Boolean,
        default: false
      },
      colorBorder: {
        type: String,
        default: 'inherit'
      },
      sizeBorder: {
        type: Number,
        default: 1
      }
    },

    data () {
      return {
        backgroundColors: [
          '#F44336', '#FF4081', '#9C27B0', '#673AB7',
          '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
          '#4CAF50', '#8BC34A', '#CDDC39', /* '#FFEB3B' ,*/ '#FFC107',
          '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
        localStyle: {},
        localStyleSpan: {},
        hasImage: false
      }
    },

    mounted () {
      this.style()
      this.$emit('avatar-initials', this.username, this.userInitial)
    },

    computed: {
      background () {
        return this.backgroundColor ||
          this.randomBackgroundColor(this.username.length, this.backgroundColors)
      },

      fontColor () {
        return this.color || this.lightenColor(this.background, this.lighten)
      },

      isImage () {
        return this.src !== undefined
      },

      userInitial () {
        const initials = this.initials || this.initial(this.username)
        return initials
      },

      getSizeBorder () {
        return this.border ? 2 * (this.sizeBorder - this.sizeBorder * 0.08) : 0
      }
    },

    methods: {
      initial (username) {
        let parts = username.split(/[ -]/)
        let initials = ''

        for (var i = 0; i < parts.length; i++) {
          initials += parts[i].charAt(0)
        }

        if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
          initials = initials.replace(/[a-z]+/g, '')
        }

        initials = initials.substr(0, 3).toUpperCase()

        return initials
      },

      style () {
        console.log('Style')
        let style = {
          width: this.size + this.sizeUnid,
          height: this.size + this.sizeUnid,
          borderRadius: (this.rounded) ? '50%' : 0,
          textAlign: 'center',
          verticalAlign: 'middle'
        }
        console.log(style)

        let imgBackgroundAndFontStyle = {
          border: this.border ? this.sizeBorder + this.sizeUnid + ' solid' : 'none',
          borderColor: this.colorBorder,
          background: 'url(' + this.src + ') no-repeat',
          backgroundSize: (this.size - this.getSizeBorder) + this.sizeUnid + ' ' + (this.size - this.getSizeBorder) + this.sizeUnid,
          backgroundOrigin: 'content-box'
        }

        let initialBackgroundAndFontStyle = {
          border: this.border ? this.sizeBorder + this.sizeUnid + ' solid' : 'none',
          borderColor: (this.isImage && (this.colorBorder === this.colorBorder.default)) ? this.colorBorder.default : this.colorBorder,
          backgroundColor: this.background,
          font: (this.sizeUnid === 'px') ? Math.floor(this.size / 2.5) + this.sizeUnid + '/100' + this.sizeUnid + ' Helvetica, Arial, sans-serif'
            : 1 + this.sizeUnid + '/100' + this.sizeUnid + ' Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          color: this.fontColor,
          lineHeight: (this.size - this.getSizeBorder + Math.floor(this.size / 20)) + this.sizeUnid
        }

        if (this.isImage) {
          this.existImage(this.src).then((result) => {
            let backgroundAndFontStyle = (result) ? imgBackgroundAndFontStyle : initialBackgroundAndFontStyle
            Object.assign(style, backgroundAndFontStyle)
            this.hasImage = result
            this.localStyle = style
          })
        } else {
          let backgroundAndFontStyle = initialBackgroundAndFontStyle
          Object.assign(style, backgroundAndFontStyle)
          this.hasImage = false
          this.localStyle = style
        }

        this.localStyleSpan = {
          fontSize: Math.floor(this.size / 2.5) + this.sizeUnid
        }
      },

      randomBackgroundColor (seed, colors) {
        return colors[seed % (colors.length)]
      },

      lightenColor (hex, amt) {
        // From https://css-tricks.com/snippets/javascript/lighten-darken-color/
        let usePound = false

        if (hex[0] === '#') {
          hex = hex.slice(1)
          usePound = true
        }

        let num = parseInt(hex, 16)
        let r = (num >> 16) + amt

        if (r > 255) r = 255
        else if (r < 0) r = 0

        let b = ((num >> 8) & 0x00FF) + amt

        if (b > 255) b = 255
        else if (b < 0) b = 0

        let g = (num & 0x0000FF) + amt

        if (g > 255) g = 255
        else if (g < 0) g = 0

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
      },
      existImage (srcImage) {
        let url = this.localSrc ? window.location.origin + srcImage : srcImage
        let self = this.$store.dispatch('dispatchHTTP', {type: 'FILE', url: url})
        return self.then((data) => {
          return true
        }).catch((data) => {
          return false
        })
      }
    },
    watch: {
      src (newVal) {
        this.localStyle = {}
        this.localStyleSpan = {}
        this.hasImage = false
        this.style()
//        document.getElementById('local-avatar').removeAttribute('style')
//        this.hasImage = true
//        this.style()
      }
    }
  }
</script>

<style lang="scss">
  .content-avatar{

  }

  /*.avatar{*/
    /*position: absolute;*/
  /*}*/
</style>
