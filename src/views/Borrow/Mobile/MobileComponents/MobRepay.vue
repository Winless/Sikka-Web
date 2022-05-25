
<template>
  <div>
    <div v-if="isshowrepay">
      <a-modal v-model="visible" :footer="false" width="328px" wrapClassName="Repay" :afterClose="closemodel" :centered="true">
        <template slot="closeIcon">
          <img src="../../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px">
        </template>
        <div class="Repay-title">
          <div>Repay</div>
          <div>Borrow APR: {{ Repay.APR }}%</div>
        </div>
        <div class="amount-title">Repay Amount</div>
        <div class="Repay-input">
          <a-input  v-model="Repay.amount" onkeypress="return( /[\d.]/.test(String.fromCharCode(event.keyCode) ) )" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')">
            <template slot="suffix">
              <div class="input-right">
                <span>USP</span>
              </div>
            </template>
          </a-input>
        </div>
        <div class="progress">
          <div :class="'color'+boo">{{ Number(Repay.schedule).toFixed(2) }}%</div>
          <div class="scale01">
            <div>75%</div>
            <div></div>
          </div>
          <div class="scale02">
            <div>100%</div>
            <div></div>
          </div>
          <a-slider  :class="'cla'+boo" :tip-formatter="formatter"  v-model="Repay.schedule" :step="0.01" />

          <div class="limit">Borrow Limit:{{Repay.Limit}}<span>{{Repay.limitsymbol}}</span></div>
        </div>
        <div class="Repay-list">
          <div class="div-flex3">
            <div>Estimated aMATICb liquidation price</div>
            <div>{{Repay.liquidationprice}}<span></span>USD</div>
          </div>
          <div class="div-flex">
            <div>Total Outstanding Loan</div>
            <div>{{Repay.total}}<span></span>USP</div>
          </div>
          <div class="div-flex">
            <div>Borrow Interest</div>
            <div>{{Repay.Interest}}<span></span> USP</div>
          </div>
          <div class="div-flex">
            <div>Tx Fee</div>
            <div>{{Repay.fee}}<span></span>MATIC</div>
          </div>
          <div  class="div-flex2">
            <div>Send Amount</div>
            <div>{{Repay.receive}}<span></span>USP</div>
          </div>

        </div>
        <a-button type="primary" @click="Submitempower()" v-if="btn" :loading="btnloading">
          Approve
        </a-button>
        <a-button type="primary" @click="Submit()" v-else :disabled="Repay.amount<=0" :loading="btnloading">
          Proceed
        </a-button>

      </a-modal>

    </div>
    <MobborrowCompleteF v-if="completemoadel" :settype="1" :completelist="this.completelist"></MobborrowCompleteF>
  </div>
</template>

<script>
import {approveToken, getAllowance, getTokenAddress, repay, toPrecision, trace} from "../../../../SDK";

