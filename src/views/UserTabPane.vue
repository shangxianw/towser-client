<template>
  <div class="container">
    <div class="myInfoContainer">
      <div class="myCoin">
        ￥{{money}}元
      </div>
    </div>
    <div class="listContainer">
      <van-cell title="个人信息" is-link />
      <van-cell title="提现" is-link />
      <van-cell title="提现记录" is-link />
      <van-cell title="我要上主页" is-link to="inviteBusiness" />
      <van-cell title="退出登录" clickable @click="onLoginoutClick" />
    </div>
  </div>
</template>

<script>
import InviteBusiness from "./InviteBusiness";
const components = { InviteBusiness }
export default {
  components,
  data() {
    return {
      money: 0
    }
  },

  created() {
    const url = `${process.env.VUE_APP_BASE_URL}/getUserInfo`;
    this.$api.get(url).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.money = resp.result.money || null;
      }
    })
  },

  methods: {
    onLoginoutClick() {
      this.$dialog.confirm({ message: "是否退出登录" }).then(() => {
        this.$router.push("login");
      })
    }
  }
}
</script>

<style scoped>
.myInfoContainer {
  background-color: lightgreen;
  height: 160px;
  margin-bottom: 8px;
  position: relative;
}

.myCoin {
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: #CD7F32;
  text-align: center;
}

.listContainer {
  width: 94%;
  margin: 0 auto;
}
</style>
