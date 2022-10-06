<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="新增活动"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-cell-group>
        <!-- 赞助商 -->
        <van-field v-model="info.sponsor" label="赞助商" />
        <!-- 描述 -->
        <van-field v-model="info.desc" label="描述" type="textarea" />

        <!-- 游戏类型 -->
        <van-field v-model="info.gameName" is-link readonly label="游戏类型" placeholder="请选择游戏" @click="gameShow = true" />
        <van-popup v-model:show="gameShow" round position="bottom">
          <van-cascader v-model="info.game" title="请选择游戏" :options="gameOptions" @finish="onGameFinish" />
        </van-popup>

        <!-- 金额 -->
        <van-field v-model="info.money" type="number" label="金额" />

        <!-- 开始时间 -->
        <van-field v-model="info.start" label="开始时间" placeholder="如2022-10-06 14:19:00" />
        <!-- 结束时间 -->
        <van-field v-model="info.end" label="结束时间" placeholder="如2022-10-06 14:19:00" />

        <!-- 详情图 -->
        <van-uploader upload-text="详情图" v-model="info.fileList" multiple />
        <!-- 封面图 -->
        <br />
        <van-uploader upload-text="封面图" v-model="info.frontcover" />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        sponsor: "贤哥来了",
        frontcover: [],
        desc: "我是描述",
        game: 1,
        gameName: "扫雷 10x10 5颗雷",
        spec: 1,
        money: 100,
        start: "2022-10-07 00:00:00",
        end: "2022-10-07 23:59:59",
        fileList: []
      },

      gameShow: false,
      gameOptions: [
        {
          text: "扫雷",
          value: 1,
          children: [
            {
              value: 1,
              text: "10x10 5颗雷"
            },
            {
              value: 2,
              text: "5x5 5颗雷"
            },
            {
              value: 3,
              text: "10x10 4颗雷"
            }
          ]
        }
      ],
    }
  },

  methods: {
    onSubmit() {
      console.log(this.info);
      const url = `${process.env.VUE_APP_BASE_URL}/addNewActivity`;
      const data = this.info;
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`nice`)
        }
      })
    },

    onGameFinish(selection) {
      let { text, value } = selection.selectedOptions[0];
      this.gameShow = false;
      this.info.game = value;

      const specInfo = selection.selectedOptions[1]
      this.info.spec = specInfo.value;
      this.info.gameName = `${text} / ${specInfo.text}`;
    }
  }
}
</script>

<style scoped>
.calcContainer {
  display: block;
  margin-top: 8px;
  background-color: #fff;
}

.optionContainer {
  height: 100px;
  background-color: #fff;
}

.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
