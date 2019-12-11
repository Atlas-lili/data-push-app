<template>
  <div id="aaa">
    1-1
    <chart :options="chartOptions"></chart>
  </div>
</template>

<style lang="scss">

</style>

<script>
import axios from 'axios'
import {Chart} from 'highcharts-vue'
import Highcharts from 'highcharts'
Highcharts.setOptions({
    global: {
        useUTC: false
    }
})
export default {
    data() {
      return {
        seriesData: [],
      }
    },
    computed:{
      chartOptions(){
        return {
          chart: {
              zoomType: 'x'
          },
          title: {
              text: '室外温度走势图'
          },
          subtitle: {
              text: document.ontouchstart === undefined ?
              '鼠标拖动可以进行缩放' : '手势操作进行缩放'
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                  millisecond: '%H:%M:%S.%L',
                  second: '%H:%M:%S',
                  minute: '%H:%M',
                  hour: '%H:%M',
                  day: '%m-%d',
                  week: '%m-%d',
                  month: '%Y-%m',
                  year: '%Y'
              }
          },
          tooltip: {
              dateTimeLabelFormats: {
                  millisecond: '%H:%M:%S.%L',
                  second: '%H:%M:%S',
                  minute: '%H:%M',
                  hour: '%H:%M',
                  day: '%Y-%m-%d',
                  week: '%m-%d',
                  month: '%Y-%m',
                  year: '%Y'
              }
          },
          yAxis: {
              title: {
                  text: '温度'
              }
          },
          legend: {
              enabled: false
          },
          plotOptions: {
              area: {
                  fillColor: {
                      linearGradient: {
                          x1: 0,
                          y1: 0,
                          x2: 0,
                          y2: 1
                      },
                      stops: [
                          [0, Highcharts.getOptions().colors[0]],
                          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                      ]
                  },
                  marker: {
                      radius: 2
                  },
                  lineWidth: 1,
                  states: {
                      hover: {
                          lineWidth: 1
                      }
                  },
                  threshold: null
              }
          },
          series: [{
              type: 'area',
              name: '室外温度',
              data: this.seriesData
          }]
        }
      }
    },
    mounted: function() {
      axios.get('/api/mock').then(res => {
        console.log(Array.isArray(res.data))
        this.seriesData = res.data.map(item=>{
          var arr = [];
          arr[0] = item.time;
          arr[1] = Number(item.outTemp);
          return arr;
        })
        console.log(this.seriesData)
      })
    },
    components: {
      Chart
    }
  }
</script>