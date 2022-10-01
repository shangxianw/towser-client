<template>
  <div class="container" @click="onClick">
    <van-image v-if="info.sponsor" fix="contain" :src="`http://localhost:9080/sponsor/${info.sponsor}/frontcover.png`"
      :style="{minHeight: '100px'}" />
    <div class="titleContainer">
      <van-tag mark type="primary">{{info.gameName}}</van-tag>
      <p>{{leftTime}}</p>
    </div>
    <div class="sponsorContainer">
      <van-icon name="star-o" />
      <span>{{info.sponsorName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },

  data() {
    return {
      leftTime: "",
      timer: null
    }
  },

  created() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.updateLeftTime();
    }, 50);
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },

  methods: {
    onClick() {
      this.$router.push({
        path: "detail",
        query: {
          activity: this.info.id
        }
      })
    },

    updateLeftTime() {
      if (!this.info || !this.info.end) return;
      const end = new Date(this.info.end);
      const now = Date.now();
      const space = end - now;
      if (space < 0)
        return this.leftTime = `已过期`;

      this.leftTime = this.$utils.timeStamp2LeftTime(space);
    }
  }
}
</script>

<style scoped>
.container {
  border-radius: 4px;
  margin-top: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0 0 8px 0;
}

.titleContainer p {}
</style>
