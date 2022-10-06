<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="新增赞助商"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="info.name" name="name" label="赞助商" :rules="[{ required: true, message: '请填写赞助商' }]" />
        <van-field v-model="info.desc" type="textarea" name="desc" label="描述" placeholder="描述" autosize />
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
        name: "",
        desc: ""
      }
    }
  },

  methods: {
    onSubmit() {
      const url = `${process.env.VUE_APP_BASE_URL}/addNewSpponsor`;
      const data = this.info;
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`添加成功`);
          this.$router.back();
        }
      })
    }
  }
}
</script>

<style scoped>
.listContainer {
  width: 94%;
  margin: 8px auto;
}
</style>
