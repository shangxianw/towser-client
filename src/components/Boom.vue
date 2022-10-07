<template>
  <div class="container">
    <div class="titleContainer">扫雷大作战</div>
    <div class="chessBoardContainer">
      <div v-for="(row, index) in arrs" :key="index" :style="rowStyle">
        <div v-for="item in row" :key="item.col" :style="showCellStyle(item)" @click="onCellClick(item)"
          @contextmenu.prevent="onContextMenuClick(item)">
          {{showCalc(item) ? item.calc : ""}}
        </div>
      </div>
    </div>
    <van-popup style="z-index: 100; border-top: 1px solid #ccc; box-shadow: 0px -2px 12px #ccc; height: 160px"
      :overlay="false" :round="true" :show="popupEndShow" position="bottom">
      <template #default>
        <div class="popupContainer">
          <span class="optionContainer">
            <van-space align="center">
              <van-button type="primary" @click="onQuit">退出游戏</van-button>
              <van-button type="primary" @click="onReplay">重新游戏</van-button>
            </van-space>
          </span>
        </div>
      </template>
    </van-popup>
    <van-popup closeable style="z-index: 101; border-top: 1px solid #ccc; box-shadow: 0px -2px 12px #ccc; height: 100px"
      :overlay="false" :round="true" :show="popupShow" position="bottom" @click-close-icon="onQuit">
      <template #default>
        <div class="popupContainer">
          <span class="flagContainer">
            <van-space align="center">
              插旗
              <van-switch v-model="flag" size="24" />
            </van-space>
          </span>
        </div>
      </template>
    </van-popup>
  </div>
</template>

<script>
const boomImg = require('../assets/boom/boom.png');
export default {
  props: {
    activity: Number
  },

  data() {
    return {
      flag: false,
      popupShow: false,
      popupEndShow: false,
      timer: null,
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
    const url = `${process.env.VUE_APP_FILE_URL}/activity/${this.activity}/config.json`
    this.$api.get(url).then(resp => resp.data).then(resp => {
      this.config = resp;
    })
    this.getChessBoards();


    this.popupEndShow = false;
    this.popupShow = false;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.popupShow = true;
    }, 100);
  },

  beforeUnmount() {
    clearTimeout(this.timer);
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
    },

    flagImg() {
      const flag = this.config?.image?.flag || "";
      return `${process.env.VUE_APP_FILE_URL}/activity/${this.activity}/${flag}`;
    }
  },

  methods: {
    getChessBoards() {
      const params = {
        activity: this.activity
      }
      const url = `${process.env.VUE_APP_BASE_URL}/startGame`;
      this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
        this.popupEndShow = false;
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
        }
        else if (resp.code === 4) {
          alert(resp.msg);
          this.$router.push({
            path: "detail",
            query: {
              activity: this.activity
            }
          })
        }
        else {
          alert(resp.msg);
        }
      })
    },

    onQuit() {
      this.$dialog.confirm({ message: "是否退出游戏" }).then(() => {
        this.$router.push({
          path: "detail",
          query: {
            activity: this.activity
          }
        })
      })
    },

    onReplay() {
      this.$dialog.confirm({ message: "是否重新开始游戏" }).then(() => {
        this.getChessBoards();
      })
    },

    onContextMenuClick(item) {
      this.onCellClick(item, true);
    },

    onCellClick(item, flag = this.flag) {
      const { row, col, isFlag } = item;
      if (typeof item.calc === "number" || isFlag) return;
      if (this.status === 2) return;
      const data = {
        row,
        col,
        isFlag: flag,
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
            this.popupEndShow = true;
            alert("已结束！")
          } else if (Number(status === 3)) {
            this.popupEndShow = true;
            alert("恭喜你通过对局!")
          }
        }
        else {
          alert(resp.msg);
        }
      })
    },

    showCalc(item) {
      return !item.isBoom && typeof item.calc === "number" && item.calc > 0 && !item.isFlag;
    },

    showCellStyle(item) {
      const style = {
        width: `${this.sideLength}px`,
        height: `${this.sideLength}px`,
        display: "inline-block",
        border: "1px solid #ccc",
        margin: "2px",
        backgroundColor: "#ccc",
        backgroundImage: ``,
        backgroundSize: `100% 100%`,
        color: "#000",
        fontWeight: "bold",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        boxSizing: "border-box",
        backgroundPosition: "center center",
        lineHeight: `${this.sideLength}px`
      };

      if (item.isFlag) {
        style.backgroundColor = "rgb(0, 170, 144)";
        style.backgroundImage = `url(${this.flagImg})`;
        return style;
      }

      if (item.isBoom) {
        style.backgroundImage = `url(${boomImg})`;
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
.container {
  /* height: 100%;
  position: relative; */
}

.titleContainer {
  margin-top: 40px;
  text-align: center;
  font-size: 50px;
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}

.popupContainer {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
}

.optionContainer {
  position: absolute;
  left: 50%;
  top: 8px;
  transform: translate(-50%, 0);
}

.flagContainer {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.chessBoardContainer {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
}
</style>
