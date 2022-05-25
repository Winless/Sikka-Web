<template>
  <div class="dashboard-main">
    <div class="dashboard-title">Dashboard</div>
    <div class="dashboard-fiex">
      <div class="dadshboard-left">
        <div class="padding">
          <div class="left-title">Total Value Locked </div>
          <div class="left-token">{{TotalLocked.Locked}}<span>     USP</span></div>
          <CircleU :Totaldata="Totaldata"></CircleU>
          <div class="left-progress-bom">
            <div class="progress-bom-deposit">
              <!--                <div>Total Deposit</div>-->
              <div>${{TotalLocked.TotalDeposit}}</div>
            </div>
            <div class="progress-bom-collateral">
              <!--                <div>Total Collateral</div>-->
              <div>${{TotalLocked.TotalCollateral}}</div>
            </div>
          </div>
          <div class="Splitline"></div>
          <div class="left-title">Yield Reserve</div>
          <div class="Reserve">{{TotalLocked.Reserve}}<span>    USP</span></div>
        </div>
      </div>
      <div class="dadshboard-right">
        <div class="right-div1">
          <div class="padding">
            <div class="div1">
              <div class="_title2">
                <div class="p1">SIKKA Price</div>
                <div class="p2">
                  <div><span>{{MERechart.price}}</span>   USP </div>
                  <div class="worry"><span>-{{worry}}%</span></div>
                </div>

              </div>
              <div class="right-_title">
                <div class="_title">
                  <div>Circulating Supply</div>
                  <div>{{MERechart.supply}}  <span>SIKKA</span></div>
                </div>
                <div class="_title">
                  <div>SIKKA Market Cap</div>
                  <div>{{MERechart.cap}}   <span>SIKKA</span></div>
                </div>
              </div>
            </div>
            <sikka-echarts :chartData="chartData"></sikka-echarts>
          </div>

        </div>
        <div class="right-div2">
          <div class="padding">
            <div class="main">
              <div class="merdiv1">
                <div class="merdiv1-title">SIKKA Buyback (72 HR)</div>
                <div class="mertoken">
                  <div>{{MERbuyback.merhr1}}<span>  SIKKA</span></div>
                  <div>{{MERbuyback.merhr2}}<span>  USP</span></div>
                </div>
              </div>
              <div class="line"></div>
              <div class="merdiv1">
                <div  class="merdiv1-title">SIKKA Buyback (TOTAL)</div>
                <div  class="mertoken">
                  <div>{{MERbuyback.total1}}<span>  SIKKA</span></div>
                  <div>{{MERbuyback.total2}}<span>  USP</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>

    <div class="dashboard-02">
      <div class="padding">
        <div class="title02">
          <div class="div1">
            <div>Total Deposit</div>
            <div>{{Stabledepost}}<span>  USP</span></div>
          </div>
          <div class="div1">
            <div>Total Borrow</div>
            <div>{{Stableborrow}}<span>  USP</span></div>
          </div>
        </div>
        <EchartsStable :chartData="chartData"></EchartsStable>
        <div class="DepositList">
          <div class="list-title">
            <div class="div1">Stablecoin Market</div>
            <div class="div2">Total Deposit</div>
            <div class="div3">Deposit APY</div>
            <div class="div4">Total Borrow</div>
            <div class="div5">Borrow APR</div>
          </div>
          <div class="list-main" v-for="(itme,index) in Stablelist" :key="index">
            <div class="div1"><img :src="itme.tokenimg">{{itme.tokenname}}</div>
            <div class="div2">${{itme.TotalDeposit}}</div>
            <div class="div3">{{itme.APY}}%</div>
            <div class="div4">${{itme.Borrow}}</div>
            <div class="div5">{{itme.borrowAPY}}%</div>
          </div>
        </div>

      </div>

    </div>

    <div class="dashboard-03">
      <div class="padding">
        <div class="title03">
          <div class="a2">
            <div class="a2-title">Total Collateral Value</div>
            <div class="success"><span>+{{Succeeds}}%</span></div>
          </div>
          <div class="a3">{{Market}}<span> USP</span></div>
        </div>
        <Marketecharts :chartData="chartData"></Marketecharts>
        <div class="DepositList" style="margin-top: 32px">
          <div class="list-title">
            <div class="div1">Collateral Market</div>
            <div class="div2">Price</div>
            <div class="div3">Total Collateral</div>
            <div class="div4">Total Collateral Value</div>
          </div>
          <div class="list-main" v-for="(itme,index) in CollateralMarket" :key="index" style="align-items: center;">
            <div class="div1" style="display: flex;justify-content: left;align-items: center"><img :src="itme.tokenimg2" style="margin-right:5px;height:32px;width: 32px;image-rendering: -moz-crisp-edges; /* Firefox */
                image-rendering: -o-crisp-edges; /* Opera */
                image-rendering: crisp-edges;    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */">{{itme.tokenname2}}</div>
            <div class="div2">${{itme.price}}</div>
            <div class="div3">{{itme.Collateral}}M</div>
            <div class="div4">${{itme.Collateralvalue}}M</div>
          </div>
        </div>

      </div>

    </div>
    <sikkabottom ></sikkabottom>
  </div>

