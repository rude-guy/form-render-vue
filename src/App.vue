<script setup lang="tsx">
import { h } from 'vue';
import FormRender from './formRender/index.vue';
import { Schema } from './formRender/type';
const schema: Schema = {
  type: 'object',
  column: 1,
  // displayType: 'vertical',
  displayType: 'horizontal',
  properties: {
    input1: {
      title: '必填',
      type: 'string',
      required: true,
      description: '21312',
      placeholder: ['请输入', 'asda'],
      defaultvalue: '213213',
      tooltip: '21312',
      titleExtraWidget: {
        widget: 'input',
        props: {
          placeholder: '请输入',
        },
      },
      props: {
        slots: {
          prefix: () => h('div', 'prefix'),
          suffix: () => {
            return <div>suffix</div>;
          },
        },
      },
    },
    input2: {
      title: '数字最大值',
      type: 'number',
      max: 2,
      required: true,
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
          /** 输入控件最长宽度 */
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
