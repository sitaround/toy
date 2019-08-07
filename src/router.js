import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DY from './components/DY.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/DY',
      name: 'DY',
      component: DY
    },
    {
      path: '*',
      component: () => import('./views/E404.vue')
    }
  ]
})
