<template>
  <div class="cg-page cg">
    <div class="p1">
        <span class="p1-sp1">
            <img class="img1" src="@/assets/images/logo_text1.svg"/>
          <!--手机端动图-->
          <MovieClip v-if="modelM == 3" class="img2" :frames="frames2" :duration="8120" :width="stageWidth"
                     :height="stageWidth" :autoPlay="true" :loop="true"/>
          <!--pc及平板动图-->
          <MovieClip v-else-if="modelM==2" class="img2" style="margin-left: -6%;" :frames="frames" :duration="8120"
                     :width="640" :height="640" :autoPlay="true" :loop="true"/>
          <MovieClip v-else class="img2" :frames="frames" :duration="8120" :width="640" :height="640" :autoPlay="true"
                     :loop="true"/>
        </span>
      <span class="p1-sp2">
        <div class="p1-sp2-1" v-if="modelM==1">
<!--            <span class="t1 btnhover1" @click="openurl">For Integrators</span>-->
<!--            <span class="t1 btnhover1" @click="openurl">Lite Paper</span>-->
          <!--            <span class="t1 btnhover1" @click="openurl">Socials</span>-->
             <Pcdropdow></Pcdropdow>
<!--            <span class="t2  btnhover2" @click="goApp">Web App</span>-->
        </div>
        <div class="p1-sp2-2">
            <div class="p1-sp2-2-t1">Reliable yield with no impermanent loss</div>
            <div class="p1-sp2-2-t2">USD Stablecoin <br>lending protocol</div>
            <div class="p1-sp2-2-t3">
<!--                <span class="btnhover2" @click="goApp">Web App</span>-->
            </div>
        </div>
        <div class="mobile-nav" v-if="showNav&&modelM==2" style="width: 50vw;">
          <div class="con">
            <a-button class="btn" icon="close" @click="showNav=false"></a-button>
<!--            <span class="t1 btnhover1" @click="openurl">For Integrators</span>-->
<!--            <span class="t1 btnhover1" @click="openurl">Lite Paper</span>-->
           <a-collapse :bordered="false">
          <a-collapse-panel :showArrow="false">
            <template slot="header">
            <span class="t1 btnhover1">Socials <a-icon type="down" style="font-size: 0.8em"/></span>
            </template>
            <div class="Socials-menu">
              <div class="s1" @click="telegrm()">
                <img src="@/assets/images/telegrm.svg"/>
                <div>Telegram</div>
              </div>
              <div class="s1" @click="twitter()">
                <img src="@/assets/images/twitter.svg"/>
                <div>Twitter</div>
              </div>
              <div class="s1" @click="discord()">
                <img src="@/assets/images/discord.svg"/>
                <div>Discord</div>
              </div>

            </div>

          </a-collapse-panel>

        </a-collapse>
<!--            <span class="t2 btnhover2" @click="goApp">Web App</span>-->
          </div>

        </div>
      </span>
      <span class="p1-more" v-if="modelM!=1" @click="showNav=true">
        <img v-if="modelM==2" src="@/assets/images/icon_more2.svg"/>
        <img v-else src="@/assets/images/icon_more.svg"/>
      </span>

    </div>
    <div class="p2">
      <div class="p2-sp1">
        Sikka Protocol. The next-generation USD Stablecoin backed by the MATIC token.
      </div>
      <div class="p2-sp2">
            <span class="p2-sp2-item">
<!--                <span class="t1">${{ toThousands2(totalInfo.tvl, 2) }}</span>-->
                <span class="t1">$--</span>
                <span class="t2">TVL</span>
            </span>
        <span class="p2-sp2-item">
<!--                <span class="t1">${{ toThousands2(totalInfo.volume7d, 2) }}</span>-->
                <span class="t1">$--</span>
                <span class="t2">7 Days volume </span>
            </span>
        <span class="p2-sp2-item">
