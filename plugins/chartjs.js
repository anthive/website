import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('AntHiveChart', {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: {
        fill: false,
        responsive: true,
        title: {
          display: true,
          text: this.title,
          fontSize: 24,
          fontColor: '#4d3780'
        },
        legend: {
          display: true
        },
        tooltips: {
          backgroundColor: '#4d3780'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                maxTicksLimit: 100
              },
              gridLines: {
                display: true
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
