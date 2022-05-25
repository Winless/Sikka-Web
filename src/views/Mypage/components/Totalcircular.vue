<template>
  <div id="Total" class="Toalcurl"></div>
</template>
<script>


export default {
  props: {
    IScircular1: {},
  },
  data() {
    return {
      circle: {},
    }
  },
  watch: {
    IScircular1(val) {
      console.log("----val----", val)
      if (val.USPAmount) {
        this.circleEchatsF()
      }
    }
  },
  methods: {
    circleEchatsF() {
      this.circle = this.$echarts.init(document.getElementById("Total"));
      const option = {
        tooltip: {
          trigger: 'item'
        },
        color: ['#8247E5', '#FF8B20', '#90CDE7'],
        // color:['#1C5BFF','#9AA1B0',],
        grid: {
          top: "0%",
          bottom: "0%",
          left: "0px",
          right: "0px",
          containLabel: true,
        },
        legend: {
          // align: 'auto',
          top: '0%',
          left: '-80',
          bottom: "0",
          itemGap: 20, //设置图例之间的间距
          padding: [124, 200, 0, 100], //设置图例与圆环图之间的间距
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
            radius: ['82%', '85%'],
            center: ['75%', '50%'],

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
              { value: +this.IScircular1.USPAmount, name: 'USP' },
              { value: +this.IScircular1.deposit, name: 'Deposit' },
              { value: +this.IScircular1.borrow, name: 'Borrowing' },
            ]
          }
        ]
      };
      setTimeout(() => {
        this.circle.setOption(option)
      }, 100);
    },
  },
  created() {
    this.$nextTick(() => {
      // this.circleEchatsF()
    })
  }

}
</script>
<style scoped lang="scss">
.Toalcurl {
  margin-top: -50px;
  // border: red solid 1px;
  height: 280px;
}
</style>