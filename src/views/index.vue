<template>
    <div class="index">
      <router-link to="/Literature">
        <div class="liter"></div>
      </router-link>
      <router-link to="/video">
        <div class="video"></div>
      </router-link>
      <div class="btn">
        
          <div class="btn1"><router-link class="link" to="/sign">签到</router-link></div>
        
        
          <div class="btn2"><router-link class="link" to="/card">学生证</router-link></div>
        
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.index {
  margin-top: $header_h;
  background: url("../assets/images/bg.png") no-repeat center top;
  height: $height - $header_h;
  width: 19rem;
  position: relative;
  background-size: 100% 100%;
  .liter {
    width: 27%;
    height: 40%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 5%;
    left: 10%;
  }
  .video {
    width: 32%;
    height: 50%;
    background-color: rgba(0, 0, 222, 0.5);
    border-radius: 0 0 80% 0;
    position: absolute;
    top: 0;
    left: 28%;
  }
  .btn {
    position: fixed;
    top: 10vh;
    right: 5vw;
    font-size: 0.36rem;
    .btn1 {
      width: 25vw;
      height: 10vh;
      line-height: 13vh;
      background: url("../assets/images/btn1.png") no-repeat;
      text-align: center;
      margin-bottom: 0.4rem;
      background-size: 100% 100%;
    }
    .btn2 {
      width: 25vw;
      line-height: 7vh;
      background: url("../assets/images/btn2.png") no-repeat;
      text-align: center;
      background-size: 100% 100%;
    }
    .link {
      color: #fff;
      font-size: 0.36rem;
      font-weight: 700;
    }
  }
}
</style>

