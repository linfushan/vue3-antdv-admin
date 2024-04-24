import type { App } from 'vue';
import 'ant-design-vue/dist/reset.css';
import { AButton } from '@/components/basic/button/';
import { PDrawer } from '@/components/basic/page-drawer';

export function setupAntd(app: App<Element>) {
  app.component('AButton', AButton);
  app.component('PDrawer', PDrawer);
}
