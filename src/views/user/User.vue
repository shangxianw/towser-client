<template>
  <div>
    <p>当前金币：{{userInfo.money}}</p>
    <nut-button @click="onLogoutClick">登出</nut-button>
  </div>
</template>

<script>
import api from "@/common/api";

export default {
  components: {},
  data() {
    return {
      userInfo: {
        money: null
      }
    }
  },

  created() {
    this.$api.get(api.getUserInfo).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.userInfo.money = resp.result.money;
      } else {
        this.$message.warn(resp.msg)
      }
    })
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