import demoRoutes from '../demos';
import homepageRoutes from './homepage';
import type { RouteRecordRaw } from 'vue-router';

let routes: Array<RouteRecordRaw> = [];
const productionRoutes = [...homepageRoutes];
if (process.env.NODE_ENV === 'development') {
  // 开发环境参考路由模版
  routes = [...productionRoutes, ...demoRoutes];
} else {
  // 其他环境(生产环境)
  routes = productionRoutes;
}

export default routes;
