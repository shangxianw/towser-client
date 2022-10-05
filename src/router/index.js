import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
  },
  {
    path: '/game',
    name: 'game',
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue')
  },
  {
    path: '/inviteBusiness',
    name: 'inviteBusiness',
    component: () => import(/* webpackChunkName: "inviteBusiness" */ '../views/InviteBusiness.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
