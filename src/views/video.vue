<template>
  <div class="video">
    <!-- 头部导航 -->
    <div class="nav">
      <div class="nav-item" @click.stop="show1()" :class="{ active: isActive1 }">年级</div>
      <i></i>
      <div class="nav-item" @click.stop="show2()" :class="{ active: isActive2 }">科目</div>
    </div>
    <div class="drop" v-show="isActive1">
      <ul class="dropmeau">
        <li
          v-for="(item,index) in listGrade"
          :key="item.id"
          @click="selectGrade($event)"
          :class="[curIndex1===index?'active':'']"
          :data-id="item.id"
          :data-index="index"
        >{{item.grade}}</li>
      </ul>
    </div>
    <div class="drop" v-show="isActive2">
      <ul class="dropmeau">
        <li
          v-for="(item,index) in listSubject"
          :key="item.id"
          @click="selectSubject($event)"
          :class="[curIndex2===index?'active':'']"
          :data-id="item.id"
          :data-index="index"
        >{{item.subject}}</li>
      </ul>
    </div>
    <div class="mask" v-show="isActive1||isActive2"></div>

    <!-- 轮播图 -->
    <mt-swipe :auto="3000">
      <!-- v-for='item in info.bannerList' :key="item.videoCoverUrl"-->
      <!-- <img :src="item.videoCoverUrl" alt=""> -->
      <mt-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.videoCoverUrl" alt>
      </mt-swipe-item>
    </mt-swipe>

    <div class="tip ac" v-show="!total">暂无数据</div>
    <!-- 加载更多 -->
    <mt-loadmore
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      @bottom-status-change="handleBottomChange"
      :auto-fill="false"
      ref="loadmore"
    >
      <div slot="top" class="mint-loadmore-top fs-34">
        <span v-show="topStatus === 'pull'">下拉刷新最新数据</span>
        <span v-show="topStatus === 'loading'">--加载中请稍后--</span>
        <span v-show="topStatus === 'drop'">松开手指即可更新</span>
      </div>
      <!-- 引入视频列表组件 -->
      <myVideo ref="myvideo" :data="info"></myVideo>
      <div slot="bottom" class="mint-loadmore-bottom fs-34">
        <span
          v-show="bottomStatus  === 'pull'"
          :class="{ 'rotate': bottomStatus  === 'drop' }"
        >继续往上拉</span>
        <span v-show="bottomStatus === 'loading'">刷新中，请稍等</span>
        <span v-show="bottomStatus === 'drop'">松手刷新</span>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import $ from "jquery";
import myVideo from "../components/myVideo";
export default {
  data() {
    return {
      isActive1: false,
      isActive2: false,
      curIndex1: 4,
      curIndex2: 2,
      listGrade: [
        { id: 0, grade: "全部" },
        { id: 1, grade: "初一" },
        { id: 2, grade: "初二" },
        { id: 3, grade: "初三" },
        { id: 4, grade: "高一" },
        { id: 5, grade: "高二" },
        { id: 6, grade: "高三" }
      ],
      listSubject: [
        { id: 0, subject: "全部" },
        { id: 1, subject: "语文" },
        { id: 2, subject: "数学" },
        { id: 3, subject: "英语" },
        { id: 4, subject: "物理" },
        { id: 5, subject: "化学" },
        { id: 6, subject: "生物" },
        { id: 7, subject: "历史" },
        { id: 8, subject: "地理" },
        { id: 9, subject: "政治" }
      ],
      allLoaded: false,
      bottomStatus: "",
      topStatus: "",
      params: {},
      pageNow: 1,
      pageSize: 10,
      info: [],
      banner: [],
      total:1
    };
  },

  created() {
    this.getBanner();
    this.getInfo(1);
  },
  methods: {
    // 控制年级，科目的展开隐藏
    show1() {
      this.isActive1 = !this.isActive1;
      this.isActive2 = false;
    },
    show2() {
      this.isActive2 = !this.isActive2;
      this.isActive1 = false;
    },
    // 选择年级
    selectGrade(e) {
      this.curIndex1 = parseInt(
        e.currentTarget.dataset.index ? e.currentTarget.dataset.index : 0
      );
      this.getInfo(1);
    },
    // 选择科目
    selectSubject(e) {
      this.curIndex2 = parseInt(
        e.currentTarget.dataset.index ? e.currentTarget.dataset.index : 0
      );
      this.getInfo(1);
    },
    // 加载更多
    loadBottom() {
      var that = this;
      that.pageNow += 1;
      var pages = Math.ceil(that.total / 10);
      // 加载更多数据的操作
      setTimeout(function() {
        if (that.pageNow <= pages) {
          that.getInfo(1); //再次发送请求拿到数据
        } else {
          that.allLoaded = true; // 若数据已全部获取完毕
        }
        console.log(that.allLoaded);

        that.$refs.loadmore.onBottomLoaded();
      }, 1000);
    },
    handleBottomChange: function(status) {
      this.bottomStatus = status;
      // console.log(status);
    },
    loadTop() {
      // 刷新数据的操作
      var that = this;
      that.allLoaded = false;
      setTimeout(function() {
        that.getList(1);
        that.$refs.loadmore.onTopLoaded();
      }, 1000);
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },
    // 根据userId获取视频列表
    getInfo(id) {
      let that = this;
      this.params = {
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        grade: this.curIndex1,
        subject: this.curIndex2,
        userId: id
      };
      this.axios
        .get(`/api/u/videoList`, { params: this.params })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            that.info.push(...response.data.data.data);
            console.log(that.info);
            that.total = response.data.total;
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取轮播图
    getBanner() {
      var that = this;
      this.axios
        .get(`/api/u/video/banner`)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            that.banner = response.data.data;
            console.log(that.info);
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    myVideo
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.video {
  margin-top: $header_h;
  background-color: #fbf3d0;
  height: $height - $header_h;
  position: relative;
  .nav {
    background-color: #ffe57e;
    display: flex;
    z-index: 100;
    position: relative;
    .nav-item {
      width: 50%;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.36rem;
      color: #5f2500;
      font-weight: 700;
    }
    i {
      border-left: 2px solid #5f2500;
      margin: 5px;
    }
    .active {
      border-bottom: 3px solid #e3a51c;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }
  .drop {
    padding: 0 2%;
    background-color: #ffe57e;
    position: absolute;
    z-index: 100;
    width: 96%;
    .dropmeau {
      background-color: #fcd32d;
      padding: 0.3rem 0.2rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 30%;
        background-color: #ffe57e;
        font-size: 0.36rem;
        color: #5f2500;
        font-weight: 700;
        border-radius: 5px;
        text-align: center;
        margin-bottom: 0.2rem;
        padding: 0.1rem 0;
        &.active {
          background-color: #dd9f1a;
          color: #fff;
        }
      }
    }
  }
  .mint-swipe {
    height: 3.5rem;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .tip {
    color: #ccc;
  }
  .fs-34 {
    font-size: 0.34rem;
  }
}
</style>
