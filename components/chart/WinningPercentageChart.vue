<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  name: 'chart',
  props: {
    recordsSummary: {
      default: [],
      type: Array
    },
  },
  data () {
    return {
      data: {
        labels: this.recordsSummary.map(day => day.date),
        datasets: [
          {
            label: '勝率',
            data: this.recordsSummary.map(day => day.winningPercentage),
            borderColor: '#579aff',
            fill: false,
            type: 'line',
            lineTension: 0.1,
          }
        ]
      },
      options: {
        scales: {
        //   xAxes: [{
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Month'
        //     }
        //   }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    data: function(recordsSummary) {
      console.log(recordsSummary)
      this.renderChart(this.data, this.options)
    }
  },
  methods: {
    render() {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>