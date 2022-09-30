<template>
  <div>
    <div v-if="active=== 'home'">主页</div>
    <UserTabPane v-if="active=== 'user'" />
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import UserTabPane from "./UserTabPane";
const components = { UserTabPane }
export default {
  components,
  data() {
    return {
      active: this.$route.query?.tab || "home"
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
