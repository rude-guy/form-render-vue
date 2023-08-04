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
import { Schema, SlotTypeMap } from '../../type';
import { renderVnode } from '../../utils';
import { useField } from '../../models/useField';

type ArcoInputProps = InputInstance['$props'];

export interface InputProps extends ArcoInputProps {
  slots: SlotTypeMap<'append' | 'prepend' | 'suffix' | 'prefix'>;
}

const props = defineProps<{
  path: string;
  schema: Schema;
}>();

const { model, placeholder } = useField(props);
</script>
