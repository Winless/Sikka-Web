<template>
<div>
 <div class="left-circle"  id="MobcircleEchatsn"></div>
</div>
</template>

<script>
export default {
  name: "Mobcircle",
  props: {
    Totaldata:{},
  },
  data(){
    return{
      circle:{}

    }
  },
  watch: {
    Totaldata(val) {
      console.log("----val----", val)
      if (val.totalDeposit) {
        this.circleEchatsF()
      }
    }
  },
  created() {
  },
  methods:{
    circleEchatsF(){
      this.circle = this.$echarts.init(document.getElementById("MobcircleEchatsn"));

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
          show:false,
          // type:"scroll",
          // align: 'auto',
          // top: '80%',
          // left: 'left',
          bottom:"0",
          itemGap: 20, //设置图例之间的间距
          padding: [250, 100, 0, 100], //设置图例与圆环图之间的间距
          icon: "circle",
          // top: "middle",
          // right: "5%",
          orient: "vertical",
          itemHeight: 15,
          itemWidth: 15,
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
  height: 280px;

}
</style>