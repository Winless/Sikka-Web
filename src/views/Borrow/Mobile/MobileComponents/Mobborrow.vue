<template>
  <div>
    <div v-if="isshowborrow">
      <a-modal v-model="visible" :footer="false" width="328px" wrapClassName="borrow" :afterClose="closemodel" :centered="true">
        <template slot="closeIcon">
          <img src="../../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px">
        </template>
        <div class="borrow-title">
          <div>Borrow</div>
          <div>Borrow APR:{{borrow.APR}}%</div>
        </div>
        <div class="amount-title">Borrow Amount</div>
        <div class="borrow-input">
          <a-input  v-model="borrow.amount"  :precision="4" onkeypress="return( /[\d.]/.test(String.fromCharCode(event.keyCode) ) )" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')">
            <template slot="suffix">
              <div class="input-right">
                <span>USP</span>
              </div>
            </template>
          </a-input>
        </div>
        <div style=" font-weight: 700; font-size: 16px;color: #1f2226;font-family: Inter;">Borrow usage</div>
        <div class="progress">
          <div :class="'color'+boo">{{ Number(borrow.schedule).toFixed(2) }}%</div>
          <div class="scale01">
            <div>75%</div>
            <div></div>
          </div>
          <div class="scale02">
            <div>100%</div>
            <div></div>
          </div>

          <a-slider :class="'cla'+boo" :tip-formatter="formatter" v-model="borrow.schedule" :step="0.01"/>
          <div class="limit">Borrow Limit:{{ borrow.Limit }}<span>{{ borrow.limitsymbol }}</span></div>
          <div class="progress-p" v-if="boo==3||boo==2">
            <div class="padding">
              <span>Caution:</span>
              Borrowing is available only up to {{borrow.borrowmax}}% borrow usage. If the borrow usage reaches the maximum (100%), a
              portion of your collateral may be immediately liquidated to repay part of the loan.
            </div>
          </div>
        </div>
        <div class="borrow-list">

          <div class="div-flex">
            <div>Tx Fee</div>
            <div>{{ borrow.fee }}<span></span>MATIC</div>
          </div>
          <div class="div-flex2">
            <div>Receive Amount</div>
            <div>{{ borrow.receive }}<span></span>USP</div>
          </div>

        </div>
        <a-button type="primary" @click="mortgage" :loading="btnloding" :disabled="borrow.amount<=0">
          Proceed
        </a-button>

      </a-modal>
    </div>
    <MobborrowCompleteF v-if="completemoadel" :settype="4" :completelist="this.completelist"></MobborrowCompleteF>
  </div>
</template>

<script>
import {borrow, toPrecision} from "../../../../SDK";
import {mapGetters} from "vuex";
import MobborrowCompleteF from "./MobborrowCompleteF";


