<template>
  <div id="main-tabs-view" class="tabs-view">
    <a-tabs
      :active-key="activeKey"
      hide-add
      type="editable-card"
      class="tabs"
      @change="changePage"
      @edit="editTabItem"
    >
      <a-tab-pane v-for="tabItem in tabsViewStore.getTabsList" :key="tabItem.fullPath">
        <template #tab>
          <TabsOperator
            :ref="(ins: TabsOperatorInstance) => (itemRefs[tabItem.fullPath] = ins)"
            :tab-item="tabItem"
          />
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <TabsOperator :tab-item="route" :is-extra="true" />
      </template>
    </a-tabs>
    <div class="tabs-view-content" :style="{ overflow }">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <Transition
              :name="transitionName"
              mode="out-in"
              appear
              @before-leave="overflow = 'hidden'"
              @after-leave="overflow = 'auto'"
            >
              <keep-alive :include="keepAliveComponents">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </Transition>
            <template #fallback> 正在加载... </template>
          </Suspense>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import TabsOperator from './tabs-operator.vue';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import { useKeepAliveStore } from '@/store/modules/keepAlive';

  type TabsOperatorInstance = InstanceType<typeof TabsOperator>;

  const route = useRoute();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();
  const keepAliveStore = useKeepAliveStore();

  const itemRefs: Recordable<TabsOperatorInstance | null> = {};

  // 解决路由切换动画出现滚动条闪烁问题
  const overflow = ref('auto');
  const activeKey = computed(() => tabsViewStore.getCurrentTab?.fullPath);
  // 缓存的路由组件列表
  const keepAliveComponents = computed(() => keepAliveStore.list);
  /** 过渡动画 */
  const transitionName = computed(() => {
    const name = route.meta?.transitionName;
    if (name === false) {
      return '';
    }
    return name ?? 'fade-slide';
  });

  // tabs 编辑（remove || add）
  const editTabItem = (targetKey: string, action: string) => {
    if (action == 'remove') {
      itemRefs[targetKey]?.removeTab();
    }
  };
  // 切换页面
  const changePage = (key) => {
    Object.is(route.fullPath, key) || router.push(key);
  };
</script>

<style lang="less" scoped>
  .tabs-view {
    @apply dark:bg-black;

    border-top: 1px solid #eee;
    background-color: rgb(245 245 245 / 100%);

    :deep(.tabs) {
      .ant-tabs-nav {
        @apply dark:bg-black;

        margin: 0;
        padding: 4px 8px 4px 10px;
        background-color: rgb(245 245 245 / 100%);
        user-select: none;
      }

      .ant-tabs-tabpane {
        display: none;
      }

      .ant-tabs-tab {
        position: relative;
        padding: 4px 16px;
        border-radius: 6px;
        background-color: transparent;
        color: rgb(0 0 0 / 65%);
        font-size: 14px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          width: 1px;
          height: 22px;
          background-color: rgb(0 0 0 / 15%);
        }

        &:first-child::before {
          display: none;
        }

        &.ant-tabs-tab-active {
          background-color: #fff;

          &::before,
          & + .ant-tabs-tab::before {
            display: none;
          }

          &:hover {
            span {
              color: rgb(0 0 0 / 88%);
              text-shadow: none;
            }
          }
        }

        &:hover {
          background-color: rgb(0 0 0 / 6%);

          &::before,
          & + .ant-tabs-tab::before {
            display: none;
          }
        }
      }

      .ant-tabs-tab-remove {
        display: flex;
        margin: 0;
        padding: 0;

        .anticon-close {
          margin-left: 6px;

          &:hover {
            background-color: rgb(0 0 0 / 6%);
          }
        }
      }

      .ant-tabs-tab:not(.ant-tabs-tab-active) {
        .ant-tabs-tab-remove {
          width: 0;
        }

        .anticon-close {
          visibility: hidden;
          width: 0;
          transition: width 0.3s;
        }

        &:hover {
          background-color: rgb(0 0 0 / 6%);
          color: rgb(0 0 0 / 88%);

          span {
            color: rgb(0 0 0 / 88%);
          }

          .anticon-close {
            visibility: visible;
            width: 12px;
            margin-left: 6px;

            &:hover {
              background-color: rgb(0 0 0 / 6%);
            }
          }

          .ant-tabs-tab-remove {
            width: unset;
          }
        }
      }

      .ant-tabs-extra-content {
        width: 36px;
        height: 30px;
        border-radius: 2px;
        background-color: #fff;
        font-size: 12px;
        line-height: 30px;
        text-align: center;

        span {
          color: rgb(102 102 102 / 100%);
        }
      }
    }

    .tabs-view-content {
      @apply bg-white dark:bg-black;

      /* height: calc(100vh - #{$header-height}); */
      height: calc(100vh - 100px - var(--app-footer-height));
      padding: 16px;
      overflow: auto;
    }
  }

  .dark .tabs-view {
    border-top: 1px solid black;

    :deep(.tabs) {
      .ant-tabs-tab {
        background-color: transparent;
        color: rgb(255 255 255 / 45%);

        &:hover,
        &.ant-tabs-tab-active {
          background-color: #111a2c;

          &:hover {
            span {
              color: #fff;
              text-shadow: none;
            }
          }
        }

        &:not(.ant-tabs-tab-active) {
          &:hover {
            color: #fff;
          }
        }
      }

      .ant-tabs-extra-content {
        background-color: #001529;
      }
    }
  }
</style>
