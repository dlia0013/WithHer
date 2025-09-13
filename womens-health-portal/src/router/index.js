import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated } from '../services/auth';
import LoginRegister from '../components/LoginRegister.vue';
const Hub = () => import('../views/MyHealthHub.vue');

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/learn', component: () => import('../views/LearnExplore.vue') },
  { path: '/care',  component: () => import('../views/FindCare.vue') },
  { path: '/community', component: () => import('../views/CommunitySupport.vue') },
  { path: '/about', component: () => import('../views/AboutUs.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
  { path: '/auth', name: 'auth', component: LoginRegister },
  { path: '/hub', name: 'hub', component: Hub, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'auth' };
  }
  return true;
});

export default router;