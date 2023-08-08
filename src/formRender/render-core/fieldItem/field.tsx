import { PropType, computed, defineComponent } from 'vue';
import { Schema, SlotTypeMap } from '../../type';
import { useFormRender } from '../../models/useFormRender';
import { useGlobalConfig } from '../../models/useGlobalConfig';
import { useProvider } from '../../models/useProvider';
import { getColSpan, getFormItemLayout } from '../../models/layout';
import { assign, omit, pick } from 'lodash';
import { getRuleList } from '../../models/validates';
import { getWidgetName, getWidget } from '../../models/mapping';
import './index.scss';
import {
  Col,
  FormItem,
  Tooltip,
  TypographyParagraph,
} from '@arco-design/web-vue';
import { getPath } from './modeule';
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon';
import RenderVnode from '../../utils/renderVnode';
import { getSlots } from '../../models/slot';

export interface FormItemProps {
  slots?: SlotTypeMap<'label' | 'help' | 'extra'>;
}

const Field = defineComponent({
  name: 'field',
  props: {
    path: {
      type: Array as PropType<string[]>,
      required: true,
    },
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    // 父级schema
    upperCtx: {
      type: Object as PropType<Schema>,
      required: true,
    },
  },
  setup(props) {
    const { formData } = useFormRender();
    const { widgets } = useGlobalConfig();

    const { schema } = useProvider({
      upperCtx: props.upperCtx,
      schema: props.schema,
    });

    const span = computed(() => {
      return getColSpan(schema.value.column, schema.value);
    });

    const colProps = computed(() => {
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

    const layout = computed(() => {
      return getFormItemLayout(schema.value.column, schema.value, {
        displayType: schema.value.displayType,
      });
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
    /**
     * 渲染表单组件
     */
    const widgetName = getWidgetName(schema.value);
    const FormComponent = getWidget(widgetName, widgets.value);

    const TitleWidget = () => {
      const { title, description, tooltip, titleExtraWidget } = schema.value;
      return (
        <>
          {title || ''}
          {description && (
            <TypographyParagraph
              class="label_desc"
              // @ts-ignore
              ellipsis={{ rows: 1, showTooltip: true }}
            >
              ({description})
            </TypographyParagraph>
          )}
          {tooltip && (
            <Tooltip content={tooltip}>
              <IconQuestionCircle style="margin-left: 12px; color: #c9cdd4" />
            </Tooltip>
          )}
          {labelClass.value && titleExtraWidget && (
            <div class="label_title_widget">
              <RenderVnode slot={titleExtraWidget} schema={schema.value} />
            </div>
          )}
        </>
      );
    };

    const propsSlots = getSlots(
      schema.value.props?.slots || {},
      schema.value,
      widgets.value
    );

    const slots = assign(propsSlots, {
      default: () => (
        <FormComponent path={getPath(props.path)} schema={schema.value} />
      ),
      label: propsSlots.label || TitleWidget,
    });

    return () => (
      <Col span={span.value} {...colProps.value}>
        <FormItem
          field={getPath(props.path)}
          label-col-props={layout.value.labelCol}
          wrapper-col-props={layout.value.fieldCol}
          label-col-style={layout.value.labelColStyle}
          wrapper-col-style={layout.value.wrapperColStyle}
          class={['form-render_field_wrap', labelClass.value]}
          rules={schema.value.readOnly ? [] : ruleList.value}
          {...formItemProps.value}
        >
          {{ ...slots }}
        </FormItem>
      </Col>
    );
  },
});

export default Field;
