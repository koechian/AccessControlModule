import DashboardCRM from '@/views/CRMViews/Dashboard-CRM.vue';
import LoginCRM from '@/views/CRMViews/Login-CRM.vue';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/crmlogin', name: 'CRMLogin', component: LoginCRM },
  { path: '/crmdashboard', name: 'CRMDashboard', component: DashboardCRM },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
