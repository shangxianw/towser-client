import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

import storage from "./common/storage";

// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";
import { Notify } from '@nutui/nutui';

const app = createApp(App)
window.app = app;

axios.defaults.withCredentials = true;
axios.interceptors.response.use(config => {
  // cookie相关
  if (String(config.data.code).includes("11020")) {
    location.href = "#/login";
  }
  return config;
})
app.config.globalProperties.$api = axios;
app.config.globalProperties.$message = Notify;
app.config.globalProperties.$storage = storage;

app.use(NutUI);
app.use(router)
app.mount('#app')
