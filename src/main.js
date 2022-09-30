import { createApp } from 'vue'
import App from './App.vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router';
import axios from "axios";

const app = createApp(App)
axios.defaults.withCredentials = true;
app.config.globalProperties.$api = axios;

app.use(Vant).use(router).mount('#app')
