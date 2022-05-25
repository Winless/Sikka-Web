<template>
  <div class="mobile-earn">
    <div class="title">Earn</div>
    <div class="div1">
      <div class="padding">
        <div class="p1">Total Deposit
          <span>
              <a-popover :title="false" placement="bottom">
                   <template #content>
                     <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Total amount deposited by the users</p>
                   </template>
                   <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
                 </a-popover>

          </span>
        </div>
        <div class="p2">
          <countTo :startVal='0' :endVal='TotalDeposit.token' :duration='2000'></countTo>
          <span>{{ TotalDeposit.tokenSymbol }}</span></div>
        <div class="earn-btn">
          <div class="Borrow-button">
            <a-button type="primary" class="btn1" v-if="isLogin=='1000'" @click="depositT()">
              Deposit
            </a-button>
            <a-button class="distrue" :disabled="true" v-else>
              Deposit
            </a-button>
          </div>
          <div class="repay-button">
            <a-button type="primary" class="btn-class" v-if="isLogin=='1000'" @click="withdrawT()">
              Withdraw
            </a-button>
            <a-button class="distrue" :disabled="true" v-else>
              Withdraw
            </a-button>


          </div>
        </div>
      </div>
    </div>
    <div class="div2">
      <div class="padding">
        <div class="p1">Expected Interest
          <span>
                    <a-popover :title="false" placement="bottom">
                   <template #content>
                     <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Estimated interest for the<br/> selected period of the time</p>
                   </template>
                   <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
                 </a-popover>

         </span>
        </div>
        <div class="p2">
          <countTo :startVal='0' :endVal='Interest.token' :duration='2000'></countTo>
          <span>{{ Interest.tokenSymbol }}</span></div>
        <div class="interest">
          <div v-for="(itme,index) in Expectedlist" :key="index" class="interest-center">

            <div class="div1" @click="times(itme.time)" v-if="itme.isselect"><span>{{ itme.time }}</span></div>

            <div class="div2" @click="times(itme.time)" v-else><span>{{ itme.time }}</span></div>
          </div>

        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="table-right">
      <div class="padding">
        <div class="interest-title">Interest</div>
        <div class="interest-number">
          <countTo :startVal='0' :endVal='Interestchart.number' :duration='2000'></countTo>
          <span>%</span></div>
        <div class="interest-date">{{ Interestchart.date }}</div>
        <div id="myChart2" style="height: 180px"></div>
      </div>
    </div>
    <MobDepositF v-if="ishshowMobdeposit" :setShow="setShowModal"></MobDepositF>
    <mobearn-withdraw v-if="isshowMobwWthdraw" :setShow="setShowModal"></mobearn-withdraw>
  </div>
</template>

<script>
import MobearnWithdraw from './Mobilecomponents/Mobearn-Withdraw.vue'
import MobDepositF from './Mobilecomponents/MobDepositF.vue'
import {getEarnInfo, toPrecision} from "../../../SDK";
import {mapGetters} from "vuex";
import countTo from "vue-count-to";
import {getApr} from "../../../SDK/httpSearch";

