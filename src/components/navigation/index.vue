<template>
  <div class="top">
    <div class="top2"  v-if="iswidth==2">
    <img src="../../assets/image/icon/logo.svg">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item v-for="item in mena" :key="item.key" @click="handelClick(item)">{{ item.name }}</a-menu-item>
    </a-menu>
    <!--未登录状态-->
    <div v-if="LoginStatus" class="right-false">
      <a-button type="primary" @click="login()" :loading="loading">
        Connect Wallet
      </a-button>
    </div>
    <!--登录状态-->
    <div class="right" v-else>
<!--      <div class="right-address">-->
       <img src="../../assets/image/icon/safflower.svg">
<!--        {{maticValue}}-->
<!--      </div>-->
      <div class="right-div"></div>
      <div class="right-success">
        <img class="wallat-icon" :src="providerInfo.logo" @click="accountmolet()">
        <div class="right-token" @click="accountmolet()"> {{ this.admin.account === "" ? "": this.admin.account.slice(0, 6) + "..." + this.admin.account.slice(-4) }}</div>
        <img src="../../assets/image/icon/Vector310.svg" @click="accountmolet()" style="cursor: pointer">
      </div>


      <div v-if="showaccount" class="div-out">
        <div style="padding: 20px">
          <div class="x">
            <div></div>
            <img src="../../assets/image/icon/Frame9405.svg" @click="close2()">
          </div>
          <div class="address">
            <div class="address-left">
              <img :src="providerInfo.logo">
              <div>{{ this.admin.account === "" ? "": this.admin.account.slice(0, 6) + "..." + this.admin.account.slice(-4) }}</div>
            </div>
          </div>
          <div class="copy">
            <div class="div1" v-clipboard:success="copSuccess" v-clipboard:copy="account"><div class="copy-img"></div>Copy Address</div>
            <div class="div1" @click="exporer()"><div class="view-img"></div>View on Exporer</div>
          </div>
          <div class="token">
            <div class="token-flex">
              <div><img src="../../assets/image/icon/Ellipse2516.svg"> USP</div>
              <div>{{Tokenbalance.USP}}</div>
            </div>
            <div class="token-flex">
              <div><img src="../../assets/image/Modalicon/amaticb.png">aMATICb</div>
              <div>{{Tokenbalance.aMATICb}}</div>
            </div>
            <div class="token-flex2">
              <div><img src="../../assets/image/Modalicon/Sikka.png" >SIKKA</div>
              <div>{{Tokenbalance.SIKKA}}</div>
            </div>
          </div>

          <a-button type="primary" @click="logonout()" class="btn1">
            Disconnect
          </a-button>



        </div>
      </div>
    </div>
    </div>

    <mobile-men v-if="iswidth==1"></mobile-men>
  </div>
</template>

<script>

