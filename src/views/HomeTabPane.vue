<template>
  <div>
    <van-nav-bar title="游戏大厅" fixed>
      <template #left>
        <van-icon name="ellipsis" size="24" @click="show=true" />
        <van-icon style="margin-left: 12px;" name="label-o" size="24" @click="foreshow=true" />
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
    <van-popup v-model:show="foreshow" position="bottom" :style="{ height: '600px', backgroundColor: '#f7f8fa' }"
      @open="onForeOpen">
      <van-divider>活动预告</van-divider>
      <div style="height: 536px;">
        <van-list style="height: 100%; overflow-y: auto;" :finished="true" finished-text="没有更多预告活动了">
          <van-row gutter="12" justify="center">
            <van-col span="11">
              <ForeCard v-for="(item, index) in leftForeCards" :key="index" :info="item" />
            </van-col>
            <van-col span="11">
              <ForeCard v-for="(item, index) in rightForeCards" :key="index" :info="item" />
            </van-col>
          </van-row>
        </van-list>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import ForeCard from '../components/ForeCard.vue';
const components = { Card, ForeCard }
export default {
  components,
  data() {
    return {
      kind: "1",
      sort: "1",
      loading: false,
      finished: true,
      list: [],
      forelist: [],
      show: false,
      foreshow: false
    }
  },

  computed: {
    leftCards() {
      return this.list.filter((item, index) => index % 2 === 0);
    },

    rightCards() {
      return this.list.filter((item, index) => index % 2 === 1);
    },

    leftForeCards() {
      return this.forelist.filter((item, index) => index % 2 === 0);
    },

    rightForeCards() {
      return this.forelist.filter((item, index) => index % 2 === 1);
    },
  },

  created() {
    this.updateList();
  },

  methods: {
    onForeOpen() {
      // 预告
      const url2 = `${process.env.VUE_APP_BASE_URL}/getForeActivityList`;
      this.$api.get(url2).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          this.forelist = resp.result
        } else {
          alert(resp.msg)
        }
      })
    },

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

.foreshowContainer {
  margin-top: 0px;
  height: 100%;
}

.forshowList {
  height: 80%;
  position: relative;
  background-color: aqua;
}
</style>
