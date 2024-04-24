<script setup lang="ts">
  import { useTime } from '@/hooks/useTime';
  const { year, month, day, hour, minute, second } = useTime();
  defineOptions({
    name: 'countDownTime',
  });
</script>

<template>
  <div class="time"> {{ year }}-{{ month }}-{{ day }} {{ hour }}:{{ minute }}:{{ second }} </div>
</template>

<style lang="less" scoped>
  .time {
    color: rgb(0 0 0 / 65%);
  }
</style>
