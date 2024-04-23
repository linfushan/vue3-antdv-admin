import type { RouteRecordRaw } from 'vue-router';

const moduleName = 'homepage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/homepage',
    name: `${moduleName}`,
    component: () => import('@/views/homepage/index.vue'),
    meta: {
      title: '首页',
      icon: 'ant-design:home-outlined',
    },
  },
];

export default routes;
