<template>
  <template
    v-if="schema.properties"
    v-for="(item, value) of Object.entries(schema.properties)"
  >
    <Field
      :parent="schema"
      :field="item[0]"
      :column="schema.column"
      :schema="item[1]"
      :displayType="schema.displayType"
    />
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
  inheritAttrs: false,
});

const props = defineProps<RenderCoreProps>();
</script>
<style scoped lang="scss"></style>
