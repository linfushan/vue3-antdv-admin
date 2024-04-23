<script setup lang="ts">
  defineOptions({
    name: 'homepage',
  });
</script>

<template>
  <div class="container">
    <img class="welcome-img" src="~@/assets/analysis.svg" />
  </div>
</template>

<style lang="less" scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .welcome-img {
    height: 80%;
  }
</style>
