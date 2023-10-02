import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/main/index.vue'),
    children: [{
      path: '',
      name: 'home',
      component: () => import('src/pages/home/index.vue')
    }],
  },
  {
    path: '/envelopes/:repositorioId',
    component: () => import('src/layouts/main/index.vue'),
    children: [
      {
        path: '',
        name: 'envelopes',
        component: () => import('src/pages/envelopes/index.vue')
      }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/notFound/index.vue'),
  },
];

export default routes;
