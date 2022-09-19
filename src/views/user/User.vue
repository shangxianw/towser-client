<template>
  <div>
    <nut-button @click="onLogoutClick">登出</nut-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    }
  },

  methods: {
    onLogoutClick() {
      this.$router.push("login");
    }
  }
}
</script>

<style scoped>

</style>