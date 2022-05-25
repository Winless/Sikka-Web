<template>
  <div class="account">
    <div class="account-main" v-if="iswidth==2">
      <div class="account-title">Account</div>
      <div class="acdiv1">
        <div class="acdiv1-left">
          <div class="padding">
            <div class="acdiv1-value">
              <div>Total Value</div>
              <div>{{ TotalValue }}<span>USP</span></div>
            </div>
            <totalcircular :IScircular1="IScircular1"></totalcircular>
          </div>
        </div>
        <div class="acdiv1-right">
          <div class="padding">
            <div class="TotalClaimable">
              <div>TotalClaimable Rewards</div>
              <div>{{ TotalClaimable }}</div>
            </div>
            <div class="TotalClaimable">
              <div>SIKKA Price</div>
              <div>{{ sikkaprice }}<span>USP</span></div>
            </div>
            <div class="Rewards-button">
              <a-button class="distrue" :disabled="true" v-if="this.TotalClaimable==0">
                Claim All Rewards
              </a-button>
              <a-button type="primary" class="btn1" v-else>
                Claim All Rewards
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 显示筛选 -->
      <div class="interest">
        <div v-for="(itme,index) in choosename" :key="index" class="interest-center">

          <div class="div1" @click="times(itme.time)" v-if="itme.show"><span>{{ itme.time }}</span></div>

          <div class="div2" @click="times(itme.time)" v-else><span>{{ itme.time }}</span></div>
        </div>

      </div>

      <div class="account-title" v-if="choosename.find(it=>it.time==='Earn').isselect">Earn</div>
      <div class="Borrow-main-list" v-if="choosename.find(it=>it.time==='Earn').isselect">
        <div class="list-title">
          <div class="padding">
            <div class="div1">Stablecoin</div>
            <div class="div2">APY</div>
            <div class="div3">Deposit amount</div>
            <div class="div7">Actions</div>

          </div>
        </div>

        <div class="list-main">
          <div class="padding">
            <div class="div1">{{ Earnlist.Stablecoin }}USP</div>
            <div class="div2">${{ Earnlist.APY }}</div>
            <div class="div3">{{ Earnlist.Depositamount }}USP</div>

            <div class="div7">
              <div class="Provide-button">
                <a-button class="distrue" :disabled="true" v-if="false">
                  Deposit
                </a-button>

                <a-button type="primary" class="btn-class" v-else @click="depositT()">
                  Deposit
                </a-button>
              </div>
              <div class="Withdraw-button">
                <a-button class="distrue" :disabled="true" v-if="false">
                  Withdraw
                </a-button>
                <a-button type="primary" class="btn-class" v-else @click="WithadrawT()">
                  Withdraw
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="account-title" v-if="choosename.find(it=>it.time==='Borrow').isselect">Borrow</div>
      <div class="borrow-main" v-if="choosename.find(it=>it.time==='Borrow').isselect">
        <div class="div-left">
          <div class="padding">

            <div class="B2">
              <div>Total Collateral Value</div>
              <div>{{ CollateralValue }}<span>USP</span></div>
            </div>
            <total-collateralcir :IScircular1="IScircular1"></total-collateralcir>
          </div>
        </div>
        <div class="div-right">
          <div class="padding">
            <div class="B1">
              <div>Borrowed Value</div>
              <div>{{ borrow.borrowlValue }}<span>USP</span></div>
            </div>
            <div class="B1">
              <div>Net APR</div>
              <div>{{ borrow.netApr }}<span>%</span></div>
            </div>
            <div class="progress">
              <div :class="'color'+boo">{{ borrow.progress }}%</div>
              <div class="scale01">
                <div>75%</div>
                <div></div>
              </div>
              <div class="scale02">
                <div>100%</div>
                <div></div>
              </div>
              <a-progress
                  v-if="progresswarning==1"
                  :percent="borrow.progress"
                  :show-info="false"
                  :stroke-color="{
                  from: '#87d068',
                  to: '#87d068',
                }"
              >
              </a-progress>
              <a-progress
                  v-if="progresswarning==2"
                  :percent="borrow.progress"
                  :show-info="false"
                  :stroke-color="{
                  from: '#FF5C00',
                  to: '#FF5C00',
                }"
              >
              </a-progress>
              <a-progress
                  v-if="progresswarning==3"
                  :percent="borrow.progress"
                  :show-info="false"
                  :stroke-color="{
                  from: '#D80303',
                  to: '#D80303',
                }"
              >
              </a-progress>
