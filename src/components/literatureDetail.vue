<template>
  <div class="detaile">
    <div class="title">{{info.title}}</div>
    <span class="time">{{info.updateAt|dateformat}}</span>
    <span class="author">{{info.author}}</span>
    <div class="content" v-html="info.content"></div>
    <div class="bottom">
      <div class="shoucang">
         <img
          v-if="info.isCollection"
          class="collect"
          src="../assets/images/collect_c.png"
          alt
          @click="collect(info.id)"
        >
        <img v-else class="collect" src="../assets/images/collect.png" alt  @click="collect(info.id)">
        <p>{{info.collection}}</p>
      </div>
      <div class="dianzan">
         <img
          v-if="info.isPrise"
          class="praise"
          src="../assets/images/heart_c.png"
          alt
          @click="praise(info.id)"
        >
        <img class="praise" src="../assets/images/heart.png" alt @click="praise(info.id)">
        <p>{{info.praise}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info:{},
      content:
        '<p class="jianjie">集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧，集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧111</p><p class="jianjie">集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧，集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧111</p><p class="jianjie">集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧，集合是个什么鬼，你还不知道？赶紧看看这个视频补救一下吧111</p>'
    };
  },
  created(){
    this.getDetial(8)
  },
  methods:{
     getDetial(id) {
      // var id =this.$route.query.id;
      var that = this;
      this.axios
        .get(`/api/u/articleData/` + id, { params: { userId: 1 } })
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
    praise(id){
      
    },
    collect(id){}
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
  .title {
    font-size: 0.38rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
    color: #333;
  }
  .time {
    margin-right: 0.5rem;
  }
  .content {
    margin-top: 0.2rem;
    text-indent: 0.68rem;
    margin-bottom: 1rem;
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    font-size: .4rem;
    align-items: center;
    text-align: center;
    .shoucang {
      img {
        width: 1rem;
      }
    }
    .dianzan {
      img{
        width: 1rem;
      }
    }
  }
}
</style>