<!--                <span class="t1">{{ toThousands2(totalInfo.userCount), 0 }}</span>-->
<!--                <span class="t1">{{ toThousands2(totalInfo.userCount), 0 }}</span>-->
                <span class="t1">--</span>
                <span class="t2">Active users</span>
            </span>
      </div>
      <img src="@/assets/images/p2_img1.svg"/>
    </div>
    <div class="p3">
      <img src="@/assets/images/p3_img1.svg"/>
      <div class="p3-sp1">
        <div class="t1">Enabling a reference rate <br>for the stablecoin market</div>
        <div class="t2">Sikka provides the most equitable revenue<br> distribution system by rewarding liquidity<br>
          providers.
        </div>
      </div>

<!--      <div class="p3-sp2">{{ (totalInfo.depositAPY * 100).toFixed(2) }}%</div>-->
      <div style="display: flex;justify-content: center">
        <div class="p3-sp2">
          <div class="p3-sp3">up to</div>
          <div class="p3-sp4">{{ (totalInfo.depositAPY * 100).toFixed(2) }}%</div>
        </div>

      </div>


    </div>
    <div class="p4">
      <div class="p4-sp1">Stable Coin SIKKA</div>
      <div class="p4-sp2">SIKKA is the No.1 stable coin on Polygon network.
        1 SIKKA is always pegged to $1 USD
      </div>
      <div class="p4-sp3">
        <img src="@/assets/images/p4-1.png"/>
      </div>
      <div class="p4-sp4">
        <span>1 SIKKA</span>
        <span>=</span>
        <span>{{ totalInfo.USPPrice }} USD</span>
      </div>
      <div class="p4-sp5"><img src="@/assets/images/coins.svg"/></div>
      <div class="p4-sp6">SIKKA is backed by OVER collateralizing  MATIC
        to assure stability and easy of usage.
      </div>
    </div>
    <div class="p41">
      <div class="p41-sp1">Strategic Partners</div>
<!--      <div class="p41-sp2">-->
<!--        <img v-for="i in 7" :src="require('../../assets/images/investor_img'+i+'.svg')"/>-->
<!--      </div>-->
            <div class="p41-sp2">
              <img v-for="i in 2" :src="require('../../assets/images/logo'+i+'.svg')" @click="logosponsor(i)"/>
            </div>
    </div>
    <div class="p5">
      <div class="p5-t1">FAQ</div>
      <div class="p5-t2">
        <a-collapse default-active-key="0" :bordered="false" expand-icon-position="right">
          <template #expandIcon="props">
            <span class="icon-text">{{ (props.isActive) ? "-" : "+" }}</span>
          </template>
          <a-collapse-panel v-for="(item,index) in list" :key="index+''" :header="item.title">
            <p>{{ item.content }}</p>
          </a-collapse-panel>

        </a-collapse>
      </div>
    </div>
    <div class="p6">
      <template v-if="modelM!=3">
        <span class="p6-sp1">
            <span class="t1">
                <img src="@/assets/images/logo-text3.svg"/>
            </span>
            <span class="t2">© 2022 SIKKA.money. All rights reserved | info@sikka.money</span>
        </span>
        <span class="p6-sp2">
<!--            <span class="t3 btnhover1" @click="openurl">For Integrators</span>-->
<!--            <span class="t4 btnhover1" @click="openurl">Lite Paper</span>-->
          <span  class="t3 btnhover1"></span>
          <span class="t4 btnhover1"></span>
            <span class="t5">
                <a href="https://twitter.com/Sikkamoney" target="_blank">
                    <img src="@/assets/images/twitter.svg"/>
                </a>
                 <a href="https://t.me/sikkamoney" target="_blank">
                    <img src="@/assets/images/telegrm.svg"/>
                </a>
                 <a href="https://discord.com/invite/5q8MfzTQ" target="_blank">
                    <img src="@/assets/images/discord.svg"/>
                </a>
            </span>
        </span>
      </template>
      <template v-else>
        <span class="t1">
            <img src="@/assets/images/logo-text3.svg"/>
        </span>