</template>
<script>
import {toThousands,toFixed2,} from "../../utils/tools"
import {mapGetters} from "vuex";
import CircleU from "./components/circle";
import EchartsStable from "./components/EchartsStable";
import Marketecharts from "./components/Marketecharts";
import SikkaEcharts from "./components/sikkaEcharts";
import Sikkabottom from "../../components/bottomF";
import {getDashboardChart,getDashboardInfo} from "../../SDK/httpSearch";
export default {
  name: "PCIndex",
  components: {Sikkabottom, SikkaEcharts, Marketecharts, EchartsStable, CircleU},
  data() {
    return {
      isMobile:true,
      chartData:[],
      Succeeds:0,
      worry:0,
      Totaldata:{

      },
      TotalLocked:{
        Locked:0,
        TotalDeposit:0,
        TotalCollateral:0,
        Reserve:0,
      },
      MERechart:{
        price:0,
        supply:"266,165,112",
        cap:"681,438,515",
      },
      MERbuyback:{
        merhr1:"110,343",
        merhr2:"294,824",
        total1:"5,110,3",
        total2:"16,294,8",
      },
      Stabledepost:0,
      Stableborrow:0,
      Stablelist:[
        {
          tokenname:"USP",
          tokenimg:require("../../assets/image/icon/Ellipse2516.svg"),
          TotalDeposit:11.77,
          APY:19.57,
          Borrow:0,
          borrowAPY:-11.69,

        }

      ],
      Market:0,
      CollateralMarket:[
        {
          tokenimg2:require("../../assets/image/Modalicon/amaticb.png"),
          tokenname2:"aMATICb",
          price:10,
          Collateral:17.33,
          Collateralvalue:126.23,
        }

      ],
      myChart:{

      }

    }
  },
  // mounted() {
  //   this.checkInfo();
  //
  // },
  created() {
    this.checkInfo();

  },
  computed:{
    ...mapGetters(["account", "borrowInfo", "btnshow", "isLogin"]),
  },
  watch: {


  },
  methods: {
    async checkInfo() {
      const aa = await getDashboardChart();
      // const transData = await getTransferAction();
      const dashInfo = await getDashboardInfo();
      this.chartData = aa;
      let len = this.chartData.length;
      if (len > 2) {
        this.Succeeds = 100 * (this.chartData[len - 1].totalLoan - this.chartData[len - 2].totalLoan) / this.chartData[len - 2].totalLoan;
        this.Succeeds=Number((this.Succeeds).toFixed(2));
        this.worry = 100 * (this.chartData[len - 1].auspPrice - this.chartData[len - 2].auspPrice) / this.chartData[len - 2].auspPrice;
        this.worry=Number((this.worry).toFixed(2))
      }
      console.log("chartData=",this.chartData)
      // console.log("transData=",transData)
      console.log("dashInfo=",dashInfo)

      this.TotalLocked.TotalDeposit = toThousands(dashInfo.totalDeposit);
      this.TotalLocked.TotalCollateral = toThousands(dashInfo.totalCollateralValue);
      this.TotalLocked.Reserve = toThousands(dashInfo.yieldReserve);
      this.TotalLocked.Locked = toThousands((dashInfo.totalDeposit+dashInfo.totalCollateralValue)/dashInfo.USPPrice);
      this.Totaldata= dashInfo
      this.Stabledepost= toThousands(dashInfo.totalDeposit/dashInfo.USPPrice);
      this.Stableborrow= toThousands(dashInfo.totalBorrow);
      this.Locked = 0
      this.MERechart.price = toFixed2(dashInfo.SIKKAPrice);
      this.Market=toThousands(dashInfo.totalCollateralValue/dashInfo.USPPrice)
      this.Stablelist[0].TotalDeposit = toFixed2(dashInfo.totalDeposit);
      this.Stablelist[0].APY = toFixed2(dashInfo.depositAPY*100);
      this.Stablelist[0].Borrow = toFixed2(dashInfo.totalBorrow);
      this.Stablelist[0].borrowAPY = 0.65;

      this.CollateralMarket[0].price = toFixed2(dashInfo.aMATICbPrice);
      this.CollateralMarket[0].Collateral = toFixed2(dashInfo.totalCollateral);
      this.CollateralMarket[0].collateralvalue = toFixed2(dashInfo.totalCollateralValue);



    }

  },


}
</script>

