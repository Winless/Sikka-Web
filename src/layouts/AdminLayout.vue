<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
<!--    <drawer v-if="isMobile" v-model="drawerOpen">-->
<!--      <side-menu :theme="theme.mode" :menuData="menuData" :collapsed="false" :collapsible="false"-->
<!--                 @menuSelect="onMenuSelect"/>-->
<!--    </drawer>-->
<!--    <side-menu :class="[fixedSideBar ? 'fixed-side' : '']" :theme="theme.mode"-->
<!--               v-else-if="layout === 'side' || layout === 'mix'" :menuData="sideMenuData" :collapsed="collapsed"-->
<!--               :collapsible="true"/>-->
<!--    <div v-if="fixedSideBar && !isMobile"-->
<!--         :style="`width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`"-->
<!--         class="virtual-side"></div>-->
<!--    <drawer v-if="!hideSetting" v-model="showSetting" placement="right">-->
<!--      <div class="setting" slot="handler">-->
<!--        <a-icon :type="showSetting ? 'close' : 'setting'"/>-->
<!--      </div>-->
<!--      <setting/>-->
<!--    </drawer>-->
    <!--    <a-layout class="admin-layout-main beauty-scroll">-->
    <a-layout class="admin-layout-main">
<!--      <admin-header :class="[{'fixed-tabs': fixedTabs, 'fixed-header': fixedHeader, 'multi-page': multiPage}]"-->
<!--                    :style="headerStyle" :menuData="headMenuData" :collapsed="collapsed"-->
<!--                    @toggleCollapse="toggleCollapse"/>-->

<!--      <a-layout-header-->
<!--          :class="['virtual-header', {'fixed-tabs' : fixedTabs, 'fixed-header': fixedHeader, 'multi-page': multiPage}]"-->
<!--          v-show="fixedHeader"></a-layout-header>-->
      <a-layout-content class="admin-layout-content" >
        <div style="position: relative">
          <slot></slot>
        </div>
      </a-layout-content>


<!--      <a-layout-footer style="padding: 0px">-->
<!--        <page-footer :link-list="footerLinks" :copyright="copyright" />-->
<!--      </a-layout-footer>-->
    </a-layout>
  </a-layout>
</template>

<script>
import AdminHeader from './header/AdminHeader'
import PageFooter from './footer/PageFooter'
import Drawer from '../components/tool/Drawer'
import SideMenu from '../components/menu/SideMenu'
import Setting from '../components/setting/Setting'
import {mapState, mapMutations, mapGetters} from 'vuex'
import {getScale, trace} from "../utils/tools";

export default {
  name: 'AdminLayout',
  components: { Setting, SideMenu, Drawer, AdminHeader,PageFooter},
  data() {
    return {
      footerLinks:["a","b"],
      minHeight: window.innerHeight - 64 - 122,
      collapsed: false,
      showSetting: false,
      drawerOpen: false,
      showLogin: false,
      showAccount: false,
      showComfirm: false,
      showMsg: false,
      showtermsConfirm: false,
      showtermsConfirmCall: null,

      config: {},
      msgConfig: {},
      path: "wss://api-public.multiple.fi",
      socket: "",
      sendTickT: 0,
      socket_call: {},


    }
  },
  provide() {
    return {
      adminLayout: this
    }
  },
  watch: {
    $route(val) {
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    },
    isMobile(val) {
      if (!val) {
        this.drawerOpen = false
      }
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'theme', 'layout',  'copyright', 'fixedHeader', 'fixedSideBar',
      'fixedTabs', 'hideSetting', 'multiPage', "scale"]),
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData']),
    ...mapGetters(["isLogin", "account", "globalBlur", "showHeaderBg"]),
    sideMenuWidth() {
      return this.collapsed ? '80px' : '256px'
    },
    headerStyle() {
      let width = (this.fixedHeader && this.layout !== 'head' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      return `width: ${width}; position: ${position};`
    },
    headMenuData() {
      const {layout, menuData, firstMenu} = this
      trace("headMenuData=", layout, menuData, firstMenu)
      return layout === 'mix' ? firstMenu : menuData
    },
    sideMenuData() {
      const {layout, menuData, subMenu} = this
      return layout === 'mix' ? subMenu : menuData
    }
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight', 'setActivatedFirst', "setScale"]),
    resize() {
      const scale = getScale();
      this.setScale(scale);
      trace("resize-scale", scale)

    },
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    onMenuSelect() {
      this.toggleCollapse()
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const {firstMenu} = this
        for (let menu of firstMenu) {

          if (matched.findIndex(item => {
            // console.log("setActivated=", item.path, menu.fullPath);
            return item.path === menu.fullPath
          }) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    },

    async autoLogin() {

    },




    setOtherScale() {
      let con = document.getElementById("popContainer");
      let len = con.childElementCount;
      if (len > 1) {
        for (let i = 1; i < len; i++) {
          con.children[i].style.zoom = this.scale;
        }
      }
    },
    async toLogin() {

    },

  },

  beforeCreate() {

  },
  created() {
    // this.createWebSocket();




  },
  mounted() {




  },
  beforeDestroy() {

  }
  ,

}
</script>

<style lang="less" scoped>
.ant-layout-footer{
  background-color: #000000;
}
.admin-layout {
  .side-menu {
    &.fixed-side {
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
    }
  }

  .virtual-side {
    transition: all 0.2s;
  }

  .virtual-header {
    transition: all 0.2s;
    opacity: 0;

    &.fixed-tabs.multi-page:not(.fixed-header) {
      height: 0;
    }
  }

  .admin-layout-main {
    .admin-header {
      top: 0;
      right: 0;
      overflow: hidden;
      transition: all 0.2s;

      &.fixed-tabs.multi-page:not(.fixed-header) {
        height: 0;
      }
    }
  }

  @media only screen and (min-width: 751px) {
    .admin-layout-content {
      padding: 0;
      /*overflow-x: hidden;*/
      min-height: calc(100vh - 64px - 192px);
      //background: linear-gradient(180deg, rgba(32, 255, 228, 0.08) 37.42%, rgba(32, 255, 228, 0.004) 90.73%);
    }
  }
  @media only screen and (min-width: 750px) {
    .admin-layout-content {
      padding: 0;
    }
  }


  .setting {
    background-color: @primary-color;
    color: @base-bg-color;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px @shadow-color;
  }

  .mul-pane {
    position: fixed;
    z-index: 99;
    width: 100%;
    min-height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
