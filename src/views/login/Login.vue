<template>
  <div class="container">
    <nut-input v-model="account" placeholder="请输入账号" />
    <nut-input v-model="password" placeholder="请输入密码" />
    <nut-button @click="onLoginClick">登录</nut-button>
    <nut-button @click="onTestClick">test</nut-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      account: "",
      password: ""
    }
  },

  methods: {
    onLoginClick() {
      const data = {
        account: this.account,
        password: this.password
      }
      this.$api.post("http://localhost:9090/login", data)
        .then((resp) => {
          if (resp.data?.code === 1) {
            const md5 = resp.data.result;
            this.$storage.setCookie("user", md5);
            this.$router.push("/")
          }
          this.$message.warn(resp.data.msg);
        })
    },

    onTestClick() {
      this.$api.get("http://localhost:9090/test").then((resp) => {
        console.log(resp)
      })
    }
  }
}
</script>

<style scoped>

</style>