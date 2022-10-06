<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="通关玩家列表" fixed></van-nav-bar>
    <van-list style="margin-top: 54px;">
      <van-cell-group v-for="item in list" :key="item.user" style="margin-top: 8px;">
        <van-cell title="玩家" :value="item.user" />
        <van-cell title="开始时间" :value="item.startTime" />
        <van-cell title="结束时间" :value="item.winTime" />
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },

  created() {
    const url = `${process.env.VUE_APP_BASE_URL}/getWinPlayerList`;
    const params = {
      activity: this.$route.query.activity
    }
    this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        resp.result.forEach(item => {
          item.startTime = item.startTime.replace("T", " ").split(".")[0];
          item.winTime = item.winTime.replace("T", " ").split(".")[0];
        })
        this.list = resp.result;
      }
    })
  }
}
</script>

<style scoped>

</style>
