<template>
  <div class="edit">
    <div class="contain">
      <div class="student">
        <div class="title">学生卡</div>
        <div class="content">
          <div class="img" @click="selectImg">
            <img :src="imgUrl" alt>
            <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
          </div>
          <div class="msg">
            <p>
              姓名:
              <input type="text" v-model="name" minlength="2" maxlength="14">
            </p>
            <p>
              年级:
              <input type="text" v-model="message[grade]" @focus="ShouPup">
              <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom">
                <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
              </mt-popup>
            </p>
          </div>
        </div>
      </div>
      <button class="save" @click="save(1)">保存并修改</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
let grade_strs = ["未设置", "初一", "初二", "初三", "高一", "高二", "高三"];
export default {
  data() {
    return {
      name: "",
      imgUrl: "",
      grade: 0,
      actions: [
        {
          name: "拍照",
          method: function() {}
        },
        {
          name: "从相册选择",
          method: function() {}
        }
      ],
      sheetVisible: false,
      //   picker组件
      message: grade_strs,
      slots: [
        {
          flex: 1,
          values: grade_strs,
          className: "slot1",
          textAlign: "center"
        }
      ],
      popupVisible: false
    };
  },
  created() {
    this.getInfo(1);
  },
  methods: {
    selectImg() {
      this.sheetVisible = true;
    },
    ShouPup() {
      this.popupVisible = true;
    },
    onValuesChange(picker, values) {
      this.grade = this.message.indexOf(values[0]);
      console.log(this.grade);
    },
    getInfo(id) {
      let that = this;
      this.axios
        .get(`/api/u/data/${id}`)
        .then(response => {
          console.log(response.data.data);
          if (response.data.code == 0) {
            that.imgUrl = response.data.data.headPhotoUrl;
            that.name = response.data.data.nickName;
            that.grade = response.data.data.grade;
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    save(id) {
      let that = this;
      let data = JSON.stringify({
        headPhotoUrl: this.imgUrl,
        nickName: this.name,
        grade: this.grade
      });
      this.axios
        .put(
          `/api/u/data/${id}?headPhotoUrl=${this.imgUrl}&nickName=${
            this.name
          }&grade=${this.grade}`
        )
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            Toast({
              message: "保存成功",
              iconClass: "icon icon-success"
            });
            setTimeout(function() {
              that.$router.push({
                path: "/card"
              });
            }, 700);
          } else {
            alert(response.data.message);
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
.edit {
  margin-top: $header_h;
  background-color: #fbf3d0;
  height: $height - $header_h;
  text-align: center;
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
        padding: 0.5rem 0 0.8rem 1rem;
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
          input {
            @include inputStyle;
            width: 50%;
            margin-left: 0.1rem;
          }
          .mint-popup-bottom {
            width: 100%;
          }
        }
      }
    }
    .save {
      background: url(../assets/images/btn3.png) no-repeat;
      background-size: 100% 100%;
      border: 2px solid #5f2500;
      border-radius: 10px;
      text-align: center;
      padding: 0.2rem 0.3rem;
      margin-top: 1rem;
      color: #fff;
      font-size: 0.36rem;
    }
  }
}
</style>