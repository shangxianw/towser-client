<template>
  <div>
    <van-nav-bar left-arrow @click-left="onReturnClick" :title="`${info.sponsorName}`" fixed>
      <template #right>
        <van-icon name="question-o" size="20" @click="onQAClick" />
      </template>
    </van-nav-bar>
    <div class="listContainer">
      <van-cell-group>
        <van-cell title="游戏类型" :value="`${info.gameName} ${tips}`" />
        <van-cell title="总金币" :label="guafen">
          <template #default>
            <span style="color: #CD7F32; font-weight: bold;">{{info.money}}元</span>
          </template>
        </van-cell>
        <van-cell title="通关 / 玩家人数" :value="`${info.winCount} / ${info.playCount}`" is-link
          :url="`#/winPlayerList?activity=${info.id}`" />
        <van-cell title="剩余时间">
          <template #default>
            <van-count-down v-if="leftTime > 0" style="color: #969799" :time="leftTime" format="DD 天 HH 时 mm 分 ss 秒" />
            <span v-else>已过期</span>
          </template>
        </van-cell>
        <van-cell title="消耗体力" :value="`${info.power}`" />
        <van-cell title="可用体力" :value="`${power} / ${maxPower}`">
          <template #label>
            {{`每10分钟恢复${speed}点体力`}}
            <van-count-down v-if="power < maxPower" style="color: #969799" :time="leftNextPowerTime" format="mm 分 ss 秒"
              @finish="onLeftTimePowerFinish" />
          </template>
        </van-cell>
        <van-button type="primary" :disabled="!canStart" block @click="onStartClick">
          开始游戏
        </van-button>
      </van-cell-group>
      <van-cell class="sponsorContainer">
        <template #default>
          <span class="sponsorTips">赞助商</span>
          <div>{{info.sponsorName}}</div>
          <p>{{info.desc}}</p>
        </template>
      </van-cell>
      <van-list>
        <van-image v-for="path in details || []" :key="path" :src="`${fileDomain}/activity/${this.activity}/${path}`" />
      </van-list>
    </div>
  </div>
</template>

<script>
const components = {}
export default {
  components,
  data() {
    return {
      activity: null,
      info: {},
      tips: "",
      config: {},
      canStart: false,
      power: 0,
      maxPower: 0,
      speed: 0,
      nextPowerTime: 0,
      show: false
    }
  },

  created() {
    this.activity = this.$route.query.activity;
    this.updateInfo();

    let url = `${process.env.VUE_APP_FILE_URL}/activity/${this.activity}/config.json`
    this.$api.get(url).then(resp => resp.data).then(resp => {
      this.config = resp;
    })

    url = `${process.env.VUE_APP_BASE_URL}/checkCanStart`;
    const params = { activity: this.activity }
    this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.canStart = resp.result;
      }
    })
  },

  computed: {
    details() {
      return this.config?.image?.details || [];
    },

    guafen() {
      if (this.info.winCount === 0 || isNaN(this.info.winCount)) {
        return `暂无通关者, 金币等你来瓜分!`
      }
      const money = Number(this.info.money / this.info.winCount)?.toFixed(2) || null
      const tips = `当前通关者预计可分得${money}元`
      return tips;
    },

    leftTime() {
      return new Date(this.info.end).getTime() - Date.now();
    },

    leftNextPowerTime() {
      return Number(this.nextPowerTime) * 1000 - Date.now() || 0;
    },

    fileDomain() {
      return process.env.VUE_APP_FILE_URL;
    }
  },

  methods: {
    onLeftTimePowerFinish() {
      this.getUserInfo();
    },

    getUserInfo() {
      const url = `${process.env.VUE_APP_BASE_URL}/getUserInfo`;
      this.$api.get(url).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          this.maxPower = resp.result.maxPower || 0;
          this.power = resp.result.power || 0;
          this.speed = resp.result.speed || 0;
          this.nextPowerTime = resp.result.nextPowerTime || 0;
        }
      })
    },

    updateInfo() {
      this.getUserInfo();
      const url = `${process.env.VUE_APP_BASE_URL}/getActivetyDetail`;
      const params = {
        activity: this.activity
      }
      this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
        console.log(resp);
        if (resp.code === 1) {
          this.info = resp.result;
          if (Number(this.info.game) === 1) {
            this.tips = `${this.info.row}x${this.info.col} ${this.info.boom}颗雷`;
          }
        }
      })
    },

    onStartClick() {
      this.$router.push({ path: "game", query: { activity: this.activity, gameType: this.info.game } })
    },

    onReturnClick() {
      this.$router.push('/')
    },

    onQAClick() {
      this.$dialog({
        title: "说明",
        message: this.info.remark
      })
    }
  }
}
</script>

<style scoped>
.listContainer {
  margin-top: 46px;
  width: 100%;
}

.sponsorContainer {
  position: relative;
  word-wrap: break-word;
  padding: 12px 8px;
  margin: 8px 0;
}

.sponsorContainer span {
  float: right;
  color: #ccc;
  font-size: 12px;
}

.sponsorContainer div {
  font-size: 20px;
}

.sponsorContainer p {
  color: #666;
}

.van-image {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
