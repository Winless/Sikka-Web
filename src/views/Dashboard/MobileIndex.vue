<template>
  <div class="dashboard-main">
<!--    <div class="dashboard-title">Dashboard</div>-->
    <div class="dashboard-fiex">
      <div class="dadshboard-left">
        <div class="padding">
          <div class="left-title">Total Value Locked </div>
          <div class="left-token">{{TotalLocked.Locked}}<span>     USP</span></div>
          <Mobcircle :Totaldata="Totaldata"></Mobcircle>
          <div class="left-progress-bom">
            <div class="progress-bom-deposit">
              <div>
                <img src="../../assets/image/Modalicon/cirimg.svg">
                Total Deposit</div>
              <div>${{TotalLocked.TotalDeposit}}</div>
            </div>
            <div class="progress-bom-collateral">
              <div>
                <img src="../../assets/image/Modalicon/cirimg2.svg">
                Total Collateral</div>
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

            </div>
            <sikka-echarts :chartData="chartData"></sikka-echarts>
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

        </div>
        <div class="right-div2">
          <div class="padding">
            <div class="main">
              <div class="merdiv1">
                <div class="merdiv1-title">SIKKA Buyback (72 HR)</div>
                <div class="mertoken">
                  <div class="mertoken-p1">{{MERbuyback.merhr1}}<span>  SIKKA</span></div>
                  <div >{{MERbuyback.merhr2}}<span>  USP</span></div>
                </div>
              </div>
              <div class="line"></div>
              <div class="merdiv1">
                <div  class="merdiv1-title">SIKKA Buyback (TOTAL)</div>
                <div  class="mertoken">
                  <div class="mertoken-p1">{{MERbuyback.total1}}<span>  SIKKA</span></div>
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
        <EchartsStableM :chartData="chartData"></EchartsStableM>

        <div class="DepositList">
          <div class="list-title" v-for="(itme,index) in Stablelist" :key="index">
            <div class="list-title-p div1">
              <span class="t1">Stablecoin Market</span>
              <span class="t2"><img :src="itme.tokenimg">{{itme.tokenname}}</span>
            </div>
            <div class="list-title-p div2">
              <span class="t1">Total Deposit</span>
              <span class="t2">${{itme.TotalDeposit}}</span>
            </div>
            <div class="list-title-p div3">
              <span class="t1">Deposit APY</span>
              <span class="t2">{{itme.APY}}%</span>
            </div>
            <div class="list-title-p div4">
              <span class="t1">Total Borrow</span>
              <span class="t2">${{itme.Borrow}}</span>
            </div>
            <div class="list-title-p div5">
              <span class="t1">Borrow APR</span>
              <span class="t2">{{itme.borrowAPY}}%</span>
            </div>
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

        <div class="DepositList">
          <div class="list-title" v-for="(itme,index) in CollateralMarket" :key="index">
            <div class="list-title-p div1">
              <span class="t1">Collateral Market</span>
              <span class="t2"><img :src="itme.tokenimg2">{{itme.tokenname2}}</span>
            </div>
            <div class="list-title-p div2">
              <span class="t1">Price</span>
              <span class="t2">${{itme.price}}</span>
            </div>
            <div class="list-title-p div3">
              <span class="t1">Total Collateral</span>
              <span class="t2">${{itme.Collateral}}</span>
            </div>
            <div class="list-title-p div4">
              <span class="t1">Total Collateral Value</span>
              <span class="t2">${{itme.Collateralvalue}}</span>
            </div>

          </div>

        </div>
      </div>

    </div>
<!--    <sikkabottom ></sikkabottom>-->
  </div>

</template>
<script>
import {toThousands,toFixed2,} from "../../utils/tools"
import {mapGetters} from "vuex";
import EchartsStableM from "./components/EchartsStableM";
import Marketecharts from "./components/Marketecharts";
import SikkaEcharts from "./components/sikkaEcharts";
// import Sikkabottom from "../../components/bottomF";
import {getDashboardChart,getTransferAction,getDashboardInfo} from "../../SDK/httpSearch";
import Mobcircle from "./components/Mobcircle";

