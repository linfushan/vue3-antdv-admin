<template>
  <div class="login-box">
    <div class="login-box-card">
      <div class="login-logo">
        <img src="~@/assets/modules/login/Login_img_HSERP.svg" height="42" />
      </div>
      <a-form
        layout="horizontal"
        :model="loginFormModel"
        size="large"
        @submit.prevent="handleSubmit"
      >
        <a-tabs v-model:activeKey="activeKey" size="large" animated>
          <!-- 邮箱登录 -->
          <a-tab-pane key="1" :tab="t('login.signin.email')">
            <a-form-item>
              <a-input v-model:value="loginFormModel.username" placeholder="admin">
                <template #prefix>
                  <svg-icon name="MailFilled" size="22" style="margin: 0 12px 0 5px" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                v-model:value="loginFormModel.password"
                size="large"
                placeholder="a123456"
                autocomplete="new-password"
              >
                <template #prefix>
                  <svg-icon name="LockFilled" size="22" style="margin: 0 12px 0 5px" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-input
                v-model:value="loginFormModel.verifyCode"
                placeholder="验证码"
                :maxlength="4"
              >
                <template #prefix>
                  <Icon icon="ant-design:safety-outlined" style="margin: 0 12px 0 5px" />
                </template>
                <template #suffix>
                  <img
                    :src="captcha"
                    class="absolute right-0 h-full cursor-pointer"
                    @click="updateCaptcha"
                  />
                </template>
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <!-- 手机号 -->
          <a-tab-pane key="2" :tab="t('login.signin.mobile')">
            <a-form-item>
              <a-input-group compact>
                <a-select v-model:value="loginFormModel.username" style="width: 136px">
                  <a-select-option value="Zhejiang">Zhejiang</a-select-option>
                  <a-select-option value="Jiangsu">Jiangsu</a-select-option>
                </a-select>
                <a-input v-model:value="loginFormModel.username" style="width: 264px" />
              </a-input-group>
            </a-form-item>
            <a-form-item>
              <a-input
                v-model:value="loginFormModel.username"
                style="width: 282px; margin-right: 8px"
              />
              <a-button style="width: 110px">获取验证码</a-button>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <div class="btn-top-bar">
            <router-link to="/forget">忘记密码？</router-link>
          </div>
          <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
            登录
          </a-button>
          <div class="btn-bottom-bar">
            <span>没有账号？</span>
            <router-link to="/register">立即注册</router-link>
            <a-tooltip placement="top">
              <template #title>
                <span>中国</span>
              </template>
              <span class="flag-btn" @click.stop.prevent="showFlag = !showFlag">
                <a-image
                  :width="24"
                  :preview="false"
                  src="https://p2.img.cctvpic.com/photoworkspace/contentimg/2019/06/18/2019061809032325541.gif"
                />
              </span>
            </a-tooltip>
          </div>
          <div v-show="showFlag" class="flag-list">
            <a-tooltip v-for="(item, index) in 10" :key="index" placement="top">
              <template #title>
                <span>{{ item }}中国</span>
              </template>
              <span class="flag-btn">
                <a-image
                  :width="24"
                  :preview="false"
                  src="https://p2.img.cctvpic.com/photoworkspace/contentimg/2019/06/18/2019061809032325541.gif"
                />
              </span>
            </a-tooltip>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { message, Modal } from 'ant-design-vue';
  import { Icon } from '@/components/basic/icon';
  import { useUserStore } from '@/store/modules/user';
  import Api from '@/api/';
  import { to } from '@/utils/awaitTo';
  import { useI18n } from '@/hooks/useI18n';

  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const activeKey = ref('1');
  const loading = ref(false);
  const showFlag = ref(false);
  const captcha = ref('');
  const loginFormModel = ref({
    username: 'admin',
    password: 'a123456',
    verifyCode: '',
    captchaId: '',
  });

  const updateCaptcha = async () => {
    const data = await Api.captcha.captchaCaptchaByImg({ width: 100, height: 50 });
    captcha.value = data.img;
    loginFormModel.value.captchaId = data.id;
  };
  updateCaptcha();

  const handleSubmit = async () => {
    const { username, password, verifyCode } = loginFormModel.value;
    if (username.trim() == '' || password.trim() == '') {
      return message.warning('用户名或密码不能为空！');
    }
    if (!verifyCode) {
      return message.warning('请输入验证码！');
    }
    message.loading('登录中...', 0);
    loading.value = true;
    console.log(loginFormModel.value);
    // params.password = md5(password)

    const [err] = await to(userStore.login(loginFormModel.value));
    if (err) {
      Modal.error({
        title: () => '提示',
        content: () => err.message,
      });
      updateCaptcha();
    } else {
      message.success('登录成功！');
      setTimeout(() => router.replace((route.query.redirect as string) || '/'));
    }
    loading.value = false;
    message.destroy();
  };
</script>

<style lang="less" scoped>
  .login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: url('@/assets/modules/login/Login_bg.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    .login-box-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 462px;
      padding: 48px 30px;
      overflow: hidden;
      border-radius: 20px;
      background: linear-gradient(
        180deg,
        rgb(255 255 255 / 63%) 0%,
        rgb(255 255 255 / 64%) 21%,
        rgb(255 255 255 / 70%) 26%,
        rgb(255 255 255 / 40%) 100%
      );
      box-shadow:
        inset 0 2px 0 0 #fff,
        inset 0 -2px 0 0 #fff;
    }

    .login-logo {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    :deep(.ant-form) {
      width: 400px;

      .ant-col {
        width: 100%;
      }

      .ant-form-item {
        margin-bottom: 16px;
      }

      .ant-form-item-label {
        padding-right: 6px;
      }
    }

    .btn-top-bar {
      margin-top: -8px;
      margin-bottom: 32px;
      font-size: 14px;
      text-align: right;
    }

    .btn-bottom-bar {
      position: relative;
      margin-top: 16px;
      text-align: center;

      a {
        border-bottom: 1px solid var(--app-primary-color);
      }

      .flag-btn {
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }

    .flag-list {
      display: flex;
      margin-top: 16px;
      gap: 8px;
      cursor: pointer;
    }
  }

  // cover
  :deep(.ant-tabs-top) {
    width: 100%;

    & > .ant-tabs-nav {
      margin-bottom: 31px;

      &::before {
        border-bottom-color: #fff;
      }

      .ant-tabs-nav-wrap {
        justify-content: center;
      }

      .ant-tabs-tab {
        padding: 10px 0;
        font-size: 18px;

        .ant-tabs-tab-btn {
          text-shadow: none;
        }

        &:not(.ant-tabs-tab-active) {
          color: rgb(0 0 0 / 65%);
        }
      }
    }
  }

  :deep(.ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selector) {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-inline-end-color: transparent;
    border-inline-end-width: 0;

    &:focus,
    &:hover {
      border-inline-end-width: 1px;
      border-inline-end-color: var(--app-primary-color);
    }
  }

  :deep(.ant-input-group.ant-input-group-compact > *:not(:last-child)) {
    margin-inline-end: 0;
  }

  :deep(.ant-input-group.ant-input-group-compact > *:last-child) {
    border-inline-end-width: 0;
    border-inline-start-color: transparent;
    border-start-end-radius: 4px;
    border-end-end-radius: 4px;

    &:focus,
    &:hover {
      border-inline-start-width: 1px;
      border-inline-start-color: var(--app-primary-color);
    }
  }

  :deep(.ant-input-group.ant-input-group-compact > .ant-input:first-child) {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
</style>
