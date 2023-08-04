<template>
  <ArcoInput
    v-model="model"
    :default-value="schema.defaultvalue"
    :class="schema.className"
    :placeholder="placeholder"
    v-bind="schema.props"
  >
    <template v-for="(vnode, name) in schema.props?.slots" #[name] :key="name">
      <RenderVnode :vnode="renderVnode(vnode)" />
    </template>
  </ArcoInput>
</template>
<script setup lang="ts">
import { Input as ArcoInput } from '@arco-design/web-vue';
import type { InputInstance } from '@arco-design/web-vue';
import RenderVnode from '../../render-core/renderVnode';
import { useFormRender } from '../../models/useFormRender';
import { computed } from 'vue';
import { Schema, SlotTypeMap } from '../../type';
import { toRef } from 'vue';
import { getStringFromArrayOrString, renderVnode } from '../../utils';
import { onMounted } from 'vue';

type ArcoInputProps = InputInstance['$props'];

export interface InputProps extends ArcoInputProps {
  slots: SlotTypeMap<'append' | 'prepend' | 'suffix' | 'prefix'>;
}

const props = defineProps<{
  path: string;
  schema: Schema;
}>();

const schema = toRef(props, 'schema');
const { formData, getValueByStringPath, setValueByStringPath } =
  useFormRender();

const placeholder = computed(() =>
  getStringFromArrayOrString(schema.value.placeholder)
);

const model = computed({
  get: () => getValueByStringPath<string>(formData.value, props.path),
  set: (newValue) => setValueByStringPath(formData.value, props.path, newValue),
});

onMounted(() => {
  model.value = model.value || schema.value.defaultvalue;
});
</script>
<style scoped lang="scss"></style>
