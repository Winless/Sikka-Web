<template>
  <div>
    <div v-if="IsshowWithdraw">
      <a-modal v-model="visible" :footer="false" width="700px" wrapClassName="Withdraw" :afterClose="closemodel" :centered="true">
        <template slot="closeIcon">
          <img src="../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px">
        </template>
        <div class="Withdraw-title">
          <div>Withdraw Collateral</div>
        </div>
        <div class="Withdraw-input-title">
          <div>Withdraw Amount</div>
          <div>Withdraw Limit:{{Withdraw.Withdrawable}}<span>{{ Withdraw.Withdrawablesymol }}</span></div>
        </div>
        <div class="Withdraw-input">
          <a-input  v-model="Withdraw.WithdrawAmountInput" @change="changeInput" onkeypress="return( /[\d.]/.test(String.fromCharCode(event.keyCode) ) )" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')">
            <template slot="suffix">
              <div class="input-right">
                <span>aBNBc</span>
              </div>
            </template>
          </a-input>
        </div>
        <div class="Withdraw-down">
          <img src="../../../assets/image/icon/down.svg">
        </div>
        <div class="Withdraw-title-02">New Borrow Limit</div>
        <div class="Withdraw-input">
          <a-input placeholder="Burn Amount" disabled v-model="Withdraw.WithdrawLimitInput">
            <template slot="suffix">
              <div class="input-right">
                <span>USP</span>
              </div>
            </template>
          </a-input>
        </div>
        <div class="usa">Borrow usage</div>
        <div class="progress">
          <div :class="'color'+boo">{{ Withdraw.Progressvalue }}%</div>
          <div class="scale01">
            <div>75%</div>
            <div></div>
          </div>
          <div class="scale02">
            <div>100%</div>
            <div></div>
          </div>
          <a-slider :class="'cla'+boo" :tip-formatter="formatter" :step="0.01" v-model=" Withdraw.Progressvalue"
                    @change="changeProgress"/>
          <div class="limit">Borrow Limit:{{Withdraw.limitF}}<span>{{ Withdraw.limitsymbol }}</span></div>
          <div class="progress-p" v-if="boo===3">
            <div class="padding">
              <span>Caution:</span>
              As current borrow usage is above the recommended amount, fluctuations in collateral value may trigger
              immediate liquidations. It is strongly recommended to keep the borrow usage below the maximum by repaying
              loans with stablecoins or providing additional collateral.
            </div>
          </div>
        </div>
        <div class="Withdraw-list">
          <div>Tx Fee</div>
          <div>{{ Withdraw.fee }}<span>{{ Withdraw.feesymol }}</span></div>
        </div>
        <a-button type="primary" @click="Submit" :loading="isLoading" :disabled="Withdraw.WithdrawAmountInput<=0">
          Proceed
        </a-button>
      </a-modal>

    </div>

    <Complete v-if="completemoadel" :settype="5" :completelist="this.completelist"></Complete>
  </div>
</template>

