<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="提现" fixed></van-nav-bar>
    <van-tabs class="tabs" v-model:active="active">
      <van-tab name="default" title="默认">
        <van-list>
          <WellCard v-for="item in defaultList" :key="item" />
        </van-list>
      </van-tab>
      <van-tab name="apply" title="申请中">申请中</van-tab>
      <van-tab name="success" title="成功">成功</van-tab>
      <van-tab name="fail" title="失败">失败</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import WellCard from "@/components/WellCard.vue";
const components = { WellCard };
export default {
  components,
  data() {
    return {
      active: "default",
      defaultList: [1, 2, 3, 4, 5, 6, 7],
      applyList: [],
      successList: [],
      failList: []
    }
  }
}
</script>

<style scoped>
.tabs {
  margin-top: 46px;
}
</style>
