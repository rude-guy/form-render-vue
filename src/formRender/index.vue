<template>
  <div class="form-render">
    <FormCore v-bind="props" />
  </div>
</template>
<script setup lang="ts">
import FormCore from './form-core/index.vue';
import { RootSchema, Schema } from './type';
import { CSSProperties, shallowRef } from 'vue';
import { provideFormRender } from './models/useFormRender';
import { defaultWidgets } from './models/mapping';
import { omit } from 'lodash';

interface FCProps {
  /**
   * 表单 schema
   */
  schema: Schema;
  /**
   * 表单顶层的className
   */
  className?: string;
  /**
   * 表单顶层的样式
   */
  style?: CSSProperties;
  /**
   * 自定义组件
   */
  widgets?: Record<string, any>;
  /**
   * 表单初始值
   */
  initFormData?: Record<string, any>;
}

const props = defineProps<FCProps>();

const widgets = shallowRef({ ...props.widgets, ...defaultWidgets });

const globalConfig = shallowRef<RootSchema>({
  ...omit(props.schema, ['properties']),
} as RootSchema);

provideFormRender({ widgets, globalConfig });
</script>
