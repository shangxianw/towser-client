<template>
  <div>
    <nut-navbar :title="info.gameName" left-show @on-click-back="onReturnClick">
    </nut-navbar>
    <p>游戏类型：{{info.gameName}} {{tips}}</p>
    <p>商家描述：{{info.desc}}</p>
    <p>金币：{{info.money}}</p>
    <p>通关人数：{{info.winCount}} / {{info.playCount}}</p>
    <nut-button @click="onStartClick">开始游戏</nut-button>
  </div>
</template>

<script>
import api from "@/common/api";

export default {
  components: {},
  data() {
    return {
      id: null,
      info: {},
      tips: ""
    }
  },

  created() {
    this.id = this.$route.query.id || null;

    if (!this.id) {
      this.$message.warn(`活动详情缺少参数`)
      return;
    }
    this.reqActivityDetail();
  },

  methods: {
    reqActivityDetail() {
      const params = {
        id: this.id
      }
      this.$api.get(api.getActivetyDetail, { params }).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          const result = resp.result;
          this.info = result;
          if (Number(result.game) === 1) {
            this.tips = `${result.row}x${result.col} ${result.boom}颗雷`;
          }
        } else {
          this.$message.warn(resp.msg);
        }
      })
    },

    onStartClick() {
      this.$router.push({ path: "game", query: { activity: this.id, gameType: this.info.game } })
    },

    onReturnClick() {
      this.$router.push("home");
    }
  }
}
</script>

<style scoped>

</style>