<style scoped lang="scss">

::v-deep.ant-progress-circle-wrap,.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
.dashboard{
  min-height: calc(100vh - 90px);
  background: #F2F5FA;
  display: flex;
  justify-content: center;


  .dashboard-main{
    width: calc(100% - 80px);
    padding: 66px 40px 40px 40px;
    max-width: 1360px;

    .dashboard-title{
      margin-bottom: 27px;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;
      font-family: Inter;

    }
    .padding{
      padding: 24px 28px;

    }
    .dashboard-fiex{
      display: flex;
      justify-content: flex-start;

      .dadshboard-left{
        height: 689px;
        width: 444px;
        background: #FFFFFF;
        border-radius: 36px;
        margin-right: 14px;

        .left-title{
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          color: #9AA1B0;

        }
        .left-token{
          margin-top: 28px;
          margin-bottom: 28px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          color: #1F2226;
          span{
            margin-right: 6px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #1F2226;
          }
        }
        .left-circle{
          text-align: center;
          height: 187px;

        }

        .left-progress-bom{
          padding: 0 6px;
          display: flex;
          justify-content: space-between;
          margin-top: 9px;


          .progress-bom-deposit{

            div:nth-child(1){
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              color: #1F2226;
              margin-bottom: 16px;

            }
            div:nth-child(2){
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;

            }


          }
          .progress-bom-collateral{
            padding-right: 34px;
            div:nth-child(1){
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              color: #1F2226;
              margin-bottom: 16px;
            }
            div:nth-child(2){
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;

            }

          }
        }
        .Splitline{
          margin: 40px 0px 27px 0px;
          height: 1px;
          background: #E2E8F3;

        }
        .Reserve{
          margin-top: 42px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          color: #1F2226;

          span{
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #1F2226;

          }
        }
      }
      .dadshboard-right{

        width: calc(100% - 458px);
        max-width: 902px;
        height: 689px;

        .right-div1{
          border-radius: 36px;
          background: #ffffff;
          height: 498px;
          margin-bottom: 14px;

          .div1{
            display: flex;
            justify-content: space-between;
            ._title2{


              .p1{
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                color: #9AA1B0;
                margin-bottom: 18px;

              }
              .p2{
                display: flex;
                justify-content: flex-start;
                // align-items: center;
                div:nth-child(1){
                  // margin-right: 15px;
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 20px;
                  color: #1F2226;
                  span{

                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 36px;
                    color: #1F2226;
                  }

                }

              }

            }
            .right-_title{
              width: 60%;
              display: flex;
              justify-content: space-between;

              ._title{


                div:nth-child(1){
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 16px;
                  color: #9AA1B0;
                  margin-bottom: 18px;

                }
                div:nth-child(2){
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 20px;
                  color: #1F2226;
                  span{
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 14px;
                    color: #1F2226;

                  }
                }

              }
            }
            ._title{

              div:nth-child(1){
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                color: #9AA1B0;
                margin-bottom: 28px;

              }
              div:nth-child(2){
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                color: #1F2226;
                span{
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 36px;
                  color: #1F2226;


                }

              }
            }
          }

        }
        .right-div2{
          border-radius: 36px;
          height: 177px;
          background: #ffffff;


          .main{
            display: flex;
            justify-content: space-between;

            .line{
              //margin-left: 225px;
              //margin-right: 28px;
              margin:0px 22px;
              height: 129px;
              width: 2px;
              background: #E2E8F3;
            }
            .merdiv1{
              width: 49%;
              // margin-left: 28px;

              .merdiv1-title{
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                color: #9AA1B0;
              }
              .mertoken{
                display: flex;
                justify-content: space-between;

                div{
                  margin-top: 55px;
                  // margin-right: 23px;
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 24px;
                  color: #1F2226;


                  span{
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 14px;
                    color: #1F2226;

                  }
                }


              }
            }
          }

        }
      }
    }
    .dashboard-02{
      margin: 32px 0px;
      height: 564px;
      background: #FFFFFF;
      border-radius: 36px;

      .title02{

        display: flex;
        justify-content: flex-start;

        .div1{

          margin-right: 110px;
          div:nth-child(1){
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
            margin-bottom: 14px;
          }
          div:nth-child(2){
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 36px;
            color: #1F2226;

            span{

              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;

            }
          }


        }

      }
      .DepositList{
        margin-top: 52px;

        .list-title{
          margin-bottom: 25.5px;
          height: 54px;
          border-bottom: 1px solid #E2E8F3;
          display: flex;
          justify-content: space-between;

          .div1{
            flex: 2;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #1F2226;
          }
          .div2{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }
          .div3{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }
          .div4{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }
          .div5{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }
        }
        .list-main{
          display: flex;
          justify-content: space-between;
          align-items: center;

          .div1{
            flex: 2;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
            display: flex;
            justify-content: left ;
            align-items: center;
            img{
              width: 32px;
              height: 32px;
              margin-right: 5px;

            }
          }
          .div2{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }
          .div3{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }
          .div4{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }
          .div5{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }

        }
      }

    }
    .dashboard-03{
      height: 564px;
      background: #FFFFFF;
      border-radius: 36px;

      .title03{

        .a2{
          height: 39px;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 14px;
          align-items: center;
          .a2-title{
            margin-right: 7px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }
        }
        .a3{
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          color: #1F2226;

          span{
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #1F2226;

          }

        }
      }
      .DepositList{


        .list-title{
          margin-bottom: 32.5px;
          height: 54px;
          border-bottom: 1px solid #E2E8F3;
          display: flex;
          justify-content: space-between;

          .div1{
            flex: 2;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #1F2226;
          }
          .div2{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }
          .div3{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }
          .div4{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }

        }
        .list-main{
          display: flex;
          justify-content: space-between;

          .div1{
            flex: 2;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }
          .div2{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }
          .div3{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }
          .div4{
            flex: 1;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;
          }


        }
      }
    }

  }

}
.worry{
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  //width: 50px;
  height: 18px;
  background: #FF75754D;
  span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: #FA1313;
  }
}
.success{
  margin-bottom: 27px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  //width: 50px;
  height: 18px;
  background: #DDFEEE;
  span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: #00B75F;
  }

}
</style>