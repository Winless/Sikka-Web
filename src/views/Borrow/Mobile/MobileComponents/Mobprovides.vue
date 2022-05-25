<template>
  <div>
    <div v-if="showprovides">
      <a-modal v-model="visible" :footer="false" width="328px" wrapClassName="borrow" :afterClose="closemodel" :centered="true">
        <template slot="closeIcon">
          <img src="../../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px">
        </template>
        <div class="borrow-title">
          <div>Provide Collateral</div>
          <div></div>
        </div>
        <div class="progressf">
          <div class="amount-title">Deposit Amount</div>
          <div class="limit" @click="Ismax()">Max:<span>{{providesObj.limit}} aMATICb</span></div>
        </div>
        <div class="borrow-input">
          <a-input v-model="providesObj.amount" @input="providesAmount()" onkeypress="return( /[\d.]/.test(String.fromCharCode(event.keyCode) ) )" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')" >
            <template slot="suffix">
              <div class="input-right">
                <img src="../../../../assets/image/icon/aMATICb.svg">
                <span>aMATICb</span>
              </div>
            </template>
          </a-input>
        </div>
        <div class="amount-title">{{type?"New Borrow Limit":"Borrow Limit"}}</div>
        <div class="borrow-input">
          <a-input v-model="providesObj.amount2" :disabled="true">
            <template slot="suffix">
              <div class="input-right2">
                <span>&nbsp;USP</span>
              </div>
            </template>
          </a-input>
        </div>
        <div class="Borrow-usage" v-if="type">
          <div>Borrow usage</div>
          <div class="progress">
            <div :class="'color'+boo" style="font-size: 14px;font-weight: 600;">{{
                providesObj.schedule
              }}%
            </div>
            <div class="scale01">
              <div>75%</div>
              <div></div>
            </div>
            <div class="scale02">
              <div>100%</div>
              <div></div>
            </div>

            <a-slider :class="'cla'+boo" :tip-formatter="formatter" :step="0.01" :disabled="isDisabled" v-model=" providesObj.schedule" />

          </div>
        </div>

        <div class="borrow-list">
          <div class="div-flex">
            <div>Tx Fee</div>
            <div>{{ providesObj.fee }} MATIC</div>
          </div>
        </div>
        <a-button type="primary" @click="Submit()" v-if="btn" :loading="btnloding">
          Approve
        </a-button>
        <a-button type="primary" @click="Submitprovide()" v-else :loading="btnloding2" :disabled="providesObj.amount<=0||this.providesObj.amount>providesObj.limit">
          Proceed
        </a-button>
      </a-modal>

    </div>
    <MobloadingF v-if="loadingmoadel" :completelist="this.completelist"></MobloadingF>
    <MobborrowCompleteF  v-if="completemoadel" :settype="2" :completelist="this.completelist"></MobborrowCompleteF>
  </div>
</template>

<script>
import {approveToken, getAllowance, getTokensBalance, getTokenAddress, provide, trace, toPrecision} from "../../../../SDK";
import { mapGetters } from "vuex";
import MobloadingF from "./MobloadingF";
import MobborrowCompleteF from "./MobborrowCompleteF";