<!--              <a-slider :class="'cla'+boo" :tip-formatter="formatter" v-model="borrow.progress" :step="0.01"/>-->
              <div class="limit">Borrow Limit:{{ borrow.Limit }}<span>USP</span></div>
            </div>

          </div>
        </div>
      </div>

      <div class="account-title" v-if="choosename.find(it=>it.time==='History').isselect">Transaction history</div>
      <div class="Transaction" v-if="choosename.find(it=>it.time==='History').isselect">
        <div class="padding2">
          <div v-for="(itme,index) in Transactionlist" :key="index" class="Transaction-list">
            <div class="T1">
              <div>{{ itme.title }}</div>
              <div>{{ itme.action }}<span>{{itme.amount}}</span> </div>
            </div>
            <div class="T2">{{ itme.time }}<img src="../../assets/image/icon/Frame659.svg"></div>
          </div>
        </div>
      </div>
      <DepositF v-if="showdeposti" :setShow="setShowModal"></DepositF>
      <EarnWithdraw v-if="showWithdraw" :setShow="setShowModal"></EarnWithdraw>
      <sikkabottom></sikkabottom>
    </div>
    <pagemobile v-if="iswidth==1"></pagemobile>
  </div>
</template>

<script>
import Sikkabottom from "../../components/bottomF";
import Totalcircular from './components/Totalcircular.vue';
import TotalCollateralcir from './components/TotalCollateralcir.vue';
import Pagemobile from './Mobile/Pagemobile.vue';
import {mapGetters} from "vuex";
import {getAccountInfo, toPrecision} from "../../SDK";
import {getTransferAction} from "../../SDK/httpSearch";
import DepositF from "../Earn/components/DepositF";
import EarnWithdraw from "../Earn/components/earn-Withdraw";

