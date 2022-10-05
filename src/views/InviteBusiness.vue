<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="我要上首页"></van-nav-bar>
    <img class="QRCode" src="../assets/inviteBusiness.png" alt="" />
    <div class="tips">
      请识别上方二维码, 或添加微信ws_xian, 联系管理员
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.QRCode {
  width: 50%;
  display: block;
  margin: 16px auto;
}

.tips {
  text-align: center;
}
</style>