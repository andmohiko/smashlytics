<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  name: 'gsp',
  props: {
    records: {
      default: [],
      type: Array
    },
    xlabel: {
      default: [],
      type: Array
      
    }
  },
  data () {
    return {
      data: {
        labels: this.records.map(record => record.createdAtString.slice(5, -3)),
        datasets: [
          {
            label: '世界戦闘力',
            data: this.records.map(record => record.globalSmashPower),
            // backgroundColor: [
            //   'rgba(255, 99, 132, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(255, 206, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(153, 102, 255, 0.2)',
            //   'rgba(255, 159, 64, 0.2)'
            // ],
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)'
            // ],
            borderColor: '#CFD8DC',
            fill: false,
            type: 'line',
            lineTension: 0.1,
          },
          // {
          //   label: 'Line Dataset',
          //   data: [10, 50, 20, 30, 30, 40],
          //   borderColor: '#CFD8DC',
          //   fill: false,
          //   type: 'line',
          //   lineTension: 0.3,
          // }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'createdAt'
            }
          }],
          yAxes: [{
            ticks: {
              labelString: '世界戦闘力',
              beginAtZero: false,
              // min: 0,
              // max: 300,
              // stepSize: 100,
              // reverse: false,
              // beginAtZero: true
              stepSize: 500000,
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
  computed: {
    xlabels() {
      const len = this.records.length
      const labelsLen = 4
      if (labelsLen * 2 > len) {
        return this.records.map((record, i) => {
          return i % 2 === 0 ? record.createdAtString.slice(5, -3) : ''
        })
      }
      return this.records.map(record => record.createdAtString.slice(5, -3))
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>