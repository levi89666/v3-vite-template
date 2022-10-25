// import 'ant-design-vue/dist/antd.css';
import 'sanitize.css';
import './styles/index.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

const app = createApp(App);

app.use(store);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
