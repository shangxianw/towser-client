<template>
  <div>
    <Boom v-if="showBoom" :activity="activity"></Boom>
  </div>
</template>

<script>
import Boom from "./Boom.vue";

export default {
  components: { Boom },
  data() {
    return {
      activity: null,
      gameType: null
    }
  },

  created() {
    this.activity = this.$route.query.activity;
    this.gameType = this.$route.query.gameType;
  },

  computed: {
    showBoom() {
      return Number(this.gameType) === 1;
    }
  }
}
</script>

<style scoped>

</style>