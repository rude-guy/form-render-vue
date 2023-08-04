<template>
  <FormItem
    :field="props.field"
    :label-col-props="layout.labelCol"
    :wrapper-col-props="layout.fieldCol"
    :label-col-style="{ ...layout.labelColStyle }"
    :wrapper-col-style="layout.wrapperColStyle"
    class="form-render_field_wrap"
    v-bind="formItemProps"
  >
    <component
      :is="FormComponent"
      :path="props.field"
      :schema="schema"
    ></component>
    <template #label>
      <div class="label_wrap">
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
        <Tooltip v-if="schema.tooltip" :content="schema.tooltip"
          ><IconQuestionCircle style="margin-left: 4px; color: #c9cdd4"
        /></Tooltip>
        <div class="label_title_widget" v-if="titleExtraWidget?.widget">
          <component
            :is="getWidget(titleExtraWidget.widget, widgets)"
            v-bind="titleExtraWidget.props"
          ></component>
        </div>
      </div>
    </template>
    <template #extra>
      <template v-if="extraWidget?.widget">
        <component
          :is="getWidget(extraWidget.widget, widgets)"
          v-bind="extraWidget.props"
        ></component>
      </template>
      <template v-else-if="schema.extra">{{ schema.extra }}</template>
    </template>
    <template #help>
      <template v-if="helpWidget?.widget">
        <component
          :is="getWidget(helpWidget.widget, widgets)"
          v-bind="helpWidget.props"
        ></component>
      </template>
      <template v-else-if="schema.help">{{ schema.help }}</template>
    </template>
  </FormItem>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { FormItem, Tooltip, TypographyParagraph } from '@arco-design/web-vue';
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon';
import { Schema, TDisplayType } from '../../type';
import {
  getWidgetName,
  getWidget,
  getCustomWidget,
} from '../../models/mapping';
import { useFormRender } from '../../models/useFormRender';
import { getFormItemLayout } from '../../models/layout';
import { omit } from 'lodash';

interface FieldItemProps {
  field: string;
  displayType: TDisplayType;
  column: number;
  schema: Schema;
}

const props = defineProps<FieldItemProps>();

const { schema } = toRefs(props);

const { widgets } = useFormRender();

/**
 * 渲染表单组件
 */
const FormComponent = computed(() => {
  const name = getWidgetName(schema.value);
  return getWidget(name, widgets.value);
});

const layout = computed(() => {
  return getFormItemLayout(props.column, props.schema, {
    displayType: props.displayType,
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

// 处理FormIten 透传的数据
const formItemProps = computed(() => {
  return omit(schema.value, [
    'tooltip',
    'titleExtraWidget',
    'extraWidget',
    'helpWidget',
  ]);
});
</script>
<style scoped lang="scss">
.label_wrap {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  .label_desc {
    margin-left: 8px;
    margin-bottom: 0;
    color: #00000073;
    max-width: calc(100% / 3);
  }
  .label_title_widget {
    margin-left: auto;
  }
}
</style>

<style lang="scss">
.form-render_field_wrap {
  .arco-form-item-label {
    display: flex;
    align-items: center;
    width: 100%;
    .arco-form-item-label-required-symbol {
      flex-shrink: 0;
    }
  }
}
</style>
