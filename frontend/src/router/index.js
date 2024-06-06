import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Factories from '@/views/Factories.vue'
import FactoryDetails from '@/views/FactoryDetails.vue';

const routes = [
  { path: '/home', component: HomePage },
  { path: '/factories', component: Factories },
  { path: '/factories/:id', component: FactoryDetails, props: true }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