export default {
  name: "index",

  components: {EarnWithdraw, DepositF, Sikkabottom, Totalcircular, TotalCollateralcir, Pagemobile},
  computed: {
    ...mapGetters(["iswidth","isLogin"]),
  },
  async created() {

   if(this.isLogin=="1000"){
     await this.MypageData();
     this.Historydata()
   }
   this.$bus.on("changeEarnInfo", async () => {
     await this.MypageData();
     this.Historydata()
   })


    },
  data() {
    return {
      progresswarning:1,
      showdeposti:false,
      showWithdraw:false,
      TotalValue: 0,
      TotalClaimable: 0,
      sikkaprice: 0,
      CollateralValue: 0,
      boo: 1,
      borrow: {
        borrowlValue:0,
        netApr: 0,
        progress: 0,
        Limit: 0
      },
      choosename: [
        {
          show: true,
          isselect: true,
          time: "All"
        },
        {
          show: false,
          isselect: true,
          time: "Earn"
        },
        {
          show: false,
          isselect: true,
          time: "Borrow"

        },
        {
          show: false,
          isselect: true,
          time: "History"
        }

      ],
      Earnlist:
        {
          Stablecoin: "",
          APY:0,
          Depositamount: 0,
        },


      Rewards: [
        {
          pool: "ANC Governance",
          APR: 8.92,
          Staked: 0,
        }

      ],
      IScircular1:{

      },
      Transactionlist: [


      ]
    }

  },
  watch:{
    "borrow.progress"() {
      if (this.borrow.progress >= 75) {
        this.progresswarning = 2
      }
      if (this.borrow.progress >= 90) {
        this.progresswarning = 3
      }
      if (this.borrow.progress >= 90) {
        this.boo = 3
      } else if (this.borrow.progress >= 75) {
        this.boo = 2
      } else {
        this.boo = 1
      }

    },
     isLogin(val){
       console.log("this.isLogin",val)
      if(val=="1000"){
         this.MypageData()
         this.Historydata()
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.getearnInfoT);
  },
  methods: {
    depositT(){
      this.showdeposti=!this.showdeposti

    },
    WithadrawT(){
      this.showWithdraw=!this.showWithdraw

    },
    setShowModal(value) {
      this.showdeposti = value;
      this.showWithdraw = value;

    },
   async MypageData(){
        let a=await getAccountInfo()
         console.log("mypage",a)
         this.IScircular1=a
        this.sikkaprice=a.sikkaPrice
        this.Earnlist.APY=a.earnapy
        this.TotalValue = Number(toPrecision((+a.USPAmount + +a.deposit + +a.borrow).toFixed(2)));
        this.Earnlist.APY=Number(toPrecision(((+this.Earnlist.APY)*100).toFixed(2)))
        this.Earnlist.Depositamount=a.deposit
        this.Earnlist.Depositamount=  Number((+this.Earnlist.Depositamount).toFixed(2))
        this.borrow.borrowlValue=a.borrow
        this.CollateralValue=a.totalCollateralUSP
        this.borrow.borrowlValue= toPrecision(this.borrow.borrowlValue)
        this.borrow.netApr=a.netApy
        this.borrow.netApr=  Number(((+this.borrow.netApr)*100).toFixed(2))
        this.borrow.progress=a.schedule
        this.borrow.progress= Number(((+this.borrow.progress)*100).toFixed(2))
        this.borrow.Limit=a.borrowLimit

     this.getearnInfoT = setTimeout(async () => {
       console.log("shuaxin")
       await this.MypageData();
       this.Historydata()
     }, 1000 * 60 * 10);
    },
    //交易记录
    async Historydata(){
     this.Transactionlist=await  getTransferAction()
      console.log("Historydata",this.Transactionlist)
      this.Transactionlist=this.Transactionlist.map((items)=>{
        return{
          amount:Number(toPrecision(items.amount)),
          title:items.title,
          time:items.time,
          action:items.action,
          hash:items.hash
        }
      })

    },
    times(name) {
      this.choosename = this.choosename.map((item) => {
        return {
          isselect: item.time === name || name === "All",
          show: item.time === name,
          time: item.time,
        }
      })
    },
    formatter(value) {
      return `${value}%`;
    },
  }
}
</script>

<style scoped lang="scss">
.account {
  min-height: calc(100vh - 90px);
  background: #F2F5FA;
  display: flex;
  justify-content: center;

  .account-main {
    width: calc(100% - 80px);
    padding: 66px 40px 40px 40px;
    max-width: 1360px;

    .padding {
      padding: 28px 24px;
    }

    .padding2 {
      padding: 32px 28px;
    }

    .account-title {
      margin-bottom: 28px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;

    }

    .acdiv1 {
      margin-bottom: 60px;
      display: flex;
      justify-content: flex-start;


      .acdiv1-left {
        background: #FFFFFF;
        border-radius: 36px;
        width: calc(100% - 458px);
        max-width: 902px;
        height: 418px;
        margin-right: 14px;

        .acdiv1-value {

          div:nth-child(1) {
            margin-bottom: 21px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;

          }

          div:nth-child(2) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 36px;
            color: #1F2226;

            span {
              margin-left: 5px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;

            }


          }

        }
      }

      .acdiv1-right {
        height: 418px;
        width: 444px;
        background: #FFFFFF;
        border-radius: 36px;

        .TotalClaimable {
          margin-bottom: 50px;

          div:nth-child(1) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;
          }

          div:nth-child(2) {
            margin-top: 28px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 36px;
            color: #1F2226;

            span {
              margin-left: 5px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;

            }
          }
        }

        .Rewards-button {

          ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
            color: #BFC6D0;
            background-color: #E0E7ED;
            border-radius: 18px;
            border-color: transparent;
            //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
            //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
            height: 50px;
            width: 388px;
            margin-right: 15px;

          }

          ::v-deep .btn1.ant-btn-primary {
            font-family: Inter;
            font-size: 16px;
            font-weight: 600;
            margin-right: 12px;
            height: 50px;
            width: 388px;
            border-radius: 18px;
            color: #fff;
            background: #8247E5;
            border-color: transparent;
            text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
            box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
          }

          ::v-deep .ant-btn-primary:hover, .ant-btn-primary:focus {
            color: #fff !important;
            background-color: #561FB2 !important;
            border-color: #561FB2 !important;
          }


        }
      }
    }

    .interest {
      display: flex;
      justify-content: flex-start;
      height: 44px;
      align-items: center;
      margin-bottom: 28px;

      .interest-center {
        margin-right: 10px;
        height: 44px;
        display: flex;
        justify-content: left;
        justify-items: left;

        .div1 {
          padding: 11px 14px;
          margin-top: 4px;
          cursor: pointer;
          background: #8247E5;
          box-sizing: border-box;
          border-radius: 12px;
          text-align: center;
          align-items: center;

          display: flex;
          justify-content: center;


          span {

            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
          }
        }

        .div2 {
          padding: 11px 14px;

          cursor: pointer;
          text-align: center;
          align-items: center;
          background-color: #fff;
          display: flex;
          justify-content: center;
          border-radius: 12px;

          span {
            font-family: Inter;
            color: #82899A;
            font-weight: 600;
            font-size: 14px;


          }

        }

      }
    }

    .Borrow-main-list {
      margin-bottom: 60px;
      //width: 1360px;
      //width: 71vw;
      //min-width: 1360px;

      .list-title {
        height: 41px;
        width: 100%;
        background: #E2E8F3;
        border-radius: 24px;

        .padding {
          display: flex;
          justify-content: space-between;
          padding: 12px 28px;

          .div1 {
            font-family: Inter;
            flex: 2;
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 14px;
            color: #9AA1B0;
          }

          .div2 {
            font-family: Inter;
            flex: 1.5;
            font-weight: 600;
            font-size: 14px;
            color: #9AA1B0;
          }

          .div3 {
            font-family: Inter;
            flex: 1.2;
            font-weight: 600;
            font-size: 14px;
            color: #9AA1B0;
          }


          .div7 {
            font-family: Inter;
            flex: 2.1;
            width: 14vw;
            font-weight: 600;
            font-size: 14px;
            color: #9AA1B0;
            align-items: center;
            display: flex;
            justify-content: right;

          }
        }
      }

      .list-main {

        .padding {
          display: flex;
          justify-content: space-between;
          padding: 12px 0px 12px 28px;

          .div1 {
            font-family: Inter;
            flex: 1.9;
            display: flex;
            align-items: center;
            font-weight: 400;
            color: #1F2226;


            img {
              margin-right: 11px;

            }
          }

          .div2 {
            padding-left: 10px;
            font-family: Inter;
            flex: 1.5;
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;

          }

          .div3 {
            font-family: Inter;
            padding-left: 10px;
            flex: 1.2;
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;

          }

          .div7 {
            font-family: Inter;
            flex: 2.2;
            align-items: center;
            display: flex;
            justify-content: right;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;


            .Provide-button {

              ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
                color: #BFC6D0;
                background-color: #E0E7ED;
                border-radius: 37px;
                border-color: transparent;
                //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
                //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
                height: 44px;
                width: 132px;
              }

              ::v-deep .ant-btn-primary:hover, .ant-btn-primary:focus {
                color: #fff !important;
                background-color: #8247E5 !important;
                border-color: #561FB2 !important;
              }

              ::v-deep.btn-class.ant-btn-primary {
                font-family: Inter;
                color: #8247E5;
                font-weight: 600;
                font-size: 16px;
                height: 40px;
                width: 122px;
                background: transparent;
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

            .Withdraw-button {

              ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
                color: #BFC6D0;
                background-color: #E0E7ED;
                border-radius: 37px;
                border-color: transparent;
                //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
                //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
                height: 44px;
                width: 132px;
                margin-left: 7px;
              }

              ::v-deep .ant-btn-primary:hover, .ant-btn-primary:focus {
                color: #fff !important;
                background-color: #8247E5 !important;
                border-color: #8247E5 !important;
              }

              ::v-deep.btn-class.ant-btn-primary {
                font-family: Inter;
                color: #8247E5;
                font-weight: 600;
                font-size: 16px;
                height: 40px;
                width: 122px;
                background: transparent;
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
                margin-left: 7px;

              }
            }

          }
        }

      }


    }

    .borrow-main {
      margin-bottom: 60px;
      display: flex;
      justify-content: flex-start;

      .div-left {
        background: #FFFFFF;
        border-radius: 36px;
        width: calc(50% - 7px);
        max-width: 673px;
        height: 390px;
        margin-right: 14px;

        .B2 {
          margin-bottom: 10px;

          div:nth-child(1) {
            margin-bottom: 28px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;

          }

          div:nth-child(2) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 36px;
            color: #1F2226;

            span {
              margin-left: 5px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;
            }

          }


        }
      }

      .div-right {
        background: #FFFFFF;
        border-radius: 36px;
        width: calc(50% - 7px);
        max-width: 673px;
        height: 390px;

        .B1 {
          margin-bottom: 25px;

          div:nth-child(1) {
            margin-bottom: 28px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;

          }

          div:nth-child(2) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 36px;
            color: #1F2226;

            span {
              margin-left: 5px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;
            }

          }

        }

        .progress {
          position: relative;
          margin-top: 25px;
          margin-bottom: 30px;

          .scale03 {
            left: 1px;
            top: -28px;
            position: absolute;
            font-weight: 600;
            font-size: 14px;
            color: #19BA63;
            font-family: Inter;

          }

          .scale03red {
            left: 1px;
            top: -28px;
            position: absolute;
            font-weight: 600;
            font-size: 14px;
            color: #D80303;
            font-family: Inter;

          }

          .scale01 {
            top: 5px;
            align-items: flex-end;
            position: absolute;
            right: 25%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            div:nth-child(1) {
              font-weight: 600;
              font-size: 14px;
              color: #BFC6D0;
              font-family: Inter;
            }

            div:nth-child(2) {
              width: 1px;
              height: 13px;
              background: #E2E8F3;
              font-family: Inter;
            }

          }

          .scale02 {
            top: 5px;
            align-items: flex-end;
            position: absolute;
            right: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            div:nth-child(1) {
              font-weight: 600;
              font-size: 14px;
              color: #BFC6D0;
              font-family: Inter;
            }

            div:nth-child(2) {
              width: 1px;
              height: 13px;
              background: #E2E8F3;

            }


          }

          .limit {
            font-family: Inter;
            font-weight: 400;
            font-size: 13px;
            color: #9AA1B0;
            display: flex;
            justify-content: right;

            span {
              margin-left: 5px;

            }
          }

          .progress-p {
            margin: 32px 0px 34px 0px;
            border-radius: 15px;

            border: #E2E8F3 1px solid;


            .padding {
              padding: 20px;
              font-weight: 600;
              font-size: 14px;
              font-family: Inter;
              color: #1F2226;

              span {
                font-weight: 600;
                font-size: 14px;
                font-family: Inter;
                color: #D80303;

              }
            }


          }

        }
      }
    }

    .Transaction {
      background: #FFFFFF;
      border-radius: 36px;

      .Transaction-list {
        margin-bottom: 20px;
        align-items: center;
        display: flex;
        justify-content: space-between;
        height: 63px;
        border-bottom: 1px solid #E2E8F3;

        .T1 {

          div:nth-child(1) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;

          }

          div:nth-child(2) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;

            color: #1F2226;
          }

        }

        .T2 {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #1F2226;

          img {
            margin-left: 17px;

          }
        }
      }

    }

  }

}

.color1 {
  color: #19BA63
}

.color2 {
  color: #FE5D01
}

.color3 {
  color: #D80303
}

::v-deep .cla1.ant-slider .ant-slider-track {
  background-color: #19BA63 !important;
}

::v-deep .cla1.ant-slider .ant-slider-handle, .ant-slider .ant-slider-dot {
  background-color: #19BA63 !important;
  border-color: #19BA63 !important;

}

::v-deep .cla2.ant-slider .ant-slider-track {
  background-color: #FE5D01 !important;
}

::v-deep .cla2.ant-slider .ant-slider-handle, .ant-slider .ant-slider-dot {
  background-color: #FE5D01 !important;
  border-color: #FE5D01 !important;

}

::v-deep .cla3.ant-slider .ant-slider-track {
  background-color: #D80303 !important;
}

::v-deep .cla3.ant-slider .ant-slider-handle, .ant-slider .ant-slider-dot {
  background-color: #D80303 !important;
  border-color: #D80303 !important;

}
</style>