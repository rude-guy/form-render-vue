<template>
  <template
    v-if="schema.properties"
    v-for="(item, value) of Object.values(schema.properties)"
  >
    <FormItem :label="item.title">
      <Field :root="item" :widgets="widgets" />
    </FormItem>
  </template>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { Schema } from '../type';
import { FormItem } from '@arco-design/web-vue';
import Field from './field/field.vue';

interface RenderCoreProps {
  schema: Schema;
  widgets: Record<string, any>;
}
const props = defineProps<RenderCoreProps>();
const { schema, widgets } = toRefs(props);

console.log(schema);
</script>
<style scoped lang="scss"></style>
