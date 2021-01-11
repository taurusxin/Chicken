import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '飞哥吃鸡记录 - 首页'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      title: '飞哥吃鸡记录 - 吃鸡历史'
    }
  },
  {
    path: '/notify',
    name: 'Notify',
    component: () => import('../views/Notify.vue'),
    meta: {
      title: '飞哥吃鸡记录 - 提醒'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
