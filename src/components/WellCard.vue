<template>
  <van-cell-group inset class="container">
    <van-cell title="用户" :value="info.user" />
    <van-cell title="账户金额" :value="info.money" />
    <van-cell title="提现金额" :value="info.cash" />
    <van-cell title="申请时间" :value="info.applyTime" />
    <van-cell title="当前状态">
      <template #value>
        <van-tag type="primary" size="large">{{statusEnum[info.status]}}</van-tag>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          user: "test",
          // 因为是实时取的，所以余额和当时的提现金额无关
          money: 3400,
          cash: 123.45,
          applyTime: "2022-10-16:35:21",
          status: 1
        }
      }
    }
  },

  data() {
    return {
      statusEnum: {
        1: "申请中",
        2: "成功",
        3: "失败"
      },
      statusColor: {
        1: "#666",
        2: "lightgreen",
        3: "red"
      },
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 12px;
}
</style>
