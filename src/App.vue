<script setup lang="ts">
import { ref } from 'vue';
import FormRender from './formRender/index.vue';
import { Schema } from './formRender/type';
const schema: Schema = {
  type: 'object',
  column: 1,
  displayType: 'horizontal',
  properties: {
    input1: {
      title: 'Field A',
      type: 'string',
    },
    input2: {
      title: 'Field B',
      type: 'string',
    },
    input3: {
      title: 'Field C',
      type: 'string',
    },
    input4: {
      title: 'Field D',
      type: 'string',
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
    border: 1px solid #eee;
    margin: auto;
    width: 600px;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
