<template>
  <div class="container">
    <div class="myInfoContainer">
      我的信息
    </div>
    <div class="listContainer">
      <van-cell title="个人信息" is-link />
      <van-cell title="提现" is-link />
      <van-cell title="提现记录" is-link />
      <van-cell title="我要上首页" is-link />
      <van-cell title="退出登录" clickable @click="onLoginoutClick" />
    </div>
  </div>
</template>

<script>
export default {
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
  height: 280px;
  margin-bottom: 8px;
}

.listContainer {
  width: 94%;
  margin: 0 auto;
}
</style>
