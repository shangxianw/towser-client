<template>
  <div class="container">
    <nut-menu scroll-fixed>
      <nut-menu-item v-model="kind" :options="kindOptions" @change="(value) => onMenuItemChange('kind', value)" />
      <nut-menu-item v-model="sort" :options="sortOptions" @change="(value) => onMenuItemChange('sort', value)" />
    </nut-menu>

    <nut-row type="flex" justify="space-evenly">
      <nut-col :span="11">
        <Card v-for="(item, index) in leftCards" :key="index" :info="item"></Card>
      </nut-col>
      <nut-col :span="11">
        <Card v-for="(item, index) in rightCards" :key="index" :info="item"></Card>
      </nut-col>
    </nut-row>
  </div>
</template>

<script>
import Card from './components/Card.vue';
import api from "@/common/api";

export default {
  components: { Card },
  data() {
    return {
      kind: "1",
      sort: "1",
      kindOptions: [
        { value: "1", text: "全部" },
        { value: "2", text: "通关人数" },
        { value: "3", text: "玩过人数" }
      ],
      sortOptions: [
        { value: "1", text: "降序" },
        { value: "2", text: "升序" }
      ],
      list: []
    }
  },

  created() {
    this.updateList();
  },

  computed: {
    leftCards() {
      return this.list.filter((item, index) => index % 2 === 0);
    },

    rightCards() {
      return this.list.filter((item, index) => index % 2 === 1);
    }
  },

  methods: {
    updateList() {
      const params = {
        kind: this.kind,
        sort: this.sort
      }
      this.$api.get(api.getActivityList, { params }).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          this.list = resp.result
        } else {
          this.$message.warn(resp.msg)
        }
      })
    },

    onScrollBottom() {

    },

    onMenuItemChange(type, value) {
      this[type] = value;
      this.updateList();
    }
  }
}
</script>

<style scoped>

</style>