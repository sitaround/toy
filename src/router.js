import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Post from './components/Post.vue'
import Portfolio from './components/Portfolio.vue'

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
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '*',
      component: () => import('./views/E404.vue')
    }
  ]
})
