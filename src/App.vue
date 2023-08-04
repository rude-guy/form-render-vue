<script setup lang="ts">
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
      tooltip: '21312',
      titleExtraWidget: {
        widget: 'input',
        props: {
          placeholder: '请输入',
        },
      },
    },
    input2: {
      title: '数字最大值',
      type: 'number',
      max: 2,
      required: true,
    },
    input3: {
      title: '数字最小值',
      type: 'number',
      min: 10,
      required: true,
    },
    input4: {
      title: '字符最大长度',
      type: 'string',
      max: 2,
      required: true,
    },
    input5: {
      title: '字符最小长度',
      type: 'string',
      min: 10,
      required: true,
    },
    input6: {
      title: 'url 校验',
      type: 'string',
      required: true,
      format: 'url',
    },
    input7: {
      title: 'email 校验',
      type: 'string',
      required: true,
      format: 'email',
    },
    input8: {
      title: '图片格式校验',
      type: 'string',
      required: true,
      format: 'image',
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
          maxWidth: 200,
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
