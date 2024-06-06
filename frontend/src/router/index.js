import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Factories from '@/views/Factories.vue'

const routes = [
  { path: '/home', component: HomePage },
  { path: '/factories', component: Factories }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
