<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="赞助商详情"></van-nav-bar>
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
      info: {},
      id: this.$route.query.id
    }
  },

  created() {
    const url = `${process.env.VUE_APP_BASE_URL}/getSponsorDetail`;
    const params = {
      id: this.id
    }
    this.$api.get(url, { params }).then(resp => resp.data).then(resp => {
      if (resp.code === 1) {
        this.info = resp.result;
      }
    })
  },

  methods: {
    onSubmit() {
      const url = `${process.env.VUE_APP_BASE_URL}/updateSponsorDetail`;
      const data = {
        id: this.id,
        name: this.info.name,
        desc: this.info.desc,
      }
      this.$api.post(url, data).then(resp => resp.data).then(resp => {
        if (resp.code === 1) {
          alert(`更新成功`)
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 12px;
}
</style>
