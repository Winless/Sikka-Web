<template>
  <div class="MobBorrow">
    <div class="title">Borrow</div>
    <div class="aMATICb">
      <div class="div1">
        <div class="padding">
          <div class="A1">
            <div>Collateral Value</div>
            <a-popover :title="false" placement="bottom">
              <template #content>
                <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">The sum of all colaterals deposited<br/>
                  by the user, in USD</p>
              </template>
              <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
            </a-popover>
          </div>
          <div>$
            <countTo :startVal='0' :endVal='Collateral' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="div2" v-if="showapr2">
        <div class="padding">
          <div class="Q1">
            <div class="A2">
              <div>Average Net APR</div>
              <a-popover :title="false" placement="bottom">
                <template #content>
                  <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Average Net APR = Distribution
                    APR<br/> - Borrow APR. When the net APR is<br/> a positive number, SIKKA rewards<br/>
                    distributed to borrowers are greater<br/> than interest to be paid for the load.</p>
                </template>
                <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
              </a-popover>

            </div>
            <div>
              <countTo :startVal='0' :endVal='NetAPR' :duration='2000'></countTo>
              %
            </div>
          </div>
          <div class="Q2">
            <div class="D1">
              <div class="A3">
                <div>Distribution APR
                <span>
                   <a-popover :title="false" placement="bottom">
                        <template #content>
                          <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Annualized percentage yield<br/> determined by SIKKA rewards given<br/> to the borrowers where the principal<br/> is taken as the load amount<br/>
                            by the user, in USD</p>
                        </template>
                        <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
                      </a-popover>
                </span>
                </div>
              </div>
              <div>{{ DistributionAPR }}%</div>
            </div>
            <div class="D1">
              <div>
                <div>Borrow APR
                 <span>
                   <a-popover :title="false" placement="bottom">
                  <template #content>
                    <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">The annualized rate of interest<br/> borrowed in USP<br/>
                    </p>
                  </template>
                  <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
                </a-popover>
                 </span>
                </div>


              </div>
              <div>{{ BorrowAPR }}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="div2" v-if="showapr">
        <div class="padding">
          <div class="Q1">
            <div class="A2">
              <div>Average Net APR</div>
              <a-popover :title="false" placement="bottom">
                <template #content>
                  <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Average Net APR = Distribution
                    APR<br/> - Borrow APR. When the net APR is<br/> a positive number, SIKKA rewards<br/>
                    distributed to borrowers are greater<br/> than interest to be paid for the load.</p>
                </template>
                <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
              </a-popover>
            </div>
            <div>
              <countTo :startVal='0' :endVal='apr.netapr' :duration='2000'></countTo>
              %
            </div>
          </div>
          <div class="Q2">
            <div class="D1">
              <div>Distribution APR</div>
              <div>{{ apr.disapr }}%</div>
            </div>
            <div class="D1">
              <div>Borrow APR</div>
              <div>{{ apr.borapr }}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="div3">
        <div class="padding">
          <div class="vlaue-main">
            <div class="borrow-title">
              <div>Borrowed Value <span>
                      <a-popover :title="false" placement="bottom">
                  <template #content>
                    <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">The sum of all loans borrowed by<br/> the user, in USP</p>
                  </template>
                  <img src="../../../assets/image/icon/details.svg" style="cursor: pointer">
                </a-popover>
                </span>
              </div>
              <div>
                <countTo :startVal='0' :endVal='BorrowedValue.token' :duration='2000'></countTo>
                <span>{{ BorrowedValue.symbol }}</span></div>
            </div>

            <div class="right">
              <div class="Borrow-button">
                <a-button class="distrue" :disabled="true" v-if="account===''||btndisable">
                  Borrow
                </a-button>
                <a-button type="primary" class="btn1" v-else @click="Borrow()">
                  Borrow
                </a-button>
              </div>
              <div class="repay-button">
                <a-button class="distrue" :disabled="true" v-if="account===''||btndisable">
                  Repay
                </a-button>
                <a-button type="primary" class="btn-class" v-else @click="Repay()">
                  Repay
                </a-button>
              </div>
            </div>
            <div class="progress">
              <!--              <a-slider :tip-formatter="formatter"/>-->
              <div :class="'color'+boo">
                <div>{{ BorrowedValue.Progressvalue }}%</div>
              </div>
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
                  :percent="BorrowedValue.Progressvalue"
                  :show-info="false"
                  :stroke-color="{
                  from: '#87d068',
                  to: '#87d068',
                }"
              >
              </a-progress>
              <a-progress
                  v-if="progresswarning==2"
                  :percent="BorrowedValue.Progressvalue"
                  :show-info="false"
                  :stroke-color="{
                  from: '#FF5C00',
                  to: '#FF5C00',
                }"
              >
              </a-progress>
              <a-progress
                  v-if="progresswarning==3"
                  :percent="BorrowedValue.Progressvalue"
                  :show-info="false"
                  :stroke-color="{
                  from: '#D80303',
                  to: '#D80303',
                }"
              >
              </a-progress>
              <div class="limit">Borrow Limit:{{BorrowedValue.Limit}}<span></span>USP</div>
            </div>
          </div>

        </div>
      </div>
      <!--list  -->
      <div class="div4" v-for="(itme,index) in Collaterallist " :key="index">
        <div class="padding">
          <div class="list--title">
            <div class="t1">Collateral list</div>
            <div class="t2">
              <img src="">
              <div>USP</div>
            </div>
          </div>
          <div class="list-collateral">
            <div>Assets</div>
            <div><img :src="itme.assetsicon">{{ itme.assets }}<div class="get" @click="isget()">Get</div> </div>

          </div>
          <div class="list-collateral">
            <div>Price</div>
            <div>${{itme.price}}</div>
          </div>
          <div class="list-collateral">
            <div>Collateral</div>
            <div>{{itme.Collateral}}</div>
          </div>
          <div class="list-collateral">
            <div>Collateral ratio</div>
            <div>{{itme.Collateralratio}}%</div>
          </div>
          <div class="list-collateral">
            <div>Borrowed</div>
            <div>{{itme.Borrowed}}  USP</div>
          </div>
