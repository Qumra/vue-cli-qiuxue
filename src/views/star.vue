<template>
  <div class="star">
    <!-- <div class="nav">
      <div class="nav-item" @click="isActive=!isActive" :class="{ active: isActive }">
        <router-link class="tab" to="/star/myLiterature">文学部</router-link>
      </div>
      <i></i>
      <div class="nav-item" @click="isActive=!isActive" :class="{ active: !isActive }">
        <router-link class="tab" to="/star/myVideo">影像部</router-link>
      </div>
    </div>-->
    <!-- <router-view></router-view> -->
    <mt-navbar v-model="selected">
      <mt-tab-item class="tab" id="1">
        <span>文学部</span>
      </mt-tab-item>
      <i></i>
      <mt-tab-item class="tab" id="2">
        <span>影视部</span>
      </mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="tip ac" v-show="!total_a">暂时还没有收藏文章哦</div>
        <mt-loadmore
          :top-method="loadTop1"
          @top-status-change="handleTopChange"
          :bottom-method="loadBottom1"
          :bottom-all-loaded="allLoaded1"
          @bottom-status-change="handleBottomChange"
          :auto-fill="false"
          ref="loadmore1"
        >
          <div slot="top" class="mint-loadmore-top fs-34">
            <span v-show="topStatus === 'pull'">下拉刷新最新数据</span>
            <span v-show="topStatus === 'loading'">--加载中请稍后--</span>
            <span v-show="topStatus === 'drop'">松开手指即可更新</span>
          </div>
          <myLiterature ref="myLiterature" :data='info_a'></myLiterature>
          
          <div slot="bottom" class="mint-loadmore-bottom fs-34">
             <span class="fs-34" v-show="allLoaded1">已无更多内容</span>
            <span
              v-show="bottomStatus  === 'pull'"
              :class="{ 'rotate': bottomStatus  === 'drop' }"
            >继续往上拉</span>
            <span v-show="bottomStatus === 'loading'">刷新中，请稍等</span>
            <span v-show="bottomStatus === 'drop'">松手刷新</span>
          </div>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="tip ac" v-show="!total_v">暂时还没有收藏视频哦</div>
        <mt-loadmore
          :top-method="loadTop2"
          @top-status-change="handleTopChange"
          :bottom-method="loadBottom2"
          :bottom-all-loaded="allLoaded2"
          @bottom-status-change="handleBottomChange"
          :auto-fill="false"
          ref="loadmore2"
        >
          <div slot="top" class="mint-loadmore-top fs-34">
            <span v-show="topStatus === 'pull'">下拉刷新最新数据</span>
            <span v-show="topStatus === 'loading'">--加载中请稍后--</span>
            <span v-show="topStatus === 'drop'">松开手指即可更新</span>
          </div>
          <myVideo ref="myVideo" :data='info_v'></myVideo>
          <div slot="bottom" class="mint-loadmore-bottom fs-34">
            <span class=" fs-34" v-if="allLoaded2">已无更多内容</span>
            <span
              v-show="bottomStatus  === 'pull'"
              :class="{ 'rotate': bottomStatus  === 'drop' }"
            >继续往上拉</span>
            <span v-show="bottomStatus === 'loading'">刷新中，请稍等</span>
            <span v-show="bottomStatus === 'drop'">松手刷新</span>
          </div>
        </mt-loadmore>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import myVideo from "../components/myVideo";
import myLiterature from "../components/myLiterature";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      // isActive: true,
      // finish:false,
      selected: "1",
      bottomStatus: "",
      topStatus: "",
      allLoaded1: false,
      allLoaded2: false,
      info_a:[],
      info_v:[],
      total_a:1,
      total_v:1,
      params_a: {},
      params_v: {},
      pageNow_a: 1,
      pageSize_a: 10,
      pageNow_v: 1,
      pageSize_v: 10
    };
  },
  created() {
    this.getLiterList(1);
  },
  watch: {
    selected: function(newValue) {
      if (newValue == "2") {
        this.getVideoList(1);
      }
    }
  },
  methods: {
    getLiterList(id) {
      this.params_a = { pageNow: this.pageNow_a, pageSize: this.pageSize_a };
       var that =this;
       this.axios
        .get('/api/u/user/article/'+id, { params: this.params_a })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            that.info_a.push(...response.data.data);
            that.total_a = response.data.total;
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVideoList(id) {
      this.params_v = { pageNow: this.pageNow_v, pageSize: this.pageSize_v };
      var that =this;
       this.axios
        .get(`/api/u/user/video/`+id, { params: this.params_v })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            that.info_v.push(...response.data.data);
            that.total_v = response.data.total;
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadBottom1() {
      // 加载更多
        var that = this;
      that.pageNow_a += 1;
      var pages=Math.ceil(that.total_a/10)
      // 加载更多数据的操作
      setTimeout(function() {
        if (that.pageNow_a <=pages) {
         that.getLiterList(1);
        } else {
          that.allLoaded1 = true; // 若数据已全部获取完毕
           Toast({
              message: '已加载完所有数据',
              duration: 2000,
              position:'bottom'
            });
        }
        console.log(that.allLoaded1);
         
        that.$refs.loadmore1.onBottomLoaded();
      }, 1000);
    },
    handleBottomChange: function(status) {
      this.bottomStatus = status;
      console.log(status);
    },
    loadTop1() {
      // 刷新数据的操作
      var self = this;
      self.allLoaded1 = false;
      setTimeout(function() {
        self.getLiterList(1);
        self.$refs.loadmore1.onTopLoaded();
      }, 1000);
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },

    // 控制视频load-more组件
    loadTop2() {
     var self = this;
      self.allLoaded2 = false;
      setTimeout(function() {
        self.getVideoList(1);
        self.$refs.loadmore2.onTopLoaded();
      }, 1000);
    },
    loadBottom2() {
      // 加载更多
       var that = this;
      that.pageNow_v += 1;
      var pages=Math.ceil(that.total_v/10)
      // 加载更多数据的操作
      setTimeout(function() {
        if (that.pageNow_v <=pages) {
         that.getVideoList(1);
        } else {
          that.allLoaded2 = true; // 若数据已全部获取完毕
        }
        console.log(that.allLoaded2);
         
        that.$refs.loadmore2.onBottomLoaded();
      }, 1000);
    },
  },
  components: {
    myVideo,
    myLiterature
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.star {
  margin-top: $header_h;
  background-color: #fbf3d0;
  height: $height - $header_h;
  // 覆盖mintui的navbar的样式
  .mint-navbar {
    background-color: #ffe57e;
    margin-bottom: 3px;
    i {
      border-left: 2px solid #5f2500;
      margin: 5px;
    }
    .mint-tab-item {
      &.is-selected {
        border-bottom: 3px solid #e3a51c;
      }
      .mint-tab-item-label {
        font-size: 0.36rem;
      }
    }
  }
  .tab {
    font-size: 0.36rem;
    color: #5f2500;
    font-weight: 700;
    span {
      font-size: 0.36rem;
    }
  }
  .active {
    border-bottom: 2px solid #e3a51c;
  }
  .tip {
    color: #ccc;
  }
  .fs-34 {
    font-size: 0.34rem;
    text-align: center;
  }
}
//  .nav {
//     background-color: #ffe57e;
//     display: flex;
//     .nav-item {
//       width: 50%;
//       text-align: center;
//       line-height: 0.8rem;
//     }
//     i {
//       border-left: 2px solid #5f2500;
//       margin: 5px;
//     }
//   }
//  .tab {
//     font-size: 0.36rem;
//     color: #5f2500;
//     font-weight: 700;
//   }
</style>