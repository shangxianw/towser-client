<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="赞助商"></van-nav-bar>
    <van-list>
      <van-cell-group inset v-for="item in list" :key="item" class="container">
        <van-cell :value="item.name" is-link :url="`#/towserSponsorDetail?id=${item.id}`" />
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
    const url = `${process.env.VUE_APP_BASE_URL}/getSponsorList`;
    this.$api.get(url).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.list = resp.result;
      }
    })
  }
}
</script>

<style scoped>
.container {
  margin-top: 12px;
}
</style>
