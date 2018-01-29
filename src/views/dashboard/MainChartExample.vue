<script>
import { Line } from 'vue-chartjs'

// const brandPrimary = '#20a8d8'
const brandSuccess = '#4dbd74'
const brandInfo = '#63c2de'
const brandDanger = '#f86c6b'

function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default Line.extend({
  props: ['height', 'data'],
  data () {
    return {
      localData: null,
      maxData: 0
    }
  },
  methods: {
    loadData () {
      let data = [0,0,0,0,0,0,0,0,0,0,0,0]
      if (this.data !== null) {
        this.data.forEach(function (item, index) {
          if (item.mes !== null) {
            data[item.mes - 1] = item.total
          }
        })
      }

      this.localData = data
      let max = Math.max(...data)
      this.maxData = Math.round(max + max * 0.1)
      console.log(this.localData)
      console.log(this.maxData)

    },
    graphic () {
      this.renderChart({
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: convertHex(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: this.localData
          },
          // {
          //   label: 'My Second dataset',
          //   backgroundColor: 'transparent',
          //   borderColor: brandSuccess,
          //   pointHoverBackgroundColor: '#fff',
          //   borderWidth: 2,
          //   data: data2
          // },
          // {
          //   label: 'My Third dataset',
          //   backgroundColor: 'transparent',
          //   borderColor: brandDanger,
          //   pointHoverBackgroundColor: '#fff',
          //   borderWidth: 1,
          //   borderDash: [8, 5],
          //   data: data3
          // }
        ]
      }, {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(this.maxData / 5),
              max: this.maxData
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      })
    }
  },
  watch: {
    data () {
      this.loadData()
      this.graphic()
    }
  }
})
</script>
