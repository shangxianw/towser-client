<template>
  <div class="container" @click="onClick">
    <div class="imgBox">
      <nut-image src="//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg"
        width="100%" height="120"></nut-image>
      <div>
        <p class="winInfo">
          <nut-icon name="my"></nut-icon>
          {{info.winCount}}/{{info.playCount}}
        </p>
        <p class="coinInfo">
          <nut-icon name="order"></nut-icon>
          {{info.money}}
        </p>
      </div>
    </div>
    <div class="titleInfo">
      <nut-tag type="primary" mark>{{info.gameName}}</nut-tag>
      <p>{{leftTime}}</p>
    </div>
    <div class="sponsorInfo">{{info.sponsorName}}</div>
  </div>
</template>

<script>
import timeUtils from "@/common/timeUtils.js"
export default {
  components: {},
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
    updateLeftTime() {
      if (!this.info || !this.info.end) return;
      const end = new Date(this.info.end);
      const now = Date.now();
      const space = end - now;
      if (space < 0)
        return this.leftTime = `已过期`;

      this.leftTime = timeUtils.timeStamp2LeftTime(space);
    },

    onClick() {
      this.$router.push({
        path: "detail",
        query: {
          id: this.info.id
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 8px;
  border: 1px solid #ccc;
  background-color: aquamarine;
  padding: 0 0 4px 0;
}

.imgBox {
  color: #fff;
  position: relative;
}

.imgBox div {
  position: absolute;
  bottom: 4px;
  left: 0;

}

.imgBox div p {
  float: left;
  margin-left: 8px;
}

.titleInfo {
  clear: both;
  padding: 4px 4px 0 0;
}

.titleInfo p {
  float: right;
}

.sponsorInfo {
  width: 100%;
  margin-left: 4px;
}
</style>