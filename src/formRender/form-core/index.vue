<template>
  <Form :model="formData" :layout="displayType">
    <Row :gutter="24">
      <RenderCore :schema="props.schema" />
    </Row>
  </Form>
</template>
<script setup lang="ts">
import { Form, Row } from '@arco-design/web-vue';
import { Schema } from '../type';
import RenderCore from '../render-core/index.vue';
import { useFormRender } from '../models/useFormRender';
import { toRefs } from 'vue';
interface FormCoreProps {
  schema: Schema;
}

const props = defineProps<FormCoreProps>();
const { displayType, column, type, placeholder } = toRefs(props.schema);

if (type?.value !== 'object') {
  throw new Error('Form schema must be an object');
}

const { formData } = useFormRender();

console.log(props);
</script>
<style scoped lang="scss"></style>
