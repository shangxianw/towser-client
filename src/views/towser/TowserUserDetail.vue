<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="用户"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="info.account" name="account" label="账号" disabled />
        <van-field v-model="info.password" name="password" label="密码" :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="info.money" name="money" label="金额" />
        <van-field v-model="info.bank" name="bank" label="支付宝账号" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
        <br />
        <van-button round block type="danger" @click="onDelClick">
          删除
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      id: this.$route.query.id
    }
  },

  created() {
    const url = `${process.env.VUE_APP_BASE_URL}/getUserDetail`;
    const params = {
      id: this.id
    }
    this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.info = resp.result;
      }
    })
  },

  methods: {
    onSubmit() {
      const url = `${process.env.VUE_APP_BASE_URL}/updateUserDetail`;
      const data = this.info
      data.id = this.id;
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`更新成功`)
        }
      })
    },

    onDelClick() {
      this.$dialog.confirm({ message: "是否删除该用户" }).then(() => {
        const url = `${process.env.VUE_APP_BASE_URL}/deleteUser`;
        const data = {
          id: this.id
        }
        this.$api.post(url, data).then(resp => resp.data).then(resp => {
          if (resp.code === 1) {
            alert(`删除成功`);
            this.$router.back();
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
