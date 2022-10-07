<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="通关玩家列表" fixed></van-nav-bar>
    <van-list style="margin-top: 54px;">
      <van-cell-group v-for="item in list" :key="item.user" style="margin-top: 8px;">
        <van-cell :title="item.user">
          <template #value>
            {{calcUseTime(item.startTime, item.winTime)}}
          </template>
        </van-cell>
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
        this.list = resp.result;
      }
    })
  },

  methods: {
    calcUseTime(startTime, endTime) {
      return `${endTime - startTime}秒`
    }
  }
}
</script>

<style scoped>

</style>
