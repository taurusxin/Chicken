import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// components
// import Antd from 'ant-design-vue'
import {Button, Radio, Divider, Modal, message, Table, Popconfirm, Skeleton, Input} from "ant-design-vue";

Vue.use(Button)
Vue.use(Radio)
Vue.use(Divider)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Skeleton)
Vue.use(Input)
Vue.prototype.$message = message
Vue.prototype.$modal = Modal

// global css
import 'ant-design-vue/dist/antd.min.css'

// axios
import axios from "axios";
Vue.prototype.$axios = axios;

// echarts
import * as echarts from 'echarts'
import 'echarts/theme/macarons2'
Vue.prototype.$echarts = echarts

// 标题插件
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
