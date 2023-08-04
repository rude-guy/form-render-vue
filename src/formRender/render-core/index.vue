<template>
  <template
    v-if="schema.properties"
    v-for="(item, value) of Object.entries(schema.properties)"
  >
    <Col :span="span" v-bind="colProps">
      <Field
        :field="item[0]"
        :column="schema.column"
        :schema="item[1]"
        :displayType="schema.displayType"
      />
    </Col>
  </template>
</template>
<script setup lang="ts">
import { Col, ColProps } from '@arco-design/web-vue';
import { computed } from 'vue';
import { SchemaBase } from '../type';
import Field from './field/field.vue';
import { getColSpan } from '../models/layout';
import { pick } from 'lodash';

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

const colProps = computed((): Omit<ColProps, 'span'> => {
  return pick(props.schema, [
    'offset',
    'order',
    'flex',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
  ]);
});
</script>
<style scoped lang="scss"></style>
