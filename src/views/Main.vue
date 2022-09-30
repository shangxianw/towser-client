<template>
  <div>
    <div v-if="active=== 'home'">主页</div>
    <div v-if="active=== 'user'">我的</div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "user"
    }
  },

  methods: {
    onChange(active) {
      this.$router.push({ name: "main", query: { tab: active } })
    }
  }
}
</script>

<style scoped>

</style>
