<template>
  <Form
    :model="formData"
    v-bind="formProps"
    @submit="handleSubmit"
    label-align="right"
  >
    <Row :gutter="24" v-bind="rowProps">
      <RenderCore :schema="props.schema" />
    </Row>
    <FormItem>
      <Button html-type="submit">submit</Button>
    </FormItem>
  </Form>
</template>
<script setup lang="ts">
import { Form, FormItem, Row, RowProps, Button } from '@arco-design/web-vue';
import { SchemaBase } from '../type';
import RenderCore from '../render-core/index.vue';
import { useFormRender } from '../models/useFormRender';
import { computed } from 'vue';
import { pick } from 'lodash';

interface FormCoreProps {
  schema: SchemaBase;
}

defineOptions({
  name: 'formCore',
});

const props = defineProps<FormCoreProps>();

const { formData, globalFormProps } = useFormRender();

// 处理Form组件属性
const formProps = computed(() => {
  let displayType =
    globalFormProps.value.displayType || props.schema.displayType;
  return {
    ...globalFormProps.value,
    layout: displayType,
    labelAlign: globalFormProps.value.labelAlign,
    disabled: globalFormProps.value.disabled,
  };
});

const rowProps = computed((): Omit<RowProps, 'gutter'> => {
  return pick(formProps.value, ['justify', 'align', 'wrap', 'div']);
});

const handleSubmit = (data: any) => {
  console.log(formData.value, data, 'submit');
};
</script>
<style scoped lang="scss"></style>
