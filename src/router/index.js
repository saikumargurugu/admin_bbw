// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase';
import Dashboard from '@/modules/dashboard/views/Dashboard.vue';
import Users from '@/modules/users/views/Users.vue';
import CreateUser from '@/modules/users/CreateUser.vue';
import Settings from '@/modules/settings/views/Settings.vue';
import Login from '../views/Login.vue';
const routes = [
  { path: '/', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/users/create', component: CreateUser },
  { path: '/settings', component: Settings },
  { path: '/login', component: Login},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (!user) {
    // Not logged in, redirect to login page
    if (to.path !== '/login') {
      return next('/login');
    }
    return next();
  }
  // Logged in, proceed
  next();
});

export default router; // <- This is essential!
