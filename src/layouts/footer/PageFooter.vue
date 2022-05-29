<template>
  <div class="footer">
<!--    <span class="footer-p1">-->
<!--      <span>-->
<!--         <img class="img1" src="@/assets/images/logo1.svg"/>-->
<!--      </span>-->
<!--      <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'"-->
<!--         v-for="(item, index) in texts">-->
<!--               {{ item.text }}-->
<!--        <img class="img2" v-if="item.hasIcon" src="@/assets/images/arrowRU.svg"/>-->
<!--      </a>-->

<!--    </span>-->
<!--    <span class="footer-p2">-->
<!--      <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'" v-for="(item, index) in icons">-->
<!--               <img class="img3" :src="require('../../assets/images/'+item.text+'.svg')"/>-->
<!--      </a>-->
<!--    </span>-->
    <!--    <div class="links">-->
    <!--      <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'" v-for="(item, index) in linkList">-->
    <!--        <a-icon v-if="item.icon" :type="item.icon"/>{{item.name}}-->
    <!--      </a>-->
    <!--    </div>-->
    <!--    <div class="copyright">-->
    <!--      Copyright<a-icon type="copyright" />{{copyright}}-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: ['copyright', 'linkList'],
  data() {
    return {
      texts: [
        {text: "STORY", link: "https://www.Sikka.fun/story.html", hasIcon: false},
        {text: "NFT", link: "https://www.dehorizon.fun/nft.html", hasIcon: false},
        {text: "Team", link: "https://www.dehorizon.fun/about_team.html", hasIcon: false},
        {text: "Privacy Policy", link: "https://www.dehorizon.fun/privacy.html", hasIcon: false},
        {text: "Terms of Use", link: "https://www.dehorizon.fun/policy.html", hasIcon: false},
        {text: "LITEPAPER", link: "https://www.dehorizon.fun/", hasIcon: true},
      ],
      icons: [
        {text: "Twitter", link: "https://twitter.com/DeHorizonfun"},
        {text: "Discord", link: "https://discord.com/invite/dehorizon"},
        {text: "Telegram", link: "https://t.me/DeHorizonfun"},
        {text: "Medium", link: "https://medium.com/@DeHorizon"},
        {text: "Linkedin", link: "https://www.linkedin.com/company/dehorizonfun"},
      ],
    }
  }
}
</script>

<style lang="less" scoped>

.footer {
  position: relative;
  padding: 77px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .footer-p1{
    position: relative;
    display: inline-flex;
    align-items: center;
    .img1{
      width: 67px;
      margin: 0 68px;
    }
    .img2{
      width: 10px;
      margin-left: 15px;
    }


    a{
      margin-right: 1.6vw;

      font-family: 'Poppins';
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0.16px;
      color: #FFFFFF;
    }
  }

  .footer-p2{
    .img3{
      width: 24px;
    }
    a{
      margin-left: 3.4vw;;
    }
  }


  .copyright {
    color: white;
    //color: @text-color-second;
    font-size: 14px;

    i {
      margin: 0 4px;
    }
  }

  .links {
    margin-bottom: 8px;

    a:not(:last-child) {
      margin-right: 40px;
    }

    a {
      color: @text-color-second;
      -webkit-transition: all .3s;
      transition: all .3s;
    }
  }
}
</style>
