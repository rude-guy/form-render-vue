<template>
  <Col :span="span" v-bind="colProps">
    <FormItem
      :field="props.field"
      :label-col-props="layout.labelCol"
      :wrapper-col-props="layout.fieldCol"
      :label-col-style="layout.labelColStyle"
      :wrapper-col-style="layout.wrapperColStyle"
      :class="['form-render_field_wrap', labelClass]"
      :rules="schema.readOnly ? [] : ruleList"
      v-bind="formItemProps"
    >
      <component
        :is="FormComponent"
        :path="props.field"
        :schema="schema"
      ></component>
      <template #label>
        <template v-if="schema.title">{{ schema.title }}</template>
        <TypographyParagraph
          class="label_desc"
          :ellipsis="{
            rows: 1,
            showTooltip: true,
          }"
          v-if="schema.description"
          >({{ schema.description }})</TypographyParagraph
        >
        <Tooltip v-if="schema.tooltip" :content="schema.tooltip">
          <IconQuestionCircle style="margin-left: 12px; color: #c9cdd4" />
        </Tooltip>
        <div class="label_title_widget" v-if="labelClass">
          <component
            :is="getWidget(titleExtraWidget?.widget!, widgets)"
            v-bind="titleExtraWidget?.props"
          ></component>
        </div>
      </template>
      <template #extra v-if="extraWidget?.widget || schema.extra">
        <template v-if="extraWidget?.widget">
          <component
            :is="getWidget(extraWidget.widget, widgets)"
            v-bind="extraWidget.props"
          ></component>
        </template>
        <template v-else-if="schema.extra">{{ schema.extra }}</template>
      </template>
      <template #help v-if="helpWidget?.widget || schema.help">
        <template v-if="helpWidget?.widget">
          <component
            :is="getWidget(helpWidget.widget, widgets)"
            v-bind="helpWidget.props"
          ></component>
        </template>
        <template v-else-if="schema.help">{{ schema.help }}</template>
      </template>
    </FormItem>
  </Col>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import {
  FormItem,
  Col,
  Tooltip,
  TypographyParagraph,
  ColProps,
} from '@arco-design/web-vue';
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon';
import { Schema } from '../../type';
import {
  getWidgetName,
  getWidget,
  getCustomWidget,
} from '../../models/mapping';
import { useFormRender } from '../../models/useFormRender';
import { getColSpan, getFormItemLayout } from '../../models/layout';
import { omit, pick } from 'lodash';
import { getRuleList } from '../../models/validates';
import { useProvider } from '../../models/useProvider';
import { useGlobalConfig } from '../../models/useGlobalConfig';

interface FieldItemProps {
  field: string;
  schema: Schema;
  // 父级schema
  upperCtx: Schema;
}

const props = defineProps<FieldItemProps>();

const { formData } = useFormRender();
const { widgets } = useGlobalConfig();

const { schema } = useProvider({
  upperCtx: props.upperCtx,
  schema: props.schema,
});

const span = computed(() => {
  return getColSpan(schema.value.column, schema.value);
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

const { required, min, max, hidden, disabled, type } = schema.value;
// TODO:
// 1. readOnly -> readOnlyWidget
// 2. hidden -> Function

const ruleList = computed(() => {
  return getRuleList(schema.value, formData.value);
});

/**
 * 渲染表单组件
 */
const FormComponent = computed(() => {
  const name = getWidgetName(schema.value);
  return getWidget(name, widgets.value);
});

const layout = computed(() => {
  return getFormItemLayout(schema.value.column, schema.value, {
    displayType: schema.value.displayType,
  });
});

const titleExtraWidget = computed(() => {
  return getCustomWidget(schema.value, schema.value.titleExtraWidget);
});
const extraWidget = computed(() => {
  return getCustomWidget(schema.value, schema.value.extraWidget);
});
const helpWidget = computed(() => {
  return getCustomWidget(schema.value, schema.value.helpWidget);
});

const labelClass = computed(() => {
  const { titleExtraWidget, description } = schema.value;
  if (schema.value.displayType === 'horizontal') return '';
  return titleExtraWidget || description ? 'label_title_widget' : '';
});

// 处理FormIten 透传的数据
const formItemProps = computed(() => {
  return omit(schema.value, [
    'displayType',
    'title',
    'tooltip',
    'titleExtraWidget',
    'extraWidget',
    'helpWidget',
  ]);
});
</script>
<style scoped lang="scss">
.label_desc {
  margin-left: 8px;
  margin-bottom: 0;
  color: #00000073;
  max-width: calc(100% / 3);
}
.label_title_widget {
  margin-left: auto;
}
</style>

<style lang="scss">
.form-render_field_wrap {
  &.label_title_widget {
    .arco-form-item-label {
      width: 100%;
    }
  }
  .arco-form-item-label {
    display: flex;
    align-items: center;

    .arco-form-item-label-required-symbol {
      flex-shrink: 0;
    }
    .label_wrap {
      flex: auto;
    }
  }
}
</style>
