<template>
  <div class="container">
    <div class="infoContainer">
      <div>
        <p>{{row}} x {{col}} {{boom}}颗雷</p>
        <van-button @click="onReturnClick">返回详情页</van-button>
      </div>
    </div>
    <div v-for="(row, index) in arrs" :key="index" :style="rowStyle">
      <div v-for="item in row" :key="item.col" :style="showCellStyle(item)" @click="onCellClick(item)">
        {{showCalc(item) ? item.calc : ""}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activity: Number
  },

  data() {
    return {
      gameType: null,
      spec: null,
      row: null,
      col: null,
      boom: null,
      arrs: this.chessBoards || [],
      token: null,
      config: {},

      colorCfg: {
        1: "lightgreen",
        2: "lightblue",
        3: "orange",
        4: "blur",
        5: "purple",
        6: "red",
        7: "red",
        8: "red"
      }
    }
  },

  created() {
    const url = `${process.env.VUE_APP_FILE_URL}/sponsor/${this.activity}/config.json`
    this.$api.get(url).then(resp => resp.data).then(resp => {
      this.config = resp;
    })
    this.getChessBoards();
  },

  computed: {
    rowStyle() {
      return {
        display: "flex",
        justifyContent: "center"
      }
    },

    sideLength() {
      return Math.floor(document.body.offsetWidth / (this.col + 2));
    }
  },

  methods: {
    getChessBoards() {
      const params = {
        activity: this.activity
      }
      const url = `${process.env.VUE_APP_BASE_URL}/startGame`;
      this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          const result = resp.result;
          this.gameType = result.gameType;
          this.spec = result.spec;
          this.row = result.row;
          this.col = result.col;
          this.boom = result.boom;
          this.arrs = result.chessBoards;
          this.token = result.token;
          this.status = result.status;
        } else {
          alert(resp.msg);
        }
      })
    },

    onCellClick(item) {
      if (typeof item.calc === "number") return;
      if (this.status === 2) return;
      const { row, col } = item;
      const data = {
        row,
        col,
        token: this.token
      }
      const url = `${process.env.VUE_APP_BASE_URL}/openBoomCell`;
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          const { token, chessBoards, status } = resp.result
          this.arrs = chessBoards;
          this.token = token;
          this.status = status;

          if (Number(status === 2)) {
            alert("已结束！")
          } else if (Number(status === 3)) {
            alert("恭喜你通过对局!")
          }
        } else {
          alert(resp.msg);
        }
      })
    },

    onReturnClick() {
      this.$router.push({
        path: "detail",
        query: {
          activity: this.activity
        }
      })
    },

    showCalc(item) {
      return !item.isBoom && typeof item.calc === "number" && item.calc > 0;
    },

    showCellStyle(item) {
      const style = {
        width: `${this.sideLength}px`,
        height: `${this.sideLength}px`,
        display: "inline-block",
        border: "1px solid #ccc",
        margin: "2px",
        backgroundColor: "#ccc",
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: `${this.sideLength}px`
      };

      if (item.isBoom) {
        style.backgroundColor = "blue";
        return style;
      }

      // 计算过，但结果为0
      if (item.calc === 0) {
        style.backgroundColor = "#fff";
        return style;
      }

      if (typeof item.calc === "number") {
        style.backgroundColor = "#fff";
        style.color = this.colorCfg[item.calc] || "#000";
      }

      return style
    }
  }
}
</script>

<style scoped>
.infoContainer {
  margin: 0 0 12px 0;
}

.infoContainer {
  height: 120px;
  background-color: #fff;
}
</style>