import {mapGetters} from "vuex";
import MobborrowCompleteF from "./MobborrowCompleteF";
export default {
  name: "Repay",
  components: {MobborrowCompleteF},
  computed: {
    ...mapGetters(["account","borrowInfo"]),
  },
  props:{
    setShow:Function,
  },
  created() {
    console.log("borrowInfo",this.borrowInfo)
    this.query()
    this.listF();
    },
  data(){
    return{
      completelist:{
        repaidAmount:0,
        usage:0,
        loan:0,
        hash:" ",
        fee:0,
        Total:0,
      },
      sikkaF:0,
      isshowrepay:true,
      btnloading:false,
      completemoadel:false,
      btn:true,
      visible:true,
      boo:1,
      isQC:true,
      Repay:{
        schedule:0,
        APR:"7,5%",
        amount:0,
        limit:0,
        limitsymbol:"USP",
        liquidationprice:240,
        total:240,
        fee:"0.0066",
        receive:0,
        Progressvalue:0,
        Interest:0.00,
      }
    }
  },
  watch:{
    "Repay.schedule"(){
      if (this.isQC) {
        this.isQC = false;
        return;
      }
      let minPer = (this.borrowInfo.self.borrowLimit == 0) ? 0 :Number(((this.borrowInfo.self.amountBorrow/this.borrowInfo.self.borrowLimit)*100));
      if(this.Repay.schedule>minPer){
        this.Repay.schedule = minPer;
      }
      this.upBoo();
      this.Repay.amount = Number((this.borrowInfo.self.amountBorrow)-(this.Repay.schedule*0.01*this.borrowInfo.self.borrowLimit).toFixed(4));
      this.Repay.amount=Number(toPrecision((this.Repay.amount).toFixed(4)))
      this.Repay.receive=Number(toPrecision((+this.Repay.amount).toFixed(4)))
      console.log("borrow.schedule=",this.Repay.schedule,this.Repay.amount);
      let a=Number(this.Repay.amount)
      let b=Number(this.borrowInfo.self.amountBorrow)
      this.sikkaF=a/b
      this.Repay.Interest=Number(((this.borrowInfo.self.calculateInterest)*this.sikkaF).toFixed(4))
      console.log("you",Number(((this.borrowInfo.self.calculateInterest)*this.sikkaF).toFixed(4)))
      console.log("me",Number(((this.borrowInfo.self.calculateInterest)*this.sikkaF)))
      this.upBoo();this.isQC = true;
      this.isQC = true;
    },
    "Repay.amount"(){
      if (this.isQC) {
        this.isQC = false;
        return;
      }
      if(this.Repay.amount>=0){
        if(Number(this.borrowInfo.self.amountBorrow)<Number(this.Repay.amount)){
          this.Repay.amount = this.borrowInfo.self.amountBorrow;
          this.Repay.amount=Number(toPrecision((this.Repay.amount).toFixed(4)))
        }
        this.Repay.receive=Number(this.Repay.amount).toFixed(4)
        this.Repay.schedule=Number((((Number(this.borrowInfo.self.amountBorrow)-Number(this.Repay.amount))/this.borrowInfo.self.borrowLimit)*100))
        // this.Repay.schedule=Number((((Number(this.borrowInfo.self.amountBorrow)-Number(this.Repay.amount))/this.borrowInfo.self.borrowLimit)*100).toFixed(2))
        console.log("this.Repay.amount=",this.Repay.amount,this.Repay.schedule,this.borrowInfo.self.amountBorrow)
        let a=Number(this.Repay.amount)
        let b=Number(this.borrowInfo.self.amountBorrow)
        this.sikkaF=a/b
        this.Repay.Interest=Number(((this.borrowInfo.self.calculateInterest)*this.sikkaF).toFixed(4))
        this.upBoo();this.isQC = true;

      }

    },
  },
  methods:{
    upBoo(){
      if(this.Repay.schedule>=90){
        this.boo=3
      }else  if(this.Repay.schedule>=75){
        this.boo=2
      }else {
        this.boo=1
      }
      console.log(this.boo,this.Repay.schedule)
    },
    async query(){
      let SKUSD = getTokenAddress("SKUSD");//拿SIKKA 地址
      let all = await getAllowance(SKUSD);//拿AMATICB授权额度   参数是对应的币地址
      console.log("------getAllowance----SIKKA----", all);
      if(all>0){
        this.btn=false
      }
    },
    listF(){
      this.Repay.liquidationprice=this.borrowInfo.self.liquidationPrice.toFixed(4)
      this.Repay.total=Number((+this.borrowInfo.self.amountBorrow).toFixed(4))
      this.Repay.Limit=Number(toPrecision(((this.borrowInfo.self.borrowLimit).toFixed(4))))
      this.Repay.APR=Number(toPrecision((this.borrowInfo.total.interestRate).toFixed(4)))*100;
      this.Repay.schedule=(this.borrowInfo.self.borrowLimit == 0) ? 0 :Number(((this.borrowInfo.self.amountBorrow/this.borrowInfo.self.borrowLimit)*100))
      this.Progressvalue=(this.borrowInfo.self.borrowLimit == 0) ? 0 :Number(((this.borrowInfo.self.amountBorrow/this.borrowInfo.self.borrowLimit)*100).toFixed(2))
       this.upBoo();
    },
    Submitempower(){
      this.btnloading=true
      let SKUSD = getTokenAddress("SKUSD");//拿SIKKA 地址
      approveToken(SKUSD,"borrow",(code, hash) => {    //授权对应的币      参数是币的地址  0x******
        trace("------approveToken-----", code, hash);
        if (code>=1){
          this.btnloading=false
          if(code==1)this.btn=false
        }
      });
    },
    Submit(){
      this.btnloading=true
      repay(this.Repay.amount,(code,hash)=>{
        console.log(code,hash)
        this.completelist.repaidAmount=Number(this.Repay.amount).toFixed(4)
        this.completelist.usage=Number(((this.borrowInfo.self.borrowPer)*100).toFixed(2))
        this.completelist.hash=hash
        this.completelist.loan=Number(this.borrowInfo.self.amountLoan ).toFixed(4)
        this.completelist.Interest= this.Repay.Interest
        this.completelist.Total= this.Repay.amount
        console.log("calculateInterest",this.completelist.Interest)
        if(code>=1){
          this.btnloading=false
          if(code==1){
            this.completemoadel=true
            this.isshowrepay=false
          }
        }
      })
    },
    formatter(value) {
      return `${value}%`;
    },
    closemodel(){
      this.visible=false

      if(this.setShow){
        this.setShow(false);
      }

    }

  }
}
</script>