export default {
  name: "DashboardMobile",
  components: {Mobcircle, SikkaEcharts, Marketecharts, EchartsStableM},
  data() {
    return {

      chartData:[],
      Succeeds:0,
      worry:0,
      TotalLocked:{
        Locked:"16,775,635,704",
        TotalDeposit:"11,005,549",
        TotalCollateral:"5,770,915",
        Reserve:"409,801,848",
      },
      MERechart:{
        price:2.89,
        supply:"266,165,112",
        cap:"681,438,515",
      },
      MERbuyback:{
        merhr1:"110,343",
        merhr2:"294,824",
        total1:"5,110,3",
        total2:"16,294,8",
      },
      Stabledepost:"11,005,549,245",
      Stableborrow:"15,110,343",
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
      Market:"11,005,549,245",
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

      },
      Totaldata:{

      },
    }
  },
  mounted() {
    this.checkInfo();

  },
  created() {


  },
  computed:{
    ...mapGetters(["account", "borrowInfo", "btnshow", "isLogin"]),
  },
  watch: {
    isLogin(){
      this.checkInfo();
    }

  },
  methods: {
    async checkInfo() {
      if(this.isLogin != "1000"){
        return;
      }
      const aa = await getDashboardChart();
      const transData = await getTransferAction();
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
      console.log("transData=",transData)
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
    margin-bottom: 221px;
    width: calc(100% - 32px);
    //padding: 0;
    padding: 32px 0px 0px 0px;
    .dashboard-title{
      margin-bottom: 27px;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;
      font-family: Inter;

    }
    .padding{
      padding: 24px;

    }
    .dashboard-fiex{
      position: relative;
      display: flex;
      flex-direction: column;

      .dadshboard-left{
        position: relative;
        background: #FFFFFF;
        border-radius: 36px;


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
          font-size: 24px;
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
          //display: flex;
          //justify-content: space-between;
          margin-top: 9px;


          .progress-bom-deposit{
            margin-bottom: 48px;

            div:nth-child(1){
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              color: #9AA1B0;
              margin-bottom: 16px;

              img{
               margin-right: 6px;
              }

            }
            div:nth-child(2){
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 24px;
              color: #1F2226;

            }


          }
          .progress-bom-collateral{
            padding-right: 34px;
            div:nth-child(1){
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              color: #9AA1B0;
              margin-bottom: 16px;

              img{
                margin-right: 6px;
              }
            }
            div:nth-child(2){
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 24px;
              color: #1F2226;

            }

          }
        }
        .Splitline{
          margin: 40px 0px 34px 0px;
          height: 1px;
          background: #E2E8F3;

        }
        .Reserve{
          margin-top: 18px;

          font-family: 'Inter';
          font-weight: 600;
          font-size: 24px;
          line-height: 100%;
          color: #1F2226;

          span{
            margin-left: 8px;
            font-family: 'Inter';
            font-weight: 600;
            font-size: 14px;
            line-height: 100%;
            color: #1F2226;

          }
        }
      }
      .dadshboard-right{
        position: relative;

        margin-top: 24px;

        .right-div1{
          border-radius: 36px;
          background: #ffffff;
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

          .right-_title{
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            ._title{

              div:nth-child(1){
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                color: #9AA1B0;
                margin-bottom: 18px;

              }
              div:nth-child(2){
                font-family: 'Inter';
                font-weight: 600;
                font-size: 24px;
                line-height: 100%;
                color: #1F2226;
                span{
                  margin-left: 16px;

                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 14px;
                  line-height: 100%;
                  color: #1F2226;

                }
              }

            }

            ._title:not(:first-child){
              margin-top: 48px;
            }
          }

        }
        .right-div2{
          position: relative;
          border-radius: 36px;
          background: #ffffff;

          .main{
            position: relative;
            display: flex;
            flex-direction: column;

            .line{
              position: relative;
              margin: 24px 0;
              height: 1px;
              width: 100%;
              background: #E2E8F3;
            }
            .merdiv1{
              position: relative;
              .merdiv1-title{
                font-family: 'Inter';
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                color: #9AA1B0;
              }
              .mertoken{
                position: relative;
                margin-top: 48px;
                display: flex;
                flex-direction: column;

                div{
                  font-family: 'Inter';
                  font-weight: 600;
                  font-size: 24px;
                  line-height: 100%;
                  color: #1F2226;


                  span{
                    font-family: 'Inter';
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 100%;
                    color: #1F2226;
                  }
                }

                .mertoken-p1{
                  margin-bottom: 24px;
                }


              }
            }
          }

        }
      }
    }
    .dashboard-02{
      margin: 32px 0px;

      background: #FFFFFF;
      border-radius: 36px;

      .title02{
        flex-direction: column;
        display: flex;
        justify-content: flex-start;

        .div1{
          margin-bottom: 24px;

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
            font-size: 24px;
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
        position: relative;
        margin-top: 52px;

        .list-title{
          //margin-bottom: 25.5px;
          //border-bottom: 1px solid #E2E8F3;
          display: flex;
          flex-direction: column;

          .list-title-p{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .list-title-p:not(:first-child){
            margin-top: 26px;
            padding-bottom: 10px;
            border-bottom: 1px solid #E2E8F3;

            .t1{
              font-family: 'Inter';
              font-weight: 700;
              font-size: 12px;
              line-height: 15px;
              color: #9AA1B0;
            }
            .t2{
              font-family: 'Inter';
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #1F2226;
            }
          }

          .div1{
            flex: 2;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #1F2226;

            margin-bottom: 8px;

            .t1{
              font-family: 'Inter';
              font-weight: 700;
              font-size: 20px;
              line-height: 120%;
              color: #1F2226;
              width: 114px;
            }

            .t2{
              font-family: 'Inter';
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #1F2226;
              img{
                width: 32px;
                margin-right: 10px;
              }
            }

          }
          .div2{
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
          font-size: 20px;
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
        position: relative;
        margin-top: 52px;

        .list-title{
          //margin-bottom: 25.5px;
          //border-bottom: 1px solid #E2E8F3;
          display: flex;
          flex-direction: column;

          .list-title-p{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .list-title-p:not(:first-child){
            margin-top: 26px;
            padding-bottom: 10px;
            border-bottom: 1px solid #E2E8F3;

            .t1{
              font-family: 'Inter';
              font-weight: 700;
              font-size: 12px;
              line-height: 15px;
              color: #9AA1B0;
            }
            .t2{
              font-family: 'Inter';
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #1F2226;
            }
          }

          .div1{
            flex: 2;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #1F2226;

            margin-bottom: 8px;

            .t1{
              font-family: 'Inter';
              font-weight: 700;
              font-size: 20px;
              line-height: 120%;
              color: #1F2226;
              width: 114px;
            }

            .t2{
              font-family: 'Inter';
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #1F2226;
              img{
                width: 32px;
                margin-right: 10px;
              }
            }
          }
          .div2{

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

  }

}
.worry{
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
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
