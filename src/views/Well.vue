<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="提现"></van-nav-bar>
    <van-form @submit="onSubmit" class="listContainer" input-align="right" error-message-align="right">
      <van-cell-group inset>
        <van-field v-model="bank" name="bank" label="支付宝账号" placeholder="请输入支付宝账号"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-cell title="可提现金额(元)" :value="money" />
        <van-field type="number" v-model="cash" name="cash" label="提现金额(元)" placeholder="请输入要提现的金额"
          :rules="[{ required: true, validator: validatorMessage }]" />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-cell-group :title="records.length > 0 ? `提现记录` : `暂无提现记录`">
      <van-steps direction="vertical" :active="-1">
        <van-step v-for="(item, index) in records" :key="index">
          <p>提现时间: {{item.applyTime}}</p>
          <p>金额: <span>{{item.cash}}元</span></p>
          <p>当前状态: <b :style="{color: statusColor[item.status]}">{{statusEnum[item.status]}}</b></p>
          <p v-if="item.desc">说明: <span>{{item.desc}}</span></p>
        </van-step>
      </van-steps>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusEnum: {
        1: "申请中",
        2: "成功",
        3: "失败"
      },
      statusColor: {
        1: "#666",
        2: "lightgreen",
        3: "red"
      },
      bank: "",
      money: "",
      cash: "",

      records: []
    }
  },

  created() {
    const url = `${process.env.VUE_APP_BASE_URL}/getWellInfo`;
    this.$api.get(url).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.money = resp.result.money;
        this.bank = resp.result.bank;
      }
    })
    this.getWellRecords();
  },

  methods: {
    getWellRecords() {
      const url = `${process.env.VUE_APP_BASE_URL}/getWellRecords`;
      this.$api.get(url).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          (resp.result || []).forEach(item => {
            item.applyTime = item.applyTime.split(".")[0];
            item.applyTime = item.applyTime.replace("T", " ");
          })
          this.records = resp.result;
        }
      })
    },

    onSubmit() {
      const url = `${process.env.VUE_APP_BASE_URL}/well`;
      const data = {
        cash: this.cash
      }
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`提现成功`);
          this.money = resp.result.money;
          this.getWellRecords();
        }
      })
    },

    validatorMessage() {
      // 小数点
      if (this.cash > this.money) {
        return "提现金额超出可提现金额"
      }
      if (this.cash < 1) {
        return "提现金额至少超过1元"
      }
      return "";
    }
  }
}
</script>

<style scoped>
.listContainer {
  margin-top: 8px;
}
</style>