<!--        <span class="t3 btnhover1" @click="openurl">For Integrators</span>-->
<!--        <span class="t4 btnhover1" @click="openurl">Lite Paper</span>-->
        <span class="t5">
            <a href="https://twitter.com/Sikkamoney" target="_blank">
                <img src="@/assets/images/twitter.svg"/>
            </a>
             <a href="https://t.me/sikkamoney" target="_blank">
                <img src="@/assets/images/telegrm.svg"/>
            </a>
             <a href="https://discord.com/invite/5q8MfzTQ" target="_blank">
                <img src="@/assets/images/discord.svg"/>
            </a>
        </span>
        <span class="t2">© 2022 SIKKA.money.<br v-if="modelM==3"> All rights reserved | info@sikka.money</span>
      </template>

    </div>

    <div class="mobile-nav" v-if="showNav&&modelM==3">
      <img src="@/assets/images/logo-text3.svg" class="logonimg"/>
      <div class="con">
        <a-button class="btn" icon="close" @click="showNav=false"></a-button>
<!--        <span class="t1 btnhover1" @click="openurl">For Integrators</span>-->
<!--        <span class="t1 btnhover1" @click="openurl">Lite Paper</span>-->
        <!--        <span class="t1 btnhover1" @click="openurl">Socials</span>-->
        <a-collapse v-model="activeKey" :bordered="false">
          <a-collapse-panel :showArrow="false" key="1">
            <template slot="header">
              <span class="t1 btnhover1">Socials</span>
            </template>
            <div class="Socials-menu">
              <div class="s1" @click="telegrm()">
                <img src="@/assets/images/telegrm.svg"/>
                <div>Telegram</div>
              </div>
              <div class="s1" @click="twitter()">
                <img src="@/assets/images/twitter.svg"/>
                <div>Twitter</div>
              </div>
              <div class="s1" @click="discord()">
                <img src="@/assets/images/discord.svg"/>
                <div>Discord</div>
              </div>
            </div>

          </a-collapse-panel>

        </a-collapse>
<!--        <span class="t2 btnhover2" @click="goApp">Web App</span>-->
      </div>

    </div>

  </div>

</template>

<script>
import {trace, toThousands2} from "./../../utils/tools"

import {mapGetters} from "vuex";
import {getFirstPageInfo} from "../../sdk-utils/landingInfo";
import MovieClip from "./componets/MovieClip.vue";
import Pcdropdow from "./componets/Pcdropdow";

export default {
  components: {Pcdropdow, MovieClip},
  data() {
    const frames = [];
    for (let i = 0; i < 258; i++) {
      frames[
          i
          ] = require(`@/assets/images/606_680/606-680_${i
          .toString().padStart(5, "0")}.jpg`);
    }
    const frames2 = [];
    for (let i = 0; i < 209; i++) {
      frames2[
          i
          ] = require(`@/assets/images/sequenceImg/268633b7db562b16262f3fd696311183/268633b7db562b16262f3fd696311183_${i
          .toString().padStart(5, "0")}.jpg`);
    }

    const stageWidth = window.innerWidth;
    return {
      activeKey: ['1'],
      frames,
      frames2,
      showNav: false,
      stageWidth,
      toThousands2: toThousands2,
      modelM: 1,   //1 2 3
      activeNames: ['1'],
      list: [
        {
          title: "What is the Sikka Protocol?",
          content: "Sikka Protocol provides a secure and reliable protocol solution for stablecoin Sikka. Users can borrow stablecoin Sikka using  liquid staking tokens as collateral. Users can also supply stablecoin pairs to liquidity provided to yield farm and earn rewards.",
        },
        {
          title: "What is stablecoin Sikka?",
          content: "SIKKA is the stablecoin minted by the Sikka Protocol. SIKKA is always pegged to 1 dollar USD and its circulation is backed by over collateralized assets.",
        },
        {
          title: "Where does the Sikka Yield Farming reward come from?",
          content: "Sikka protocol partners w/ liquidity provider to provide a secure and reliable way to earn competitive APY. When users supply SIKKA and other stablecoin pairs to the liquidity pool, they receive rewards from LP transaction fees and Sikka Revenue Pool. ",
        },
        {
          title: "What is Sikka Revenue Pool? ",
          content: "Sikka revenue pool contains 2 types of income - liquid staking asset’s reward APY and Sikka borrow interest. Sikka Revenue Pool is distributed back to the liquidity pool to incentivize users to become a liquidity provider.",
        },
        // {
        //   title: "How does it work?",
        //   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius imperdiet ultrices nam laoreet et aliquam platea pretium amet. Vitae amet, pellentesque faucibus scelerisque nec ipsum magna",
        // },

      ],
      totalInfo: {
        USPPrice: 1,
        depositAPY: 0.1999,
        tvl: 22952.61,
        userCount: 5,
        volume7d: 1891.0010892313,
      }
    };
  },
  computed: {},
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },
  methods: {
    telegrm(){
      window.open("https://t.me/sikkamoney")
    },
    twitter(){
      window.open("https://twitter.com/Sikkamoney")
    },
    discord(){
      window.open("https://discord.gg/E9Pz72UkK5")
    },
    logosponsor(i){
      if(i==1){
        window.open("https://polygon.technology/")

      }else if(i==2){
        window.open("https://www.ankr.com/")
      }
    },
    goApp() {
      // window.open("http://104.250.41.6:3021/")
    },
    openurl() {
      // window.open("https://www.google.com/")
    },
    async checkInfo() {
      let res = await getFirstPageInfo();
      this.totalInfo = res;
      console.log("info=", res)
    },
    toReset() {
      this.stageWidth = window.innerWidth;
      if (this.stageWidth < 620) {
        this.modelM = 3;
      } else if (this.stageWidth <= 1180) {
        this.modelM = 2;
      } else {
        this.modelM = 1;
      }
      console.log("info=", this.modelM)
    }

  },

  beforeCreate() {

  },
  created() {
    this.toReset();
    window.onresize = () => {
      this.toReset();
    }
  }
  ,
  beforeMount() {

  }
  ,

  mounted() {
    this.checkInfo();
  }
  ,

  beforeUpdate() {

  }
  ,
  updated() {

  }
  ,
  beforeDestroy() {

  }
  ,
  destroyed() {

  }
  ,
  activated() {

  }
  ,
}