<script>
import {toPrecision, withdraw} from "../../../SDK";
import {mapGetters} from "vuex";
import Complete from "./CompleteF";
export default {
  name: "Withdraw",
  components: {Complete},
  props: {
    setShow: Function,
  },
  data() {
    return {
      boo: 1,
      IsshowWithdraw: true,
      completemoadel: false,
      isLoading: false,
      visible: true,
      isQC: true,
      Withdraw: {
        limitF: 0,
        limitsymbol: "USD",
        WithdrawAmountInput: 0,
        WithdrawLimitInput: 0,
        fee: "0.0066",
        feesymol: "MATIC",
        Withdrawable: 0,
        Withdrawablesymol: "aMATICb",
        Progressvalue: 0
      },
      completelist: {
        hash: " ",
        fee: 0,
        Total: 0
      },
    }
  },
  watch: {
  },
  mounted() {
    console.log("mounted", this.borrowInfo)
    this.upInfo();
  },
  created() {
    this.upInfo();
    this.Withdraw.WithdrawLimitInput = ((Number(this.borrowInfo.self.amountLoan)-Number(this.Withdraw.WithdrawAmountInput)) * this.borrowInfo.mprice)*Number(this.borrowInfo.total.loanRate);
    this.Withdraw.WithdrawLimitInput = this.Withdraw.WithdrawLimitInput.toFixed(4);
  },
  methods: {
    changeInput() {

      if (this.Withdraw.WithdrawAmountInput >= 0) {

        if (Number(this.Withdraw.WithdrawAmountInput) > this.borrowInfo.self.withdrawable) {
          this.Withdraw.WithdrawAmountInput = this.borrowInfo.self.withdrawable;
        }
        this.Withdraw.WithdrawLimitInput = ((Number(this.borrowInfo.self.amountLoan)-Number(this.Withdraw.WithdrawAmountInput)) * this.borrowInfo.mprice)*Number(this.borrowInfo.total.loanRate);
        this.Withdraw.WithdrawLimitInput = this.Withdraw.WithdrawLimitInput.toFixed(4);

        if (this.borrowInfo.self.borrowLimit == 0) {
          this.Withdraw.Progressvalue = 0;
        } else {

          const curLoan = Number(this.borrowInfo.self.amountLoan) - Number(this.Withdraw.WithdrawAmountInput);
          const curLoanU = curLoan * this.borrowInfo.mprice;
          const curLoanU_borrow = curLoanU * this.borrowInfo.total.loanRate /this.borrowInfo.uprice;
          this.Withdraw.Progressvalue = 100 * this.borrowInfo.self.amountBorrow / curLoanU_borrow;
          console.log(curLoan,curLoanU,curLoanU_borrow,this.Withdraw.Progressvalue)
        }

        console.log("this.Withdraw.WithdrawAmountInput=", this.borrowInfo,this.Withdraw.WithdrawAmountInput, this.Withdraw.Progressvalue, this.borrowInfo.self.amountBorrow)
        this.upBoo();
      }
    }
    ,
    changeProgress() {
      if (this.borrowInfo.self.borrowLimit == 0) return;
      console.log("Withdraw.Progressvalue=", this.Withdraw.Progressvalue, this.Withdraw.WithdrawAmountInput);
      let minPer = (this.borrowInfo.self.borrowLimit == 0) ? 0 : (this.borrowInfo.self.amountBorrow / this.borrowInfo.self.borrowLimit) * 100;

      if (this.Withdraw.Progressvalue < minPer) {
        this.Withdraw.Progressvalue = minPer;
      } else if (this.Withdraw.Progressvalue > this.borrowInfo.per * 100) {
        this.Withdraw.Progressvalue = this.borrowInfo.per * 100;
      }
      const curBorrow = Number(this.borrowInfo.self.amountBorrow);
      const curBorrowU = curBorrow * this.borrowInfo.uprice / (this.Withdraw.Progressvalue * 0.01 * this.borrowInfo.total.loanRate);
      const curBorrowU_matic = curBorrowU / this.borrowInfo.mprice;
      this.Withdraw.WithdrawAmountInput = Number(toPrecision((this.borrowInfo.self.amountLoan - curBorrowU_matic).toFixed(4)));

      console.log(curBorrow, curBorrowU, curBorrowU_matic, this.Withdraw.WithdrawAmountInput)
      if(Number(this.Withdraw.WithdrawAmountInput)<Math.pow(10,-12)){
        this.Withdraw.WithdrawAmountInput = 0;
      }
      // this.Withdraw.WithdrawLimitInput = Number(toPrecision(((this.Withdraw.WithdrawAmountInput) * this.borrowInfo.mprice).toFixed(4)));

      this.Withdraw.WithdrawLimitInput = ((Number(this.borrowInfo.self.amountLoan)-Number(this.Withdraw.WithdrawAmountInput)) * this.borrowInfo.mprice)*Number(this.borrowInfo.total.loanRate);
      this.Withdraw.WithdrawLimitInput = this.Withdraw.WithdrawLimitInput.toFixed(4);
      console.log("Withdraw.Progressvalue2=", this.Withdraw.Progressvalue, this.Withdraw.WithdrawAmountInput);
      this.upBoo();
    }
    ,
    upBoo() {
      if (this.Withdraw.Progressvalue >= 90) {
        this.boo = 3
      } else if (this.Withdraw.Progressvalue >= 75) {
        this.boo = 2
      } else {
        this.boo = 1
      }
      console.log(this.boo, this.Withdraw.Progressvalue)
    }
    ,

    upInfo() {
      if (this.borrowInfo) {
        this.Withdraw.limitF = Number(toPrecision((this.borrowInfo.self.borrowLimit).toFixed(4)))
        this.Withdraw.Withdrawable = Number(toPrecision((this.borrowInfo.self.withdrawable).toFixed(4)));
        this.isQC = true;
        this.Withdraw.Progressvalue = Number((this.borrowInfo.self.borrowPer * 100).toFixed(2))
        this.upBoo()
        this.isQC = true;
      }
    }
    ,
    Submit() {
      this.isLoading = true;
      this.completelist.Total = this.Withdraw.WithdrawAmountInput
      withdraw(this.Withdraw.WithdrawAmountInput, (code, hash) => {
        this.completelist.hash = hash
        if (code >= 1) {
          this.isLoading = false
          if (code == 1) {
            this.completemoadel = true
            this.IsshowWithdraw = false
          }

        }
        console.log(code, hash)
      })
    }
    ,

    formatter(value) {
      return `${value}%`;
    }
    ,
    closemodel() {
      this.visible = false

      if (this.setShow) {
        this.setShow(false);
      }

    }
    ,
  },
  computed: {
    ...mapGetters(["borrowInfo"])
  },
}
</script>