export default {
  components: {MobearnWithdraw, MobDepositF, countTo},
  computed: {
    ...mapGetters(["account", "isLogin", "iswidth"]),
  },
  data() {
    return {
      ishshowMobdeposit: false,
      isshowMobwWthdraw: false,
      getearnInfoT: 0,
      earnInfo: {
        interest: {
          day: 0,
          week: 0,
          month: 0,
          year: 0
        },
        withdrowAmount: 0
      },
      myChart: {},
      isshowdeposit: false,
      isshowEarnWithdraw: false,

      TotalDeposit: {
        token: 0,
        tokenSymbol: "USP"
      },
      Interest: {
        token: 0,
        tokenSymbol: "USP"

      },
      Interestchart: {
        number: 0,
        date: "",


      },
      Expectedlist: [
        {
          isselect: true,
          time: "Year"
        },
        {
          isselect: false,
          time: "Month"
        },
        {
          isselect: false,
          time: "Week"

        },
        {
          isselect: false,
          time: "Day"
        }
      ],


    }

  },
  created() {
    this.$nextTick(() => {
      this.drawEcharts()
    })
    if (this.isLogin == "1000") {
      this.dateinterest().then(() => {
        this.times("Year")
      })
    }
    this.$bus.on("changeEarnInfo", async () => {
      await this.dateinterest();
      this.times("Year")
    })

  },
  watch: {
    isLogin(Now) {
      console.log("switch-login", this.isLogin, Now)
      if (Now == "1000") {
        // this. drawEcharts()
        this.dateinterest().then(() => {
          this.times("Year")
        })
      }
      // else{
      //   this.Interestchart.number=0
      //   this.Interestchart.date=""
      //   this.istable=false
      // }
    },
  },
  methods: {
    async drawEcharts() {
      const option = {

        xAxis: {
          show: true,
          type: 'category',
          data: [],
          axisPointer: {
            value: "",
            snap: true,
            lineStyle: {
              color: '#8247E5',
              width: 1
            },
            label: {
              show: false,
              backgroundColor: '#8247E5'

            },
            //拖动按钮
            handle: {
              size: 40,
              show: false,
              color: '#8247E5',
              margin: 28
            }
          },
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
        yAxis: {
          max: 30,
          min: 10,
          show: false,
          type: 'value',
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
        grid: {
          top: '0',
          left: '-18%',
          right: '-18%',
          bottom: '0%',
          containLabel: true
        },
        tooltip: {
          // position: ['50%', '50%'],
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            snap: true,
          },
          formatter: (params) => {
            console.log("params", params)
            const a = (
                "<div style='height: 57px;width: 104px;display: flex;flex-direction: column;justify-content: center;align-items: center;'>" + "<div style='color: #010101;font-family: Inter;font-size: 14px;font-style: normal'>" + 'APY   ' + params[0].data + '%' + "</div>" + "<div style='color: #01010180;font-size: 14px;font-family: Inter;font-style: normal;'>" + params[0].name + "</div>" + "</div>")
            return a
          },

        },
        series: [
          {

            selectedMode: 'single',
            opacity: 1,
            color: '#8247E5',
            data: [],
            type: 'line',
            symbol: 'circle',
            symbolSize: 22,
            itemStyle: {
              normal: {
                show: false,
                opacity: 0,
                lineStyle: {
                  color: '#8247E5',
                  width: 5,
                }
              }
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
      // 基于准备好的dom，初始化echarts实例
      // 第一种写法，不需要在当前页定义标签id
      // let myChart = this.$echarts.init(this.$el);

      // 第二种写法
      this.myChart = this.$echarts.init(document.getElementById("myChart2"));

      // 绘制图表
      let aprs = await getApr();
      console.log("aprs", aprs)
      this.Interestchart.number = aprs[aprs.length - 1].value
      this.Interestchart.date = this.dateFormat(aprs[aprs.length - 1].ts)

      for (let i = 0; i < aprs.length; i++) {
        console.log("----????-----", aprs[i]);
        option.xAxis.data.push(this.dateFormat(aprs[i].ts));
        option.series[0].data.push(aprs[i].value);
      }
      //测试样式死数据
      // for (let i = 0; i <15; i++) {
      //   console.log("----????-----", aprs[1]);
      //   option.xAxis.data.push(this.dateFormat(aprs[1].ts));
      //   option.series[0].data.push(aprs[1].value);
      // }
      setTimeout(() => {
            this.myChart.setOption(option)
          },
      )
      this.myChart = this.myChart(((params) => {
        this.Interestchart.number = Number(params.data)
        this.Interestchart.date = params.name
      }))

    },
    dateFormat(ts) {
      let month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var time = new Date(ts);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      return month[m] + ' ' + this.add0(d) + "," + y;
    },
    add0(m) {
      return m < 10 ? '0' + m : m
    },
    async dateinterest() {
      this.earnInfo = await getEarnInfo();   //earn界面信息   可取得数量
      console.log("eraninfo", this.earnInfo)
      this.TotalDeposit.token = Number(toPrecision((this.earnInfo.withdrowAmount).toFixed(4)))
      this.getearnInfoT = setTimeout(async () => {
        console.log("shuaxin")
        await this.dateinterest();
        this.times("Year")
      }, 1000 * 60 * 10);
    },
    times(name) {
      this.Expectedlist = this.Expectedlist.map(item => {
        return {
          isselect: item.time === name,
          time: item.time

        }
      })
      this.Interest.token = this.earnInfo.interest[name.toLowerCase()];
      this.Interest.token = Number(toPrecision(((this.Interest.token).toFixed(4))))

    },
    depositT() {
      this.ishshowMobdeposit = !this.ishshowMobdeposit

    },
    withdrawT() {
      this.isshowMobwWthdraw = !this.isshowMobwWthdraw

    },
    setShowModal(value) {
      this.ishshowMobdeposit = value;
      this.isshowMobwWthdraw = value;

    },
  }


}
</script>

<style lang="scss" scoped>
.mobile-earn {

  width: calc(100% - 32px);
  padding: 32px 0px 0px 0px;
  //max-width: 328px;

  .padding {
    padding: 24px 28px;
  }

  .title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    color: #000000;
    margin-bottom: 8px;
  }

  .div1 {
    height: 187px;
    background: #FFFFFF;
    border-radius: 36px;

    .p1 {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #8F9092;
    }

    .p2 {
      margin: 12px 0px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      color: #1F2226;

      span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        color: #1F2226;

      }

    }


    .earn-btn {
      margin-top: 24px;
      align-items: center;
      display: flex;
      justify-content: flex-start;

      .Borrow-button {
        ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
          color: #BFC6D0;
          background-color: #E0E7ED;
          border-radius: 37px;
          border-color: transparent;
          //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
          //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
          height: 36px;
          width: 128px;
          font-family: Inter;
          margin-right: 15px;
        }

        ::v-deep .btn1.ant-btn-primary {
          font-family: Inter;
          font-size: 16px;
          font-weight: 600;
          margin-right: 12px;
          height: 36px;
          width: 128px;
          border-radius: 37px;
          color: #fff;
          background: #8247E5;
          border-color: transparent;
          text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
          box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
        }

        ::v-deep .ant-btn-primary:hover, .ant-btn-primary:focus {
          font-family: Inter;
          color: #fff !important;
          background-color: #561FB2 !important;
          border-color: #561FB2 !important;
        }


      }

      .repay-button {
        ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
          color: #BFC6D0;
          background-color: #E0E7ED;
          border-radius: 37px;
          border-color: transparent;
          //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
          //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
          height: 36px;
          width: 128px;
          margin-right: 15px;
          font-family: Inter;
        }

        ::v-deep .ant-btn-primary:hover, .ant-btn-primary:focus {
          color: #fff !important;
          background-color: #8247E5 !important;
          border-color: #8247E5 !important;
          font-family: Inter;
        }

        ::v-deep.btn-class.ant-btn-primary {
          font-family: Inter;
          color: #8247E5;
          font-weight: 600;
          font-size: 16px;
          height: 36px;
          width: 128px;
          background: #FFFFFF;
          border: 1px solid #8247E5;
          border-radius: 37px;
          line-height: 1.499;
          position: relative;
          display: inline-block;
          white-space: nowrap;
          text-align: center;
          box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          touch-action: manipulation;
          padding: 0 15px;


        }
      }
    }
  }

  .div2 {
    margin-top: 16px;
    height: 239px;
    background: #FFFFFF;
    border-radius: 36px;

    .p1 {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #8F9092;
    }

    .p2 {
      margin: 12px 0px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      color: #1F2226;

      span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        color: #1F2226;

      }

    }

    .interest {
      display: flex;
      justify-content: space-between;
      height: 44px;
      align-items: center;
      flex-wrap: wrap;

      .interest-center {
        height: 44px;
        display: flex;
        justify-content: center;
        justify-items: center;

        .div1 {
          border: #8247E5 solid 1px;
          margin-top: 4px;
          cursor: pointer;
          background: #FFFFFF;
          box-sizing: border-box;
          border-radius: 37px;
          text-align: center;
          align-items: center;
          width: 127px;
          height: 36px;
          display: flex;
          justify-content: center;


          span {
            font-family: Inter;
            color: #8247E5;
            font-size: 14px;
            font-weight: 600;
          }
        }

        .div2 {
          border: #9AA1B0 solid 1px;
          margin-top: 4px;
          cursor: pointer;
          text-align: center;
          align-items: center;
          background-color: transparent;
          display: flex;
          justify-content: center;
          width: 127px;
          height: 36px;
          border-radius: 37px;

          span {
            font-family: Inter;
            color: #9AA1B0;
            font-weight: 600;
            font-size: 14px;


          }

        }

        .div2:hover {
          border: #8247E5 solid 1px;
          margin-top: 4px;
          cursor: pointer;
          text-align: center;
          align-items: center;
          background-color: transparent;
          display: flex;
          justify-content: center;
          width: 127px;
          height: 36px;
          border-radius: 37px;

          span {
            font-family: Inter;
            color: #8247E5;
            font-weight: 600;
            font-size: 14px;


          }

        }

      }
    }
  }

  .table-right {
    margin-bottom: 267px;
    margin-top: 16px;
    height: 378px;
    background: #FFFFFF;
    border-radius: 36px;

    .padding {
      padding: 24px 28px;


      .interest-title {
        font-family: Inter;
        font-weight: 600;
        font-size: 16px;
        color: #8F9092;
      }

      .interest-number {
        font-family: Inter;
        margin: 20px 0px 15px 0px;
        font-weight: 600;
        font-size: 36px;
        color: #1F2226;

        ::v-deep:nth-child(1) {
          font-family: Inter;
          margin: 20px 0px 15px 0px;
          font-weight: 600;
          font-size: 36px;
          color: #1F2226;
        }

        span {
          font-family: Inter;
          font-weight: 600;
          font-size: 20px;
          color: #1F2226;

        }

      }

      .interest-date {
        height: 19px;
        font-family: Inter;
        font-weight: 600;
        font-size: 16px;
        color: #1F222680;


      }

    }


  }
}

</style>>

