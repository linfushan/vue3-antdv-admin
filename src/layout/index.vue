<template>
  <Layout class="layout">
    <Layout.Sider
      v-if="layoutSetting.layout === 'sidemenu'"
      v-model:collapsed="layoutSetting.collpased"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme"
      class="layout-sider"
    >
      <Logo :collapsed="layoutSetting.collpased" />
      <AsideMenu :collapsed="layoutSetting.collpased" :theme="getTheme" />
    </Layout.Sider>
    <Layout>
      <PageHeader v-model:collapsed="layoutSetting.collpased" :theme="getTheme">
        <template v-if="layoutSetting.layout === 'topmenu'" #left>
          <Logo :collapsed="layoutSetting.collpased" />
        </template>
        <template v-if="layoutSetting.layout === 'topmenu'" #menu>
          <AsideMenu :collapsed="layoutSetting.collpased" :theme="getTheme" />
        </template>
      </PageHeader>
      <Layout.Content class="layout-content">
        <Layout>
          <Layout.Sider
            v-if="layoutSetting.layout === 'fulltop'"
            v-model:collapsed="layoutSetting.collpased"
            :width="asiderWidth"
            :trigger="null"
            collapsible
            :theme="getTheme"
            class="layout-sider"
          >
            <AsideMenu :collapsed="layoutSetting.collpased" :theme="getTheme" />
          </Layout.Sider>
          <Layout.Content>
            <tabs-view />
          </Layout.Content>
        </Layout>
      </Layout.Content>
      <PageFooter />
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { Layout } from 'ant-design-vue';
  import Logo from './logo/index.vue';
  import { TabsView } from './tabs';
  import AsideMenu from './menu/menu.vue';
  import PageHeader from './header/index.vue';
  import PageFooter from './footer';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  const layoutSettingStore = useLayoutSettingStore();
  const { layoutSetting } = storeToRefs(layoutSettingStore);

  // 自定义侧边栏菜单收缩和展开时的宽度
  const asiderWidth = computed(() => (!layoutSetting.value.collpased ? 264 : 80));
  const getTheme = computed(() => (layoutSetting.value.navTheme === 'light' ? 'light' : 'dark'));
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;

    .ant-layout {
      overflow: hidden;
    }

    .layout-content {
      flex: none;
    }
  }
</style>
