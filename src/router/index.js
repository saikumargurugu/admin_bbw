// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/modules/dashboard/views/Dashboard.vue'
import Users from '@/modules/users/views/Users.vue'
import CreateUser from '@/modules/users/CreateUser.vue'
import Settings from '@/modules/settings/views/Settings.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/users/create', component: CreateUser },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router // <- This is essential!
