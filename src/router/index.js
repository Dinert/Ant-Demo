import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/drag',
    name: 'Drag',
    component: () => import('@/views/Drags.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/Demo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
