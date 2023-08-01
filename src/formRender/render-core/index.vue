<template>
  <template
    v-if="schema.properties"
    v-for="(item, value) of Object.values(schema.properties)"
  >
    <Col :span="8">
      <FormItem
        :label="item.title"
        :label-col-props="{ span: 10 }"
        :wrapper-col-props="{ span: 14 }"
      >
        <Field :root="item" />
      </FormItem>
    </Col>
  </template>
</template>
<script setup lang="ts">
import { Col } from '@arco-design/web-vue';
import { computed, toRef, toRefs } from 'vue';
import { Schema } from '../type';
import { FormItem } from '@arco-design/web-vue';
import Field from './field/field.vue';
import { useFormRender } from '../models/useFormRender';
import { getFormItemLayout } from '../models/layout';

interface RenderCoreProps {
  schema: Schema;
}
const props = defineProps<RenderCoreProps>();
const { schema } = toRefs(props);
const { globalConfig } = useFormRender();

const d = computed(() => {
  const { column, displayType } = globalConfig.value;
  return getFormItemLayout(column, { displayType });
});

console.log(schema);
</script>
<style scoped lang="scss"></style>
