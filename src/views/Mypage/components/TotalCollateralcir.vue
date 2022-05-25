<template>
  <div class="collateral" id="collateralechats">
  </div>
</template>

<script>
export default {
  props: {
    IScircular1: {},
  },
  data() {
    return {
      circle: {}
    }
  },
  created() {
    this.$nextTick(() => {
      // this.circleEchatsF()
    })
  },
  watch: {
    IScircular1(val) {
      if (val.USPAmount) {
        this.circleEchatsF()
      }
    }
  },
  methods: {
    circleEchatsF() {
      this.circle = this.$echarts.init(document.getElementById("collateralechats"));

      const option = {
        tooltip: {
          trigger: 'item'
        },
        color:['#8247E5'],
        grid: {
          top: "0%",
          bottom: "0%",
          left: "0px",
          right: "0px",
          containLabel: true,
        },
        legend: {
          // align: 'auto',
          top: '-10%',
          left: '-100',
          bottom: "0",
          itemGap: 20, //设置图例之间的间距
          padding: [150, 200, 0, 100], //设置图例与圆环图之间的间距
          icon: "circle",
          // top: "middle",
          right: "0%",
          orient: "vertical",
          itemHeight: 15,
          itemWidth: 15,
          // formatter(name) {
          // console.log("namesss",name)
          // },
          textStyle: {                      // 图例的公用文本样式。
            fontSize: 16,
            color: '#9AA1B0'
          },
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['77%', '80%'],
            center: ['80%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: +this.IScircular1.totalCollateralUSP, name: 'aMATICb' },
            ]
          }
        ]
      };
      setTimeout(() => {
        this.circle.setOption(option)
      }, 100);
    },
  },
}
</script>

<style scoped lang="scss">
.collateral {
  margin-top: -85px;
  height: 250px;
  // border: red solid 1px;
}
</style>