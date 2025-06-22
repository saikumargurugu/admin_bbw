// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase';
import { appRoutes } from './routes';

// Helper to flatten routes and subRouutes
export const flattenRoutes = (routes) =>{
  const flat = [];
  routes.forEach(route => {
    const { subRouutes, ...mainRoute } = route;
    flat.push(mainRoute);
    if (Array.isArray(subRouutes)) {
      subRouutes.forEach(sub => flat.push(sub));
    }
  });
  return flat;
}

const routes = flattenRoutes(appRoutes);

function waitForFirebaseAuth() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      unsubscribe();
      resolve();
    });
  });
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await waitForFirebaseAuth();

  const isLoggedIn = localStorage.getItem('is_userlogged');
  const accessToken = localStorage.getItem('admin_access_token');
  const firebaseUser = auth.currentUser;

  if ((!isLoggedIn || !accessToken || !firebaseUser) && to.path !== '/login') {
    return next('/login');
  }
  if (isLoggedIn && accessToken && firebaseUser && to.path === '/login') {
    return next('/');
  }
  next();
});

export default router;
