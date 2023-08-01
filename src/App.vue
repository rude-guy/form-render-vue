<script setup lang="ts">
import { ref } from 'vue';
import FormRender from './formRender/index.vue';
const schema = {
  type: 'object',
  properties: {
    input: {
      title: '输入框',
      type: 'string',
      widget: 'input',
    },
    select: {
      title: '下拉框',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' },
        ],
      },
    },
  },
};

const formData = ref({});
</script>

<template>
  <div class="contaienr">
    <div class="test_wrap">
      <FormRender :schema="schema" :initFormData="formData" :data="1" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contaienr {
  height: 100vh;
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .test_wrap {
    margin: auto;
    width: 600px;
  }
}
</style>
