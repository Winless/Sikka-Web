<template>
<div class="bottom">
   <div class="bottom-flex">
     <div>© 2022 SIKKA.finance. All rights reserved | info@sikka.money</div>
      <div class="bottom-right">
        <img src="../assets/image/bottom/twitter.svg">
        <img src="../assets/image/bottom/telegrm.svg">
        <img src="../assets/image/bottom/Group3002.svg">
      </div>
   </div>

</div>
</template>

<script>
export default {
  name: "Sikkabottom"
}
</script>

<style scoped lang="scss">
.bottom{
  margin-top: 183px;
  width: 100%;
  .bottom-flex{
    height: 24px;
    display: flex;
    justify-content: space-between;

    div:nth-child(1){
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #707D99;

    }

    .bottom-right{
      display: flex;
      justify-content: flex-start;

      img{
        cursor: pointer;
        margin-left: 23px;

      }
    }

  }

}

</style>