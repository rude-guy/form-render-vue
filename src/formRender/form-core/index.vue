<template>
  <Form :model="formData" v-bind="formProps" @submit="handleSubmit">
    <Row :gutter="24" v-bind="rowProps">
      <RenderCore :schema="props.schema" />
      <FormItem :label-col-props="{ span: 2 }">
        <Button html-type="submit" type="primary">submit</Button>
      </FormItem>
    </Row>
  </Form>
</template>
<script setup lang="ts">
import { Form, FormItem, Row, RowProps, Button } from '@arco-design/web-vue';
import { SchemaBase } from '../type';
import RenderCore from '../render-core/index';
import { useFormRender } from '../models/useFormRender';
import { computed } from 'vue';
import { pick } from 'lodash';
import { useGlobalConfig } from '../models/useGlobalConfig';

interface FormCoreProps {
  schema: SchemaBase;
}

defineOptions({
  name: 'formCore',
});

const props = defineProps<FormCoreProps>();

const { formData } = useFormRender();
const { globalConfig } = useGlobalConfig();

// 处理Form组件属性
const formProps = computed(() => {
  return {
    layout: globalConfig.value.displayType,
    ...pick(globalConfig.value, [
      'size',
      'rules',
      'labelAlign',
      'disabled',
      'autoLabelWidth',
    ]),
  };
});

const rowProps = computed((): Omit<RowProps, 'gutter'> => {
  return pick(globalConfig.value, ['justify', 'align', 'wrap', 'div']);
});

const handleSubmit = (data: any) => {
  console.log(formData.value, data, 'submit');
};
</script>
<style scoped lang="scss"></style>
../render-core/index.tsx
