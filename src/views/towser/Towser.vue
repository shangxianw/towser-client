<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="管理"></van-nav-bar>
    <div class="listContainer">
      <van-cell title="赞助商列表" is-link to="towserSponsor" />
      <van-cell title="用户列表" is-link to="towserUser" />
      <van-cell title="提现列表" is-link to="towserWell" />
      <van-cell title="活动列表" is-link to="towserCalc" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.listContainer {
  width: 94%;
  margin: 8px auto;
}
</style>
