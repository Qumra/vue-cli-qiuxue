<template>
  <div class="bind">
    <div class="nav">
      <div class="nav-item" @click="isActive=!isActive" :class="{ active: isActive }">
        <router-link class="tab" to="/bind/phone">手机绑定</router-link>
      </div>
      <i></i>
      <div class="nav-item" @click="isActive=!isActive" :class="{ active: !isActive }">
        <router-link class="tab" to="/bind/email">邮箱绑定</router-link>
      </div>
    </div>
    <router-view></router-view>

    <!-- <mt-navbar v-model="selected">
      <mt-tab-item class="tab" id="1"><router-link to="/bind/phone">手机绑定</router-link></mt-tab-item>
      <i></i>
      <mt-tab-item class="tab" id="2"><router-link to="/bind/email">邮箱绑定</router-link></mt-tab-item>
    </mt-navbar>
    
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
          <router-view name="phone"></router-view>
         
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
          <router-view name="email"></router-view>
      </mt-tab-container-item>
    </mt-tab-container>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
    //   selected: "1"
    isActive:true
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.bind {
  margin-top: $header_h;
  background-color: #fbf3d0;
  height: $height - $header_h;
  .nav {
    background-color: #ffe57e;
    display: flex;
    .nav-item {
        width: 50%;
        text-align: center;
        line-height: .8rem;
    }
     i {
        border-left: 2px solid #5f2500;
        margin: 5px;
      }
  }
  .tab {
    font-size: 0.36rem;
    color: #5f2500;
    font-weight: 700;
  }
  .active {
      border-bottom: 2px solid #e3a51c;
  }

  //   覆盖mintui的navbar的样式
  //   .mint-navbar {
  //     background-color: #ffe57e;
  //     i {
  //       border-left: 2px solid #5f2500;
  //       margin: 5px;
  //     }
  //     .mint-tab-item {
  //       &.is-selected {
  //         border-bottom: 3px solid #e3a51c;
  //       }
  //       .mint-tab-item-label {
  //         font-size: 0.36rem;
  //       }
  //     }
  //   }
  //   .tab {
  //     font-size: 0.36rem;
  //     color: #5f2500;
  //     font-weight: 700;
  //   }
  //   .mint-tab-container {
  //       .mint-tab-container-wrap {

  //       }
  //   }
}
</style>
