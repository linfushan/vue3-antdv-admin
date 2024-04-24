export const LOGIN_NAME = 'Login';

export const REGISTER_NAME = 'Register';

export const FORGET_NAME = 'Forget';

export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const DEFAULT_ROUTE_PATH = '/homepage';
// 路由白名单
export const whiteNameList = [
  LOGIN_NAME,
  REGISTER_NAME,
  FORGET_NAME,
  'icons',
  'error',
  'error-404',
] as const; // no redirect whitelist

export type WhiteNameList = typeof whiteNameList;

export type WhiteName = (typeof whiteNameList)[number];
