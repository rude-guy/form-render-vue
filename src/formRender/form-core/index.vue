<template>
  <Form :model="formData" v-bind="formProps">
    <Row :gutter="24">
      <RenderCore :schema="props.schema" />
    </Row>
  </Form>
</template>
<script setup lang="ts">
import { Form, FormInstance, Row } from '@arco-design/web-vue';
import { SchemaBase } from '../type';
import RenderCore from '../render-core/index.vue';
import { useFormRender } from '../models/useFormRender';
import { computed } from 'vue';

interface FormCoreProps {
  schema: SchemaBase;
}

const props = defineProps<FormCoreProps>();

const { formData, globalFormProps } = useFormRender();

// 处理Form组件属性
const formProps = computed((): Omit<FormInstance['$props'], 'model'> => {
  let displayType =
    globalFormProps.value.displayType || props.schema.displayType;
  return {
    ...globalFormProps.value,
    layout: displayType,
    labelAlign: globalFormProps.value.labelAlign,
    disabled: globalFormProps.value.disabled,
  };
});
</script>
<style scoped lang="scss"></style>
