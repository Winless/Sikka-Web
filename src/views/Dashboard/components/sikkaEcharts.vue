<template>
  <div>
    <div id="sikka" style="height: 300px"></div>

  </div>
</template>

<script>
import {toDate, toFixed6} from "../../../utils/tools"

export default {
  name: "sikkaEcharts",
  props: {
    chartData: [],
  },
  data() {
    return {
      myChart: {}
    }
  },
  watch: {
    chartData() {
      // if(this.chartData&&this.chartData.length>1){
      //
      // }
      this.SikkaEcharts()
    }
  },
  mounted() {
    this.SikkaEcharts()
  },
  methods: {
    SikkaEcharts() {
      if (this.chartData && this.chartData.length >= 1) {

        let times = [];
        let datas = [];
        this.chartData.forEach((item) => {
          times.push(toDate(new Date(item.ts)));
          datas.push(toFixed6(item.auspPrice))
        })
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            nameLocation: 'middle',
            data: times,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed',],
            axisTick: {
              show: false // 不显示坐标轴刻度线
            },
            axisLine: {
              show: false, // 不显示坐标轴线
            },
            axisLabel: {
              show: false, // 不显示坐标轴上的文字
            },
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          yAxis: {
            axisTick: {
              show: false // 不显示坐标轴刻度线
            },
            axisLine: {
              show: false, // 不显示坐标轴线
            },
            axisLabel: {
              show: false, // 不显示坐标轴上的文字
            },
            splitLine: {
              show: false // 不显示网格线
            },
          },
          series: [
            {
              symbolSize: 9,
              color: "#8247E5",
              type: 'line',
              // datasetId: 'dataset_since_1950_of_germany',
              data: datas,//[150, 230, 224, 218, 135, 147, 260,  120, 137, 250, 147, 260,  120, 137],
              showSymbol: false,
              encode: {
                x: 'Year',
                y: 'Income',
                itemName: 'Year',
                tooltip: ['Income']
              },
              lineStyle: {
                color: '#8247E5',
                width: 3,
              },
              emphasis: {
                symbol: 'circle',
                itemStyle: {
                  opacity: 1,
                  color: '#8247E5',
                },

              },
            },
          ]
        }
        this.myChart = this.$echarts.init(document.getElementById("sikka"));
        this.myChart.setOption(option,true)
      }

    }

  }
}
</script>

<style scoped>

</style>