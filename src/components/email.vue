<template>
  <div class="email">
    <div class="notice">
      <img src="../assets/images/notice.png" alt>
      绑定手机号/邮箱可获得20颗逆袭豆
    </div>
    <div class="call">
      邮箱:
      <input
        v-validate="'required|email'"
        type="email"
        name="email"
        placeholder="同学，请输入一个能接收验证码的邮箱"
        v-model="email"
      >
    </div>
    <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
    <div class="email">
      验证:
      <!-- oninput="if(value.length>6)value=value.slice(0,5)" -->
      <!-- v-validate="'digits:6'" name="captcha" -->
      <input
        type="text"
        placeholder="请输入验证码"
        v-validate="'digits:6'"
        name="captcha"
        size="6"
        maxlength="6"
        onkeyup="this.value=(this.value.replace(/\D/g,''))"
        v-model="captcha"
      >
      <button class="captcha" :disabled="isDisabled" @click="send(1)">{{msg}}</button>
    </div>
    <div>
      <span v-show="errors.has('captcha')" class="is-danger">{{ errors.first('captcha')}}</span>
    </div>
    <button class="bind" @click="bind(1)">绑定</button>

    <div class="mask" v-show="flag">
      <div class="message">
        <img class="signSuccess" src="../assets/images/bindSuccess.png" alt>
        <img class="score" src="../assets/images/score.png" alt>
        <div class="bottom-btn">
          <button class="bot-btn">
            逆袭豆
            <span class="addScore">+{{addScore}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import Qs from "qs";
export default {
  data() {
    return {
      addScore: 20,
      flag: false,
      msg: "获取验证码",
      isDisabled: false,
      count: 6,
      timer: null,
      captcha:'',
      email:''
    };
  },
  methods: {
    send(id) {
      this.isDisabled = true;
       var data =Qs.stringify({ email: this.email})
      this.axios
        .post("/api/u/user/binding/email/" +id, data,
         { headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }}
        )
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            Toast({
              message: "验证码已发送",
              iconClass: "icon icon-success"
            });
            that.timer = setInterval(() => {
              that.count--;
              if (that.count > 0) {
                that.msg = "还剩余" + that.count + "秒";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
              } else {
                that.msg = "重新发送";
                that.isDisabled = false;
                clearInterval(that.timer);
                that.count = 16;
              }
            }, 1000);
          } else {
            // alert(response.data.message);
            Toast({
              message: response.data.message,
              duration: 3000
            });
             that.isDisabled = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    bind(id) {
      let that = this
      this.axios
        .put("/api/u/user/binding/email/" + id, {
          captcha: parseInt(this.captcha),
          email:this.email,
        })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            // 显示提示框
            that.flag = true;
            setTimeout(() => {
              that.flag = false;
            //  跳转学生卡页面
              that.$router.push({
                path: "/card"
              });
            }, 3000);
          } else {
            // alert(response.data.message);
             Toast({
              message: response.data.message,
              duration: 3000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.email {
  text-align: center;
  font-weight: 700;
  .notice {
    font-size: 0.3rem;
    color: #865834;
    margin: 0.3rem 0;
    img {
      width: 0.46rem;
      height: 0.32rem;
      margin-right: 0.2rem;
    }
  }
  .call {
    color: #fcba1a;
    font-size: 0.38rem;
    margin-top: 0.8rem;
    input {
      @include inputStyle;
      width: 72%;
    }
  }
  .email {
    color: #fcba1a;
    font-size: 0.38rem;
    margin-top: 0.8rem;
    position: relative;
    input {
      @include inputStyle;
      width: 72%;
    }
    .captcha {
      padding: 0.15rem;
      border-radius: 5px;
      border: 2px solid #865834;
      color: #fff;
      font-size: 0.3rem;
      font-weight: 700;
      position: absolute;
      top: 0;
      right: 5%;
      background-color: transparent;
    }
  }
  .is-danger {
    color: red;
    font-size: 0.3rem;
  }
  .bind {
    background: url(../assets/images/btn3.png) no-repeat;
    background-size: 100% 100%;
    border: 2px solid #5f2500;
    border-radius: 10px;
    text-align: center;
    padding: 0.2rem 0.5rem;
    margin-top: 1rem;
    color: #fff;
    font-size: 0.36rem;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    .message {
      padding-bottom: 0.5rem;
      text-align: center;
      position: fixed;
      top: 25%;
      left: 10%;
      width: 80%;
      z-index: 100;
      background: url("../assets/images/successBg.png") no-repeat center;
      background-size: 100% 100%;

      .signSuccess {
        position: absolute;
        left: 20%;
        top: -18%;
        width: 3.5rem;
      }
      .close {
        position: absolute;
        right: -3%;
        top: -11%;
        width: 0.8rem;
      }
      .score {
        margin-top: 10%;
      }
      .bottom-btn {
        display: flex;
        justify-content: center;
        .bot-btn {
          color: #fff;
          background-color: #ee7600;
          width: 2.5rem;
          height: 0.8rem;
          font-size: 0.34rem;
          border-radius: 5px;
          font-weight: 700;
          border: 1px solid #5f2500;

          .addScore {
            color: #fcde00;
            // font-size: .32rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
