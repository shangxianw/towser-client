<template>
  <div class="container" @click="onClick">
    <p>商家：{{info.sponsorName}}</p>
    <p>类型：{{info.gameName}}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    info: Object
  },

  data() {
    return {

    }
  },

  methods: {
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
  width: 160px;
  height: 200px;
  background-color: aquamarine;
}
</style>