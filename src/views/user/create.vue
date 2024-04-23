<script setup lang="ts" name="create">
  import { ref, reactive, toRaw, h } from 'vue';
  import {
    PlusOutlined,
    RightOutlined,
    LeftOutlined,
    CaretDownOutlined,
    LoginOutlined,
  } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import type { UnwrapRef } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import type { SelectProps } from 'ant-design-vue';
  const visibleDrawerSider = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const merchantList = ref();
  function initMerchant() {
    loading.value = true;
    // 初始化商家
    setTimeout(() => {
      loading.value = false;
      merchantList.value = [
        {
          icon: '',
          type: '零售1',
          name: '商家1',
          area: '区域1',
          status: '正常',
          description:
            '描述1*****************************************描述1*************************描述1描述1描述1描述1描述1描述1****************',
          position: '老板',
        },
        {
          icon: '',
          type: '零售2',
          name: '商家1',
          area: '区域1',
          status: '正常',
          description: '描述1*****************************************',
          position: '老板',
        },
      ];
    }, 3000);
  }
  initMerchant();
  const handleClickDrawerListItem = () => {
    visibleDrawerSider.value = false;
    visibleDialog.value = true;
  };
  const drawerClose = () => {};

  const createCreative = ref();
  const visibleDialog = ref<boolean>(true);
  const modalRef = ref();
  interface dialogForm {
    type: string;
    name: string;
    timeZone: string | undefined;
    baseCurrency: string | undefined;
    costCurrency: string | undefined;
  }
  const dialogRef = ref();
  const timeZoneOptions = ref<SelectProps['options']>([
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ]);
  const baseCurrencyOptions = ref<SelectProps['options']>([
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ]);
  const costCurrencyOptions = ref<SelectProps['options']>([
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ]);
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const dialogForm: UnwrapRef<dialogForm> = reactive({
    type: '零售',
    name: '',
    timeZone: '',
    baseCurrency: '',
    costCurrency: '',
  });

  const dialogRules: Record<string, Rule[]> = reactive({
    type: [{ required: true, message: '请选择店铺类型', trigger: 'change' }],
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    timeZone: [{ required: true, message: '请选择时区', trigger: 'change' }],
    baseCurrency: [{ required: true, message: '请选择基础货币', trigger: 'change' }],
    costCurrency: [{ required: true, message: '请选择成本货币', trigger: 'change' }],
  });

  const dialogBack = () => {
    visibleDialog.value = false;
    visibleDrawerSider.value = true;
  };
  const handleOk = () => {
    dialogRef.value
      .validate()
      .then(() => {
        message.loading({
          content: '创建中...',
          key: 'createAMerchant',
          duration: 0,
          style: { marginTop: '25%' },
        });
        setTimeout(() => {
          message.success({
            content: '创建成功!',
            key: 'createAMerchant',
            duration: 2,
            style: { marginTop: '25%' },
          });
          console.log('values', dialogForm, toRaw(dialogForm));
          dialogRef.value.resetFields();
          visibleDialog.value = false;
          visibleDrawerSider.value = true;
          merchantList.value = [];
          initMerchant();
        }, 1000);
      })
      .catch((error) => {
        console.error('创建商家验证', error);
      });
    console.log('dialogForm', dialogForm);
  };
  const handleCancel = () => {
    dialogRef.value.resetFields();
    dialogBack();
  };
</script>

