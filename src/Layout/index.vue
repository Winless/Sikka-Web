<template>
  <div>
    <header>
      <navigation />
    </header>
    <main>
      <Network v-if="this.networkF"></Network>
      <router-view />

    </main>
  </div>
</template>

<script>
import navigation from "../components/navigation/index.vue"
import Network from "../components/Network";
import { mapGetters } from "vuex";
export default {
  name: "index",
  computed: {
    ...mapGetters(["isLogin", "networkF","iswidth"]),
  },
  data() {
    return {

            windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
            windowHeight: document.documentElement.clientHeight,   //实时屏幕高度

    }
  },
  watch: {
      //   windowHeight (val) {
      //   let that = this;
      //   console.log("实时屏幕高度：",val, that.windowHeight );
      // },
      // windowWidth (val) {
      //   let that = this;
      //   if(val<=1000){
      //   this.$store.dispatch("user/setwidth",1);
      //   console.log("a",that.iswidth);
      //   }else if(val>1280){
      //   this.$store.dispatch("user/setwidth",2);
      //   console.log("b",that.iswidth);
      //   }
      //   console.log("实时屏幕宽度：",val, that.windowHeight );
      // }

  },
  methods:{
     ISwith(){

        window.onresize = () => {
            this.isonreisze()
          };

     },
     isonreisze(){
                window.fullHeight = document.documentElement.clientHeight;
                window.fullWidth = document.documentElement.clientWidth;
                this.windowHeight = window.fullHeight;  // 高
                this.windowWidth = window.fullWidth; // 宽
                    if(this.windowWidth <1280){
                    this.$store.dispatch("user/setwidth",1);
                    console.log("a",this.iswidth);
                    }else if(this.windowWidth >=1280){
                    this.$store.dispatch("user/setwidth",2);
                    console.log("b",this.iswidth);
                    }

     }

  },
   mounted() {
     this.isonreisze()
     this.ISwith()
    },

  created() {
  },
  components: {
    Network,
    navigation,
  }
}
</script>

<style scoped>
</style>
