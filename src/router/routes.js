import Dashboard from '@/modules/dashboard/views/Dashboard.vue';
import Users from '@/modules/users/views/Users.vue';
import CreateUser from '@/modules/users/CreateUser.vue';
import Settings from '@/modules/settings/views/Settings.vue';
import Login from '@/views/Login.vue';
import Products from '../modules/products/views/Products.vue';
import ProductCreate from '../modules/products/Createproducts.vue';
import ProductDetails from '../modules/products/views/ProductDetails.vue';
import ProductEdit from '../modules/products/views/ProductEdit.vue';

export const appRoutes = [
  {
    path: '/',
    component: Dashboard,
    label: 'Dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0 0H7m6 0h6" /></svg>`
    ,subRouutes: []
  },
  {
    path: '/users',
    component: Users,
    label: 'Users',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75" /></svg>`,
    subRouutes: [
        {
            path: '/users/create',
            component: CreateUser,
            label: 'Create User'
          },
          {
            path: '/users/:id/detail',
            component: ProductDetails,
            label: 'Users Details'
          },
          {
            path: '/users/:id/edit',
            component: ProductCreate,
            label: 'Users edit'
          },
    ]
  },
  {
    path: '/products',
    component: Products,
    label: 'Products',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75" /></svg>`,
    subRouutes: [
        {
            path: '/products/:id/details',
            component: ProductDetails,
            label: 'Product Details'
          },
          {
            path: '/products/:id/edit',
            component: ProductEdit,
            label: 'Product Edit'
          },
          {
            path: '/products/create',
            component: ProductCreate,
            label: 'Users'
          },
    ]
  },
  {
    path: '/settings',
    component: Settings,
    label: 'Settings',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    ,subRouutes: []
  },
  {
    path: '/login',
    component: Login,
    label: 'Login',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    ,subRouutes: []
  }
];