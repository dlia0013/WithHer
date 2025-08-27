import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', redirect: '/learn' },
  { path: '/learn', component: () => import('@/views/LearnExplore.vue') },
  { path: '/care', component: () => import('@/views/FindCare.vue') },
  { path: '/community', component: () => import('@/views/CommunitySupport.vue') },
  { path: '/hub', component: () => import('@/views/MyHealthHub.vue') },
  { path: '/about', component: () => import('@/views/AboutUs.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
