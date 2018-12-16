<template>
  <div class="detaile" ref="viewBox">
    <div class="head">
      <div class="img">
        <img :src="info.headPhotoUrl" alt>
      </div>
      <div class="title">{{info.title}}</div>
    </div>
    <span class="time">{{info.updateAt|dateformat}}</span>
    <span class="author">{{info.nickName}}</span>
    <!-- 视频播放 -->
    <div class="videobox" id="fixedHeaderRoot" :class="headerFixed?'isFixed':''">
      <video
        src="D:\20181122_173036.mp4"
        controls="controls"
      >your browser does not support the video tag</video>
    </div>
    <div class="content" v-html="content" :style="{marginTop:topHeight+'px'}"></div>
    <div class="bottom">
      <div class="shoucang">
        <img
          v-if="info.isCollection"
          class="collect"
          src="../assets/images/collect_c.png"
          alt
          @click="collect(info.id)"
        >
        <img
          v-else
          class="collect"
          src="../assets/images/collect.png"
          alt
          @click="collect(info.id)"
        >
        <p>{{info.collection}}</p>
      </div>
      <div class="dianzan">
        <img
          v-if="info.isPraise"
          class="praise"
          src="../assets/images/heart_c.png"
          alt
          @click="praise(info.id)"
        >
        <img v-else class="praise" src="../assets/images/heart.png" alt @click="praise(info.id)">
        <p>{{info.praise}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headerFixed: false,
      topHeight: 0,
      mtoffsetHeight: 0,
      info: {},
      content:
        '<p class="jianjie">集合是个什么鬼，你还不知道？集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧，集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧111</p><p class="jianjie">集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧，集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧111</p><p class="jianjie">集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧，集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧111</p>'
    };
  },
  created() {
    this.getDetial(1);
  },
  mounted() {
    // handleScroll为页面滚动的监听回调
    window.addEventListener(
      "scroll",
        this.handleScroll);
    // 监听dom渲染完成
    this.$nextTick(function() {
      // 这里fixedHeaderRoot是吸顶元素的ID
      let header = document.getElementById("fixedHeaderRoot");
      // fixHead是固定头部的id
      let mtHeader = document.getElementById("fixHead");
      // 获取固定头部的高度
      this.mtoffsetHeight = mtHeader.offsetHeight;
      // 这里要得到吸顶元素的距离和元素自身的高度
      this.offsetTop = header.offsetTop;
      this.offsetHeight = header.offsetHeight;
      console.log(
        "offsetTop:" +
          this.offsetTop +
          "," +
          this.offsetHeight +
          "," +
          this.mtoffsetHeight
      );
    });
  },
  methods: {
    getDetial(id) {
      // var id =this.$route.query.id;
      var that = this;
      this.axios
        .get(`/api/u/videoData/` + id, { params: { userId: 1 } })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            that.info = response.data.data;
            console.log(that.info);
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    praise(id) {
      var that = this;
      this.axios
        .put(`/api/u/videoData/praise`, { UserId: 1, id })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            if (that.info.isPrise) {
              that.info.isPrise = false;
              that.info.praise--;
            } else {
              that.info.isPrise = true;
              that.info.praise++;
            }
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    collect(id) {
      var that = this;
      var data = {
        userId: 1,
        id
      };
      this.axios
        .put(`/api/u/videoData/collection?id=${id}&userId=1`)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            if (that.info.isCollection) {
              that.info.isCollection = false;
              that.info.collection--;
            } else {
              that.info.isCollection = true;
              that.info.collection++;
            }
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop = this.$refs.viewBox.scrollTop;
      console.log(scrollTop);
      // 判断页面滚动的距离是否大于吸顶元素的位置
      if (scrollTop > this.offsetTop - this.mtoffsetHeight) {
        this.headerFixed = true;
        this.topHeight = this.offsetHeight + this.mtoffsetHeight;
      } else {
        this.headerFixed = false;
        this.topHeight = 0;
      }
    }
  },
  // destroyed回调中移除监听
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.detaile {
  margin-top: $header_h;
  height: $height - $header_h;
  padding: 0.3rem 0.2rem;
  color: #b8b8b8;
  font-size: 0.34rem;
  .head {
    display: flex;
    .img {
          width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.3rem;
      img {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
    .title {
      font-size: 0.38rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
      color: #333;
    }
  }
  .time {
    margin-right: 0.5rem;
    margin-left: 1rem;
  }
  .content {
    margin-top: 0.2rem;
    text-indent: 0.68rem;
    margin-bottom: 1rem;
  }
  video {
    width: 100%;
    margin: 0.2rem 0;
  }
  .isFixed {
    position: fixed;
    top: $header_h;
    left: 0;
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    font-size: 0.4rem;
    align-items: center;
    text-align: center;
    .shoucang {
      img {
        width: 1rem;
      }
    }
    .dianzan {
      img {
        width: 1rem;
      }
    }
  }
}
</style>
