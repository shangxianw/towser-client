<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="新增用户"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="info.account" name="account" label="账号" />
        <van-field v-model="info.password" name="password" label="密码" :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="info.money" name="money" label="金额" />
        <van-field v-model="info.bank" name="bank" label="支付宝账号" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        account: "",
        password: "",
        money: 0,
        bank: ""
      }
    }
  },

  methods: {
    onSubmit() {
      const url = `${process.env.VUE_APP_BASE_URL}/addNewUser`;
      const data = this.info;
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`添加成功`);
          this.$router.back();
        }
      })
    }
  }
}
</script>

<style scoped>
.listContainer {
  width: 94%;
  margin: 8px auto;
}
</style>
