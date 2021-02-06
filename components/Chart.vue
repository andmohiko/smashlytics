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
        //     backgroundColor: [
        //       'rgba(255, 99, 132, 0.2)',
        //       'rgba(54, 162, 235, 0.2)',
        //       'rgba(255, 206, 86, 0.2)',
        //       'rgba(75, 192, 192, 0.2)',
        //       'rgba(153, 102, 255, 0.2)',
        //       'rgba(255, 159, 64, 0.2)'
        //     ],
        //     borderColor: [
        //       'rgba(255, 99, 132, 1)',
        //       'rgba(54, 162, 235, 1)',
        //       'rgba(255, 206, 86, 1)',
        //       'rgba(75, 192, 192, 1)',
        //       'rgba(153, 102, 255, 1)',
        //       'rgba(255, 159, 64, 1)'
        //     ],
        //     borderWidth: 1
          },
          {
            label: '勝ち数',
            data: this.recordsSummary.map(day => day.wins),
            borderColor: '#579aff',
            fill: false,
            type: 'line',
            lineTension: 0.1,
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
    console.log(this.recordsSummary)
    this.renderChart(this.data, this.options)
  }
}
</script>