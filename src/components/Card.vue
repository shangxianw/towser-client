<template>
  <div class="container" @click="onClick">
    <div class="imgContainer">
      <van-image v-if="info.sponsor" fix="contain" :src="`${fileDomain}/sponsor/${info.sponsor}/frontcover.png`"
        :style="{minHeight: '100px', margin: '0 auto'}" />
      <div class="gameInfoContainer">
        <van-icon name="smile-o" />
        <span> {{info.winCount}} / {{info.playCount}}</span>
        <van-icon name="balance-o" />
        {{info.money}}
      </div>
    </div>
    <div class="titleContainer">
      <van-tag mark type="primary">{{info.gameName}}</van-tag>
      <van-count-down v-if="leftTime >= 0" class="leftTime" style="color: '#969799'" :time="leftTime"
        format="DD天HH时mm分ss秒" />
      <div v-else class="leftTime">已过期</div>
    </div>
    <div class="sponsorContainer">
      {{info.sponsorName}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },

  computed: {
    fileDomain() {
      return process.env.VUE_APP_FILE_URL
    },

    leftTime() {
      return new Date(this.info.end).getTime() - Date.now();
    }
  },

  methods: {
    onClick() {
      this.$router.push({
        path: "detail",
        query: {
          activity: this.info.id
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  border-radius: 8px;
  margin-top: 8px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 0 0 8px 0;
  overflow: hidden;
}

.imgContainer {
  position: relative;
}

.gameInfoContainer {
  position: absolute;
  bottom: 8px;
  left: 8px;
  color: #fff;
  font-size: 12px;
}

.gameInfoContainer span {
  margin-right: 12px;
  display: inline-block;
}

.van-image {
  width: 100%;
}

.leftTime {
  float: right;
  margin-right: 8px;
  line-height: -16px;
  font-size: 12px;
}

.sponsorContainer {
  color: #ccc;
  clear: both;
  margin-left: 4px;
  font-size: 14px;
}
</style>
