<template  lang="pug">
  //- v-card(class="elevation-6 white")

  //- div
  //- v-layout(align-center justify-center row wrap fill-height)
  //- v-flex(xs12 md12 pa-0 justify-right)
  //- #user-chart
    //- v-card-title(primary-title class="layout justify-start")
  GChart(
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
    :settings="{ packages: ['corechart'] }"
    style=""
  )
    //- div(class="text-xs-left pa-3")
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  name: 'AreaChart',
  data: () => ({
    chartData: [['Day', 'Score', 'Avg Score']],
    chartOptions: {
      title: 'Company Performance',
      height: 'auto',
      vAxis: { title: 'Score' },
      hAxis: { title: 'Dayly performance' },
      seriesType: 'bars',
      series: { 1: { type: 'line' } },
      colors: ['FFE0B2', '#FB8C00'],
      backgroundColor: { fill: '#FFF3E0' }
    }
  }),
  mounted() {
    if (this.values != undefined || this.values.length > 0) {
      this.chartData = this.chartData.concat(this.values)
    }
    this.chartOptions.title = this.title
    this.chartOptions.title = this.title
    this.chartOptions.hAxis.title = this.xName
    this.chartOptions.vAxis.title = this.yName
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    values: {
      type: Array,
      required: false
    },
    xName: {
      type: String,
      default: 'Dayly performance'
    },
    yName: {
      type: String,
      default: 'Score'
    }
  },
  components: {
    GChart
  }
}
</script>

<style>
#user-chart {
  height: auto;
  background: #fff3e0;
}
</style>
