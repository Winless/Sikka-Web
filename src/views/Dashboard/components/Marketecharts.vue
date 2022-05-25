<template>
  <div>
    <div id="Market" style="height:260px"></div>

  </div>
</template>

<script>
import {toDate,toFixed6} from "../../../utils/tools"
export default {
  name: "Marketecharts",
  props: {
    chartData: [],
  },
  data() {
    return {
      myChart: {}
    }
  },
  watch:{
    chartData(){
      this.MarketEcharts()
    }
  },
  mounted() {
    this.MarketEcharts()
  },
  methods: {
    MarketEcharts() {
      if (this.chartData && this.chartData.length >= 1) {
        let times = [];
        let datas = [];
        this.chartData.forEach((item) => {
          times.push(toDate(new Date(item.ts)));
          datas.push(toFixed6(item.totalLoan))
        })

        const option = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            nameLocation: 'middle',
            data: times,  //['Mar1','Mar5','Mar10','Mar15','Mar20','Mar25','Mar30','Apr1','Apr5','Apr10','Apr15','Apr20','Apr25','Apr30'],
            axisTick: {
              show: false // 不显示坐标轴刻度线
            },
            axisLine: {
              show: false, // 不显示坐标轴线
            },
          },
          grid: {
            top: '0%',
            left: '0%',
            right: '5%',
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
              type: 'line',
              // datasetId: 'dataset_since_1950_of_germany',
              data: datas,    //[150, 230, 224, 218, 135, 147, 260,  120, 137, 250, 147, 260,  120, 137],
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
        this.myChart = this.$echarts.init(document.getElementById("Market"));
        this.myChart.setOption(option,true)
      }
    }


  }
}
</script>

<style>

</style>