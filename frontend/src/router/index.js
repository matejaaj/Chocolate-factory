import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Factories from '@/views/Factories.vue'
import FactoryDetails from '@/views/FactoryDetails.vue';
import EditChocolate from '@/views/EditChocolate.vue';
import AddChocolate from '@/views/AddChocolate.vue';

const routes = [
  { path: '/home', component: HomePage },
  { path: '/factories', component: Factories },
  { path: '/factories/:id', component: FactoryDetails, props: true },
  { path: '/edit-chocolate/:id', component: EditChocolate, props: true },
  { path: '/add-chocolate/:factoryId', component: AddChocolate, props: true }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
