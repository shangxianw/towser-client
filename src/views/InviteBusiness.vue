<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="我要上首页"></van-nav-bar>
    <img class="QRCode" src="../assets/inviteBusiness.png" alt="" />
    <div class="tips">
      请识别上方二维码,
      或搜索微信号ws_xian添加微信,
      备注towser
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
  padding: 20px;
}
</style>