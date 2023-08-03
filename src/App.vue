<script setup lang="ts">
import FormRender from './formRender/index.vue';
import { Schema } from './formRender/type';
const schema: Schema = {
  type: 'object',
  column: 2,
  displayType: 'vertical',
  // displayType: 'horizontal',
  // displayType: 'inline',
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
    input5: {
      title: 'Field D',
      type: 'string',
    },
  },
};
</script>

<template>
  <div class="contaienr">
    <div class="test_wrap">
      <FormRender
        :schema="schema"
        :data="1"
        :form-props="{
          disabled: false,
          labelAlign: 'right',
          labelWidth: '100px',
          /** 输入控件最长宽度 */
          maxWidth: '200px',
          /** 表单项内部布局 */
        }"
      />
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
