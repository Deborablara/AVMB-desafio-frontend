import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('src/pages/home/index.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/notFound/index.vue'),
  },
];

export default routes;
