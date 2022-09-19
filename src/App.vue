<template>
  <div>
    <Main v-if="isMainRouter"></Main>
    <router-view></router-view>
  </div>
</template>

<script>
import Main from '@/views/main/Main.vue'

export default {
  name: 'Home',
  components: {
    Main
  },

  computed: {
    isMainRouter() {
      return ["main", "home", "user"].some(item => this.$route.name === item);
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
