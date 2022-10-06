<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="结算列表"></van-nav-bar>
    <van-tabs v-model:active="active" @click-tab="onChange">
      <van-tab title="未结算" name="0">
        <van-list>
          <van-cell-group v-for="item in list" :key="item">
            <van-cell :title="item.sponsorName" :url="`#/towserCalcDetail?id=${item.id}`" />
          </van-cell-group>
        </van-list>
      </van-tab>
      <van-tab title="已结算" name="1">
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
</style>
