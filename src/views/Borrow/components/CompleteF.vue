<template>
<div>
  <a-modal v-model="visible" :footer="false" width="700px" wrapClassName="Complete" :afterClose="closemodel" :centered="true">
    <template slot="closeIcon">
      <img src="../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px" >
    </template>
    <div class="Complete-title">
      <div>Complete!</div>
    </div>
    <div class="Complete-list">
      <div v-if="type===this.settype">
      <div class="Complete-flex">
        <div>Repaid Amount</div>
        <div>{{completelist.repaidAmount}}<span></span>USP</div>
      </div>
      <div class="Complete-flex">
        <div>New Borrow usage</div>
        <div>{{completelist.usage}}<span></span>%</div>
      </div>
      <div class="Complete-flex">
        <div>Outstanding Loan</div>
        <div>{{completelist.loan}}<span></span>USP</div>
      </div>
        <div class="Complete-flex">
          <div>Total successful repaid</div>
          <div>{{completelist.Total}}<span></span>USP</div>
        </div>
      </div>
      <div class="Complete-flex" v-if="type===this.settype">
        <div>Borrow Interest</div>
        <div>{{completelist.Interest}}</div>
      </div>
      <div class="Complete-flex" v-if="this.settype===2">
        <div>Total Collateral Provided<span></span>aMATICb</div>
        <div>{{completelist.Total}}</div>
      </div>
      <div class="Complete-flex" v-if="this.settype===4">
        <div>Total Borrowed</div>
        <div>{{completelist.Total}}<span></span>USP</div>
      </div>
      <div class="Complete-flex" v-if="this.settype===5">
        <div>Total successful withdraw</div>
        <div>{{completelist.Total}}<span></span> aBNBc</div>
      </div>


      <div class="Complete-flex">
        <div>Tx Hash</div>
        <div  @click="IShash(completelist.hash)" class="hashadress">{{ completelist.hash === "" ? "": completelist.hash.slice(0, 6) + "..." + completelist.hash.slice(-4) }} <div class="imgs" @click="IShash(completelist.hash)"></div></div>
      </div>
      <div class="Complete-flex2">
        <div>Tx Fee</div>
        <div>0.0066 MATIC</div>
      </div>

      <a-button type="primary" @click="closemodel">
        OK
      </a-button>
    </div>

  </a-modal>
</div>
</template>

<script>
export default {
  name: "Complete",
  props:{
    settype:Number,
    completelist:Object


  },
  data(){
    return{
      type:1,
      visible:true,
      // Complete:{
      //   Amount:"1,000.87",
      //   usage:"26.3%",
      //   Loan:"100,00.00",
      //   Hash:"9C767C...8C5EDC",
      //   fee:"0.00245"
      // }
    }
  },
  created() {
    this.$bus.emit("changeInfo",1)
    console.log( "settype",this.settype)
    console.log( "completelist",this.completelist)
    },
  methods:{
    closemodel(){
      this.visible=false

      if(this.setShow){
        this.setShow(false);
      }

    },
    IShash(hash){
      window.open("https://mumbai.polygonscan.com/tx/"+hash)
    }
  }
}
</script>

<style scoped lang="scss">
.Complete{

  .Complete-title{
    text-align: center;
    div{
      margin-top: 4px;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;
    }

  }
  .Complete-list{
    margin-top: 64px;

    .Complete-flex{
      align-items: center;
      margin-bottom: 21px;
      height: 38px;
      display: flex;
      justify-content: space-between;
      border-bottom: #E2E8F3 1px solid;


      div:nth-child(1){
        font-size: 14px;
        font-weight: 700;
        color: #9AA1B0;
      }
      div:nth-child(2){
        align-items: center;
        display: flex;
        justify-content: flex-start;
        font-weight: 400;
        font-size: 14px;
        color: #1F2226;

        span{
          margin-left: 5px;

        }
        .imgs{
          height: 24px;
          width: 24px;
          background-image: url("../../../assets/image/icon/Frame659.svg");
          background-size:100% 100%;
          background-repeat: no-repeat;

        }
        .imgs:hover{
          height: 24px;
          width: 24px;
          background-image: url("../../../assets/image/icon/Frame6592.svg");
          background-size:100% 100%;
          background-repeat: no-repeat;
          .hashadress:hover{
            color: #8247E5;
          }

        }
      }

      .hashadress{
        cursor: pointer;

      }
      .hashadress:hover{
        color: #8247E5;

        .imgs{
          height: 24px;
          width: 24px;
          background-image: url("../../../assets/image/icon/Frame6592.svg");
          background-size:100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .Complete-flex2{
      margin-bottom: 21px;
      height: 38px;
      display: flex;
      justify-content: space-between;

      div:nth-child(1){
        font-size: 14px;
        font-weight: 700;
        color: #9AA1B0;
      }
      div:nth-child(2){
        font-weight: 400;
        font-size: 14px;
        color: #1F2226;

      }

    }


  }


}
::v-deep.ant-btn-primary {
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
</style>