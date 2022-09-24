<template>
  <div class="container">
    <div class="moneyBox">
      <div class="moneyInfo">
        <p class="moneyTitle">当前金币</p>
        <div class="money">{{userInfo.money}}</div>
      </div>
    </div>
    <div class="cellBox">
      <nut-cell title="个人信息" is-link></nut-cell>
      <nut-cell :title="`提现(${userInfo.money}币)`" is-link></nut-cell>
      <nut-cell title="提现记录" is-link></nut-cell>
      <nut-cell title="我要展示" is-link></nut-cell>
      <nut-cell @click="onLogoutClick" is-link>
        退出登录
      </nut-cell>
    </div>
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
      this.$dialog({
        title: "退出登录",
        content: "确定是否退出登录",
        onCancel: () => { },
        onOk: () => this.$router.push("login")
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}

.moneyBox {
  height: 160px;
  background-color: lightgreen;
  text-align: center;
  position: relative;
}

.moneyTitle {
  color: white;
  opacity: 0.9;
}

.moneyInfo {
  position: absolute;
  width: 300px;
  height: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.money {
  font-size: 50px;
}

.cellBox {
  width: 94%;
  margin: 0 auto;
}
</style>