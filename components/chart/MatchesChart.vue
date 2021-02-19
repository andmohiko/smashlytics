<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  name: 'chart',
  props: {
    recordsSummary: {
      default: [],
      type: Array
    }
  },
  data () {
    return {
      data: {
        labels: this.recordsSummary.map(day => day.date),
        datasets: [
          {
            label: '対戦数',
            data: this.recordsSummary.map(day => day.records),
            borderWidth: 1
          },
          {
            label: '勝ち数',
            data: this.recordsSummary.map(day => day.winsSum),
            borderColor: '#579aff',
            fill: false,
            type: 'line',
            lineTension: 0,
          }
        ]
      },
      options: {
        // scales: {
        //   xAxes: [{
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Month'
        //     }
        //   }],
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: true,
        //       stepSize: 10,
        //     }
        //   }]
        // }
      }
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    data: function(recordsSummary) {
      this.render()
    }
  },
  methods: {
    render() {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>