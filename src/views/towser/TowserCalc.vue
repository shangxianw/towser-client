<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="活动列表"></van-nav-bar>
    <div class="optionContainer">
      <van-button type="primary" @click="onAddActivity">新增活动</van-button>
    </div>
    <van-tabs v-model:active="active" @click-tab="onChange">
      <van-tab title="未开始" name="0">
        <van-list>
          <van-cell-group v-for="item in list" :key="item">
            <van-cell :title="item.sponsorName" :url="`#/towserCalcDetail?id=${item.id}`" />
          </van-cell-group>
        </van-list>
      </van-tab>
      <van-tab title="进行中" name="1">
        <van-list>
          <van-cell-group v-for="item in list" :key="item">
            <van-cell :title="item.sponsorName" :url="`#/towserCalcDetail?id=${item.id}`" />
          </van-cell-group>
        </van-list>
      </van-tab>
      <van-tab title="未结算" name="2">
        <van-list>
          <van-cell-group v-for="item in list" :key="item">
            <van-cell :title="item.sponsorName" :url="`#/towserCalcDetail?id=${item.id}`" />
          </van-cell-group>
        </van-list>
      </van-tab>
      <van-tab title="已结算" name="3">
        <van-list>
          <van-cell-group v-for="item in list" :key="item">
            <van-cell :title="item.sponsorName" :url="`#/towserCalcDetail?id=${item.id}`" />
          </van-cell-group>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "0",
      list: []
    }
  },

  created() {
    this.onChange();
  },

  methods: {
    onAddActivity() {
      this.$router.push("addNewActivity")
    },

    onChange() {
      const url = `${process.env.VUE_APP_BASE_URL}/getCalcist`;
      const params = {
        type: this.active
      }
      this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          this.list = resp.result;
        }
      })
    },

    onAddUser() {
      this.$router.push("addNewUser")
    }
  }
}
</script>

<style scoped>
.calcContainer {
  display: block;
  margin-top: 8px;
  background-color: #fff;
}

.optionContainer {
  height: 100px;
  background-color: #fff;
}
</style>
