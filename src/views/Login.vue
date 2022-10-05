<template>
  <div>
    <van-cell-group title="登录">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="account" name="account" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: ""
    }
  },

  created() {
    this.$utils.setCookie("user", "=0;expires=" + new Date(0).toUTCString());
  },

  methods: {
    onSubmit: function (values) {
      console.log('submit', values);
      const url = `${process.env.VUE_APP_BASE_URL}/login`;
      const data = {
        account: values.account,
        password: values.password
      }
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          this.$utils.setCookie("user", resp.result.token);
          this.$utils.setCookie("account", resp.result.account);
          this.$router.push("/");
          console.log(resp);
          alert("登录成功")
        } else {
          alert(resp.msg);
        }
      })
    }
  }
}
</script>

<style>

</style>