export default {
  name: "provides",
  components: {MobborrowCompleteF, MobloadingF},
  props: {
    setShow: Function,
  },
  computed: {
    ...mapGetters(["account", "borrowInfo"]),
  },
  created() {

    this.query()
    this.balanceF()
    this.providesObj.Progressvalue = (this.borrowInfo.self.borrowLimit == 0) ? 0 : Number(((this.borrowInfo.self.amountBorrow / this.borrowInfo.self.borrowLimit) * 100))

    this.providesObj.schedule = Number(toPrecision((this.providesObj.Progressvalue).toFixed(2)))
    this.isDisabled = (this.providesObj.schedule==0);
    this.upBoo()
    if (Number(this.borrowInfo.self.amountLoan) > 0) {
      this.type = true
    }
  },
  data() {
    return {
      isDisabled:false,
      showprovides: true,
      loadingmoadel: false,
      completemoadel: false,
      btnloding: false,
      btnloding2: false,
      btn: true,
      type: false,
      boo: 1,
      visible: true,
      isQC: true,
      providesObj: {
        schedule: 0,
        amount: 0,
        amount2: 0,
        fee: 0.0066,
        limit:0,
        limitsymbol: "USD",
        liquidationprice: 240,
        total: 240,
        Progressvalue: 70,
      },
      completelist: {
        hash: " ",
        fee: 0,
        Total: 0
      },
    }
  },
  mounted() {

  },
  watch: {
    "providesObj.schedule"() {
      if (this.isQC) {
        this.isQC = false;
        if (this.providesObj.schedule <= 0) {
          this.providesObj.schedule = 0.01;
        }
        return;
      }
      if (this.borrowInfo.self.borrowLimit == 0) {
        return;
      }

      let minPer = (this.borrowInfo.self.borrowLimit == 0) ? 0 : (this.borrowInfo.self.amountBorrow / this.borrowInfo.self.borrowLimit) * 100;

      if (this.providesObj.schedule <= 0) {
        this.providesObj.schedule = 0.01;
      }
      if (this.providesObj.schedule > minPer) {
        this.providesObj.schedule = minPer;
        this.providesObj.schedule = Number(toPrecision((this.providesObj.schedule).toFixed(2)))
      }
      this.providesObj.amount = (Number(this.borrowInfo.self.amountBorrow) / (this.providesObj.schedule * 0.01) - this.borrowInfo.self.borrowLimit) * (this.borrowInfo.uprice / this.borrowInfo.mprice)/Number(this.borrowInfo.total.loanRate);
      this.providesObj.amount= Number(toPrecision((this.providesObj.amount).toFixed(4)))
      this.providesObj.receive = Number(this.providesObj.amount).toFixed(4);
      this.providesObj.amount2 = ((Number(this.providesObj.amount) + Number(this.borrowInfo.self.amountLoan)) * this.borrowInfo.mprice)*Number(this.borrowInfo.total.loanRate);
      this.providesObj.amount2= Number(toPrecision((this.providesObj.amount2).toFixed(4)))
      this.upBoo();
      this.isQC = true;
    },
    "providesObj.amount"() {
      if (this.isQC) {
        this.isQC = false;
        return;
      }
      if (this.borrowInfo.self.borrowLimit == 0) {
        this.providesObj.receive = Number(this.providesObj.amount).toFixed(4)
        this.providesObj.amount2 = ((Number(this.providesObj.amount) + Number(this.borrowInfo.self.amountLoan)) * this.borrowInfo.mprice)*Number(this.borrowInfo.total.loanRate);
        this.providesObj.amount2= Number(toPrecision((this.providesObj.amount2).toFixed(4)))
        this.providesObj.schedule = Number(toPrecision((this.providesObj.Progressvalue).toFixed(2)));
        return;
      }
      if (this.providesObj.amount >= 0) {
        // let maxAmount = (Number(this.borrowInfo.self.amountBorrow) / (0.01 * 0.01) -
        //     this.borrowInfo.self.borrowLimit) * (this.borrowInfo.uprice / this.borrowInfo.mprice);
        // if (Number(this.providesObj.amount) > maxAmount) {
        //   this.providesObj.amount = maxAmount;
        // }

        this.providesObj.receive = Number(this.providesObj.amount).toFixed(4)
        this.providesObj.amount2 = ((Number(this.providesObj.amount) + Number(this.borrowInfo.self.amountLoan)) * this.borrowInfo.mprice)*Number(this.borrowInfo.total.loanRate);
        this.providesObj.amount2= Number(toPrecision((this.providesObj.amount2).toFixed(4)))
        console.log("provide-params=",Number(this.borrowInfo.self.amountBorrow),this.providesObj.amount,this.borrowInfo.per ,this.borrowInfo.uprice , this.borrowInfo.mprice,this.borrowInfo.self.borrowLimit)
        this.providesObj.schedule = (this.borrowInfo.self.borrowLimit == 0) ? 0 : Number(this.borrowInfo.self.amountBorrow) * 100 / (this.providesObj.amount*Number(this.borrowInfo.total.loanRate) / (this.borrowInfo.uprice / this.borrowInfo.mprice) + this.borrowInfo.self.borrowLimit)
        this.providesObj.schedule= Number(toPrecision((this.providesObj.schedule).toFixed(2)))

        this.upBoo();
        this.isQC = true;
      }

    },
  },
  methods: {
    Ismax(){
      this.providesObj.amount=this.providesObj.limit
    },
    upBoo() {
      if (this.providesObj.schedule >= 90) {
        this.boo = 3
      } else if (this.providesObj.schedule >= 75) {
        this.boo = 2
      } else {
        this.boo = 1
      }

    },

    async query() {
      this.providesObj.amount2 = ((Number(this.providesObj.amount) + Number(this.borrowInfo.self.amountLoan)) * this.borrowInfo.mprice)*Number(this.borrowInfo.total.loanRate);
      this.providesObj.amount2= Number(toPrecision((this.providesObj.amount2).toFixed(4)))
      let AMATICB = getTokenAddress("AMATICB");//拿AMATICB 地址
      let all = await getAllowance(AMATICB);//拿AMATICB授权额度   参数是对应的币地址
      console.log("------getAllowance----AMATICB----", all);
      if (all > 0) {
        this.btn = false
      }
    },
    async balanceF() {
      let AMATICB = getTokenAddress("AMATICB");
      let SIKKA = getTokenAddress("SIKKA");
      let SKUSD = getTokenAddress("SKUSD");
      let AUSP = getTokenAddress("AUSP");
      let bi = await getTokensBalance([AMATICB, SIKKA, SKUSD, AUSP]);
      console.log("balanceF_____", bi)
      let listvalue = bi[0]
      // this.providesObj.limit = Number(listvalue.balance).toFixed(4)

      this.providesObj.limit= Number(toPrecision((+listvalue.balance).toFixed(4)))

    },
    providesAmount() {
      // if (Number(this.providesObj.amount) === 0) {
      //   return
      // }
      // this.providesObj.amount2 = Number(this.providesObj.amount) * this.borrowInfo.mprice
      //
      // this.upBoo()
    },
    async Submit() {
      console.log("account", this.account)
      if (this.account === "") {
        this.$message.warning('请登录');
      } else {
        this.btnloding = true
        let AMATICB = getTokenAddress("AMATICB");//拿AMATICB 地址
        trace("------AMATICB-----", AMATICB);

        let all = await getAllowance(AMATICB);//拿AMATICB授权额度   参数是对应的币地址
        console.log("------getAllowance----AMATICB----", all);

        approveToken(AMATICB, "borrow", (code, hash) => {    //授权对应的币      参数是币的地址  0x******
          trace("------approveToken-----", code, hash);
          if (code >= 1) {
            this.btnloding = false;
            if (code == 1) this.btn = false;
          }
        });
      }
    },
    Submitprovide() {
      this.btnloding2 = true
      this.loadingmoadel = true
      this.showprovides = false
      this.completelist.Total = this.providesObj.amount
      provide(this.providesObj.amount, (code, hash) => {
        console.log("provide_____", code, hash)
        this.completelist.hash = hash
        if (code >= 1) {
          this.btnloding2 = false

          if (code == 1) {
            this.loadingmoadel = false
            this.completemoadel = true

          }
        }
      })
    },
    formatter(value) {
      return `${value}%`;
    },
    closemodel() {
      this.visible = false
      if (this.setShow) {
        this.setShow(false);
      }
    }
  },

}

