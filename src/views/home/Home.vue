<template>
  <div>
    <nut-navbar title="游戏"></nut-navbar>
    <template v-for="item in list" :key="item.id">
      <Card :info="item"></Card>
    </template>
  </div>
</template>

<script>
import Card from './components/Card.vue';
import api from "@/common/api";

export default {
  components: { Card },
  data() {
    return {
      list: []
    }
  },

  created() {
    this.$api.get(api.getActivityList).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.list = resp.result
      } else {
        this.$message.warn(resp.msg)
      }
    })
  }
}
</script>

<style scoped>

</style>