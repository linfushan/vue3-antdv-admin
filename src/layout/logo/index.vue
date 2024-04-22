<template>
  <div
    class="logo"
    :class="{ 'full-top': layoutSetting.layout === 'fulltop', collapsed: collapsed }"
  >
    <img src="~@/assets/images/logo.png" alt="" />
    <h2 v-show="!collapsed" class="title">One Piece</h2>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  const layoutSettingStore = useLayoutSettingStore();
  const { layoutSetting } = storeToRefs(layoutSettingStore);
  defineProps({
    collapsed: {
      type: Boolean,
    },
  });
</script>

<style lang="less" scoped>
  .logo {
    @apply flex overflow-hidden whitespace-nowrap items-center;

    height: var(--app-header-height);
    padding-left: 24px;
    line-height: var(--app-header-height);

    &.full-top {
      min-width: calc(var(--app-sidemenu-width) - 18px);
      padding-left: 0;

      &.collapsed {
        min-width: auto;
      }
    }

    img {
      height: 32px;
      margin-right: 8px;
    }

    .title {
      @apply mb-0 text-xl;

      color: var(--app-primary-color);
    }
  }
</style>
