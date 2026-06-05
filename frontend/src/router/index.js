import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginRegister from '@/components/LoginRegister.vue'
import Hub from '@/views/MyHealthHub.vue'
import { ready, isAuthenticated, hasRole } from '../services/auth'
import GuideView from '@/views/GuideView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/learn', component: () => import('@/views/LearnExplore.vue') },
  { path: '/care', component: () => import('@/views/FindCare.vue') },
  { path: '/community', component: () => import('@/views/CommunitySupport.vue') },
  { path: '/about', component: () => import('@/views/AboutUs.vue') },

  { path: '/providers/:id', name: 'provider-details', component: () => import('@/views/ProviderDetails.vue') },
  { path: '/auth', name: 'auth', component: LoginRegister },
  { path: '/hub', name: 'hub', component: Hub, meta: { requiresAuth: true } },
  { path: '/firebase-login', name: 'FireLogin', component: () => import('@/views/FirebaseSigninView.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue') },
  { path: '/guide', name: 'guide', component: GuideView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  await ready?.()

  const authed = isAuthenticated()

  if (to.name === 'auth' && authed) {
    return { name: 'hub' }
  }

  if (to.meta.requiresAuth && !authed) {
    return { name: 'auth', query: { redirect: to.fullPath } }
  }

  if (to.meta.roles && !hasRole(...to.meta.roles)) {
    return { name: 'hub' }
  }

  return true
})

export default router