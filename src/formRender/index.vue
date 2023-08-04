<template>
  <div class="form-render">
    <FormCore v-bind="props" :schema="schemaBase" />
  </div>
</template>
<script setup lang="ts">
import FormCore from './form-core/index.vue';
import { FormProps, RootSchema, Schema } from './type';
import { computed, shallowRef } from 'vue';
import { provideFormRender } from './models/useFormRender';
import { defaultWidgets } from './models/mapping';
import { assign, omit, pick } from 'lodash';
import { transformProps } from './models/transformDatas';

interface FCProps {
  /**
   * 表单 schema
   */
  schema: Schema;
  /**
   * 自定义组件
   */
  widgets?: Record<string, any>;

  /**
   * 表单相关配置
   *  */
  formProps?: FormProps;
}

const props = defineProps<FCProps>();

const widgets = shallowRef({ ...props.widgets, ...defaultWidgets });

const globalConfig = shallowRef<RootSchema>({
  ...omit(props.schema, ['properties']),
} as RootSchema);

const globalFormProps = computed(() => {
  return assign(
    {},
    props.formProps,
    pick(props.schema, 'column', 'displayType')
  );
});

const schemaBase = computed(() => {
  return transformProps(props.schema, globalFormProps.value);
});

provideFormRender({ widgets, globalConfig, globalFormProps });
</script>
