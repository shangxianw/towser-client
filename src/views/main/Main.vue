<template>
  <div>
    <router-view name="home"></router-view>
    <router-view name="user"></router-view>
    <nut-tabbar bottom safeAreaInsetBottom>
      <nut-tabbar-item tab-title="游戏" to="home" icon="category">
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="我的" to="user" icon="my"></nut-tabbar-item>
    </nut-tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>