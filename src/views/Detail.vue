<template>
  <div>
    <van-nav-bar left-arrow @click-left="onReturnClick" title="详情" fixed></van-nav-bar>
    <div class="listContainer">
      <van-cell-group>
        <van-cell title="游戏类型" :value="`${info.gameName} ${tips}`" />
        <van-cell title="金币" :value="`${info.money}  (预计可分得${guafen})金币`" />
        <van-cell title="通关人数" :value="`${info.winCount} / ${info.playCount}`" />
        <van-cell title="剩余时间">
          <template #default>
            <van-count-down style="color: '#969799'" :time="leftTime" format="DD 天 HH 时 mm 分 ss 秒" />
          </template>
        </van-cell>
        <van-button type="primary" block @click="onStartClick">开始游戏</van-button>
      </van-cell-group>
      <van-cell class="sponsorContainer">
        <template #default>
          <span class="sponsorTips">赞助商</span>
          <div>{{info.sponsorName}}</div>
          <p>{{info.desc}}</p>
        </template>
      </van-cell>
      <van-list>
        <van-image v-for="path in details || []" :key="path"
          :src="`http://localhost:9080/sponsor/${this.activity}/${path}`" />
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
      config: {}
    }
  },

  created() {
    this.activity = this.$route.query.activity;
    this.updateInfo();

    const url = `http://localhost:9080/sponsor/${this.activity}/config.json`
    this.$api.get(url).then(resp => resp.data).then(resp => {
      this.config = resp;
    })
  },

  computed: {
    details() {
      return this.config?.image?.details || [];
    },

    guafen() {
      return Math.floor(this.info.money / this.info.winCount);
    },

    leftTime() {
      return new Date(this.info.end).getTime() - Date.now();
    }
  },

  methods: {
    updateInfo() {
      const url = `http://localhost:80/getActivetyDetail`;
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
</style>
