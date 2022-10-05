<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="个人信息"></van-nav-bar>
    <van-form @submit="onSubmit" class="listContainer" input-align="right">
      <van-cell-group inset>
        <van-cell title="账号" :value="account" />
        <van-cell title="金币" :value="money" />
        <van-field v-model="bank" name="bank" label="支付宝提现" placeholder="请输入支付宝账号" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          更新个人信息
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: this.$utils.getCookie('account'),
      money: "",
      bank: "",
    }
  },

  created() {
    const url = `${process.env.VUE_APP_BASE_URL}/getUserInfo2`;
    this.$api.get(url).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        const { bank, money } = resp.result;
        this.bank = bank;
        this.money = money;
      }
    })
  },

  methods: {
    onSubmit() {
      const url = `${process.env.VUE_APP_BASE_URL}/updateUserInfo`;
      const data = {
        bank: this.bank
      }
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`更新成功`)
        }
      })
    }
  }
}
</script>

<style scoped>
.listContainer {
  margin-top: 8px;
}
</style>