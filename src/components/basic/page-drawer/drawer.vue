<script setup lang="ts" name="index">
  import { ref, watchEffect, h } from 'vue';
  import { useWindowSize } from '@vueuse/core';
  import { storeToRefs } from 'pinia';
  import { RollbackOutlined } from '@ant-design/icons-vue';
  import type { APlacementType } from './drawer';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';
  const layoutSettingStore = useLayoutSettingStore();
  const { layoutSetting } = storeToRefs(layoutSettingStore);
  defineOptions({});

  const props = defineProps({
    type: {
      type: String,
      value: ['dialog', 'page'],
      default: 'dialog',
    },
    placement: {
      type: String as PropType<APlacementType>,
      default: 'right',
    },
  });
  // 获取浏览器可是宽度
  const { width } = useWindowSize();
  let drawerWidth = ref<number>(width.value - (!layoutSetting.value.collpased ? 264 : 80));
  watchEffect(() => {
    drawerWidth.value = width.value - (!layoutSetting.value.collpased ? 264 : 80);
  });

  // 关闭
  const emit = defineEmits(['update:open', 'close']);
  const handleCloseDrawer = () => {
    emit('update:open', false);
  };
</script>

<script lang="ts">
  export default {
    name: 'Drawer',
  };
</script>

<template>
  <a-drawer
    v-bind="{ ...$attrs, ...props }"
    rootClassName="project-page-drawer"
    :width="drawerWidth"
    :maskClosable="false"
    :closable="false"
    :mask="false"
  >
    <template #title>
      <a-button :icon="h(RollbackOutlined)" @click="handleCloseDrawer()">返回</a-button>
      <slot name="title-right" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
    <template v-for="(_, key) in $slots" #[key]>
      <slot :name="key" />
    </template>
  </a-drawer>
</template>

<style lang="less" scoped>
  :global(.ant-drawer.project-page-drawer) {
    top: calc(var(--app-header-height) + 40px);
  }

  :global(.project-page-drawer .ant-drawer-content-wrapper) {
    box-shadow: none;
  }

  :global(.project-page-drawer .ant-drawer-title) {
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
