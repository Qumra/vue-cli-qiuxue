<template>
  <div id="app">
    <mt-header class="header" fixed title="求学大作战" id="fixHead">
      <!-- <router-link to="/" > -->
        <mt-button slot="left" icon="back" @click="$router.back(-1)" v-show="flag">Back</mt-button>
      <!-- </router-link> -->
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      flag:false
    };
  },
  created(){
    this.flag=this.$route.path=='/'?false:true;
  },
  watch:{
    '$route.path':function(newValue){
      if(newValue=='/'){
        this.flag=false;
      }else {
        this.flag=true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/style/public";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  height: $height;
  width: $width;
  overflow: auto;
  .header {
    background-color: #1b1a1f;
    height: $header_h;
    font-size: 0.3rem;
  }
 
}
</style>