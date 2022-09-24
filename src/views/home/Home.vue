<template>
  <div class="container">
    <nut-navbar title="游戏">
      <template #right>
        <nut-icon name="more-x" @click="onSortClick"></nut-icon>
      </template>
    </nut-navbar>

    <nut-popup position="right" :style="popupStyle" v-model:visible="popupVisible" @close="onPopupClose">
      <nut-cell-group title="分类">
        <nut-cell>
          <nut-radiogroup v-model="kind">
            <nut-radio v-for="item in kindOptions" :label="item.value" :key="item.value">{{item.text}}</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-cell-group>
      <nut-cell-group title="排序方式">
        <nut-cell>
          <nut-radiogroup v-model="sort">
            <nut-radio v-for="item in sortOptions" :label="item.value" :key="item.value">{{item.text}}</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-cell-group>
    </nut-popup>

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
      list: [],
      popupVisible: false
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
    },

    popupStyle() {
      return {
        width: "50%",
        minWidth: "200px",
        height: "100%"
      }
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

    onPopupClose() {
      this.updateList();
    },

    onSortClick() {
      this.popupVisible = true;
    },

    onMenuItemChange(type, value) {
      this[type] = value;
      this.updateList();
    }
  }
}
</script>

<style scoped>
.nut-navbar {
  margin-bottom: 0px;
}
</style>