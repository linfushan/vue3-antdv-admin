<script setup lang="ts" name="drawer">
  import { ref } from 'vue';

  const open = ref<boolean>(false);
</script>

<template>
  <div>
    <a-button @click="open = true">打开抽屉</a-button>
    <p-drawer v-model:open="open">
      <template v-slot:title-right>
        <div> 右侧自定义 </div>
      </template>
    </p-drawer>
  </div>
</template>

<style lang="less" scoped></style>
