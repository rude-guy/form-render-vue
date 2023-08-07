<template>
  <div class="form-render">
    <FormCore v-bind="props" :schema="schemaBase" />
  </div>
</template>
<script setup lang="ts">
import FormCore from './form-core/index.vue';
import { FormProps, Schema } from './type';
import { computed, shallowRef } from 'vue';
import { provideFormRender } from './models/useFormRender';
import { defaultWidgets } from './models/mapping';
import { assign, omit, pick } from 'lodash';
import { transformInitProps, transformProps } from './models/transformDatas';
import { provideGlobalConfig } from './models/useGlobalConfig';

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

const globalConfig = computed(() => {
  const schemaConfog = omit(props.schema, 'properties');
  const formProps = props.formProps;
  return transformInitProps({ ...schemaConfog, ...formProps });
});

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

// 注入全局配置
provideGlobalConfig({ widgets, globalConfig });

provideFormRender({ widgets, globalConfig, globalFormProps });
</script>
