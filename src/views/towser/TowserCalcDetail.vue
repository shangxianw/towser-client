<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="结算详情"></van-nav-bar>
    <van-cell-group>
      <van-cell title="赞助商" :value="info.sponsorName" />
      <van-cell title="结束时间" :value="info.endTime" />
      <van-cell title="总金额" :value="info.money" />
      <van-cell title="每人可分得约" :value="guafen" />
    </van-cell-group>
    <van-button :disabled="!canCalc" type="primary" @click="onCalcClick">结算</van-button>
    <van-cell-group :title="`已通关用户(${list.length}人)`">
      <van-cell v-for="item in list" :key="item.account" :value="item.account" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      list: [],
      id: this.$route.query.id
    }
  },

  computed: {
    guafen() {
      if (this.list.length === 0) return this.info.money;
      return Number(this.info.money / this.list.length).toFixed(2);
    },

    canCalc() {
      return this.info.isCalc === 0;
    }
  },

  created() {
    let url = `${process.env.VUE_APP_BASE_URL}/getCalcDetail`;
    let params = {
      id: this.id
    }
    this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.info = resp.result;
      }
    })

    url = `${process.env.VUE_APP_BASE_URL}/getWinPlayer`;
    params = {
      activity: this.id
    }
    this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.list = resp.result;
      }
    })
  },

  methods: {
    onCalcClick() {
      this.$dialog.confirm({ message: "是否进行结算" }).then(() => {
        const url = `${process.env.VUE_APP_BASE_URL}/calcActivity`;
        const data = {
          id: this.id
        }
        this.$api.post(url, data).then(resp => resp.data).then(resp => {
          if (resp.code === 1) {
            alert(`结算成功`)
            this.info.isCalc = 1;
          }
        })
      })
    },

    onSubmit() {
      const url = `${process.env.VUE_APP_BASE_URL}/updateSponsorDetail`;
      const data = {
        id: this.id,
        name: this.info.name,
        desc: this.info.desc,
      }
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`更新成功`)
        }
      })
    },

    onDelClick() {
      this.$dialog.confirm({ message: "是否删除该赞助商" }).then(() => {
        const url = `${process.env.VUE_APP_BASE_URL}/deleteSponsor`;
        const data = {
          id: this.id
        }
        this.$api.post(url, data).then(resp => resp.data).then(resp => {
          if (resp.code === 1) {
            alert(`删除成功`);
            this.$router.back();
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.van-button {
  width: 100%;
  display: block;
}
</style>