<template>
  <div class="main merchant-wrapper">
    <!-- 选择商家 -->
    <a-drawer
      placement="left"
      :closable="false"
      :open="visibleDrawerSider"
      width="580px"
      title="ERP（商家端）"
      :maskClosable="false"
      :mask="false"
      closeIcon=""
      @close="drawerClose"
    >
      <template #extra>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item>
                <LoginOutlined />
                <span style="margin-left: 8px">退出</span>
              </a-menu-item>
            </a-menu>
          </template>
          <div class="drawer-dropdown-content">
            <a-avatar :size="24" src="" />
            <span>用户名</span>
            <CaretDownOutlined />
          </div>
        </a-dropdown>
      </template>

      <div class="drawer-list-header">
        <span>商家</span>
        <a-button type="primary" :icon="h(PlusOutlined)" @click="handleClickDrawerListItem()"
          >创建商家</a-button
        >
      </div>

      <div class="drawer-card-list">
        <a-card v-for="(item, index) in merchantList" :key="index" style="width: 100%">
          <div class="card-left">
            <a-avatar :size="40" :src="item.icon" />
            <span>{{ item.type }}</span>
          </div>
          <div class="card-right">
            <div class="card-right-left">
              <div class="card-right-left--top">
                <div class="name">{{ item.name }}</div>
                <span class="bage">{{ item.area }}</span>
              </div>
              <div class="card-right-left--bottom">
                {{ item.description }}
              </div>
            </div>

            <div class="card-right-right">
              <span class="position">{{ item.position }}</span>
              <RightOutlined />
            </div>
          </div>
        </a-card>
        <a-skeleton v-if="loading" active avatar>
          <a-list-item-meta
            v-for="(item, index) in [{ description: '', href: '', name: '', avatar: '' }]"
            :key="index"
            :description="item.description"
          >
            <template #title>
              <a :href="item.href">{{ item.name }}</a>
            </template>
            <template #avatar><a-avatar :src="item.avatar" /></template>
          </a-list-item-meta>
        </a-skeleton>
      </div>
    </a-drawer>

    <!-- 创建商家 -->
    <div ref="createCreative" class="create-creative">
      <a-modal
        ref="modalRef"
        v-model:open="visibleDialog"
        :maskClosable="false"
        :mask="false"
        :wrap-style="{ overflow: 'hidden' }"
        :getContainer="() => createCreative"
        width="572px"
        @cancel="handleCancel"
      >
        <template #title>
          <div style="cursor: pointer" @click="dialogBack">
            <LeftOutlined />
            <span class="title">创建商家</span>
          </div>
        </template>

        <a-form
          ref="dialogRef"
          layout="horizontal"
          :model="dialogForm"
          :rules="dialogRules"
          :label-col="{ style: { width: '80px' } }"
        >
          <a-form-item label="店铺类型" name="type">
            <a-radio-group v-model:value="dialogForm.type">
              <a-radio-button value="零售">零售</a-radio-button>
              <a-radio-button value="批发">批发</a-radio-button>
              <a-radio-button value="餐馆">餐馆</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="名称" name="name">
            <a-input v-model:value="dialogForm.name" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="时区" name="timeZone">
            <a-select
              v-model:value="dialogForm.timeZone"
              show-search
              placeholder="搜索选择"
              :options="timeZoneOptions"
              :filter-option="filterOption"
            />
          </a-form-item>
          <a-form-item label="基础货币" name="baseCurrency">
            <a-select
              v-model:value="dialogForm.baseCurrency"
              placeholder="请选择"
              :options="baseCurrencyOptions"
            />
          </a-form-item>
          <a-form-item label="成本货币" name="costCurrency">
            <a-select
              v-model:value="dialogForm.costCurrency"
              placeholder="请选择"
              :options="costCurrencyOptions"
            />
          </a-form-item>
        </a-form>

        <template #footer>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .merchant-wrapper {
    width: 100vw;
    height: 100vh;
    background: url('../../assets/modules/login/Login_bg.webp') no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  .drawer-list-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 10px;
  }

  .drawer-dropdown-content {
    display: flex;
    align-items: center;

    & > span {
      margin: 0 8px;
    }
  }

  .ant-card {
    margin-bottom: 10px;
    line-height: 1;
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    }
  }

  :deep(.ant-card-body) {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;

    .card-left {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      width: 40px;
      margin-right: 16px;

      span {
        color: rgb(0 0 0 / 45%);
        font-size: 14px;
        line-height: 22px;
      }
    }

    .card-right {
      display: flex;
      flex: 1;
      justify-content: space-between;
    }

    .card-right-left--top {
      display: flex;
      align-items: center;

      .bage {
        height: 20px;
        margin-left: 8px;
        padding: 4px 8px;
        border: 1px solid #ffa39e;
        border-radius: 2px;
        background-color: rgb(255 241 240 / 100%);
        color: rgb(245 34 45 / 100%);
        font-size: 12px;
      }

      .name {
        color: rgb(0 0 0 / 85%);
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      }
    }

    .card-right-left--bottom {
      display: -webkit-box;
      overflow: hidden;
      color: rgb(0 0 0 / 45%);
      line-height: 22px;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .card-right-right {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      padding-left: 8px;

      .position {
        margin-right: 12px;
        color: var(--app-primary-color);
      }
    }
  }
  // 弹窗
  .create-creative {
    :deep(.ant-modal) {
      &-content {
        padding: 0;
      }

      &-title {
        height: 56px;
        padding-left: 27px;
        box-shadow: inset 0 -1px 0 0 #f0f0f0;
        color: rgb(0 0 0 / 85%);
        font-size: 16px;
        font-weight: 400;
        line-height: 56px;

        .title {
          margin-left: 6px;
        }
      }

      &-body {
        padding: 16px 44px 24px;
      }

      &-footer {
        height: 52px;
        padding: 10px 16px;
        box-shadow: inset 0 1px 0 0 #f0f0f0;

        .ant-btn {
          border-radius: 6px;
          font-size: 14px;
        }
      }
    }

    .ant-radio-button-wrapper {
      color: rgb(0 0 0 / 88%);
      font-size: 14px;
    }

    .ant-radio-button-wrapper:first-child {
      border-radius: 6px 0 0 6px;
    }

    .ant-radio-button-wrapper:last-child {
      border-radius: 0 6px 6px 0;
    }

    .ant-select-selector,
    .ant-input {
      border-radius: 2px;
    }
  }

  .dark {
    .create-creative {
      :deep(.ant-modal) {
        &-title {
          box-shadow: inset 0 -1px 0 0 #000;
          color: rgb(255 255 255 / 85%);
        }

        &-footer {
          box-shadow: inset 0 1px 0 0 #000;
        }

        .ant-radio-button-wrapper {
          color: #fff;
        }
      }
    }

    .drawer-list-header {
      color: #fff;
    }

    .card-left {
      span {
        color: #fff;
      }
    }

    .card-right-left--top {
      .name {
        color: #fff;
      }
    }

    .card-right-left--bottom {
      color: rgb(255 255 255 / 45%);
    }

    .drawer-dropdown-content {
      & > span {
        color: #fff;
      }
    }
  }
</style>
