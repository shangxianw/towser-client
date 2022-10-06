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
    path: '/winPlayerList',
    name: 'winPlayerList',
    component: () => import(/* webpackChunkName: "winPlayerList" */ '../views/WinPlayerList.vue')
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
  },
  {
    path: '/well',
    name: 'well',
    component: () => import(/* webpackChunkName: "well" */ '../views/Well.vue')
  },
  {
    path: '/towser',
    name: 'towser',
    component: () => import(/* webpackChunkName: "towser" */ '../views/towser/Towser.vue')
  },
  {
    path: '/towserWell',
    name: 'towserWell',
    component: () => import(/* webpackChunkName: "towser" */ '../views/towser/TowserWell.vue')
  },
  {
    path: '/towserSponsor',
    name: 'towserSponsor',
    component: () => import(/* webpackChunkName: "towserSponsor" */ '../views/towser/TowserSponsor.vue')
  },
  {
    path: '/towserSponsorDetail',
    name: 'towserSponsorDetail',
    component: () => import(/* webpackChunkName: "towserSponsorDetail" */ '../views/towser/TowserSponsorDetail.vue')
  },
  {
    path: '/towserUser',
    name: 'towserUser',
    component: () => import(/* webpackChunkName: "towserUser" */ '../views/towser/TowserUser.vue')
  },
  {
    path: '/towserUserDetail',
    name: 'towserUserDetail',
    component: () => import(/* webpackChunkName: "towserUserDetail" */ '../views/towser/TowserUserDetail.vue')
  },
  {
    path: '/addNewUser',
    name: 'addNewUser',
    component: () => import(/* webpackChunkName: "addNewUser" */ '../views/towser/AddNewUser.vue')
  },
  {
    path: '/addNewSponsor',
    name: 'addNewSponsor',
    component: () => import(/* webpackChunkName: "addNewSponsor" */ '../views/towser/AddNewSponsor.vue')
  },
  {
    path: '/addNewActivity',
    name: 'addNewActivity',
    component: () => import(/* webpackChunkName: "addNewActivity" */ '../views/towser/AddNewActivity.vue')
  },
  {
    path: '/towserCalc',
    name: 'towserCalc',
    component: () => import(/* webpackChunkName: "towserCalc" */ '../views/towser/TowserCalc.vue')
  },
  {
    path: '/towserCalcDetail',
    name: 'towserCalcDetail',
    component: () => import(/* webpackChunkName: "towserCalcDetail" */ '../views/towser/TowserCalcDetail.vue')
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
