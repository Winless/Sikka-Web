<template>
   <div style="position: absolute">
      <a-modal v-model="visible" :footer="false" width="328px" wrapClassName="Mobleaccount" :afterClose="closemodel" :centered="true">
        <template slot="closeIcon">
          <img src="../../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px">
        </template>
          <div class="title">
           <img :src="providerInfo.logo">
            <div>{{ this.account === "" ? "": this.account.slice(0, 6) + "..." + this.account.slice(-4) }}</div>
          </div>
            <div class="copy">
            <div class="div1" v-clipboard:success="copSuccess" v-clipboard:copy="account"><div class="copy-img"></div>Copy Address</div>
            <div class="div1" @click="exporer()"><div class="view-img"></div>View on Exporer</div>
          </div>
                  <div class="token">
            <div class="token-flex">
              <div><img src="../../../../assets/image/icon/Ellipse2516.svg"> USP</div>
              <div>{{Tokenbalance.USP}}</div>
            </div>
            <div class="token-flex">
              <div><img src="../../../../assets/image/Modalicon/amaticb.png">aMATICb</div>
              <div>{{Tokenbalance.aMATICb}}</div>
            </div>
            <div class="token-flex2">
              <div><img src="../../../../assets/image/Modalicon/Sikka.png" >SIKKA</div>
              <div>{{Tokenbalance.SIKKA}}</div>
            </div>
          </div>

          <a-button type="primary" @click="logonout()" class="btn1">
            Disconnect
          </a-button>


      </a-modal>
   </div>
</template>

<script>
import {getTokenAddress, getTokensBalance, logout} from "../../../../SDK";
import {mapGetters} from "vuex";

export default {
    props: {
    setShow: Function,
      providerInfo:{}
  },
  computed: {
    ...mapGetters(["account", "isLogin", "networkF","iswidth"]),
  },
    data(){
     return{
      visible: true,

    Tokenbalance: {
        USP: 0,
        aMATICb: 0,
        SIKKA: 0
      },

     }

    },
  created() {
   this.topbalance()
      },
  methods:{
    logonout() {
      // this.LoginStatus = true;
      this.$bus.emit("getlogon",1)
      this.$store.dispatch("user/setlogin", "1002");
      this.$store.dispatch("user/setAccount", "");
      localStorage.setItem("account", "");
      logout();
    },
      async topbalance() {
        if (this.isLogin === "1000") {
          let AMATICB = getTokenAddress("AMATICB");
          let SIKKA = getTokenAddress("SIKKA");
          let SKUSD = getTokenAddress("SKUSD");
          let AUSP = getTokenAddress("AUSP");
          let gb1 = await getTokensBalance([AMATICB, SIKKA, SKUSD, AUSP]);//余额
          this.Tokenbalance.aMATICb = Number(gb1[0].balance).toFixed(2)
          this.Tokenbalance.SIKKA = Number(gb1[1].balance).toFixed(2)
          this.Tokenbalance.USP = Number(gb1[2].balance).toFixed(2)

        } else {
          this.Tokenbalance = {
            aMATICb: "0",
            SIKKA: "0",
            USP: "0"
          };
        }
      },
         closemodel() {
      this.visible = false

      if (this.setShow) {
        this.setShow(false);
      }

    },
       exporer() {
      window.open("https://polygonscan.com/")
    },
    copSuccess() {
      this.$message.success("copy success")

    },

    }

}
</script>

<style lang="scss" scoped>
.Mobleaccount{
   
    .title{
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img{
        height: 24px;
        width: 24px;

      }
      div{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #1F2226;

      }

    }
            .copy {
          margin: 22px 0px 35px 0px;
          display: flex;
          justify-content: space-between;

          .div1 {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-family: Inter;
            font-weight: 400;
            font-size: 13px;
            color: #1c5bff;


            .copy-img{
              height: 24px;
              width: 24px;
              background-image: url("../../../../assets/image/icon/copy.svg");
              background-repeat: no-repeat;
              

            }
             .copy-img:hover{
              height: 24px;
              width: 24px;
              background-image: url("../../../../assets/image/icon/copy2.svg");
              background-repeat: no-repeat;
            

             }
             .view-img{
              height: 24px;
              width: 24px;
              background-image: url("../../../../assets/image/icon/Frame6592.svg");
              background-repeat: no-repeat;

             }
              .view-img:hover{
              height: 24px;
              width: 24px;
              background-image: url("../../../../assets/image/icon/Frame6592S.svg");
              background-repeat: no-repeat;

             }
          }
          .div1:hover {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-family: Inter;
            font-weight: 400;
            font-size: 13px;
            color: #0333B0;
                 .copy-img{
              height: 24px;
              width: 24px;
              background-image: url("../../../../assets/image/icon/copy2.svg");
              background-repeat: no-repeat;
              

            }
     
              .view-img{
              height: 24px;
              width: 24px;
              background-image: url("../../../../assets/image/icon/Frame6592S.svg");
              background-repeat: no-repeat;

             }
  
          }
   
        }
              .token {
          .token-flex2{
            margin-bottom: 11px;
            height: 22px;
            display: flex;
            justify-content: space-between;

            div:nth-child(1) {
              height: 22px;
              width: 22px;
              display: flex;
              align-items: center;
              font-weight: 400;
              font-size: 14px;
              color: #1f222680;
              img {
                image-rendering: -moz-crisp-edges; /* Firefox */
                image-rendering: -o-crisp-edges; /* Opera */
                image-rendering: crisp-edges;    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
                height: 22px;
                width: 22px;
                margin-right: 8px;
              }
            }
            div:nth-child(2) {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              color: #1F2226;
            }

          }

          .token-flex {
            margin-bottom: 11px;
            height: 33px;
            border-bottom: 1px solid #e2e8f3;
            display: flex;
            justify-content: space-between;

            div:nth-child(1) {
              height: 22px;
              width: 22px;
              display: flex;
              align-items: center;
              font-weight: 400;
              font-size: 14px;
              color: #1f222680;
              img {
                image-rendering: -moz-crisp-edges; /* Firefox */
                image-rendering: -o-crisp-edges; /* Opera */
                image-rendering: crisp-edges;    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
                height: 22px;
                width: 22px;
                margin-right: 8px;
              }
            }
            div:nth-child(2) {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              color: #1F2226;
            }
          }
        }

}
::v-deep .ant-modal-content {
  border-radius: 36px;
}
        ::v-deep.btn1.ant-btn-primary {
          margin-top: 8px;
          margin-bottom: 9px;
          font-family: Inter;
          color: #1c5bff;
          font-weight: 600;
          font-size: 16px;
          height: 40px;
          width: 280px;
          background: #ffffff;
          border: 1px solid #1c5bff;
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
         ::v-deep .ant-btn-primary:hover, .ant-btn-primary:focus {
                  color: #fff !important;
                  background-color: #0333B0 !important;
                  border-color: #0333B0 !important;
             }
</style>