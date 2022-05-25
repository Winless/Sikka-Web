<template>
  <div>
    <a-modal v-model="visible" :footer="false" width="600px" wrapClassName="network" :afterClose="closemodel" :centered="true">
      <template slot="closeIcon">
        <img src="../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px">
      </template>
      <div class="work">
        <div class="div1">Wrong Network</div>
        <div class="div2">The current page is not available on {{nerworkname}} Network.</div>
        <div class="div3">Please switch to <img src="../assets/image/icon/safflower.svg"> Polygon Network.</div>
        <a-button type="primary" @click="changeChain()">
          Switch network
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { changeMetamaskChain } from "../SDK";
import { mapGetters } from "vuex";
export default {
  name: "Network",
  data() {
    return {
      visible: true,
      nerworkname: "BNB",
    }
  },
  created() {
    this.nerworkname = this.chain ?? "Unkonw";
  },
  computed: {
    ...mapGetters(["chain"]),
  },
  watch: {
    chain(now) {
      this.nerworkname = now ?? "Unkonw";
    }
  },
  methods: {
    closemodel() {
      this.$store.dispatch("user/setnetworkf", false);
    },
    async changeChain() {
      await changeMetamaskChain("MUMBAI");
    }
  }
}
</script>

<style scoped lang="scss">
.ant-modal {
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
  color: rgba(0, 0, 0, 0.65) !important;
  font-size: 14px !important;
  font-variant: tabular-nums !important;
  line-height: 1.5 !important;
  list-style: none !important;
  font-feature-settings: 'tnum' !important;
  position: relative !important;
  top: 300px !important;
  //width: auto !important;
  margin: 0 auto !important;
  padding-bottom: 24px !important;
  pointer-events: none !important;
}
::v-deep .ant-modal-content {
  border-radius: 36px;
}
::v-deep.ant-btn-primary {
  margin-top: 40px;
  width: 270px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  margin-right: 12px;
  height: 50px;
  border-radius: 16px;
  color: #fff;
  background: #8247E5;
  border-color: transparent;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}
.network {
  .work {
    text-align: center;

    .div1 {
      font-family: Inter;
      font-weight: 700;
      font-size: 30px;
      color: #1f2226;
      margin-bottom: 24px;
    }
    .div2 {
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #1f2226;
    }

    .div3 {
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #1f2226;
    }
  }
}
</style>