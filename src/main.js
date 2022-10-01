import { createApp } from 'vue'
import App from './App.vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router';
import utils from './utils/common';
import axios from "axios";

const app = createApp(App)
axios.defaults.withCredentials = true;
app.config.globalProperties.$api = axios;
app.config.globalProperties.$utils = utils;
app.config.globalProperties.$dialog = Vant.Dialog;
axios.interceptors.response.use(config => {
    // cookie相关
    if ([1001, 1002, 1003, 1004].includes(Number(config?.data?.code))) {
        location.href = "#/login";
    }
    return config;
})

app.use(Vant)
app.use(router).mount('#app')
