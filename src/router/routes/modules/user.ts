import type { RouteRecordRaw } from 'vue-router';

const moduleName = 'homepage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: `${moduleName}`,
    component: () => import('@/views/user/create.vue'),
  },
];

export default routes;