<!--          <div class="list-collateral">-->
<!--            <div>Distribution APR</div>-->
<!--            <div>-2.50%</div>-->
<!--          </div>-->
          <div class="list-collateral">
            <div>Net Borrow APR</div>
            <div>{{itme.NetBorrowAPR}}%</div>
          </div>
          <div class="list-bottom" v-if="itme.Collateralstate">
            <div class="Provide-button">
              <a-button class="distrue" :disabled="true" v-if="account===''">
                Provide
              </a-button>

              <a-button type="primary" class="btn-class" v-else @click="ProvideF()">
                Provide
              </a-button>
            </div>
            <div class="Withdraw-button">
              <a-button class="distrue" :disabled="true" @click="WithdrawF" v-if="true">
                Withdraw
              </a-button>
              <a-button type="primary" class="btn-class" @click="WithdrawF" v-else>
                Withdraw
              </a-button>
            </div>
          </div>

          <div class="list-bottom" v-else>
            <div class="Provide-button">
              <a-button class="distrue" :disabled="true" v-if="account===''">
                Provide
              </a-button>

              <a-button type="primary" class="btn-class" v-else @click="ProvideF()">
                Provide
              </a-button>
            </div>
            <div class="Withdraw-button">
              <a-button class="distrue" :disabled="true" v-if="account===''||btndisable">
                Withdraw
              </a-button>
              <a-button type="primary" class="btn-class" v-else @click="WithdrawF()">
                Withdraw
              </a-button>
            </div>
          </div>
        </div>

      </div>

    </div>

    <mobprovides v-if="isMobprovides" :setShow="setShowModal"></mobprovides>
    <mob-repay v-if="isMobrepay" :setShow="setShowModal"></mob-repay>
    <mobborrow v-if="isMobborrow" :setShow="setShowModal"></mobborrow>
    <mob-withdraw v-if="isMobwithdraw" :setShow="setShowModal"></mob-withdraw>
  </div>