</script>

<style scoped lang="scss">
.borrow {
  .borrow-title {
    text-align: center;

    div:nth-child(1) {
      margin-top: 4px;
      font-weight: 600;
      font-size: 20px;
      color: #1f2226;
      margin-bottom: 20px;
      font-family: Inter;
    }

    div:nth-child(2) {
      font-weight: 400;
      font-size: 13px;
      color: #9aa1b0;
      margin-bottom: 40px;
      font-family: Inter;
    }
  }

  .amount-title {
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 16px;
    color: #1f2226;
    font-family: Inter;
  }

  .limit {
    margin-bottom: 12px;
    cursor: pointer;
    font-family: Inter;
    font-weight: 400;
    font-size: 12px;
    color: #1F222680;

    span{
    cursor: pointer;
    font-family: Inter;
    font-weight: 400;
    font-size: 12px;
    color: #1F222680;

    }
    span:hover{

    cursor: pointer;
    font-family: Inter;
    font-weight: 400;
    font-size: 12px;
    color: #8247E5;
    }
    
  }


  .borrow-input {
    text-align: center;
    margin-bottom: 51px;

    .input-right {
      font-family: Inter;
      font-weight: 600;
      font-size: 16px;
      color: #1f2226;
      border-left: 1px solid rgba(0, 29, 117, 0.1);
      height: 22px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        margin: 0px 10px;
        height: 32px;
        width: 29px;
      }
    }

    .input-right2 {
      font-weight: 600;
      font-size: 16px;
      color: #9aa1b0;
      border-left: 1px solid rgba(0, 29, 117, 0.1);
      height: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Inter;

      img {
        margin: 0px 10px;
        height: 32px;
        width: 29px;
      }
    }

    img {
      margin: 10px 0px;
      height: 24px;
      width: 24px;
    }

    ::v-deep.ant-input {
      font-family: Inter;
      box-sizing: border-box;
      margin: 0;
      font-variant: tabular-nums;
      list-style: none;
      font-feature-settings: "tnum";
      position: relative;
      display: inline-block;
      width: 100%;
      height: 52px;
      padding: 4px 11px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 1.5;
      background: rgba(0, 29, 117, 0.05);
      border-radius: 12px;
      border: none;
      transition: all 0.3s;
    }

    ::v-deep.ant-input {
      &::placeholder {
        color: #000000;
      }
    }
  }

  .progressf {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .progress {
    position: relative;
    margin-top: 50px;
    margin-bottom: 30px;

    .scale03 {
      left: 1px;
      top: 8px;
      position: absolute;
      font-weight: 600;
      font-size: 14px;
      color: #19ba63;
      font-family: Inter;
    }

    .scale03red {
      left: 1px;
      top: 8px;
      position: absolute;
      font-weight: 600;
      font-size: 14px;
      color: #d80303;
      font-family: Inter;
    }

    .scale01 {
      top: 8px;
      align-items: flex-end;
      position: absolute;
      right: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div:nth-child(1) {
        font-weight: 600;
        font-size: 14px;
        color: #bfc6d0;
        font-family: Inter;
      }

      div:nth-child(2) {
        width: 1px;
        height: 13px;
        background: #e2e8f3;
      }
    }

    .scale02 {
      top: 8px;
      align-items: flex-end;
      position: absolute;
      right: 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div:nth-child(1) {
        font-weight: 600;
        font-size: 14px;
        color: #bfc6d0;
        font-family: Inter;
      }

      div:nth-child(2) {
        width: 1px;
        height: 13px;
        background: #e2e8f3;
      }
    }
  }

  .Borrow-usage {
    font-weight: 700;
    font-size: 16px;
    color: #1f2226;
    font-family: Inter;

    .progress-p {
      margin: 32px 0px 34px 0px;
      border-radius: 15px;

      border: #e2e8f3 1px solid;

      .padding {
        padding: 20px;
        font-weight: 600;
        font-size: 14px;
        font-family: Inter;
        color: #1f2226;

        span {
          font-weight: 600;
          font-size: 14px;
          font-family: Inter;
          color: #d80303;
        }
      }
    }
  }

  .borrow-list {
    .div-flex {
      height: 37px;
      display: flex;
      justify-content: space-between;

      div:nth-child(1) {
        font-weight: 700;
        font-size: 14px;
        color: #1f2226;
        font-family: Inter;
      }

      div:nth-child(2) {
        font-weight: 400;
        font-size: 14px;
        color: #1f2226;
        font-family: Inter;
      }
    }

    .div-flex2 {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      div:nth-child(1) {
        font-weight: 700;
        font-size: 14px;
        color: #1f2226;
        font-family: Inter;
      }

      div:nth-child(2) {
        font-weight: 400;
        font-size: 14px;
        color: #1f2226;
        font-family: Inter;
      }
    }
  }
}

