<template>
  <template
    v-if="schema.properties"
    v-for="(item, value) of Object.values(schema.properties)"
  >
    <Col :span="span">
      <FormItem
        :label="item.title"
        :label-col-props="layout.labelCol"
        :wrapper-col-props="layout.fieldCol"
        :label-col-style="layout.labelColStyle"
        :wrapper-col-style="layout.wrapperColStyle"
      >
        <Field :root="item" />
      </FormItem>
    </Col>
  </template>
</template>
<script setup lang="ts">
import { Col } from '@arco-design/web-vue';
import { computed, toRef, toRefs, watch, watchEffect } from 'vue';
import { SchemaBase } from '../type';
import { FormItem } from '@arco-design/web-vue';
import Field from './field/field.vue';
import { useFormRender } from '../models/useFormRender';
import { getFormItemLayout, getColSpan } from '../models/layout';

interface RenderCoreProps {
  schema: SchemaBase;
}

defineOptions({
  name: 'renderCore',
});

const props = defineProps<RenderCoreProps>();
const span = computed(() => {
  return getColSpan(props.schema.column, props.schema);
});

const layout = computed(() => {
  return getFormItemLayout(props.schema.column, props.schema);
});

console.log(props);

watch(
  layout,
  () => {
    console.log(layout.value, 'layout');
  },
  { immediate: true }
);
</script>
<style scoped lang="scss"></style>
