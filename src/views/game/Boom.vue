<template>
  <div>
    <div class="sponsor-container">
      这里是金主爸爸show区
    </div>
    <div class="info-container">
      这里是信息区
    </div>
    <div v-for="(row, index) in arrs" :key="index" :style="rowStyle">
      <div v-for="item in row" :key="item.col" :style="showCellStyle(item)" @click="onCellClick(item)">
        {{showCalc(item) ? item.calc : ""}}
      </div>
    </div>
    <div>
      <nut-button @click="onReturnClick">返回详情页</nut-button>
    </div>
  </div>
</template>

<script>
import api from "@/common/api";

export default {
  components: {},
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
      token: null
    }
  },

  created() {
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
      this.$api.get(api.startGame, { params }).then(resp => resp.data).then(resp => {
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
          this.$message.warn(resp.msg);
        }
      })
    },

    onReturnClick() {
      this.$router.push({
        path: "detail",
        query: {
          id: this.activity
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
      this.$api.post(api.openBoomCell, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          const { token, chessBoards, status } = resp.result
          this.arrs = chessBoards;
          this.token = token;
          this.status = status;

          if (Number(status === 2)) {
            this.$message.warn("已结束！")
          } else if (Number(status === 3)) {
            this.$message.success("恭喜你通过对局!")
          }
        } else {
          this.$message.warn(resp.msg);
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
        style.color = "blur"
      }

      return style
    }
  }
}
</script>

<style scoped>
.sponsor-container {
  height: 120px;
  background-color: blanchedalmond;
}

.info-container {
  height: 120px;
  background-color: orange;
}
</style>