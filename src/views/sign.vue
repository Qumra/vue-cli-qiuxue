<template>
  <div class="sign">
    <div class="header">
      <div class="head">
        <img :src="info.headPhotoUrl" alt>
      </div>
      <div class="info">
        <p>{{info.nickName}}</p>
        <p>逆袭豆：{{info.score}}颗</p>
      </div>
      <button v-if="!info.signStatus" class="signbtn" @click="sign(1)">签到</button>
      <button v-else :disabled="info.signStatus" class="signbtn">已签到</button>
    </div>
    <div class="contain" @click="userClick=false">
      <div class="record">
        <div class="sum-sign">
          <p>已累计签到</p>
          <p class="ac">{{info.totalSign}}天</p>
        </div>
        <div class="max-sign">
          <p>最高连续签到</p>
          <p class="ac">{{info.maxSign}}天</p>
        </div>
      </div>
      <div class="calendar">
        <span>今天：{{current.getMonth()+1}}月{{current.getDate()}}</span>
        <ul class="weekdays">
          <li class="weekend">日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li class="weekend">六</li>
        </ul>
        <ul class="days">
          <li v-for="item in days_r" :key="item.index">
            <span v-if="item.isSign==true" class="active">{{item.date}}</span>
            <span v-else>{{ item.date}}</span>
          </li>
        </ul>
        <div class="btn">
          <button v-if="!info.signStatus" class="signbtn" @click="sign(1)">签到</button>
          <button v-else :disabled="info.signStatus" class="signbtn">已签到</button>
        </div>
        <span class="rule" @click.stop="userClick=!userClick">签到规则</span>
        <div class="mask" v-show="userClick||flag"></div>
        <div class="rule-message" @click.stop v-show="userClick">
          <p>签到领取逆袭豆，通过消耗逆袭豆可观看付费视频。</p>
          <p>首日签到可领取1颗逆袭豆，连续签到每日递增1颗。连续签到5天后，逆袭豆每日可领取5颗</p>
          <p>签到中断逆袭豆可要重新计算呦~</p>
        </div>

        <div class="message" v-show="flag">
          <img class="signSuccess" src="../assets/images/signSuccess.png" alt>
          <img class="close" src="../assets/images/close.png" alt @click="closeMessage">
          <img class="score" src="../assets/images/score.png" alt>
          <div class="bottom-btn">
            <button class="bot-btn">逆袭豆
              <!-- addScore |comScore(this.info.currentSign) -->
              <span class="addScore">+{{info.increaseBeans}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
      current: new Date(),
      days_r: [],
      addScore: 0,
      flag: false,
      userClick: false
    };
  },
  created() {
    this.getInfo(1);
  },
  methods: {
    // 发送请求拿到页面初始信息
    getInfo(id) {
      let that = this;
      this.axios
        .get("/api/u/signing/" + id)
        .then(response => {
          console.log(response);
          if (response.data.code == 0) {
            that.info = response.data.data;
            that.render(that.current);
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // init() {
    //   this.render(this.current);
    // },

    // 日历渲染
    render(date) {
      this.days_r = [];
      // console.log(this.info.signTag);
      this.info.signTag = this.info.signTag.split("");
      // console.log(this.info.signTag);
      var begin_date = new Date(date);
      begin_date.setDate(1);
      var weekday = begin_date.getDay();
      var days_count =
        new Date(
          begin_date.getFullYear(),
          begin_date.getMonth() + 1,
          0
        ).getDate() +
          weekday <=
        35
          ? 35
          : 42;
      for (var i = 1 - weekday; i <= days_count - weekday; i++) {
        if (i < 1 || i > this.info.signTag.length) {
          this.days_r.push({
            date: "",
            isSign: false
          });
        } else {
          this.days_r.push({
            date: i,
            isSign: parseInt(this.info.signTag[i - 1]) ? true : false
          });
        }
      }
    },

    // 点击签到
    sign(id) {
      let that = this;
      this.axios
        .put("/api/u/signing/" + id)
        .then(response => {
          console.log(response);
          if (response.data.code == 0) {
            that.info = response.data.data;
            that.render(that.current);
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.flag = true;
      setTimeout(() => {
        that.flag = false;
      }, 3000);
    },
    // 点击关闭信息
    closeMessage() {
      this.flag = false;
    }
  },
  // 过滤器
  filters: {
    comScore: function(score, data) {
      if (data <= 5) {
        score = data;
      } else {
        score = 5;
      }
      return score;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/public";
.sign {
  margin-top: $header_h;

  .header {
    display: flex;
    align-items: center;
    background-color: #fcd32d;
    padding: 0.2rem 0.3rem;
    font-size: 0.36rem;
    color: #5f2500;
    border-bottom: 1px solid #5f2500;
    .head {
      width: 1.5rem;
      height: 1.5rem;
      background-color: #fff;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.3rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .info {
      flex: 1;
      p {
        margin-top: 0.2rem;
      }
    }
    .signbtn {
      color: #fff;
      background-color: #ee7600;
      width: 1.5rem;
      height: 0.8rem;
      font-size: 0.34rem;
      border-radius: 5px;
      font-weight: 700;
    }
  }
  .contain {
    padding: 0 0.2rem;

    .record {
      display: flex;
      justify-content: space-between;
      font-size: 0.34rem;
      color: #5f2500;
      margin: 0.5rem;
      padding: 0.2rem;
      border: 1px solid #5f2500;
      border-radius: 5px;
    }

    .calendar {
      background-color: #fcd32d;
      padding: 0 0.3rem 0.2rem;
      border-radius: 5px;
      span {
        color: #5f2500;
        font-size: 0.3rem;
      }
      .weekdays {
        padding: 0.1rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: #fcea6b;
        li {
          display: inline-block;
          width: 13.6%;
          text-align: center;
          font-size: 0.34rem;
          font-weight: 700;
        }
        .weekend {
          color: #4a7cca;
        }
      }
      .days {
        padding: 0.2rem;
        background: #fcba1a;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        li {
          list-style-type: none;
          display: inline-block;
          width: 13%;
          line-height: 0.8rem;
          border-radius: 15%;
          text-align: center;
          font-size: 0.36rem;
          font-weight: 700;
          color: #afccf8;
          background-color: #fff;
          margin-top: 0.1rem;
        }
        .active {
          display: inline-block;
          width: 100%;
          border-radius: 15%;
          color: #fff;
          background-color: #4a7cca;
        }
      }
      .btn {
        display: flex;
        margin-top: 0.2rem;
        justify-content: center;
        .signbtn {
          color: #fff;
          background-color: #ee7600;
          width: 2.5rem;
          height: 0.8rem;
          font-size: 0.34rem;
          border-radius: 5px;
          font-weight: 700;
        }
      }
      .rule {
        position: relative;
        left: 80%;
      }
    }
    .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 98;
  }
    .rule-message {
      padding: 0.3rem;
      position: fixed;
      top: 40%;
      left: 5%;
      width: 80%;
      z-index: 99;
      background: url(/img/successBg.498b8c05.png) no-repeat center;
      background-size: 100% 100%;
      border: 3px solid #5f2500;
      border-radius: 5%;
      p {
        color: #5f2500;
        font-size: 0.32rem;
        text-indent: 0.6rem;
      }
    }

    .message {
      padding-bottom: 0.5rem;
      text-align: center;
      position: fixed;
      top: 25%;
      left: 10%;
      width: 80%;
      z-index: 99;
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