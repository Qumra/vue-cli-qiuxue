<template>
  <div class="bindSuccess">
    <div class="success">
      <img src="../assets/images/yuanxingxuanzhongfill.svg" alt>
    </div>
    <div class="email">邮箱：{{info.email|binding(info.email)}}</div>
    <div class="phone">手机：{{info.phone|binding(info.phone)}}</div>
    <button>
      <router-link class="link" to="/bind/phone">换绑手机号/邮箱</router-link>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  created() {
    this.getInfo(1);
  },
  methods: {
    getInfo(id) {
      let that = this;
      this.axios
        .get("/api/u/user/binding/" + id)
        .then(response => {
          console.log(response.data.data);
          if (response.data.code == 0) {
            that.info = response.data.data;
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
    binding: function(msg, data) {
      if (msg == null) {
          msg = "未设置";
      } else {
        msg = data;
      }
      return msg;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";

.bindSuccess {
  margin-top: $header_h;
  background-color: #fbf3d0;
  height: $height - $header_h;
  text-align: center;
  padding-top: 0.5rem;
  font-size: 0.36rem;
  .success {
    img {
      width: 2rem;
    }
  }
  .email,
  .phone {
    color: #fcd32d;
    font-weight: 700;
    padding: 0.3rem 0;
  }
  button {
    background: url(../assets/images/btn3.png) no-repeat;
    background-size: 100% 100%;
    border: 2px solid #5f2500;
    border-radius: 10px;
    text-align: center;
    padding: 0.2rem 0.3rem;
    margin-top: 0.2rem;
  }
  .link {
    color: #fff;
    font-size: 0.36rem;
  }
}
</style>