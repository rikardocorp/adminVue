export default {
  methods: {
    testMixin: function () {
      console.log('Mixin Called!')
    },
    tranformDateToFormat (myDate, sep) {
      // myDate -> new Date
      // sep    -> string
      let day = myDate.getDate()
      day = day >= 10 ? day : '0' + day
      let month = myDate.getMonth() + 1
      month = month >= 10 ? month : '0' + month
      let year = myDate.getFullYear()
      return day + sep + month + sep + year
    },
    tranformFormatToDate (myDate, sep) {
      // myDate -> string
      // sep    -> string
      let values = myDate.split(sep)
      let day = Number(values[0])
      let month = Number(values[1]) - 1
      let year = Number(values[2])

      return new Date(year, month, day)
    }
  }
}
