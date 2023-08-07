<script setup lang="tsx">
// import Comp from './example/box/card/index.vue';
import Comp from './example/layout/col/index.vue';
</script>

<template>
  <div class="contaienr">
    <div class="test_wrap">
      <Comp />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contaienr {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .test_wrap {
    border: 1px solid #eee;
    width: 1000px;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