</script>


<style lang="scss" scoped>
::v-deep.ant-dropdown-menu {
  position: relative;
  margin: 0;
  padding: 18px 16px;
  text-align: left;
  list-style-type: none;
  background-color: #1a1a1a;
  background-clip: padding-box;
  border-radius: 16px;
  outline: none;
  -webkit-box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  -webkit-transform: translate3d(0, 0, 0);
}

.ant-dropdown-menu-item:hover, ant-dropdown-menu-submenu-title:hover {

  background-color: transparent;

}

.ant-dropdown-menu-item > a, .ant-dropdown-menu-submenu-title > a {
  display: block;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
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
          justify-content: right;
          display: flex;
          align-items: center;
          margin-top: 1px;
          margin-right: 106px;
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
        font-weight: 500;
        font-size: 64px;
        line-height: 83px;
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
        align-items: flex-start;
        text-align: center;
        flex-direction: column;
        display: flex;
        justify-content: flex-start;
        margin-bottom: -134px;

        .p3-sp3{
          font-family: 'Agrandir';
          font-style: normal;
          font-weight: 500;
          font-size: 40px;
          color: #000000;

        }
        .p3-sp4{
          font-family: Agrandir;
          font-weight: 400;
          font-size: 320px;
          line-height: 416px;
          color: #000000;

        }
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
        font-weight: 500;
        font-size: 40px;
        line-height: 52px;
        color: #000000;

        text-align: center;
      }

      .p41-sp2 {
        margin: 64px auto 0;
        text-align: center;

        img {
          cursor: pointer;
          max-width: 360px;
          width: 20%;
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

      .p1-more {
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
        font-weight: 500;
        font-size: 32px;
        line-height: 42px;
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
        align-items: flex-start;
        text-align: center;
        flex-direction: column;
        display: flex;
        justify-content: flex-start;
        margin-bottom: -75px;

        .p3-sp3{
          font-family: 'Agrandir';
          font-style: normal;
          font-weight: 500;
          font-size: 27px;
          color: #000000;

        }
        .p3-sp4{

          font-family: Agrandir;
          font-weight: 400;
          font-size: 180px;
          line-height: 234px;
          color: #000000;


        }
      }
      .p3-sp3{
        font-family: 'Agrandir';
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        color: #000000;

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
        font-weight: 500;
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
          cursor: pointer;
          max-width: 360px;
          width: 30%;
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

      .p1-more {
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
        font-weight: 500;
        font-size: 32px;
        line-height: 44px;
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
        margin-left: 15%;
        width: 85%;
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
        align-items: flex-start;
        text-align: center;
        flex-direction: column;
        display: flex;
        justify-content: flex-start;
        margin-bottom: -36px;

        .p3-sp3{
          font-family: 'Agrandir';
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          color: #000000;

        }
        .p3-sp4{

          font-family: Agrandir;
          font-weight: 400;
          font-size: 82px;
          line-height: 107px;
          color: #000000;


        }
      }
      .p3-sp3{
        font-family: 'Agrandir';
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        color: #000000;

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
        font-weight: 500;
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
        cursor: pointer;
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


  .mobile-nav {
    position: absolute;
    background-color: black;
    padding: 24px;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 1;

    .logonimg {
      height: 24px;
      position: absolute;
      top: 20px;
      left: 20px;
    }

    .con {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      font-family: Agrandir;
      font-weight: 400;
      font-size: 15px;
      line-height: 19px;
      text-align: right;
      color: rgba(255, 255, 255, 0.5);

      ::v-deep.ant-collapse-content > .ant-collapse-content-box {
        padding: 0px;
      }
      ::v-deep.ant-collapse-borderless > .ant-collapse-item {
       border-bottom: 1px solid transparent;
      }

      ::v-deep.ant-collapse > .ant-collapse-item {
     border-bottom: 1px solid transparent;
      }
      ::v-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header {
        font-family: Agrandir;
        font-weight: 400;
        font-size: 19px;
        line-height: 30px !important;
        color: #000000 !important;
        padding: 0 !important;
      }
      .Socials-menu{
        display: flex;
        justify-content: right;
        flex-direction: column;
        .s1{
          cursor: pointer;
         display: flex;
          justify-content: flex-start;
          margin: 10px 0px;

          img{
            margin-right: 11px;

          }
        }

      }
      .btn {
        background: transparent;
        border: 0;
        color: white;
        padding: 0 !important;
        width: 14px;
      }

      .t1 {
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

      .t1:first-child {
        //margin-top: 50px;
      }

      .t2 {
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

  .btnhover1 {
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
    transition: .1s;
  }

  .btnhover1:hover {
    border-bottom: 1px solid white;
    color: white !important;
    cursor: pointer;

  }

  @media only screen and (min-width: 1181px) {

    .p1-sp2-1 {
      .t1 {
        display: inline-block;
      }
    }
    .btnhover2 {
      width: 165px;
      display: inline-block;
      text-align: center;
      padding-left: 0 !important;
      padding-right: 0 !important;
      transition: .1s;
    }
    .btnhover2:hover {
      font-size: 19px !important;
      //padding-top: 16px !important;
      //padding-bottom: 17px !important;
      font-weight: bold;
      //transform: translatey(-2px);
    }
  }
  @media only screen and (max-width: 1180px) and (min-width: 620px) {
    p1-sp2-1 {
      .t1 {
        display: inline-block;
      }
    }
    .btnhover2 {
      width: 165px;
      display: inline-block;
      text-align: center;
      padding-left: 0 !important;
      padding-right: 0 !important;
      transition: .1s;
    }
    .btnhover2:hover {
      font-size: 19px !important;
      //padding-top: 16px !important;
      //padding-bottom: 17px !important;
      font-weight: bold;
      //transform: translatey(-2px);
    }
  }
  @media only screen and (max-width: 619px) {
    p1-sp2-1 {
      .t1 {
        display: inline-block;
      }
    }
    .btnhover2 {
      width: 145px;
      display: inline-block;
      text-align: center;
      padding-left: 0 !important;
      padding-right: 0 !important;
      transition: .1s;
    }
    .btnhover2:hover {
      font-size: 16px !important;
      //padding-top: 16px !important;
      //padding-bottom: 17px !important;
      font-weight: bold;
      //transform: translatey(-2px);
    }
  }


}

</style>
