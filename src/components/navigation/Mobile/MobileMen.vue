<template>
  <div class="men">
    <div>
      <a-popover trigger="click">
      <div slot="content">
        <a-menu v-model="current"  mode="inline" >
          <a-menu-item v-for="item in mena" :key="item.key" @click="handelClick(item)">{{ item.name }}</a-menu-item>
        </a-menu>
      </div>
          <img src="../../../assets/image/Modalicon/Frame9499.svg" class="mobmen" >
    </a-popover>
     <img src="../../../assets/image/icon/logo.svg">
    </div>

    <div class="Mobright">
    
      <div v-if="LoginStatus" class="right-false">
      <a-button type="primary"  @click="login()" :loading="loading">
        Connect Wallet
      </a-button>
    </div>

    <div v-else @click="MobileAccount()" class="right-false2">
      <img src="../../../assets/image/icon/safflower.svg">
      <span>{{maticValue}}</span>
      <div class="line"></div>
<!--      <div>{{ this.admin.account === "" ? "": this.admin.account.slice(0, 6) + "..." + this.admin.account.slice(-4) }}</div>-->
      <img :src="providerInfo.logo" class="tokenlogo">
       <img src="../../../assets/image/icon/Vector310.svg">
    </div>
      </div>       

     <mobile-account v-if="showMobileAccount" :setShow="setShowModal" :providerInfo="this.providerInfo"></mobile-account>
  </div>
</template>

<script>
import MobileAccount from './components/MobileAccount.vue'
import {connect, getGasTokenBanlance, init} from "../../../SDK";
import {mapGetters} from "vuex";
export default {
  components: { MobileAccount },
  computed: {
    ...mapGetters(["account", "isLogin", "networkF","iswidth"]),
  },
    data(){
     return{
       Mobdata:{
         USP: 0,
         aMATICb: 0,
         SIKKA: 0,
         admin:"",
         logo:"",
       },
       defaultChainID: 80001,
       loading: false,
       LoginStatus: true,
    showMobileAccount:false,
       maticValue: 0,
       admin: {
         account: "",
         chainID: 0,
         chain: "",
         message: "success",
       },
       providerInfo: {},
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

     }

    },
  watch: {
    isLogin(now) {
      if (now === "1000") {
        getGasTokenBanlance().then(balance => {
          this.maticValue = Number(balance).toFixed(4)
        }).catch(error => {
          console.log(error)
        });
      }
    },
    networkF(now) {
      if (!now) {
        this.loading = false;
      }
    },
  },
  created() {
    this.$bus.on("getlogon",  () => {
       this.LoginStatus=true
    })
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

  },
  methods:{
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
        }
      },
         setShowModal(value) {
      this.showMobileAccount = value;
  
    },
    MobileAccount(){
      this.showMobileAccount = !this.showMobileAccount
    },
    handelClick(item) {
      if (item.key !== this.$route.path) {
        this.$router.push(item.path)
      }
    },
    setIntervalImmediately(func, timer) {
      func();
      return setInterval(func, timer);
    }

    }

}
</script>

<style lang="scss" scoped>
.men{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 32px);
    padding: 19px 0px 0px 0px;

      .mobmen{
        margin-right: 20px;

      }

      .Mobright{

           .right-false2{
         width: 165px;
         height: 40px;
         background: #FFFFFF;
         border-radius: 48px;
         display: flex;
         justify-content: center;
         align-items: center;
           .line{
             margin: 0px 8px;
             height: 24px;
             width: 1px;
             background: #E2E8F3;

           }
             .tokenlogo{
               height: 16px;
               width: 16px;
               margin-right: 11px;
             }
       }

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
        height: 30px;
        width: 122px;
        border-radius: 65px;
        color: #1c5bff;
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
  color: #006dff;
  font-weight: 400;
  font-size: 15px;
  border-bottom: none;
  font-family: Inter;
}
::v-deep.ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-right: none;
    transform: scaleY(0.0001);
    opacity: 0;
    transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
    content: '';
}
::v-deep.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    border-right:none;
}
</style>>
