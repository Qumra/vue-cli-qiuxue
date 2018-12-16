<template>
  <div class="card">
    <div class="contain">
      <div class="student">
        <div class="title">学生卡</div>
        <div class="content">
          <div class="img">
            <img :src="info.headPhotoUrl" alt>
          </div>
          <div class="msg">
            <p>
              姓名:
              <span>{{info.nickName}}</span>
            </p>
            <p>
              年级:
              <span>{{info.grade |gradeFormat}}</span>
            </p>
            <p>
              逆袭豆:
              <span>{{info.score}}颗</span>
            </p>
          </div>
        </div>
        <div class="edit">
          <router-link class="link" to="/edit">编辑</router-link>
        </div>
      </div>
      <router-link class="myCollect" to="/star" tag="div">
        <img src="../assets/images/heart_c.png" alt>
        <span>我的收藏</span>
      </router-link>
      <router-link class="myBind" v-if="flag" tag="div" to="/bind/phone">
        <img src="../assets/images/seting_c.png" alt>
        <span>账户与相关设置</span>
        <span class="star">未绑定</span>
      </router-link>
      <router-link class="myBind" v-else tag="div" to="/bindSuccess">
        <img src="../assets/images/seting_c.png" alt>
        <span>账户与相关设置</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
      flag: false
    };
  },
  created() {
    this.getInfo(1);
  },
  methods: {
    getInfo(id) {
      let that = this;
      this.axios
        .get("/api/u/user/" + id)
        .then(response => {
          console.log(response.data.data);
          if (response.data.code == 0) {
            that.info = response.data.data;
            if (that.info.phone && that.info.email !== null) {
              that.flag = false;
            }else {
              that.flag = true;
            }
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    gradeFormat: function(msg) {
      var output;
      switch (msg) {
        case 0:
          output = "未设置";
          break;
        case 1:
          output = "初一";
          break;
        case 2:
          output = "初二";
          break;
        case 3:
          output = "初三";
          break;
        case 4:
          output = "高一";
          break;
        case 5:
          output = "高二";
          break;
        case 6:
          output = "高三";
          break;
      }
      return output;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.card {
  margin-top: $header_h;
  background-color: #fbf3d0;
  height: $height - $header_h;
  .contain {
    padding: 0.5rem 0.3rem;
    .student {
      background: url(../assets/images/bg_c.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      .title {
        color: #c66d08;
        font-size: 0.42rem;
        padding: 0.5rem 0;
        font-weight: 700;
      }
      .content {
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        .img {
          width: 1.8rem;
          height: 2rem;
          border: 2px solid #fcba1a;
          img {
            width: 1.8rem;
            height: 2rem;
          }
        }
        .msg {
          flex: 1;
          font-size: 0.34rem;
          font-weight: 700;
          text-align: left;
          padding-left: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          p {
            color: #fcba1a;
          }
          span {
            color: #5f2500;
          }
        }
      }
      .edit {
        text-align: left;
        padding-left: 1rem;
        padding-bottom: 0.3rem;
        .link {
          color: #96bbe8;
          font-size: 0.32rem;
          font-weight: 700;
        }
      }
    }
    .myCollect {
      @include btn_c;
      img {
        width: 0.68rem;
        height: 0.55rem;
        margin-right: 0.3rem;
      }
      span {
        color: #5f2500;
      }
    }
    .myBind {
      @include btn_c;
      img {
        width: 0.7rem;
        height: 0.56rem;
        margin-right: 0.3rem;
      }
      span {
        color: #5f2500;
      }
      .star {
        color: #96bbe8;
        font-size: 0.34rem;
        font-weight: 700;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
