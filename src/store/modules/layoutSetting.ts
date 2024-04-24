import { reactive, computed, watchPostEffect } from 'vue';
import { defineStore } from 'pinia';
import { theme as antdTheme } from 'ant-design-vue';
import themeToken from './themeToken';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { themeColor, type ThemeColor } from '@/layout/header/components/setting/constant';
/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 */

export type LayoutSetting = {
  navTheme: ThemeColor; // theme for nav menu
  colorPrimary: string; // '#F5222D', // primary color of ant design
  layout: 'sidemenu' | 'topmenu' | 'fulltop'; // nav menu position: `sidemenu` or `topmenu` , new 'fulltop'
  contentWidth: 'Fluid' | 'Fixed'; // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu or fulltop
  fixedHeader: false; // sticky header
  fixSiderbar: false; // sticky siderbar
  colorWeak: false;
  menu: {
    locale: true;
  };
  title: string;
  pwa: false;
  iconfontUrl: string;
  /** 是否缓存标签页 */
  cacheTabs: boolean;
  /** 面包屑是否下拉 */
  breadcrumbOverlay: boolean;
  /** 侧边栏关闭 */
  collpased: boolean;
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
};

export const defaultSetting: LayoutSetting = {
  navTheme: 'light', // theme for nav menu
  colorPrimary: '#1677FF', // '#F5222D', // primary color of ant design
  layout: 'fulltop', // nav menu position: `sidemenu` or `topmenu`、 'fulltop'
  contentWidth: 'Fixed', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'ERP',
  pwa: false,
  iconfontUrl: '',
  cacheTabs: false,
  breadcrumbOverlay: false,
  collpased: true,
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
};

export const useLayoutSettingStore = defineStore(
  'layout-setting',
  () => {
    const layoutSetting = reactive({ ...defaultSetting });

    const themeConfig = reactive<ThemeConfig>({
      algorithm: themeColor[layoutSetting.navTheme!] || antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: layoutSetting.colorPrimary,
        ...themeToken.token,
      },
    });
    // console.warn('themeConfig', themeConfig);
    const getNavTheme = computed(() => {
      return layoutSetting.navTheme;
    });

    watchPostEffect(() => {
      if (layoutSetting.navTheme) {
        toggleTheme(layoutSetting.navTheme);
      }
      if (layoutSetting.colorPrimary) {
        setColorPrimary(layoutSetting.colorPrimary);
      }
    });

    // 切换主题
    const toggleTheme = (navTheme: ThemeColor) => {
      if (navTheme === 'realDark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      themeConfig.algorithm = themeColor[navTheme];
    };

    /** 设置主题色 */
    const setColorPrimary = (color: string) => {
      themeConfig.token!.colorPrimary = color;
    };

    const updateLayoutSetting = (settings: Partial<LayoutSetting>) => {
      Object.assign(layoutSetting, settings);
    };
    /** 侧边栏状态 */
    const setSiderCollapsed = (collapsed: boolean) => {
      layoutSetting.collpased = collapsed;
    };
    return {
      layoutSetting,
      themeConfig,
      getNavTheme,
      toggleTheme,
      setColorPrimary,
      updateLayoutSetting,
      setSiderCollapsed,
    };
  },
  {
    persist: true,
  },
);
