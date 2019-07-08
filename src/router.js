import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/index.vue')
    },
    {
      path: '/regist',
      component: () => import('./views/regist.vue')
    },
    {
      path: '/login',
      component: () => import( './views/login.vue')
    },
    {
      path: '/room/:id',
      component: () => import( './views/room.vue')
    },
    {
      path: '/roomcreate',
      component: () => import( './views/roomcreate.vue')
    }
  ]
})
