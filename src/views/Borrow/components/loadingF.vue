<template>
<div>
    <a-modal v-model="visible" :footer="false" width="700px" wrapClassName="loading" :afterClose="closemodel" :centered="true">
      <template slot="closeIcon">
        <img src="../../../assets/image/Modalicon/close.svg" style="margin-right: 18px;margin-top: 18px"  >
       </template>
       <div class="loading-title">
         <div>Transaction in progress...</div>
         <div>Please wait for a while.</div>
       </div>


      <div class="Underline"></div>
     <div class="loading-list">
       <div>Tx Hash</div>
       <div>{{ completelist.hash === "" ? "": completelist.hash.slice(0, 6) + "..." + completelist.hash.slice(-4) }}<img src="../../../assets/image/icon/Frame659.svg" ></div>

     </div>
    </a-modal>
</div>
</template>

<script>
export default {
  name: "loading",
  props:{
    completelist:Object
  },
  data(){
    return{
      visible:true,
      account:"9C767C...8C5EDC"
    }

  },
  methods:{
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

.loading{

  .loading-title{
    text-align: center;
    div:nth-child(1){
      margin-top: 4px;
      font-weight: 600;
      font-size: 32px;
      color: #1F2226;
      margin-bottom: 20px;

    }
    div:nth-child(2){
      font-weight: 400;
      font-size: 14px;
      color: #1F2226;
    }

  }
  .Underline{
    border-bottom: #E2E8F3 1px solid;
    margin-top: 64px;
     margin-bottom: 24px;
  }
  .loading-list{
    align-items: center;
    display: flex;
    justify-content: space-between;
    div:nth-child(1){
      font-weight: 700;
      font-size: 14px;
      color: #9AA1B0;

    }
    div:nth-child(2){
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
      color: #1F2226;

      img{
        margin-left: 11px;

      }
    }
  }

}
::v-deep .ant-modal-content {
  border-radius: 36px;
}
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
  margin: 0 auto !important;
  padding-bottom: 24px !important;
  pointer-events: none !important;
}
</style>