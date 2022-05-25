<template>
  <div class="dashboard">
    <DashboardMobile v-if="iswidth==1"></DashboardMobile>
    <PCIndex v-if="iswidth==2"></PCIndex>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import DashboardMobile from "./MobileIndex";
import PCIndex from "./PCIndex";

export default {
  name: "index",
  components: { DashboardMobile,PCIndex},
  data() {
    return {
      isMobile:false,
    }
  },
  mounted() {
    this.checkInfo();

  },
  created() {


  },
  computed:{
    ...mapGetters(["account", "borrowInfo", "btnshow", "isLogin","iswidth"]),
  },
  watch: {
    isLogin(){
      this.checkInfo();
    }

  },
  methods: {
    async checkInfo() {
      if(this.isLogin != "1000"){
        return;
      }
    }

    },


}
</script>

<style scoped lang="scss">

::v-deep.ant-progress-circle-wrap,.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
.dashboard{
  min-height: calc(100vh - 90px);
  background: #F2F5FA;
  display: flex;
  justify-content: center;



}
.worry{
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 18px;
  background: #FF75754D;
  span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: #FA1313;
  }
}
.success{
  margin-bottom: 27px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 18px;
  background: #DDFEEE;
  span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: #00B75F;
  }

}
</style>