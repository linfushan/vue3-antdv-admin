import type { RouteRecordRaw } from 'vue-router';
import { LOGIN_NAME, REGISTER_NAME } from '@/router/constant';

/**
 * layout布局之外的路由
 */
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: LOGIN_NAME,
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};
export const RegisterRoute: RouteRecordRaw = {
  path: '/register',
  name: REGISTER_NAME,
  component: () => import('@/views/login/register.vue'),
  meta: {
    title: '注册',
  },
};

export const CreateRoute: RouteRecordRaw = {
  path: '/create',
  name: 'CreateMerchant',
  component: () => import('@/views/user/create.vue'),
  meta: {
    title: '创建商家',
  },
};
export default [LoginRoute, RegisterRoute, CreateRoute];
