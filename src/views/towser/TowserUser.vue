<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="用户"></van-nav-bar>
    <div class="optionContainer">
      <van-button type="primary" @click="onAddUser">新增用户</van-button>
    </div>
    <van-list>
      <van-cell-group inset v-for="item in list" :key="item" class="container">
        <van-cell :value="item.account" is-link :url="`#/towserUserDetail?id=${item.id}`" />
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },

  created() {
    const url = `${process.env.VUE_APP_BASE_URL}/getUserList`;
    this.$api.get(url).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.list = resp.result;
      }
    })
  },

  methods: {
    onAddUser() {
      this.$router.push("addNewUser")
    }
  }
}
</script>

<style scoped>
.optionContainer {
  height: 100px;
  background-color: #fff;
}
</style>
