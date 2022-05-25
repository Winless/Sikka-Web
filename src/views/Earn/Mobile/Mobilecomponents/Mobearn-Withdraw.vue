<template>
  <div>
    <div v-if="showeranwithdraw">
      <a-modal v-model="visible" :footer="false" width="328px" wrapClassName="borrow" :afterClose="closemodel" :centered="true">
        <template slot="closeIcon">
          <img src="../../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px">
        </template>
        <div class="borrow-title">
          <div>Withdraw</div>
        </div>
        <div class="amount-title">
          <div>Amount</div>
          <div  @click="ISmax()">Max:<span>{{earnWithdraw.Maxtoken}} USP</span></div>
        </div>
        <div class="borrow-input">
          <a-input v-model="earnWithdraw.depositamount" @change="todepositamount" onkeypress="return( /[\d.]/.test(String.fromCharCode(event.keyCode) ) )" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')">
            <template slot="suffix">
              <div class="input-right">
                <span>USP</span>
              </div>
            </template>
          </a-input>
        </div>
        <div class="progress">
          <div class="color1">{{ Number(earnWithdraw.schedule) }}%</div>
          <div class="scale04">
            <div>25%</div>
            <div></div>
          </div>
          <div class="scale03">
            <div>50%</div>
            <div></div>
          </div>
          <div class="scale01">
            <div>75%</div>
            <div></div>
          </div>
          <div class="scale02">
            <div>100%</div>
            <div></div>
          </div>

          <a-slider class="cla1" :tip-formatter="formatter" v-model="earnWithdraw.schedule" @change="toschedule" />

        </div>
        <div class="borrow-list">

          <div class="div-flex">
            <div>Tx Fee</div>
            <div>{{ earnWithdraw.fee }}<span></span>MATIC</div>
          </div>
          <div class="div-flex2">
            <div>Withdraw Amount</div>
            <div>{{ earnWithdraw.receive }}<span></span>USP</div>
          </div>

        </div>
        <a-button type="primary" :disabled="earnWithdraw.depositamount<=0" @click="Withdrawprocedd()" :loading="btnloading">
          Proceed
        </a-button>

      </a-modal>
    </div>
    <MobComplete v-if="showComplete" :completelist="this.completelist"></MobComplete>
  </div>
</template>

<script>
import {getTokenAddress, getTokensBalance, getEarnInfo, withdrawEarn, toPrecision} from "../../../../SDK";
import MobComplete from "./MobComplete";


export default {
  components: {MobComplete},
  props: {
    setShow: Function,
  },
  data() {
    return {
      btnloading: false,
      showComplete: false,
      showeranwithdraw: true,
      balanceH: 0,
      visible: true,
      earnWithdraw: {
        Maxtoken: 0,
        depositamount: 0,
        schedule: 0,
        fee: 0.0066,
        receive: 0,

      },
      completelist: {
        hash: ""

      }

    }

  },
  created() {

    this.Balances()
    this.maxwithdarw()
  },
  watch: {
  },
  methods: {
    ISmax(){
      this.earnWithdraw.depositamount=this.earnWithdraw.Maxtoken
      this.todepositamount()
    },
    todepositamount() {
      if (this.earnWithdraw.depositamount >= 0) {
        this.earnWithdraw.receive = this.earnWithdraw.depositamount
        this.earnWithdraw.receive = Number(toPrecision((+this.earnWithdraw.receive).toFixed(4)))
        let a = Number(this.earnWithdraw.depositamount)
        this.earnWithdraw.schedule = Number(((a/this.earnWithdraw.Maxtoken ) * 100).toFixed(2))
      }
    },
    toschedule() {
      this.earnWithdraw.depositamount = this.earnWithdraw.Maxtoken  * (this.earnWithdraw.schedule / 100)
      this.earnWithdraw.depositamount= Number (toPrecision((this.earnWithdraw.depositamount).toFixed(4)))
      this.earnWithdraw.receive = this.earnWithdraw.depositamount
      this.earnWithdraw.receive = Number(toPrecision((+this.earnWithdraw.receive).toFixed(4)))
    },

    Withdrawprocedd() {
      this.btnloading = true
      withdrawEarn(this.earnWithdraw.depositamount, (code, hash) => {//取出
        console.log(code, hash);
        this.completelist.hash = hash
        if (code >= 0) {

          if (code === 1) {
            this.btnloading = false
            this.showeranwithdraw = false
            this.showComplete = true

          }
        }
      });

    },
    async maxwithdarw() {
      let ei = await getEarnInfo();   //earn界面信息   可取得数量
      this.earnWithdraw.Maxtoken = Number(toPrecision((ei.withdrowAmount).toFixed(4)))
      console.log("123faadsddasd", this.earnWithdraw.Maxtoken)
    },
    async Balances() {
      let AMATICB = getTokenAddress("AMATICB");
      let SIKKA = getTokenAddress("SIKKA");
      let SKUSD = getTokenAddress("SKUSD");
      let AUSP = getTokenAddress("AUSP");
      this.balanceH = await getTokensBalance([AMATICB, SIKKA, SKUSD, AUSP]);//余额
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

  }
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
    display: flex;
    justify-content: space-between;

    div:nth-child(1) {
      font-family: Inter;
      margin-bottom: 12px;
      font-weight: 700;
      font-size: 16px;
      color: #1f2226;
    }
    div:nth-child(2) {
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
  }
  .borrow-input {
    text-align: center;
    margin-bottom: 51px;

    .input-right {
      font-family: Inter;
      font-weight: 600;
      font-size: 16px;
      color: #1f2226;
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

  .progress {
    position: relative;
    margin-top: 50px;
    margin-bottom: 30px;

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
        color: #bfc6d0;
        font-family: Inter;
      }

      div:nth-child(2) {
        width: 1px;
        height: 13px;
        background: #e2e8f3;
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
        color: #bfc6d0;
        font-family: Inter;
      }

      div:nth-child(2) {
        width: 1px;
        height: 13px;
        background: #e2e8f3;
      }
    }
    .scale03 {
      top: 5px;
      align-items: flex-end;
      position: absolute;
      right: 50%;
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
        font-family: Inter;
      }
    }
    .scale04 {
      top: 5px;
      align-items: flex-end;
      position: absolute;
      right: 75%;
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
        font-family: Inter;
      }
    }

    .limit {
      font-family: Inter;
      font-weight: 400;
      font-size: 13px;
      color: #9aa1b0;
      display: flex;
      justify-content: right;

      span {
        margin-left: 5px;
      }
    }

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
      border-bottom: 1px #e2e8f3 solid;

      div:nth-child(1) {
        font-family: Inter;
        font-weight: 700;
        font-size: 14px;
        color: #1f2226;
      }

      div:nth-child(2) {
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        color: #1f2226;

        span {
          margin-left: 5px;
        }
      }
    }

    .div-flex2 {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      div:nth-child(1) {
        font-family: Inter;
        font-weight: 700;
        font-size: 14px;
        color: #1f2226;
      }

      div:nth-child(2) {
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        color: #1f2226;

        span {
          margin-left: 5px;
        }
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

::v-deep .cla1.ant-slider .ant-slider-track {
  background-color: #19ba63 !important;
}

::v-deep .cla1.ant-slider .ant-slider-handle,
.ant-slider .ant-slider-dot {
  background-color: #19ba63 !important;
  border-color: #19ba63 !important;
}
</style>