import { init, connect, getTokenAddress, getTokensBalance, getGasTokenBanlance, logout } from "../../SDK";
import { mapGetters } from "vuex";
import MobileMen from './Mobile/MobileMen.vue';
export default {
  components: { MobileMen },
  name: "index",
  computed: {
    ...mapGetters(["account", "isLogin", "networkF","iswidth"]),
  },
  data() {
    return {
      defaultChainID: 80001,
      showaccount: false,
      loading: false,
      admin: {
        account: "",
        chainID: 0,
        chain: "",
        message: "success",
      },
      providerInfo: {},
      Tokenbalance: {
        USP: 0,
        aMATICb: 0,
        SIKKA: 0
      },
      maticValue: 0,
      LoginStatus: true,
      // longintrue: {
      //   address: "0x63c6...b350",
      //   token: "123.52",
      //   tokenName: "skUSD",
      //   Airdrop: "128.65 SET Airdrop!"
      // },
      current: [1],
      mena: [
        {
          key: 1,
          name: "Dashboard",
          path: "/Dashboard"
        },
        {
          key: 2,
          name: "Earn",
          path: "/Earn"
        },
        {
          key: 3,
          name: "Borrow",
          path: "/Borrow"
        },

        // {
        //   key: 4,
        //   name: "Govern",
        //   path: "/Govern",
        // },
        {
          key: 5,
          name: "Mypage",
          path: "/Mypage",
        },
      ]
    };
  },
  created() {
    if (this.$router.currentRoute.path == this.mena[2].path) {
      this.current = [3]
    }
    let auto = localStorage.getItem("account");
    if (auto && auto != "") {
      this.login();
    }
    this.setIntervalImmediately(() => {
      if (this.isLogin === "1000") {
        getGasTokenBanlance().then(balance => { this.maticValue = Number(balance).toFixed(4) }).catch(error => { console.log(error) });
      } else {
        this.maticValue = "0";
      }
    }, 20000);

    this.$bus.on("changelogin", () => {
      this.logonout()
    })

  },
  watch: {
    isLogin(now) {
      if (now === "1000") {
        getGasTokenBanlance().then(balance => { this.maticValue = Number(balance).toFixed(4) }).catch(error => { console.log(error) });
      }
    },
    networkF(now) {
      if (!now) {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.closeModal();
  },
  methods: {
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
    exporer() {
      window.open("https://polygonscan.com/")
    },
    copSuccess() {
      this.$message.success("copy success")

    },
    closeModal() {
      document.addEventListener("click", e => {
        const iconEl = document.querySelector(".right");// 这里是避免点击发生关闭的弹窗class名
        if (iconEl && !iconEl.contains(e.target)) {
          this.showaccount = false;
        }
      });
    },
    accountmolet() {
      this.topbalance();
      this.showaccount = true;
    },
    close2() {
      this.showaccount = false;
    },
    logonout() {
      this.LoginStatus = true;
      this.$store.dispatch("user/setlogin", "1002");
      this.$store.dispatch("user/setAccount", "");
      localStorage.setItem("account", "");
      logout();
    },
    async login() {
      if (this.isLogin == "1001") {
        this.$store.dispatch("user/setnetworkf", true);
      }
      this.loading = true
      if (this.account === "") {
        let a = await connect(data => {
          this.changeLoginType(data);
        })
        this.changeLoginType(a);
        this.providerInfo = a.providerInfo;
      }
    },
    handelClick(item) {
      if (item.key !== this.$route.path) {
        this.$router.push(item.path)
      }
    },
    async changeLoginType(data) {//'1000':成功 '1001':网络错误  '1002':失败
      this.loading = false;
      this.admin = data;
      this.$store.dispatch("user/setAccount", data.account);
      this.$store.dispatch("user/setChain", data.chain);
      localStorage.setItem("account", data.account);
      if (data.account !== "") {
        if (data.chainID === this.defaultChainID) {
          await init();
          this.$store.dispatch("user/setlogin", "1000");
          this.LoginStatus = false;
          this.$store.dispatch("user/setnetworkf", false);
        } else {
          this.$store.dispatch("user/setlogin", "1001");
          this.$store.dispatch("user/setnetworkf", true);
          this.LoginStatus = true;
        }
      } else {
        this.$store.dispatch("user/setnetworkf", false);
        this.logonout();
      }
    },
    setIntervalImmediately(func, timer) {
      func();
      return setInterval(func, timer);
    }
  },
}
</script>

<style scoped lang="scss">
.top {
  background-color: #f2f5fa;
  padding: 21px 0px;
  display: flex;
  justify-content: center;
  border: 1px solid #e2e8f3;

  .top2{
    display: flex;
    justify-content: space-between;
    width: calc(100% - 80px);
    padding: 0px 40px 0px 40px;
    max-width: 1360px;

    .right-false {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      ::v-deep.ant-btn-primary {
        font-family: Inter;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        margin-right: 12px;
        height: 36px;
        width: 154px;
        border-radius: 65px;
        color: #8247E5;
        background: #ffffff;
        border-color: transparent;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
      }

      .ant-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 77px;
        background: #ffffff;
        border: 1px solid #f2f5fa;
        border-radius: 65px;

        span {
          font-family: Inter;
          margin-right: 14px;
          font-weight: 400;
          font-size: 14px;
          color: #1f2226;
        }

        img {
          padding-top: 4px;
          margin: 0px;
        }
      }
    }

    .right {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .ant-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 77px;
        background: #ffffff;
        border: 1px solid #f2f5fa;
        border-radius: 65px;

        span {
          font-family: Inter;
          margin-right: 14px;
          font-weight: 400;
          font-size: 14px;
          color: #1f2226;
          font-family: Inter;
        }

        img {
          padding-top: 4px;
          margin: 0px;
        }
      }

      .right-address {
        font-family: Inter;
        color: #9aa1b0;
        font-size: 16px;

        img {
          margin-right: 10px;
        }
      }

      .right-div {
        margin: 0px 12px;
        background-color: rgba(0, 29, 117, 0.1);
        height: 21px;
        width: 1px;
      }

      .right-Airdrop {
        font-family: Inter;
        color: #1f2226;
        margin-right: 20px;
        height: 36px;
        width: 197px;
        font-size: 14px;
        font-weight: 400;
        background: #ffffff;
        border: 1px solid #f2f5fa;
        border-radius: 65px;
        img {
          margin-right: 11px;
        }
      }
      .right-success{
        width: 153px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #E2E8F3;
        border-radius: 20px;
        .right-token {
         letter-spacing:-1px;
          cursor: pointer;
          font-family: Inter;
          margin-right: 8px;
          font-size: 13px;
          color: #9aa1b0;
        }
        .wallat-icon {
          cursor: pointer;
          margin-right: 11px;
          width: 16px;
          height: 15px;
        }
      }

      .div-out {
        z-index: 2;
        top: 61px;
        right: 40px;
        position: absolute;
        width: 360px;
        height: 333px;
        background: #ffffff;
        box-shadow: 0px 0px 2px rgba(130, 137, 154, 0.43),
        0px 6px 12px rgba(154, 161, 176, 0.31);
        border-radius: 12px;

        .x {
          display: flex;
          justify-content: space-between;
          img {
            cursor: pointer;
          }
        }
        .address {
          margin-top: -21px;
          display: flex;
          justify-content: space-between;

          .address-left {
            align-items: center;
            display: flex;
            justify-content: flex-start;

            img {
              margin-right: 11px;
              width: 32px;
              height: 32px;
            }
            div {
              font-weight: 400;
              font-size: 18px;
              color: #1f2226;
            }
          }
        }
        .copy {
          margin: 22px 0px 35px 0px;
          display: flex;
          justify-content: flex-start;

          .div1 {
            cursor: pointer;
            margin-right: 23px;
            display: flex;
            align-items: center;
            font-family: Inter;
            font-weight: 400;
            font-size: 13px;
            color: #8247E5;


            .copy-img{
              height: 24px;
              width: 24px;
              background-image: url("../../assets/image/icon/copy.svg");
              background-repeat: no-repeat;


            }
             .copy-img:hover{
              height: 24px;
              width: 24px;
              background-image: url("../../assets/image/icon/copy2.svg");
              background-repeat: no-repeat;


             }
             .view-img{
              height: 24px;
              width: 24px;
              background-image: url("../../assets/image/icon/Frame6592.svg");
              background-repeat: no-repeat;

             }
              .view-img:hover{
              height: 24px;
              width: 24px;
              background-image: url("../../assets/image/icon/Frame6592S.svg");
              background-repeat: no-repeat;

             }
          }
          .div1:hover {
            cursor: pointer;
            margin-right: 23px;
            display: flex;
            align-items: center;
            font-family: Inter;
            font-weight: 400;
            font-size: 13px;
            color: #561FB2;
                 .copy-img{
              height: 24px;
              width: 24px;
              background-image: url("../../assets/image/icon/copy2.svg");
              background-repeat: no-repeat;


            }

              .view-img{
              height: 24px;
              width: 24px;
              background-image: url("../../assets/image/icon/Frame6592S.svg");
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
        ::v-deep.btn1.ant-btn-primary {
          margin-top: 8px;
          margin-bottom: 9px;
          font-family: Inter;
          color: #8247E5;
          font-weight: 600;
          font-size: 16px;
          height: 40px;
          width: 312px;
          background: #ffffff;
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
               ::v-deep .ant-btn-primary:hover, .ant-btn-primary:focus {
                  color: #fff !important;
                  background-color: #561FB2 !important;
                  border-color: #561FB2 !important;
                }
      }
    }
  }

}

::v-deep .ant-menu-horizontal > .ant-menu-item,
.ant-menu-horizontal > .ant-menu-submenu {
  position: relative;
  top: 1px;
  display: inline-block;
  vertical-align: bottom;
  border-bottom: transparent;
}

::v-deep.ant-menu-horizontal {
  font-family: Inter;
  background-color: #f2f5fa;
  color: #82899a;
  line-height: 46px;
  white-space: nowrap;
  border: 0;
  border-bottom: none;
  box-shadow: none;
  font-weight: 400;
  font-size: 15px;
}

::v-deep.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-submenu:hover,
.ant-menu-horizontal > .ant-menu-item-active,
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-item-open,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-submenu-selected {
  color: #8247E5;
  font-weight: 400;
  font-size: 15px;
  border-bottom: none;
  font-family: Inter;
}
</style>
