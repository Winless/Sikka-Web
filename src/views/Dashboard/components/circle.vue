<template>
<div>
 <div class="left-circle"  id="circleEchatsn"></div>
</div>
</template>

<script>
export default {
  name: "circle",
  props: {
    Totaldata:{},
  },

  data(){
    return{
      circle:{}

    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.circleEchatsF()
    // })
  },
  watch: {
    Totaldata(val) {
      console.log("----val----", val)
      if (val.totalDeposit) {
        this.circleEchatsF()
      }
    }
  },
  methods:{
    circleEchatsF(){
      this.circle = this.$echarts.init(document.getElementById("circleEchatsn"));

      const option = {
        tooltip: {
          trigger: 'item'
        },
        color:['#8247E5','#9AA1B0',],
        grid:{
          top:"0%",
          bottom:"0%",
          left:"0px",
          right:"0px",
          containLabel:true,
        },
        legend: {
          // align: 'auto',
          // top: '80%',
          left: 'center',
          bottom:"0",
          itemGap: 128, //设置图例之间的间距
          padding: [100, 100, 0, 100], //设置图例与圆环图之间的间距
          icon: "circle",
          // top: "middle",
          // right: "5%",
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
            radius: ['72%', '75%'],
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
              { value: +this.Totaldata.totalDeposit, name: 'Total Deposit' },
              { value: +this.Totaldata.totalCollateralValue, name: 'Total Collateral' },
            ]
          }
        ]
      };
      setTimeout(() => {
            this.circle.setOption(option)
          },
      )
    },

  }
}
</script>

<style scoped lang="scss">
.left-circle{
  //border: #1c5bff solid 1px;
  text-align: center;
  height: 230px;

}
</style>