<style scoped lang="scss">
.Repay{

  .Repay-title{
    text-align: center;

    div:nth-child(1){
      margin-top: 4px;
      font-weight: 600;
      font-size: 20px;
      color: #1F2226;
      margin-bottom: 20px;
      font-family: Inter;
    }
    div:nth-child(2){
      font-weight: 400;
      font-size: 13px;
      color: #9AA1B0;
      margin-bottom: 40px;
      font-family: Inter;
    }

  }
  .amount-title{
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 16px;
    color: #1F2226;
    font-family: Inter;
  }
  .Repay-input{
    text-align: center;
    margin-bottom: 51px;

    .input-right{
      font-weight: 600;
      font-size: 16px;
      color: #1F2226;
      width: 69px;
      border-left: 1px solid rgba(0, 29, 117, 0.1);
      height: 22px;display: flex;
      justify-content: center;
      align-items: center;
      font-family: Inter;
      img{
        margin: 0px 10px;
        height: 16px;
        width: 16px;

      }

    }
    img{
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
    ::v-deep.ant-input{
      &::placeholder {
        color: #000000;
      }
    }


  }
  .progress{
    position: relative;
    margin-top: 50px;
    margin-bottom: 30px;



    .scale03 {
      left: 1px;
      top: 5px;
      position: absolute;
      font-weight: 600;
      font-size: 14px;
      color: #19BA63;
      font-family: Inter;

    }
    .scale03red {
      left: 1px;
      top: 5px;
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

    .limit{
      font-weight: 400;
      font-size: 13px;
      color: #9AA1B0;
      font-family: Inter;
      float: right;

      span{
        margin-left: 5px;

      }
    }
  }
  .Repay-list{
    margin-top: 48px;

    .div-flex3{
      margin-top: 14px;
      height: 58px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px #E2E8F3 solid;
      div:nth-child(1){
        font-family: Inter;
        font-weight: 700;
        font-size: 14px;
        color: #1F2226;
      }
      div:nth-child(2){
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        color: #1F2226;
        span{
          margin-left: 5px;

        }
      }

    }
    .div-flex{
      margin-top: 14px;
      height: 37px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px #E2E8F3 solid;
      div:nth-child(1){
        font-family: Inter;
        font-weight: 700;
        font-size: 14px;
        color: #1F2226;
      }
      div:nth-child(2){
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        color: #1F2226;
        span{
          margin-left: 5px;

        }
      }
    }
    .div-flex2{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      div:nth-child(1){
        font-weight: 700;
        font-size: 14px;
        color: #1F2226;
        font-family: Inter;
      }
      div:nth-child(2){
        font-weight: 400;
        font-size: 14px;
        color: #1F2226;
        font-family: Inter;

        span{
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



.color1{color: #19BA63}
.color2{color: #FE5D01}
.color3{color: #D80303}

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