</template>

<script>
import Mobborrow from './MobileComponents/Mobborrow.vue'
import Mobprovides from './MobileComponents/Mobprovides.vue'
import MobRepay from './MobileComponents/MobRepay.vue'
import MobWithdraw from './MobileComponents/MobWithdraw.vue'
import {getBorrowInfo, toPrecision} from "../../../SDK";
import {mapGetters} from "vuex";
import countTo from "vue-count-to";
import {getDashboardInfo} from "../../../SDK/httpSearch";

export default {
  components: {Mobprovides, MobRepay, Mobborrow, MobWithdraw, countTo},

  computed: {
    ...mapGetters(["account", "borrowInfo", "btnshow", "isLogin", "iswidth"]),
  },
  data() {
    return {
      showapr: true,
      showapr2: false,
      isMobprovides: false,
      isMobrepay: false,
      isMobwithdraw: false,
      isMobborrow: false,
      btndisable: true,
      getInfoT: 0,
      boo: 1,
      progresswarning: 1,
      Collateral: 0,
      NetAPR: 0,
      apr: {
        netapr: 0,
        disapr: 0,
        borapr: 0
      },

      BorrowedValue: {
        token: 0,
        symbol: "USP",
        Limit: 0,
        Progressvalue: 0,
      },
      BorrowAPR: 0,
      DistributionAPR: 0,
      Collaterallist: [],

    }

  },
  async created() {
    console.log("btnshow", this.btnshow)
    await this.getInfo();
    this.upInfo();
    this.upBoo()
    await this.Notlogin()

    this.$bus.on("changeInfo", async () => {
      await this.getInfo();
      this.upInfo()
    })


  },
  watch: {
    async account(now) {
      if (now !== "") {
        await this.getInfo();
        this.upInfo();
      }
    },
    async isLogin(Now) {
      console.log("switch-login", this.isLogin, Now)

      if (Now == "1000") {
        await this.getInfo();
        this.upInfo()
      } else {
        //  this.Notlogin()
        this.Collaterallist = [];
        this.Collateral = 0;
        this.NetAPR = 0;
        this.BorrowedValue = {
          token: 0,
          symbol: "USP",
          Limit: 0,
          Progressvalue: 0,
        };
        this.BorrowAPR = "0";
        this.DistributionAPR = "0";
      }

    },

    "BorrowedValue.Progressvalue"() {
      if (this.BorrowedValue.Progressvalue >= 75) {
        this.progresswarning = 2
      }
      if (this.BorrowedValue.Progressvalue >= 90) {
        this.progresswarning = 3
      }
      if (this.BorrowedValue.Progressvalue >= 90) {
        this.boo = 3
      } else if (this.BorrowedValue.Progressvalue >= 75) {
        this.boo = 2
      } else {
        this.boo = 1
      }

    }

  },
  methods: {
    isget(){
      window.open("https://www.ankr.com/earn/stake/matic/")
    },
    async  Notlogin(){

        let a= await getDashboardInfo()
        this.apr.disapr = Number(toPrecision((+a.payBackRate).toFixed(2)))*100
        this.apr.borapr = Number(toPrecision((+a.interestRate).toFixed(2)))*100
        this.apr.disapr = (this.apr.disapr*this.apr.borapr)/100
        this.apr.netapr = this.apr.disapr- this.apr.borapr;



    },
    upBoo() {
      if (this.BorrowedValue.Progressvalue >= 90) {
        this.boo = 3
      } else if (this.BorrowedValue.Progressvalue >= 75) {
        this.boo = 2
      } else {
        this.boo = 1
      }

    },
    upInfo() {
      console.log("upInfo", this.borrowInfo)
      if (this.borrowInfo) {
        this.Collateral = Number(toPrecision((this.borrowInfo.self.collateralValue).toFixed(2)));
        this.DistributionAPR = Number(toPrecision((+this.borrowInfo.total.payBackRate).toFixed(2))) * 100
        this.BorrowAPR = Number(toPrecision((+this.borrowInfo.total.interestRate).toFixed(2))) * 100
        this.DistributionAPR = (this.DistributionAPR * this.BorrowAPR) / 100
        this.NetAPR = this.DistributionAPR - this.BorrowAPR;
        this.BorrowedValue = {
          // token: Number(this.borrowInfo.self.amountBorrow),
          token: Number(toPrecision(((+this.borrowInfo.self.amountBorrow).toFixed(4)))),
          symbol: "USP",
          Limit: Number(toPrecision((this.borrowInfo.self.borrowLimit).toFixed(4))),
          Progressvalue: Number(((this.borrowInfo.self.borrowPer) * 100).toFixed(2)),
        };

        this.Collaterallist = [
          {
            assets: "aMATICb",
            assetsicon: require("../../../assets/image/icon/aMATICb.svg"),
            price: Number(toPrecision((this.borrowInfo.mprice).toFixed(2))),
            Collateralratio: Number(toPrecision((this.borrowInfo.total.loanRate * 100).toFixed(2))),
            Collateral: Number(toPrecision((+this.borrowInfo.self.amountLoan).toFixed(2))),
            Borrowed: Number(toPrecision((+this.borrowInfo.self.amountBorrow).toFixed(2))),
            NetBorrowAPR: Number(toPrecision(((this.borrowInfo.total.interestRate * 100).toFixed(2)))),
            Collateralstate: Number(this.borrowInfo.self.amountLoan) > 0 ? false : true,
          }];
        // if(Number(this.borrowInfo.self.amountLoan)<=0){
        if (Number(this.borrowInfo.self.amountLoan) <= 0) {
          console.log("未抵押", this.borrowInfo.self.amountLoan)
          this.btndisable = true

        }
        if (Number(this.borrowInfo.self.amountLoan) > 0) {
          console.log("抵押成功", this.borrowInfo.self.amountLoan)
          this.btndisable = false

        }
      }
    },
    async getInfo() {
      console.log("info-acc", this.account, this.account.length)
      if (this.isLogin === "1000") {    //isLogin
        clearTimeout(this.getInfoT);
        let info = await getBorrowInfo();
        let uAMount = Number(info.self.amountBorrow);
        let uprice = Number(info.prices.find(item => item.symbol == "SKUSD").price);

        let mAmount = Number(info.self.amountLoan);
        let mprice = Number(info.prices.find(item => item.symbol == "AMATICB").price);
        let per = Number(info.total.loanRate);

        let sprice = Number(info.prices.find(item => item.symbol == "SIKKA").price);

        info.self.collateralValue = mAmount * mprice;
        info.per = info.total.borrowRate;
        info.uprice = uprice;
        info.mprice = mprice;
        info.sprice = sprice;
        info.self.withdrawable = (mAmount * mprice - uAMount * uprice / (per * info.per)) / mprice;
        info.self.borrowPer = (mAmount == 0) ? 0 : (uAMount * uprice) / (mAmount * mprice * per);
        info.self.borrowLimit = (mAmount * mprice * per) / uprice;

        this.$store.dispatch("user/setBorroeInfo", info);
        console.log("info-", JSON.stringify(info))


        this.getInfoT = setTimeout(async () => {
          await this.getInfo();
          this.upInfo();
          await this.Notlogin();
        }, 1000 * 60 * 10);
      }

    },
    formatter(value) {
      return `${value}%`;
    },

    setShowModal(value) {
      this.showborrow = value;
      this.isMobrepay = value;
      this.isMobprovides = value;
      this.isMobwithdraw = value;
    },
    Borrow() {
      this.isMobborrow = !this.isMobborrow
    },
    Repay() {
      this.isMobrepay = !this.isMobrepay
    },
    ProvideF() {
      this.isMobprovides = !this.isMobprovides
    },
    WithdrawF() {
      this.isMobwithdraw = !this.isMobwithdraw
    }
  }

}
</script>