export default {
  name: "borrow",
  components: {MobborrowCompleteF},
  props: {
    setShow: Function,
  },
  computed: {
    ...mapGetters(["account", "borrowInfo"]),
  },
  data() {
    return {
      isshowborrow: true,
      btnloding: false,
      completemoadel: false,
      boo: 1,
      visible: true,
      completelist: {
        hash: " ",
        fee: 0,
        Total:0,
      },
      isQC:true,
      borrow: {
        schedule: 0,
        APR: "0%",
        amount: 0,
        limit: 0,
        limitsymbol: "USP",
        liquidationprice: 0,
        total: 0,
        fee: 0.0066,
        receive: 0,
        Progressvalue: 0,
        borrowmax:0
      }
    }
  },
  created() {
    this.listF()

  },
  watch: {
    "borrow.schedule"() {
      if (this.isQC) {
        this.isQC = false;
        return;
      }
      let minPer = Number(((this.borrowInfo.self.amountBorrow / this.borrowInfo.self.borrowLimit) * 100));
      if (this.borrow.schedule < minPer) {
        this.borrow.schedule = minPer;
      }else if(this.borrow.schedule>this.borrowInfo.per*100){
        this.borrow.schedule=this.borrowInfo.per*100;
      }
      this.upBoo();

      this.borrow.amount = (this.borrow.schedule * 0.01 * this.borrowInfo.self.borrowLimit) - Number(this.borrowInfo.self.amountBorrow);
      this.borrow.amount=Number(toPrecision((+this.borrow.amount).toFixed(4)))
      console.log("borrow.schedule=", this.borrow.schedule, this.borrow.amount);
      this.borrow.receive = Number(toPrecision(((+this.borrow.amount).toFixed(4))))
      // this.borrow.receive = this.borrow.amount+''
      // if( this.borrow.receive.indexOf(".")==-1){
      //   console.log("整数")
      //   this.borrow.receive=Number(this.borrow.receive).toFixed(2)
      // }else{
      //   console.log("小数",this.borrow.receive)
      //
      //   this.borrow.receive=Number(this.borrow.amount)
      // }
      this.isQC = true;
    },
    "borrow.amount"() {
      if (this.isQC) {
        this.isQC = false;
        return;
      }
      if (this.borrow.amount >= 0) {
        if (Number(this.borrowInfo.self.amountBorrow) + Number(this.borrow.amount) > Number(this.borrowInfo.self.borrowLimit)*this.borrowInfo.per) {
          this.borrow.amount = Number(this.borrowInfo.self.borrowLimit)*this.borrowInfo.per - this.borrowInfo.self.amountBorrow;
          this.borrow.amount=Number(toPrecision((+this.borrow.amount).toFixed(4)))
          this.borrow.receive = Number(toPrecision(((+this.borrow.amount).toFixed(4))))
        }
        this.borrow.receive = Number(toPrecision(((+this.borrow.amount).toFixed(4))))
        // this.borrow.receive = this.borrow.amount+''
        // if( this.borrow.receive.indexOf(".")==-1){
        //   console.log("整数")
        //   this.borrow.receive=Number(this.borrow.receive).toFixed(2)
        // }else{
        //  console.log("小数",this.borrow.receive)
        //   this.borrow.receive=Number(this.borrow.amount)
        // }

        this.borrow.schedule = Number((((Number(this.borrowInfo.self.amountBorrow) + Number(this.borrow.amount)) / this.borrowInfo.self.borrowLimit) * 100))
        console.log("this.borrow.amount=", this.borrow.amount, this.borrow.schedule, this.borrowInfo.self.amountBorrow)
        this.upBoo();
        this.isQC = true;
      }

    },
  },
  methods: {
    upBoo() {
      if (this.borrow.schedule >= 85) {
        this.boo = 3
      } else if (this.borrow.schedule >= 75) {
        this.boo = 2
      } else {
        this.boo = 1
      }
      console.log(this.boo, this.borrow.schedule)
    },
    listF() {

      // this.borrow.APR = Number(this.borrowInfo.total.interestRate).toFixed(4) * 100
      this.borrow.APR = Number(toPrecision((this.borrowInfo.total.interestRate).toFixed(4)))*100;
      this.borrow.borrowmax = Number(toPrecision((+this.borrowInfo.total.borrowRate).toFixed(2)))*100;
      this.borrow.Progressvalue = (this.borrowInfo.self.borrowLimit == 0) ? 0 : Number(((this.borrowInfo.self.amountBorrow / this.borrowInfo.self.borrowLimit) * 100).toFixed(2))
      this.borrow.schedule = (this.borrowInfo.self.borrowLimit == 0) ? 0 : Number(((this.borrowInfo.self.amountBorrow / this.borrowInfo.self.borrowLimit) * 100))
      this.upBoo();
      this.borrow.Limit = Number(this.borrowInfo.self.borrowLimit)
      console.log("dada",  this.borrow.Limit )
    },
    mortgage() {
      this.btnloding = true
      this.completelist.Total=this.borrow.amount
      borrow(this.borrow.amount, (code, hash) => {
        console.log("borrow", code, hash)
        this.completelist.hash = hash
        if (code >= 1) {
          this.btnloding = false
          if (code == 1) {
            this.completemoadel = true
            this.isshowborrow = false
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
      color: #1F2226;
      margin-bottom: 20px;
      font-family: Inter;
    }

    div:nth-child(2) {
      font-weight: 400;
      font-size: 13px;
      color: #9AA1B0;
      margin-bottom: 40px;
      font-family: Inter;
    }

  }

  .amount-title {
    font-family: Inter;
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 16px;
    color: #1F2226;

  }

  .borrow-input {
    text-align: center;
    margin-bottom: 51px;

    .input-right {
      font-family: Inter;
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
      //margin-top: 24px;
      font-family: Inter;
      font-weight: 400;
      font-size: 13px;
      color: #9AA1B0;
       float: right;

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

  .borrow-list {
    margin-top: 48px;

    .div-flex {
      height: 37px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px #E2E8F3 solid;

      div:nth-child(1) {
        font-family: Inter;
        font-size: 14px;
        color: #1F2226;
        font-style: normal;
        font-weight: 700;
      }

      div:nth-child(2) {
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        color: #1F2226;

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
        color: #1F2226;

      }

      div:nth-child(2) {
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        color: #1F2226;

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