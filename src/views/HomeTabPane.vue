<template>
  <div>
    <van-nav-bar title="游戏大厅" fixed>
      <template #left>
        <van-icon name="ellipsis" @click="show = true" />
      </template>
    </van-nav-bar>
    <div class="listContainer">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-row gutter="12" justify="center">
          <van-col span="11">
            <Card v-for="(item, index) in leftCards" :key="index" :info="item" />
          </van-col>
          <van-col span="11">
            <Card v-for="(item, index) in rightCards" :key="index" :info="item" />
          </van-col>
        </van-row>
      </van-list>
    </div>
    <van-popup v-model:show="show" position="top" :style="{ height: '120px' }" @closed="onPopupClosed">
      <van-field name="radio" label="分类">
        <template #input>
          <van-radio-group v-model="kind" direction="horizontal">
            <van-radio name="1">默认</van-radio>
            <van-radio name="2">通关人数</van-radio>
            <van-radio name="3">玩家人数</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="排序">
        <template #input>
          <van-radio-group v-model="sort" direction="horizontal">
            <van-radio name="1">降序</van-radio>
            <van-radio name="2">升序</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-popup>

  </div>
</template>

<script>
import Card from '../components/Card.vue';
const components = { Card }
export default {
  components,
  data() {
    return {
      kind: "1",
      sort: "1",
      loading: false,
      finished: true,
      list: [{}, {}],
      show: false
    }
  },

  computed: {
    leftCards() {
      return this.list.filter((item, index) => index % 2 === 0);
    },

    rightCards() {
      return this.list.filter((item, index) => index % 2 === 1);
    },
  },

  created() {
    this.updateList();
  },

  methods: {
    updateList() {
      const params = {
        kind: this.kind,
        sort: this.sort
      }
      const url = `${process.env.VUE_APP_BASE_URL}/getActivityList`;
      this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          this.list = resp.result
        } else {
          alert(resp.msg)
        }
      })
    },

    onPopupClosed() {
      this.updateList();
    },

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 100; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 400) {
      //     this.finished = true;
      //   }
      // }, 1000);
    }
  }
}
</script>

<style scoped>
.listContainer {
  margin-top: 46px;
}
</style>
