<template>
  <a-dropdown :trigger="['click']" :placement="bottomCenter">
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      <span class="t1 btnhover1">Socials <a-icon type="down" style="font-size: 0.8em" /></span>
    </a>
    <a-menu slot="overlay">
      <a-menu-item key="0">

        <a href="https://t.me/sikkamoney"><img src="@/assets/images/telegrm.svg"/>  Telegram</a>
      </a-menu-item>
      <a-menu-item key="1">
        <a href="https://twitter.com/Sikkamoney"><img src="@/assets/images/twitter.svg"/>  Twitter</a>
      </a-menu-item>
      <a-menu-item key="3">
        <a href="https://discord.gg/E9Pz72UkK5"><img src="@/assets/images/discord.svg"/>  Discord</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: "Pcdropdow",
  data(){
    return{
      bottomCenter:"bottomRight"

    }

  }
}
</script>

<style scoped lang="scss">
::v-deep.ant-dropdown-menu  {
  position: relative;
  margin: 0;
  padding: 18px 16px;
  text-align: left;
  list-style-type: none;
  background-color: #9256d8;
  background-clip: padding-box;
  border-radius: 16px;
  outline: none;
  -webkit-box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  -webkit-transform: translate3d(0, 0, 0);
}

.ant-dropdown-menu-item:hover,ant-dropdown-menu-submenu-title:hover{

  background-color:transparent;

}
.ant-dropdown-menu-item > a, .ant-dropdown-menu-submenu-title > a {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: block;
  margin: -5px -12px;
  padding: 5px 12px;
  color: #ffffff80;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.cg-page {
  background: #eeeff1;
  position: relative;





  @media only screen and (min-width: 1181px) {
    .p1 {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: stretch;

      .p1-sp1 {
        width: 43%;
        text-align: right;

        .img1 {
          position: absolute;
          top: 50px;
          left: 106px;

          .img2 {
            width: 80%;
            max-width: 660px;
          }
        }
      }

      .p1-sp2 {
        position: relative;
        background-color: #8643D4;
        width: 57%;
        padding: 4.5% 0 10% 8.8%;

        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;

        .p1-sp2-1 {
          display: flex;
          align-items: center;
          margin-top: 1px;
        }


        .t1 {
          font-family: Agrandir;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: rgba(255, 255, 255, 0.5);

          margin-right: 48px;

          cursor: pointer;
        }

        .t2 {
          font-family: Agrandir;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #FFFFFF;
          cursor: pointer;
          padding: 16px 40px;
          background: #000000;
          border-radius: 50px;
        }
      }

      .p1-sp2-2-t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 24px;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p1-sp2-2-t2 {
        width: 520px;
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 52px;
        color: #FFFFFF;
        margin: 10px 0 40px;
      }

      .p1-sp2-2-t3 span {
        background: #FFFFFF;
        border-radius: 50px;
        cursor: pointer;

        padding: 16px 40px;
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #000000;

      }
    }

    .p2 {
      position: relative;
      background-color: #000000;
      padding: 160px 106px 120px;
      width: 100%;
      overflow: hidden;

      img {
        position: absolute;
        right: -49px;
        bottom: -34px;
        display: block;
      }

      .p1-sp1 {
        width: 926px;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 52px;
        line-height: 68px;
        color: #FFFFFF;
      }


      .p2-sp1 {
        width: 926px;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 52px;
        line-height: 68px;
        color: #FFFFFF;


      }

      .p2-sp2 {
        margin-top: 48px;
      }

      .p2-sp2-item {
        margin-right: 154px;
        display: inline-flex;
        flex-direction: column;

        .t1 {
          font-family: Agrandir;
          font-weight: 400;
          font-size: 24px;
          line-height: 48px;
          color: rgba(255, 255, 255, 0.7);
        }

        .t2 {
          font-family: Inter;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 28px;
          color: rgba(255, 255, 255, 0.5);
        }

      }
    }

    .p3 {
      position: relative;
      padding-top: 160px;
      overflow: hidden;

      img {
        position: absolute;
        top: -166px;
        left: -5px;
      }

      .p3-sp1 {
        position: relative;
        margin-left: 50%;

        .t2 {
          margin-top: 40px;
          width: 600px;

          font-family: Agrandir;
          font-weight: 400;
          font-size: 24px;
          line-height: 48px;
          color: rgba(0, 0, 0, 0.5);
        }

        .t1 {
          font-family: Agrandir;
          font-weight: 400;
          font-size: 40px;
          line-height: 52px;
          color: #000000;
        }
      }

      .p3-sp2 {
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 320px;
        line-height: 416px;
        color: #000000;

        margin-bottom: -134px;
      }
    }

    .p4 {
      position: relative;
      padding: 160px 0;
      text-align: center;
      background: #000000;

      .p4-sp1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 52px;
        line-height: 68px;
        color: #FFFFFF;

        text-align: center;
      }

      .p4-sp2 {
        width: 635px;
        margin: 32px auto 0;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 24px;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p4-sp3 {
        margin-top: 72px;
        text-align: center;
      }

      .p4-sp4 {
        margin-top: 38px;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 24px;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p4-sp4 span {
        margin: 0 36px;
      }

      .p4-sp5 {
        margin-top: 74px;
        text-align: center;
      }

      .p4-sp6 {
        width: 734px;
        margin: 24px auto 0;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 24px;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .p41 {
      position: relative;
      padding: 160px 0;
      background: #EEF3F5;


      .p41-sp1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 40px;
        line-height: 52px;
        color: #000000;

        text-align: center;
      }

      .p41-sp2 {
        margin: 64px auto 0;
        text-align: center;

        img {
          max-width: 154px;
          width: 11%;
          margin: 0 12px;
        }
      }
    }

    .p5 {
      position: relative;
      width: 56%;
      margin: 0 auto;
      max-width: 812px;
      padding: 160px 0;


      .p5-t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 52px;
        line-height: 68px;
        color: #000000;
      }

      .p5-t2 {
        margin-top: 60px;
      }
    }

    .p6 {
      position: relative;
      background: #000000;
      padding: 90px 106px 77px;
      display: flex;
      justify-content: space-between;


      .p6-sp1, .p6-sp2 {
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
      }

      .p6-sp1 .t1 img {
        height: 32px;
      }

      .p6-sp1 .t2 {
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        line-height: 28px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p6-sp2 .t3 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: rgba(255, 255, 255, 0.5);

        margin-bottom: 40px;
      }

      .p6-sp2 .t4 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: rgba(255, 255, 255, 0.5);

        margin-bottom: 48px;
      }

      .p6-sp2 .t5 a:not(:last-child) {
        margin-right: 40px;
      }

      .p6-sp2 .t5 a img {
        width: 24px;
      }
    }

    ::v-deep .ant-collapse-arrow {
      font-family: Agrandir;
      font-weight: 400;
      width: 14px;
      text-align: center;
      font-size: 24px !important;
      line-height: 48px !important;
      color: #000000 !important;
    }

    ::v-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header {
      font-family: Agrandir;
      font-weight: 400;
      font-size: 24px;
      line-height: 48px !important;
      color: #000000 !important;
      padding: 32px 0 !important;
    }

    ::v-deep .ant-collapse-content {
      font-family: Inter;
      font-weight: 400;
      font-size: 18px;
      line-height: 32px;
      color: #60666C;
    }
  }

  @media only screen and (max-width: 1180px) and (min-width: 620px) {



    .p1 {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: stretch;

      .p1-more{
        position: absolute;
        top: 32px;
        right: 32px;
        cursor: pointer;
      }

      .p1-sp1 {
        width: 43%;
        text-align: right;

        .img1 {
          position: absolute;
          top: 32px;
          left: 32px;
          width: 97px;
        }

        .img2 {
          width: 150%;
          max-width: 660px;
        }
      }

      .p1-sp2 {
        position: relative;
        background-color: #8643D4;
        width: 57%;
        padding: 37px 34px 63px 49px;

        display: inline-flex;
        flex-direction: column;
        justify-content: flex-end;

      }

      .p1-sp2-1 {
        margin-top: 1px;
        text-align: right;
      }

      .p1-sp2 .t1 {
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);

        margin-right: 48px;

        cursor: pointer;

        display: none;
      }

      .p1-sp2 .t2 {
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #FFFFFF;
        cursor: pointer;
        padding: 16px 40px;
        background: #000000;
        border-radius: 50px;
      }

      .p1-sp2-2-t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p1-sp2-2-t2 {
        width: 317px;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 27px;
        line-height: 35px;
        color: #FFFFFF;

        margin: 8px 0 16px;
      }

      .p1-sp2-2-t3 {
        display: inline-flex;
      }

      .p1-sp2-2-t3 span {
        background: #FFFFFF;
        border-radius: 50px;
        cursor: pointer;

        padding: 14px 38px;
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        color: #000000;
      }
    }


    .p2 {
      position: relative;
      background-color: #000000;
      padding: 80px 32px;
      width: 100%;
      overflow: hidden;



      .p1-sp1 {
        width: 100%;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 40px;
        line-height: 52px;
        color: #FFFFFF;
      }

      img {
        position: absolute;
        width: 275px;
        right: -23px;
        bottom: -7px;
        display: block;
      }

      .p2-sp1 {
        width: 100%;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 40px;
        line-height: 52px;
        color: #FFFFFF;
      }

      .p2-sp2 {
        margin-top: 32px;
      }

      .p2-sp2-item {
        margin-right: 56px;
        display: inline-flex;
        flex-direction: column;

      }

      .p2-sp2-item .t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 24px;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.7);
      }

      .p2-sp2-item .t2 {
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 28px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .p3 {
      position: relative;
      padding-top: 80px;
      overflow: hidden;

      img {
        position: absolute;
        top: -120px;
        left: -40px;
        height: 311px;
      }

      .p3-sp1 {
        position: relative;
        margin-left: calc(100% - 468px);

      }

      .p3-sp1 .t2 {
        margin-top: 24px;
        width: 425px;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.5);
      }

      .p3-sp1 .t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 27px;
        line-height: 35px;
        color: #000000;
      }

      .p3-sp2 {
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 180px;
        line-height: 234px;
        color: #000000;
        margin-bottom: -75px;
      }
    }
    .p4 {
      position: relative;
      padding: 80px 0;
      text-align: center;
      background: #000000;

      .p4-sp1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 40px;
        line-height: 52px;
        color: #FFFFFF;

        text-align: center;
      }

      .p4-sp2 {
        margin: 24px auto 0;
        text-align: center;
        width: 498px;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p4-sp3 {
        margin-top: 72px;
        text-align: center;
      }

      .p4-sp3 img {
        width: 443px;
      }

      .p4-sp4 {
        margin-top: 16px;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        fofont-size: 19px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p4-sp4 span {
        margin: 0 30px;
      }

      .p4-sp5 img {
        width: 84px;
      }

      .p4-sp5 {
        margin-top: 66px;
        text-align: center;
      }

      .p4-sp6 {
        margin: 24px auto 0;
        text-align: center;

        width: 580px;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .p41 {
      position: relative;
      padding: 80px 32px;
      background: #EEF3F5;

      .p41-sp1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 27px;
        line-height: 35px;
        color: #000000;
        text-align: center;
      }

      .p41-sp2 {
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        img {
          max-width: 154px;
          width: 20%;
          margin: 24px 8px 0;
        }
      }

    }

    .p5 {
      position: relative;
      width: 56%;
      margin: 0 auto;
      max-width: 812px;
      padding: 80px 0;

      .p5-t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 40px;
        line-height: 52px;
        color: #000000;
      }

      .p5-t2 {
        margin-top: 40px;
      }
    }
    .p6 {
      position: relative;
      background: #000000;
      padding: 72px 56px 32px 32px;
      display: flex;
      justify-content: space-between;

      .p6-sp1, .p6-sp2 {
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
      }

      .p6-sp1 .t1 img {
        height: 28px;
      }

      .p6-sp1 .t2 {
        font-family: Inter;
        font-weight: 400;
        font-size: 12px;
        line-height: 28px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p6-sp2 .t3 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        color: rgba(255, 255, 255, 0.5);

        margin-bottom: 40px;
      }

      .p6-sp2 .t4 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        color: rgba(255, 255, 255, 0.5);

        margin-bottom: 48px;
      }

      .p6-sp2 .t5 a:not(:last-child) {
        margin-right: 40px;
      }

      .p6-sp2 .t5 a img {
        width: 24px;
      }
    }
    ::v-deep .ant-collapse-arrow {
      font-family: Agrandir;
      font-weight: 400;
      width: 14px;
      text-align: center;
      font-size: 24px !important;
      line-height: 30px !important;
      color: #000000 !important;
    }

    ::v-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header {
      font-family: Agrandir;
      font-weight: 400;
      font-size: 19px;
      line-height: 30px !important;
      color: #000000 !important;
      padding: 16px 0 !important;
    }
    ::v-deep .ant-collapse-content {
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #60666C;
    }
  }

  @media only screen and (max-width: 619px) {

    .p1 {
      position: relative;
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: stretch;

      .p1-more{
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }

      .p1-sp1 {
        width: 100%;
        text-align: right;

        .img1 {
          position: absolute;
          top: 32px;
          left: 32px;
          width: 97px;
        }

        .img2 {
          width: 100%;
          height: 100vw;
          margin-bottom: -32vw;
          margin-left: -10px;
        }
      }

      .p1-sp2 {
        position: relative;
        background-color: #8643D4;
        width: 100%;
        padding: 40px 20px;

        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;

      }

      .p1-sp2-1 {
        margin-top: 1px;
        text-align: right;
      }

      .p1-sp2 .t1 {
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
        margin-right: 48px;
        cursor: pointer;
        display: none;
      }

      .p1-sp2 .t2 {
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #FFFFFF;
        cursor: pointer;
        padding: 16px 40px;
        background: #000000;
        border-radius: 50px;
      }

      .p1-sp2-2-t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 17px;
        line-height: 26px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p1-sp2-2-t2 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
        color: #FFFFFF;

        margin: 8px 0 16px;
      }

      .p1-sp2-2-t3 {
        display: inline-flex;
      }

      .p1-sp2-2-t3 span {
        background: #FFFFFF;
        border-radius: 50px;
        cursor: pointer;

        padding: 14px 38px;
        font-family: Agrandir;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        color: #000000;
      }
    }


    .p2 {
      position: relative;
      background-color: #000000;
      padding: 64px 20px 32px;
      width: 100%;
      overflow: hidden;

      .p1-sp1 {
        width: 100%;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
        color: #FFFFFF;
      }

      img {
        position: absolute;
        width: 215px;
        right: -15px;
        bottom: 5px;
        display: block;
      }

      .p2-sp1 {
        width: 100%;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
        color: #FFFFFF;
      }

      .p2-sp2 {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
      }

      .p2-sp2-item {
        display: inline-flex;
        flex-direction: column;

      }

      .p2-sp2-item:not(:first-child) {
        margin-top: 16px;
      }

      .p2-sp2-item .t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 17px;
        line-height: 26px;
        color: rgba(255, 255, 255, 0.7);
      }

      .p2-sp2-item .t2 {
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 28px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .p3 {
      position: relative;
      padding-top: 64px;
      overflow: hidden;

      img {
        position: absolute;
        top: -66px;
        left: -66px;
        height: 181px;
      }

      .p3-sp1 {
        position: relative;
        margin-left: 30%;
        width: 70%;
        padding-right: 20px;
      }

      .p3-sp1 .t2 {
        margin-top: 20px;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.5);
      }

      .p3-sp1 .t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 27px;
        line-height: 35px;
        color: #000000;
      }

      .p3-sp2 {
        margin-top: 20px;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 82px;
        line-height: 107px;
        color: #000000;
        margin-bottom: -36px;
      }
    }
    .p4 {
      position: relative;
      padding: 64px 20px 40px;
      text-align: center;
      background: #000000;

      .p4-sp1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
        color: #FFFFFF;
        text-align: center;
      }

      .p4-sp2 {
        margin: 16px auto 0;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p4-sp3 {
        margin-top: 64px;
        text-align: center;

        img {
          width: calc(100% - 80px);
        }
      }

      .p4-sp4 {
        margin-top: 26px;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 17px;
        line-height: 26px;
        color: rgba(255, 255, 255, 0.5);
      }

      .p4-sp4 span {
        margin: 0 20px;
      }

      .p4-sp5 img {
        width: 84px;
      }

      .p4-sp5 {
        margin-top: 46px;
        text-align: center;

        img {
          width: 70px;
        }
      }

      .p4-sp6 {
        margin: 16px auto 0;
        text-align: center;

        font-family: Agrandir;
        font-weight: 400;
        font-size: 17px;
        line-height: 26px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .p41 {
      position: relative;
      padding: 64px 20px;
      background: #EEF3F5;

      .p41-sp1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
        color: #000000;
        text-align: center;
      }

      .p41-sp2 {
        margin: 8px auto 0;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .p41-sp2 img {
        width: calc(50vw - 26px);
        margin-top: 12px;
      }
    }

    .p5 {
      position: relative;
      margin: 0 auto;
      max-width: 812px;
      padding: 64px 20px;

      .p5-t1 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
        color: #000000;
      }

      .p5-t2 {
        margin-top: 20px;
      }
    }
    .p6 {
      position: relative;
      background: #000000;
      padding: 40px 20px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      .t1 img {
        height: 24px;
      }

      .t2 {
        font-family: Inter;
        font-weight: 400;
        font-size: 12px;
        line-height: 28px;
        color: rgba(255, 255, 255, 0.5);

        margin-top: 32px;
      }

      .t3 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: rgba(255, 255, 255, 0.5);

        margin-top: 32px;
      }

      .t4 {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: rgba(255, 255, 255, 0.5);

        margin-top: 20px;
      }

      .t5 {
        margin-top: 40px;
      }

      .t5 a:not(:last-child) {
        margin-right: 40px;
      }

      .t5 a img {
        width: 24px;
      }
    }
    ::v-deep .ant-collapse-arrow {
      font-family: Agrandir;
      font-weight: 400;
      width: 14px;
      text-align: center;
      font-size: 24px !important;
      line-height: 30px !important;
      color: #000000 !important;
    }

    ::v-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header {
      font-family: Agrandir;
      font-weight: 400;
      font-size: 19px;
      line-height: 30px !important;
      color: #000000 !important;
      padding: 16px 0 !important;
    }
    ::v-deep .ant-collapse-content {
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      color: #60666C;
    }
  }



  .mobile-nav{
    position: absolute;
    background-color: black;
    padding: 24px;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 1;

    img{
      height: 24px;
      position: absolute;
      top: 20px;
      left: 20px;
    }

    .con{
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      font-family: Agrandir;
      font-weight: 400;
      font-size: 15px;
      line-height: 19px;
      text-align: right;
      color: rgba(255, 255, 255, 0.5);
      .btn{
        background: transparent;
        border: 0;
        color: white;
        padding: 0 !important;
        width: 14px;
      }
      .t1{
        font-family: Agrandir;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        color: rgba(255, 255, 255, 0.5);
        margin-right: 0;

        cursor: pointer;
        margin-top: 28px;
        display: inline-block;
      }
      .t1:first-child{
        margin-top: 50px;
      }
      .t2{
        cursor: pointer;
        font-family: Agrandir;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        color: #000000;
        padding: 14px 38px;
        background: #FFFFFF;
        border-radius: 50px;

        margin-top: 40px;
      }
    }



  }

  .btnhover1{
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
    transition: .1s;
  }
  .btnhover1:hover{
    border-bottom: 1px solid white;
    color: white !important;
    cursor: pointer;

  }

  @media only screen and (min-width: 1181px){

    .p1-sp2-1{
      .t1{
        display: inline-block;
      }
    }
    .btnhover2{
      width: 165px;
      display: inline-block;
      text-align: center;
      padding-left: 0 !important;
      padding-right: 0 !important;
      transition: .1s;
    }
    .btnhover2:hover{
      font-size: 19px !important;
      //padding-top: 16px !important;
      //padding-bottom: 17px !important;
      font-weight: bold;
      //transform: translatey(-2px);
    }
  }
  @media only screen and (max-width: 1180px) and (min-width: 620px){
    p1-sp2-1{
      .t1{
        display: inline-block;
      }
    }
    .btnhover2{
      width: 165px;
      display: inline-block;
      text-align: center;
      padding-left: 0 !important;
      padding-right: 0 !important;
      transition: .1s;
    }
    .btnhover2:hover{
      font-size: 19px !important;
      //padding-top: 16px !important;
      //padding-bottom: 17px !important;
      font-weight: bold;
      //transform: translatey(-2px);
    }
  }
  @media only screen and (max-width: 619px){
    p1-sp2-1{
      .t1{
        display: inline-block;
      }
    }
    .btnhover2{
      width: 145px;
      display: inline-block;
      text-align: center;
      padding-left: 0 !important;
      padding-right: 0 !important;
      transition: .1s;
    }
    .btnhover2:hover{
      font-size: 16px !important;
      //padding-top: 16px !important;
      //padding-bottom: 17px !important;
      font-weight: bold;
      //transform: translatey(-2px);
    }
  }


}
</style>