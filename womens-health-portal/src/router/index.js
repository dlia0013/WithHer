import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProDashboard from '../views/ProDashboard.vue';
import LoginRegister from '../components/LoginRegister.vue';
import Hub from '../views/MyHealthHub.vue';
import { isAuthenticated, hasRole } from '../services/auth';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/learn', component: () => import('../views/LearnExplore.vue') },
  { path: '/care', component: () => import('../views/FindCare.vue') },
  { path: '/community', component: () => import('../views/CommunitySupport.vue') },
  { path: '/about', component: () => import('../views/AboutUs.vue') },

  { path: '/auth', name: 'auth', component: LoginRegister },
  { path: '/hub', name: 'hub', component: Hub, meta: { requiresAuth: true } },

  { path: '/pro', name: 'pro', component: ProDashboard, meta: { requiresAuth: true, roles: ['pro'] } },

  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) return { name: 'auth' };
  if (to.meta.roles && !hasRole(...to.meta.roles)) return { name: 'hub' };
  return true;
});

export default router;