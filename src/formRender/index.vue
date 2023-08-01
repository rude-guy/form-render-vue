<template>
  <div class="form-render">
    <FormCore v-bind="formCoreProps" />
  </div>
</template>
<script setup lang="ts">
import FormCore from './form-core/index.vue';
import { Schema } from './type';
import { CSSProperties, computed } from 'vue';
import { defaultWidgets } from './models/mapping';

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

const formCoreProps = computed(() => {
  return {
    ...props,
    widgets: { ...props.widgets, ...defaultWidgets },
  };
});
</script>