<style lang="scss" scoped>
.MobBorrow {
  width: calc(100% - 32px);
  padding: 32px 0px 0px 0px;


  .padding {
    padding: 24px 28px;
  }

  .title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    color: #1F2226;
    margin-bottom: 8px;
  }

  .aMATICb {

    .div1 {
      background: #FFFFFF;
      border-radius: 36px;
      height: 115px;
      margin-bottom: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;


      .A1{
        display: flex;
        justify-content: flex-start;
        div:nth-child(1) {
          margin-right: 5px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          color: #9AA1B0;


        }
      }
      div:nth-child(2) {
        margin-top: 12px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: #1F2226;

      }


    }

    .div2 {
      background: #FFFFFF;
      border-radius: 36px;
      height: 282px;

      .Q1 {
        border-bottom: #E2E8F3 solid 1px;
        .A2{
          display: flex;
          justify-content: flex-start;

          div:nth-child(1) {
            margin-right: 5px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;

          }
        }
        div:nth-child(2) {
          margin-top: 12px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          color: #1F2226;

        }
      }

      .Q2 {


        .D1 {
          margin-top: 12px;

          div:nth-child(1) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;

          }

          div:nth-child(2) {
            margin-top: 12px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            color: #1F2226;

          }
        }


      }
    }

    .div3 {
      margin-top: 14px;
      background: #FFFFFF;
      border-radius: 36px;
      height: 254px;

      .vlaue-main {

        .borrow-title {
          margin-bottom: 24px;


          div:nth-child(1) {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            color: #9AA1B0;

          }

          div:nth-child(2) {


           ::v-deep span:nth-child(1) {
             margin-top: 12px;
             font-family: 'Inter';
             font-style: normal;
             font-weight: 600;
             font-size: 24px;
             color: #1F2226;
            }
            ::v-deep span:nth-child(2) {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              color: #1F2226;
            }

          }
        }

      }

      .right {
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
            height: 44px;
            width: 132px;
            margin-right: 15px;
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

      .progress {
        width: 100%;
        position: relative;
        margin-top: 24px;

        .limit {
          font-family: Inter;
          font-weight: 500;
          font-size: 14px;
          color: #9AA1B0;
          float: right;
          span {
            margin-left: 5px;
          }
        }

        .scale03 {
          div {
            left: 1px;
            top: -5px;
            position: absolute;
            right: 100%;
            font-weight: 600;
            font-size: 14px;
            color: #19BA63;
          }
        }

        .scale03red {

          div {
            left: 1px;
            top: -28px;
            position: absolute;
            font-weight: 600;
            font-size: 14px;
            color: #D80303;
            font-family: Inter;
          }


        }

        .scale01 {
          top: -5px;
          align-items: flex-end;
          position: absolute;
          right: 25%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          div:nth-child(1) {
            font-family: Inter;
            font-weight: 600;
            font-size: 14px;
            color: #BFC6D0;

          }

          div:nth-child(2) {
            font-family: Inter;
            width: 1px;
            height: 13px;
            background: #E2E8F3;

          }

        }

        .scale02 {
          top: -5px;
          align-items: flex-end;
          position: absolute;
          right: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          div:nth-child(1) {
            font-family: Inter;
            font-weight: 600;
            font-size: 14px;
            color: #BFC6D0;

          }

          div:nth-child(2) {
            width: 1px;
            height: 13px;
            background: #E2E8F3;

          }


        }

        ::v-deep.ant-progress-text {
          top: -16px;
          left: 0px;
          position: absolute;
          font-weight: 600;
          font-size: 14px;
          color: #19BA63;

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
      }
    }

    .div4 {
      margin-bottom: 181px;
      margin-top: 14px;
      background: #FFFFFF;
      border-radius: 26px;

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
          display: flex;
          align-items: center;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: #1F2226;
          img{
            margin-right: 8px;
            height: 24px;
            width: 24px;

          }
          .get{
            cursor: pointer;
            margin-left: 8px;
            display: flex;
            justify-content: center;
            width: 42px;
            height: 20px;
            border: 1px solid #8247E5;
            border-radius: 6px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            color: #8247E5;

          }
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
  }
}

</style>