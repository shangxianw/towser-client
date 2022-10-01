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
    // 清楚user信息
    this.setCookie("user", "=0;expires=" + new Date(0).toUTCString());
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
          this.setCookie("user", resp.result);
          this.$router.push("/");
          console.log(resp);
          alert("登录成功")
        } else {
          alert(resp.msg);
        }
      })
    },

    setCookie: function (key, value) {
      const cookie = document.cookie;
      const objs = cookie.split(";");
      const obj = {}
      objs.forEach(item => {
        const { key, value } = item.split("=");
        if (key == null || value == null) return;
        obj.key = key;
        obj.value = value;
      })
      obj[key] = value;

      // 还原
      let strs = [];
      for (let i in obj) {
        strs.push(`${i}=${obj[i]}`);
      }
      document.cookie = strs.join(";");
    }
  }
}
</script>

<style>

</style>
