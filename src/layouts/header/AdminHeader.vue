<template>
  <a-layout-header :class="(showHeaderBg)?[headerTheme,'admin-header','bg-img']:[headerTheme,'admin-header']">

    <div :class="['admin-header-wide', layout, pageWidth]">

      <!--      <router-link v-if="isMobile || layout == 'head'" to="/" :class="['logo', isMobile ? null : 'pc', headerTheme]">-->
      <span style="position: relative;display: inline-flex;align-items: center;">
        <router-link to="/">
          <img class="mul-logo" src="../../assets/logo.svg"/>
          <!--        <p>{{ layout + "-" + isMobile }}</p>-->
          <!--        <h1 v-if="!isMobile">{{ systemName }}</h1>-->
        </router-link>

        <!--      mobile -->
        <a-divider v-if="isMobile" type="vertical"/>

        <!--      <a-icon v-if="layout !== 'head'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>-->
        <div v-if="layout !== 'side' && !isMobile" class="admin-header-menu"
             :style="`text-align:left;position:relative;margin: 14px 44px;`">
          <i-menu class="head-menu" :theme="headerTheme" mode="horizontal" :options="menuData" @select="onSelect"/>
        </div>
      </span>


      <div :class="['admin-header-right', headerTheme]">

      </div>
    </div>


  </a-layout-header>
</template>

<script>
import HeaderAvatar from './HeaderAvatar'
import IMenu from '@/components/menu/menu'
import {mapState, mapMutations, mapGetters} from 'vuex'
import {toFixed2, toThousands2, trace} from "../../utils/tools";

export default {
  name: 'AdminHeader',
  components: {IMenu, HeaderAvatar},
  props: ['collapsed', 'menuData'],
  data() {
    return {
      toFixed2:toFixed2,
      toThousands2:toThousands2,
      currentLink:"Ethereum",
      langList: [
        {key: 'CN', name: '简体中文', alias: '简体'},
        {key: 'HK', name: '繁體中文', alias: '繁體'},
        {key: 'US', name: 'English', alias: 'English'}
      ],
      searchActive: false
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'isMobile', 'layout', 'systemName', 'lang', 'pageWidth']),
    ...mapGetters(["isLogin","account","showHeaderBg","tokens"]),
    headerTheme() {
      if (this.layout == 'side' && this.theme.mode == 'dark' && !this.isMobile) {
        return 'light'
      }
      return this.theme.mode
    },
    langAlias() {
      let lang = this.langList.find(item => item.key == this.lang)
      return lang.alias
    },
    menuWidth() {
      const {layout, searchActive} = this
      // const headWidth = layout === 'head' ? '100% - 125px' : '100%'
      // const extraWidth = searchActive ? '600px' : '393px'
      // return `calc(${headWidth} - ${extraWidth})`
      return "550px";
      // return "50%";
    }
  },
  methods: {
    checkLink(e){
      trace('click left button', e);
      this.currentLink = e.key;
    },
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    },
    showLogin() {

        trace("showLogin-", this.isLogin)
      if (!(this.isLogin==1)) {
        this.$bus.emit("showLogin", true);
      } else {
        // this.$bus.emit("showAccount", true);
      }
    },
    handleMenuClick(e) {
      trace('click', e);
    },
    getAccount() {
      return this.account.slice(0, 6) + "..." + this.account.slice(-4)
    },
    ...mapMutations('setting', ['setLang'])
  }
}
</script>

<style lang="less" scoped>
@import "index";


//ant-menu-submenu ant-menu-submenu-horizontal

.link-check-btn{
  background-color: #1E1E1E;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  //width: 136px;
  height: 44px;
  border: 0;
  border-radius: 8px !important;
  color: #F4F4F4;
  font-family: 'Poppins';
}

.link-error-btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 31px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #FF428E;
  border-color: #FF428E;
}

.mul-flex-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.right-text-item {
  width: 130px;
  height: 31px;

  line-height: 14px;
  letter-spacing: 0.5px;
  font-family: SwedenSansPRINT;
  color: #444444;

  background: #F4F4F4;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 20px;
}

.right-text-item2 {
  position: relative;
  padding: 2px;
  //width: 265px;
  height: 44px;
  background: #1E1E1E;
  border-radius: 8px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  letter-spacing: 0.16px;

  /* 灰色/White#FFFFFF */

  color: #FFFFFF;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
}

.right-text-item3 {
  width: 160px;
  height: 31px;
  color: #FF0080;
  //background: rgba(255, 0, 128, 0.15);
  border: 1px solid #FF0080;
  box-sizing: border-box;
  border-radius: 8px;

  font-size: 12px;

  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  cursor: pointer;
}
.right-text-item3:hover, .right-text-item3:focus{
  color: #FF3399;
  //background: rgba(255, 51, 153, 0.15);
  border: 1px solid #FF3399;
}
.right-text-item3:active, .right-text-item3.active {
  color: #800040;
  //background: rgba(128, 0, 64, 0.15);
  border: 1px solid #800040;
}

.anticon {
  font-size: 8px;
}

.sub-menu-box {
  .anticon {
    font-size: 3rem;
  }
}



.admin-header{
  background-color: #000000 !important;
  //background-color: transparent !important;
  //background-color: #FBFBFB !important;
  //background: transparent !important;
  //background: linear-gradient(90deg,white 0%,#dcfffb 70%,white 96%);
  //background: linear-gradient(180deg, rgba(32, 255, 228, 0.06) 37.42%, rgba(32, 255, 228, 0.003) 90.73%);
  //background-image: url("../../assets/background_shadow.jpg");
  //background-size: 100% auto;
  //background-position-y: top;
}
.bg-img{
  //background-image: url("../../assets/background_shadow.jpg");
  //background-size: 100% auto;
  //background-position-y: top;
}


</style>
