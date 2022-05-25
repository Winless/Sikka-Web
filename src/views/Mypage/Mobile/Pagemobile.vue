<template>
  <div class="mobilepage">
    <div class="div1">
      <div class="padding">
        <div class="account">
          <div>Account</div>
          <div>Total Value</div>
          <div>{{ TotalValue }}<span>USP</span></div>
        </div>
        <MobTotalcircular :IScircular1="IScircular1"></MobTotalcircular>
      </div>

    </div>
    <div class="div2">
      <div class="padding">
        <div class="Rewards-title">
          <div>Total Claimable Rewards</div>
          <div>{{ TotalClaimable }}</div>
        </div>
        <div class="money">
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


    <!-- 显示筛选 -->
    <div class="div3">
      <div class="interest">
        <div v-for="(itme,index) in choosename" :key="index" class="interest-center">

          <div class="div3" @click="times(itme.time)" v-if="itme.show"><span>{{ itme.time }}</span></div>

          <div class="div4" @click="times(itme.time)" v-else><span>{{ itme.time }}</span></div>
        </div>

      </div>

    </div>

    <div class="earn-list"  v-if="choosename.find(it=>it.time==='Earn').isselect">
      <div class="padding">
        <div class="list--title">
          <div class="t1">Earn</div>
          <div class="t2">
            <img src="">
            <div></div>
          </div>
        </div>
        <div class="list-collateral">
          <div>Stablecoin</div>
          <div><img src="">USP</div>
        </div>
        <div class="list-collateral">
          <div>APY</div>
          <div>${{ Earnlist.APY }}</div>
        </div>
        <div class="list-collateral">
          <div>Deposit amount</div>
          <div>{{ Earnlist.Depositamount }}USP</div>
        </div>
        <div class="list-bottom">
          <div class="Provide-button">
            <a-button class="distrue" :disabled="true" v-if="false">
              Deposit
            </a-button>

            <a-button type="primary" class="btn-class" v-else @click="depositT()">
              Deposit
            </a-button>
          </div>
        </div>

        <div class="list-bottom">
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

    <div class="borrow-list"  v-if="choosename.find(it=>it.time==='Borrow').isselect">
      <div class="padding">
        <div class="divs">
          <div>Borrow</div>
          <div>Total Collateral Value</div>
          <div>{{ CollateralValue }} USP</div>
        </div>
        <MobTotalCollateralcir :IScircular1="IScircular1"></MobTotalCollateralcir>
      </div>
    </div>

    <div class="history"  v-if="choosename.find(it=>it.time==='History').isselect">
      <div class="padding">
        <div class="title">Transaction history</div>
        <div v-for="(itme,index) in Transactionlist" :key="index" class="Transaction-list">
          <div class="T1">
            <div class="a">{{ itme.title }}</div>
            <div class="b">{{ itme.action }}<span>{{itme.amount}}</span> </div>
          </div>
          <div class="T2">{{ itme.time }}<img src="../../../assets/image/icon/Frame659.svg"></div>

        </div>

      </div>


    </div>
    <MobDepositF v-if="showdeposti" :setShow="setShowModal"></MobDepositF>
    <MobearnWithdraw v-if="showWithdraw" :setShow="setShowModal"></MobearnWithdraw>
  </div>
</template>

