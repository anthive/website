import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('AntHiveChart', {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    xLabel: {
      type: String,
      required: true
    },
    yLabel: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'right'
        },
        tooltips: {
          backgroundColor: '#4d3780'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: this.xLabel,
                fontSize: 16,
                fontColor: '#4d3780'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                stepSize: 1
              },
              gridLines: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: this.yLabel,
                fontSize: 16,
                fontColor: '#4d3780'
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
})