::v-deep.ant-btn-primary {
  margin-top: 40px;
  width: 100%;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  margin-right: 12px;
  height: 50px;
  border-radius: 18px;
  color: #fff;
  background: #8247E5;
  border-color: transparent;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}

::v-deep .ant-modal-content {
  border-radius: 36px;
}

.color1 {
  color: #19ba63;
}

.color2 {
  color: #fe5d01;
}

.color3 {
  color: #d80303;
}

::v-deep .cla1.ant-slider .ant-slider-track {
  background-color: #19ba63 !important;
}

::v-deep .cla1.ant-slider .ant-slider-handle,
.ant-slider .ant-slider-dot {
  background-color: #19ba63 !important;
  border-color: #19ba63 !important;
}

::v-deep .cla2.ant-slider .ant-slider-track {
  background-color: #fe5d01 !important;
}

::v-deep .cla2.ant-slider .ant-slider-handle,
.ant-slider .ant-slider-dot {
  background-color: #fe5d01 !important;
  border-color: #fe5d01 !important;
}

::v-deep .cla3.ant-slider .ant-slider-track {
  background-color: #d80303 !important;
}

::v-deep .cla3.ant-slider .ant-slider-handle,
.ant-slider .ant-slider-dot {
  background-color: #d80303 !important;
  border-color: #d80303 !important;
}
</style>