<script>
import MobTotalcircular from "./components/MobTotalcircular"
import MobTotalCollateralcir from "./components/MobTotalCollateralcir"
import {getAccountInfo, toPrecision} from "../../../SDK";
import {getTransferAction} from "../../../SDK/httpSearch";
import {mapGetters} from "vuex";
import MobDepositF from "../../Earn/Mobile/Mobilecomponents/MobDepositF";
import MobearnWithdraw from "../../Earn/Mobile/Mobilecomponents/Mobearn-Withdraw";
export default {
  components: {MobearnWithdraw, MobDepositF, MobTotalcircular, MobTotalCollateralcir},
  computed: {
    ...mapGetters(["iswidth","isLogin"]),
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
      choosename:[
        {
          show:true,
          isselect: true,
          time: "All"
        },
        {
          show:false,
          isselect: true,
          time: "Earn"
        },
        {
          show:false,
          isselect: true,
          time: "Borrow"

        },
        {
          show:false,
          isselect: true,
          time: "History"
        }

      ],
      Transactionlist: [

      ]


    }

  },
  watch:{

    isLogin(val){
      console.log("this.isLogin",val)
      if(val=="1000"){
        this.MypageData()
        this.Historydata()
      }
    }
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
<style lang="scss" scoped>

.mobilepage {
  width: calc(100% - 32px);
  padding: 66px 0px 0px 0px;

  .padding {
    padding: 24px 28px;

  }

  .div1 {
    height: 560px;
    background: #FFFFFF;
    border-radius: 36px;

    .account {

      div:nth-child(1) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #1F2226;

      }

      div:nth-child(2) {
        margin: 24px 0px 18px 0px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #9AA1B0;

      }

      div:nth-child(3) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #1F2226;

        span {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          color: #1F2226;

        }

      }


    }
  }

  .div2 {
    height: 328px;
    margin-top: 24px;
    margin-bottom: 24px;
    background: #FFFFFF;
    border-radius: 36px;

    .Rewards-title {
      div:nth-child(1) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #9AA1B0;
        margin-bottom: 12px;

      }

      div:nth-child(2) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: #1F2226;

      }

    }

    .money {
      margin-top: 48px;
      margin-bottom: 24px;

      div:nth-child(1) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #9AA1B0;
        margin-bottom: 12px;
      }

      div:nth-child(2) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: #1F2226;

      }

    }

    .Rewards-button {
      display: flex;
      justify-content: center;

      ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
        color: #BFC6D0;
        background-color: #E0E7ED;
        border-radius: 18px;
        border-color: transparent;
        //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
        height: 50px;
        width: 280px;
        margin-right: 15px;

      }

      ::v-deep .btn1.ant-btn-primary {
        font-family: Inter;
        font-size: 16px;
        font-weight: 600;
        margin-right: 12px;
        height: 50px;
        width: 280px;
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

  .div3 {

    // margin-top: 24px;

    .interest {
      display: flex;
      justify-content: space-between;
      height: 82px;
      align-items: center;
      margin-bottom: 28px;
      flex-wrap: wrap;

      .interest-center {
        margin-bottom: 10px;
        margin-right: 12.5px;
        // height: 44px;
        display: flex;
        justify-content: center;
        justify-items: center;

        .div3 {
          width: 101px;
          height: 36px;
          padding: 11px 14px;
          // margin-top: 4px;
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

        .div4 {
          width: 101px;
          padding: 11px 14px;
          height: 36px;
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
  }

  .earn-list {
    height: 371px;
    background: #fff;
    border-radius: 37px;

    .list--title {

      display: flex;
      justify-content: space-between;

      .t1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #1F2226;


      }

      .t2 {
        display: flex;
        justify-content: flex-start;

        div {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #1F2226;
        }

      }
    }

    .list-collateral {
      margin-bottom: 24px;
      padding-bottom: 5px;
      height: 25.5px;
      align-items: center;
      margin-top: 13px;
      display: flex;
      justify-content: space-between;
      border-bottom: #E2E8F3 solid 1px;

      div:nth-child(1) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
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

    .list-bottom {
      display: flex;
      flex-direction: column;

      .Provide-button {
        display: flex;
        justify-content: center;
        margin-bottom: 24px;

        ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
          color: #BFC6D0;
          background-color: #E0E7ED;
          border-radius: 37px;
          border-color: transparent;
          //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
          //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
          height: 40px;
          width: 280px;
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
          width: 280px;
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
        display: flex;
        justify-content: center;

        ::v-deep.distrue.ant-btn-disabled, .ant-btn.disabled, .ant-btn[disabled], .ant-btn-disabled:hover, .ant-btn.disabled:hover, .ant-btn[disabled]:hover, .ant-btn-disabled:focus, .ant-btn.disabled:focus, .ant-btn[disabled]:focus, .ant-btn-disabled:active, .ant-btn.disabled:active, .ant-btn[disabled]:active, .ant-btn-disabled.active, .ant-btn.disabled.active, .ant-btn[disabled].active {
          color: #BFC6D0;
          background-color: #E0E7ED;
          border-radius: 37px;
          border-color: transparent;
          //text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
          //box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
          height: 40px;
          width: 280px;

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
          width: 280px;
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
    }
  }

  .borrow-list {
    margin-bottom: 24px;
    margin-top: 24px;
    background: #FFFFFF;
    border-radius: 36px;

    .divs {

      div:nth-child(1) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #1F2226;
      }

      div:nth-child(2) {
        margin: 24px 0px 18px 0px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;

        color: #9AA1B0;

      }

      div:nth-child(3) {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: #1F2226;
      }

    }


  }

  .history {
    margin-bottom: 181px;
    margin-top: 24px;
    background: #FFFFFF;
    border-radius: 36px;

    .title {
      margin-bottom: 24px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      color: #1F2226;

    }

    .Transaction-list {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      height: 124px;
      border-bottom: 1px solid #E2E8F3;

      .T1 {

        .a {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          color: #9AA1B0;

        }

        .b {
          margin-top: 24px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #1F2226;
        }

      }

      .T2 {
        margin-top: 20px;
        // display: flex;
        // justify-content: center;
        // align-items: center;
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


</style>