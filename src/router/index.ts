import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostView from '../views/PostView.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: PostView,
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

export default router