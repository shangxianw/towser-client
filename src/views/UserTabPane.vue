<template>
  <div class="container">
    <div class="myInfoContainer">
      <div class="myCoin">
        <p>总金额(元)</p>
        {{money}}
      </div>
    </div>
    <div class="listContainer">
      <van-cell title="当前体力" :value="`${power} / ${maxPower}`">
        <template #label>
          {{`每10分钟恢复${speed}点体力`}}
          <van-count-down v-if="power < maxPower" style="color: #969799" :time="leftNextPowerTime" format="mm 分 ss 秒"
            @finish="onLeftTimePowerFinish" />
        </template>
      </van-cell>
      <van-cell title="个人信息" is-link to="userInfo" />
      <van-cell title="提现" is-link to="well" />
      <van-cell title="我要上主页" is-link to="inviteBusiness" />
      <van-cell title="退出登录" clickable @click="onLoginoutClick" />
    </div>
  </div>
</template>

<script>
import InviteBusiness from "./InviteBusiness";
const components = { InviteBusiness }
export default {
  components,
  data() {
    return {
      money: 0,
      power: 0,
      maxPower: 0,
      speed: 0,
      nextPowerTime: 0
    }
  },

  computed: {
    leftNextPowerTime() {
      return Number(this.nextPowerTime) * 1000 - Date.now() || 0;
    },
  },

  created() {
    this.getUserInfo();
  },

  methods: {
    getUserInfo() {
      const url = `${process.env.VUE_APP_BASE_URL}/getUserInfo`;
      this.$api.get(url).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          this.money = resp.result.money || 0;
          this.maxPower = resp.result.maxPower || 0;
          this.power = resp.result.power || 0;
          this.speed = resp.result.speed || 0;
          this.nextPowerTime = resp.result.nextPowerTime || 0;
        }
      })
    },

    onLoginoutClick() {
      this.$dialog.confirm({ message: "是否退出登录" }).then(() => {
        this.$router.push("login");
      })
    },

    onLeftTimePowerFinish() {
      this.getUserInfo();
    }
  }
}
</script>

<style scoped>
.myInfoContainer {
  background-color: rgb(24, 144, 255);
  height: 200px;
  margin-bottom: 8px;
  position: relative;
  color: #fff;
}

.myCoin {
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  text-align: center;
}

.myCoin p {
  font-size: 12px;
  text-align: center;
}

.listContainer {
  width: 94%;
  margin: 0 auto;
}
</style>
