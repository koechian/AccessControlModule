import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