<style scoped lang="scss">
.Withdraw {

  .Withdraw-title {
    margin-bottom: 76px;
    text-align: center;

    div:nth-child(1) {
      margin-top: 4px;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;
      margin-bottom: 20px;

    }

  }
  .usa{
    font-weight: 700; font-size: 16px;color: #1f2226;font-family: Inter;
  }
  .progress {
    position: relative;
    margin-top: 24px;
    margin-bottom: 30px;

    .scale03 {
      left: 1px;
      top: -30px;
      position: absolute;
      font-weight: 600;
      font-size: 14px;
      color: #19BA63;
    }

    .scale03red {
      left: 1px;
      top: -30px;
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

      }

      div:nth-child(2) {
        width: 1px;
        height: 13px;
        background: #E2E8F3;

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

      }

      div:nth-child(2) {
        width: 1px;
        height: 13px;
        background: #E2E8F3;

      }


    }

    .limit {

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

        color: #1F2226;

        span {
          font-weight: 600;
          font-size: 14px;

          color: #D80303;

        }
      }


    }
  }


}

.Withdraw-input-title {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;

  div:nth-child(1) {
    font-weight: 700;
    font-size: 16px;
    color: #1F2226;

  }

  div:nth-child(2) {
    font-weight: 400;
    font-size: 12px;
    color: #9AA1B0;

    span {
      margin-left: 5px;

    }
  }

}

.Withdraw-down {
  display: flex;
  justify-content: center;

}

.Withdraw-title-02 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 16px;
  color: #1F2226;

}

.Withdraw-list {
  margin-top: 46px;
  display: flex;
  justify-content: space-between;

  div:nth-child(1) {
    font-weight: 700;
    font-size: 14px;
    color: #1F2226;
  }

  div:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
    color: #000000;

    span {
      margin-left: 5px;

    }

  }


}

.Withdraw-input {
  text-align: center;
  margin-bottom: 30px;

  .input-right {
    font-weight: 600;
    font-size: 16px;
    color: #1F2226;
    width: 69px;
    border-left: 1px solid rgba(0, 29, 117, 0.1);
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin: 0px 10px;
      height: 16px;
      width: 16px;

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
    font-feature-settings: 'tnum';
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


::v-deep .cla2.ant-slider .ant-slider-track {
  background-color: #FE5D01 !important;
}

::v-deep .cla1.ant-slider .ant-slider-track {
  background-color: #19BA63 !important;
}

::v-deep .cla3.ant-slider .ant-slider-track {
  background-color: #D80303 !important;
}

::v-deep .cla2.ant-slider .ant-slider-handle, .ant-slider .ant-slider-dot {
  background-color: #FE5D01 !important;
  border-color: #FE5D01 !important;

}

::v-deep .cla1.ant-slider .ant-slider-handle, .ant-slider .ant-slider-dot {
  background-color: #19BA63 !important;
  border-color: #19BA63 !important;

}

::v-deep .cla3.ant-slider .ant-slider-handle, .ant-slider .ant-slider-dot {
  background-color: #D80303 !important;
  border-color: #D80303 !important;

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

</style>