<template>
  <div class="container" @click="onClick">
    <div class="imgBox">
      <nut-image :src="`http://localhost:9080/sponsor/${info.sponsor}/frontcover.png`" fit="contain" showError
        :style="{minHeight: '100px'}">
        <template #error> 加载失败 </template>
      </nut-image>
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
    <div class="sponsorInfo">
      <nut-icon class="sponerIcon" name="shop"></nut-icon>
      <span>{{info.sponsorName}}</span>
    </div>
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
  border-radius: 4px;
  margin-top: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0 0 8px 0;
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
  padding: 8px 8px 0 0;
}

.titleInfo p {
  float: right;
}

.sponsorInfo {
  clear: both;
  width: 100%;
  color: #bbb;
  font-size: 14px;
  margin: 8px 0 0 4px;
}

.sponerIcon {
  height: 1.5ex;
}
</style>