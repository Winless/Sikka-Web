<template>
  <div class="Borrow">

    <div class="Borrow-main" v-if="iswidth==2">
      <div class="borrow-title">Borrow</div>

      <div class="Borrow-main-01">
        <div class="main-01-left">
          <div class="div1">
            <div class="padding">
              <div class="title">
                <div>Collateral Value</div>
                <a-popover :title="false" placement="bottom">
                  <template #content>
                    <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">The sum of all colaterals deposited<br/>
                      by the user, in USD</p>
                  </template>
                  <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                </a-popover>

              </div>

<!--              <div class="p">${{ Collateral }}</div>-->
              <div class="p">$<countTo :startVal='0' :endVal='Collateral' :duration='2000' ></countTo></div>
            </div>
          </div>
          <div class="div2" v-if="showapr2">
            <div class="padding">
              <div class="title">
                <div class="right">
                  <div class="d1">
                    Average Net APR
                    <a-popover :title="false" placement="bottom">
                      <template #content>
                        <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Average Net APR = Distribution
                          APR<br/> - Borrow APR. When the net APR is<br/> a positive number, SIKKA rewards<br/>
                          distributed to borrowers are greater<br/> than interest to be paid for the load.</p>
                      </template>
                      <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                    </a-popover>
                  </div>

                  <div class="p">

                  <countTo :startVal='0' :endVal='NetAPR' :duration='2000' ></countTo>
                    <div>%</div>
                  </div>
                </div>
                <div class="left">
                  <div class="left-d1">
                    <div>Distribution APR
                      <a-popover :title="false" placement="bottom">
                        <template #content>
                          <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Annualized percentage yield<br/> determined by SIKKA rewards given<br/> to the borrowers where the principal<br/> is taken as the load amount<br/>
                            by the user, in USD</p>
                        </template>
                        <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                      </a-popover>
                    </div>
                    <div>{{ DistributionAPR }}%</div>
                  </div>
                  <div class="left-d1">
                    <div>Borrow APR
                      <a-popover :title="false" placement="bottom">
                        <template #content>
                          <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">The annualized rate of interest<br/> borrowed in USP<br/>
                         </p>
                        </template>
                        <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                      </a-popover>
                    </div>
                    <div>{{ BorrowAPR }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div class="div2" v-if="showapr">
            <div class="padding">
              <div class="title">
                <div class="right">
                  <div class="d1">
                    Average Net APR
                    <a-popover :title="false" placement="bottom">
                      <template #content>
                        <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Average Net APR = Distribution
                          APR<br/> - Borrow APR. When the net APR is<br/> a positive number, SIKKA rewards<br/>
                          distributed to borrowers are greater<br/> than interest to be paid for the load.</p>
                      </template>
                      <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                    </a-popover>
                  </div>

                  <div class="p">

                  <countTo :startVal='0' :endVal='apr.netapr' :duration='2000' ></countTo>
                    <div>%</div>
                  </div>
                </div>
                <div class="left">
                  <div class="left-d1">
                    <div>Distribution APR
                      <a-popover :title="false" placement="bottom">
                        <template #content>
                          <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">Annualized percentage yield<br/> determined by SIKKA rewards given<br/> to the borrowers where the principal<br/> is taken as the load amount<br/>
                            by the user, in USD</p>
                        </template>
                        <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                      </a-popover>
                    </div>
                    <div>{{ apr.disapr }}%</div>
                  </div>
                  <div class="left-d1">
                    <div>Borrow APR
                      <a-popover :title="false" placement="bottom">
                        <template #content>
                          <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">The annualized rate of interest<br/> borrowed in USP<br/>
                         </p>
                        </template>
                        <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                      </a-popover>
                    </div>
                    <div>{{ apr.borapr }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="main-01-right">
          <div class="padding">
            <div class="right-title">
              <div class="left">
                <div>Borrowed Value <span>
                      <a-popover :title="false" placement="bottom">
                  <template #content>
                    <p style="font-weight: 400;font-size: 12px;color: #8F9092;font-family: 'Inter';padding-top: 15px">The sum of all loans borrowed by<br/> the user, in USP</p>
                  </template>
                  <img src="../../assets/image/icon/details.svg" style="cursor: pointer">
                </a-popover>
                </span>
                </div>
              </div>
              <div class="right">
                <div class="Borrow-button">
                  <a-button @click="Borrow" class="distrue" :disabled="true" v-if="account===''||btndisable">
                    Borrow
                  </a-button>
                  <a-button type="primary" @click="Borrow" class="btn1" v-else>
                    Borrow
                  </a-button>
                </div>
                <div class="repay-button">
                  <a-button class="distrue" :disabled="true" @click="Repay" v-if="account===''||btndisable">
                    Repay
                  </a-button>
                  <a-button type="primary" class="btn-class" @click="Repay" v-else>
                    Repay
                  </a-button>
                </div>
              </div>
            </div>
            <div class="token"><countTo :startVal='0' :endVal='BorrowedValue.token' :duration='2000' ></countTo><span>{{ BorrowedValue.symbol }}</span></div>

            <div class="progress">
              <!--              <a-slider :tip-formatter="formatter"/>-->
              <div :class="'color'+boo">
                <div>{{BorrowedValue.Progressvalue}}%</div>
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
      <div class="borrow-title2">Collateral list</div>
      <div class="Borrow-main-list">
        <div class="list-title">
          <div class="padding">
            <div class="div1">Assets</div>
            <div class="div2">Price</div>
            <div class="div3">Collateral ratio</div>
            <div class="div4">Collateral</div>
            <div class="div5">Borrowed</div>
            <div class="div6">Net Borrow APR</div>
            <div class="div7"></div>
          </div>
        </div>

        <div class="list-main" v-for="(itme,index) in Collaterallist " :key="index">
          <div class="padding">
            <div class="div1"><img :src="itme.assetsicon">{{ itme.assets }}<div class="get" @click="isget()">Get</div></div>
            <div class="div2">${{itme.price}}</div>
            <div class="div3">{{itme.Collateralratio}}%</div>
            <div class="div4">{{itme.Collateral}}</div>
            <div class="div5">{{itme.Borrowed}}<span></span>USP</div>
            <div class="div6">{{itme.NetBorrowAPR}}%</div>
            <div v-if="itme.Collateralstate" class="div7">
              <div class="Provide-button">
                <a-button class="distrue" :disabled="true" @click="ProvideF" v-if="account===''">
                  Provide
                </a-button>

                <a-button type="primary" class="btn-class" @click="ProvideF" v-else>
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
            <div v-else class="div7">
              <div class="Provide-button">
                <a-button class="distrue" :disabled="true" @click="ProvideF" v-if="account===''">
                  Provide
                </a-button>

                <a-button type="primary" class="btn-class" @click="ProvideF" v-else>
                  Provide
                </a-button>
              </div>
              <div class="Withdraw-button">
                <a-button class="distrue" :disabled="true" @click="WithdrawF" v-if="account===''||btndisable">
                  Withdraw
                </a-button>
                <a-button type="primary" class="btn-class" @click="WithdrawF" v-else>
                  Withdraw
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <sikkabottom></sikkabottom>
      <borrow v-if="showborrow" :setShow="setShowModal"></borrow>
      <Repay v-if="showrepay" :setShow="setShowModal"></Repay>
      <Provides v-if="showprovides" :setShow="setShowModal"></Provides>
      <Withdraw v-if="showWithdraw" :setShow="setShowModal"></Withdraw>

    </div>
    <borrow-mobile v-if="iswidth==1"></borrow-mobile>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import Borrow from "./components/borrow";
import Repay from "./components/Repay";
import Provides from "./components/provides";
import Withdraw from "./components/Withdraw";
import {getBorrowInfo, toPrecision} from "../../SDK";
import {mapGetters} from "vuex";
import {getDashboardInfo} from "../../SDK/httpSearch";
import Sikkabottom from "../../components/bottomF";
import BorrowMobile from './Mobile/BorrowMobile.vue';
export default {
  name: "index",
  components: {Sikkabottom, Withdraw, Repay, Borrow, Provides,countTo,BorrowMobile},

  computed: {
    ...mapGetters(["account", "borrowInfo", "btnshow", "isLogin","iswidth"]),
  },
  data() {
    return {
      showapr:true,
      showapr2:false,
      btndisable: true,
      getInfoT: 0,
      boo: 1,
      progresswarning: 1,
      showborrow: false,
      showrepay: false,
      showprovides: false,
      showWithdraw: false,
      Collateral: 0,
      NetAPR: 0,
      apr:{
        netapr:0,
        disapr:0,
        borapr:0
      },

      BorrowedValue: {
        token: 0,
        symbol: "USP",
        Limit: 0,
        Progressvalue: 0,
      },
      BorrowAPR: 0,
      DistributionAPR: 0,
      Collaterallist: [
        // {
        //   assets: "AMATICB",
        //   assetsicon: require("../../assets/image/icon/aMATICb.svg"),
        //   price: "0",
        //   Collateralratio: "0",
        //   Collateral: "0",
        //   Borrowed: "0",
        //   NetBorrowAPR: "0",
        //   Collateralstate: true,
        //
        // },
        // {
        //   assets: "AMATICB",
        //   assetsicon: require("../../assets/image/icon/aMATICb.svg"),
        //   price: "0",
        //   Collateralratio: "0",
        //   Collateral: "0",
        //   Borrowed: "0",
        //   NetBorrowAPR: "0",
        //   Collateralstate: false,
        // }
      ]
    }
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
        this.BorrowAPR= "0";
        this.DistributionAPR= "0";
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
  methods: {
    isget(){
      window.open("https://www.ankr.com/earn/stake/matic/")

    },
    async  Notlogin(){
      // if(this.isLogin=="1002"||this.isLogin=="1001"){
      //    this.showapr=true
      //    this.showapr2=false
         let a= await getDashboardInfo()
         this.apr.disapr = Number(toPrecision((+a.payBackRate).toFixed(2)))*100
         this.apr.borapr = Number(toPrecision((+a.interestRate).toFixed(2)))*100
         this.apr.disapr = (this.apr.disapr*this.apr.borapr)/100
         this.apr.netapr = this.apr.disapr- this.apr.borapr;
      },
      // else{
      //   console.log(".....",this.borrowInfo)
      //   if(!this.borrowInfo){
      //     this.showapr=true
      //     this.showapr2=false
      //   }
      //   if(this.borrowInfo){
      //     this.showapr=false
      //     this.showapr2=true
      //   }
      //
      //
      // }



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
        this.DistributionAPR = Number(toPrecision((+this.borrowInfo.total.payBackRate).toFixed(2)))*100
        this.BorrowAPR = Number(toPrecision((+this.borrowInfo.total.interestRate).toFixed(2)))*100
        this.DistributionAPR = (this.DistributionAPR*this.BorrowAPR)/100
        this.NetAPR = this.DistributionAPR- this.BorrowAPR;
        this.BorrowedValue = {
          // token: Number(this.borrowInfo.self.amountBorrow),
          token: Number(toPrecision(((+this.borrowInfo.self.amountBorrow).toFixed(4)))),
          symbol: "USP",
          Limit:  Number(toPrecision((this.borrowInfo.self.borrowLimit).toFixed(4))),
          Progressvalue: Number(((this.borrowInfo.self.borrowPer) * 100).toFixed(2)),
        };

        this.Collaterallist = [
          {
            assets: "aMATICb",
            assetsicon: require("../../assets/image/icon/aMATICb.svg"),
            price: Number(toPrecision((this.borrowInfo.mprice).toFixed(2))) ,
            Collateralratio:Number(toPrecision((this.borrowInfo.total.loanRate * 100).toFixed(2))),
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
      this.showrepay = value;
      this.showprovides = value;
      this.showWithdraw = value;
    },
    Borrow() {
      this.showborrow = !this.showborrow
    },
    Repay() {
      this.showrepay = !this.showrepay
    },
    ProvideF() {
      this.showprovides = !this.showprovides
    },
    WithdrawF() {
      this.showWithdraw = !this.showWithdraw
    }
  },
}
</script>

<style scoped lang="scss">
.Borrow {
  min-height: calc(100vh - 90px);
  background: #F2F5FA;
  display: flex;
  justify-content: center;


  .Borrow-main {
    width: calc(100% - 80px);
    padding: 66px 40px 40px 40px;
    max-width: 1360px;

    .borrow-title {
      margin-bottom: 27px;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;
      font-family: Inter;

    }

    .borrow-title2 {
      margin-top: 58px;
      margin-bottom: 27px;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;
      font-family: Inter;
    }

    .Borrow-main-01 {
      display: flex;
      justify-content: flex-start;

      .main-01-left {
        margin-right: 14px;
        display: flex;
        flex-direction: column;

        .div1 {
          height: 163px;
          width: 444px;
          background: #FFFFFF;
          border-radius: 36px;

          .padding {
            margin: 28px 24px;

            .title {
              display: flex;
              justify-content: flex-start;
              align-items: center;

              div {
                font-family: Inter;
                font-weight: 600;
                font-size: 16px;
                color: #9AA1B0;
              }

              img {
                margin-left: 5px;

              }
            }

            .p {
              font-family: Inter;
              margin-top: 40px;
              font-weight: 600;
              font-size: 36px;
              color: #1F2226;

            }

          }

        }

        .div2 {
          margin-top: 14px;
          height: 163px;
          width: 444px;
          background: #FFFFFF;
          border-radius: 36px;

          .padding {
            margin: 28px 24px;

            .title {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .right {
                display: flex;
                flex-direction: column;

                .d1 {
                  margin-top: -7px;
                  display: flex;
                  justify-content: flex-start;
                  font-family: Inter;
                  font-weight: 600;
                  font-size: 16px;
                  color: #9AA1B0;
                }

                img {
                  margin-left: 5px;

                }
              }

              .left {

                .left-d1 {

                  div:nth-child(1) {

                    display: flex;
                    align-items: center;
                    font-family: Inter;
                    font-weight: 600;
                    font-size: 14px;
                    color: #9AA1B0;

                    img {
                      margin-left: 5px;

                    }

                  }

                  div:nth-child(2) {
                    font-family: Inter;
                    font-weight: 600;
                    font-size: 18px;
                    color: #1F2226;

                  }


                }

                .left-d1:nth-child(1) {
                  margin-bottom: 27px;

                }

              }


            }

            .p {
              display: flex;
              justify-content: flex-start;
              font-family: Inter;
              margin-top: 40px;
              font-weight: 600;
              font-size: 36px;
              color: #1F2226;

              div{

                font-weight: 600;
                font-size: 36px;
                color: #1F2226;

              }

            }
          }
        }

      }

      .main-01-right {
        background: #FFFFFF;
        border-radius: 36px;
        width: calc(100% - 458px);
        max-width: 902px;
        height: 340px;

        .padding {
          padding: 24px 28px;

          .right-title {
            display: flex;
            justify-content: space-between;

            .left {

              div {
                font-family: Inter;
                font-weight: 600;
                font-size: 16px;
                color: #9AA1B0;
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
                  height: 44px;
                  width: 132px;
                  margin-right: 15px;
                }

                ::v-deep .btn1.ant-btn-primary {
                  font-family: Inter;
                  font-size: 16px;
                  font-weight: 600;
                  margin-right: 12px;
                  height: 44px;
                  width: 132px;
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
                  height: 44px;
                  width: 132px;
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

          .token {
            margin-top: 22px;
            font-weight: 600;
            font-size: 36px;
            color: #1F2226;
            font-family: Inter;
            ::v-deep:nth-child(1){
              margin-top: 22px;
              font-weight: 600;
              font-size: 36px;
              color: #1F2226;
              font-family: Inter;
            }

            span {
              font-family: Inter;
              font-weight: 600;
              font-size: 20px;
              color: #1F2226;
            }

          }

          .progress {
            width: 100%;
            position: relative;
            margin-top: 103px;

            .limit {
              font-family: Inter;
              font-weight: 500;
              font-size: 14px;
              color: #9AA1B0;
              display: flex;
              justify-content: right;

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


      }


    }

    .Borrow-main-list {
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
            flex: 1;
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

          .div4 {
            font-family: Inter;
            flex: 1;
            font-weight: 600;
            font-size: 14px;
            color: #9AA1B0;
          }

          .div5 {
            font-family: Inter;
            flex: 1;
            font-weight: 600;
            font-size: 14px;
            color: #9AA1B0;

          }

          .div6 {
            font-family: Inter;
            flex: 1;
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

          .div2 {
            padding-left: 10px;
            font-family: Inter;
            flex: 0.9;
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

          .div4 {
            font-family: Inter;
            flex: 1;
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;

          }

          .div5 {
            font-family: Inter;
            flex: 1;
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            color: #1F2226;

            span {
              margin-left: 5px;
            }


          }

          .div6 {
            font-family: Inter;
            flex: 1;
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
  }

}

</style>