<script setup lang="ts">
  // import { storeToRefs } from 'pinia';
  // import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  // const layoutSettingStore = useLayoutSettingStore();
  // const { layoutSetting } = storeToRefs(layoutSettingStore);
  import { h } from 'vue';
  import { AppstoreOutlined, ReloadOutlined } from '@ant-design/icons-vue';
  defineOptions({
    name: 'menu-footer',
  });
  const props = defineProps({
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
  });
</script>

<template>
  <div class="menu-footer">
    <a-divider style="margin: 0" />
    <ul v-if="!props.collapsed" class="menu-footer-list">
      <li>EUR/CNY: <span>7.322</span></li>
      <li>USD/CNY: <span>7.322</span></li>
    </ul>
    <div v-if="!props.collapsed" class="menu-footer-btns">
      <a-button type="link" :icon="h(AppstoreOutlined)">设置</a-button>
      <a-divider type="vertical" style="height: 18px" />
      <a-button type="link" :icon="h(ReloadOutlined)">刷新</a-button>
    </div>
    <div v-if="props.collapsed" class="menu-footer-btns" style="padding-top: 12px">
      <a-popover placement="leftBottom">
        <template #content>
          <ul class="menu-footer-list">
            <li>EUR/CNY: <span>7.322</span></li>
            <li>USD/CNY: <span>7.322</span></li>
          </ul>
          <div class="menu-footer-btns">
            <a-button type="link" :icon="h(AppstoreOutlined)">设置</a-button>
            <a-divider type="vertical" style="height: 18px" />
            <a-button type="link" :icon="h(ReloadOutlined)">刷新</a-button>
          </div>
        </template>
        <a-button type="link" :icon="h(AppstoreOutlined)" />
      </a-popover>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .menu-footer {
    // position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 4px;
    text-align: center;
  }

  ul.menu-footer-list {
    margin: 8px 0;
    padding: 0;
    list-style: none;
    text-align: center;

    li {
      @apply dark:color-white;

      line-height: 26px;

      span {
        color: var(--app-primary-color);
      }
    }
  }

  .menu-footer-btns {
    padding-bottom: 12px;

    :deep(.ant-btn-link) {
      @apply color-dark dark:color-white;

      &:hover {
        @apply color-blue;
      }
    }
  }

  .ant-popover-inner {
    .menu-footer-btns {
      padding-bottom: 0;
    }
  }
</style>
