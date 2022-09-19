<template>
  <div>
    <nut-navbar :title="sponsorName" left-show @on-click-back="onReturnClick">
    </nut-navbar>
    <p>游戏类型：{{gameName}} {{tips}}</p>
    <p>商家描述：{{desc}}</p>
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
      desc: "",
      gameName: "",
      gameType: null,
      sponsorName: "",
      status: null,
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
          this.gameName = result.gameName;
          this.gameType = result.game;
          this.sponsorName = result.sponsorName;
          this.desc = result.desc;
          if (Number(result.game) === 1) {
            this.tips = `${result.row}x${result.col} ${result.boom}颗雷`;
          }
        } else {
          this.$message.warn(resp.msg);
        }
      })
    },

    onStartClick() {
      this.$router.push({ path: "game", query: { activity: this.id, gameType: this.gameType } })
    },

    onReturnClick() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>

</style>