import { createRouter, createWebHistory } from 'vue-router';
import { Login } from '@/views/Login.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/about', name: 'About', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
