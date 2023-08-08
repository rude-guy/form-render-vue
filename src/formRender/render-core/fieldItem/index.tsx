import { PropType, defineComponent } from 'vue';
import { Col, Row } from '@arco-design/web-vue';
import Field from './field.vue';
import { Schema } from '../../type';
import { useGlobalConfig } from '../../models/useGlobalConfig';
import { useProvider } from '../../models/useProvider';
import { getWidget, getWidgetName } from '../../models/mapping';

const FieldItem = defineComponent({
  name: 'fieldItem',
  props: {
    field: {
      type: String,
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
    children: {
      type: Object as PropType<JSX.Element>,
      required: false,
    },
  },
  setup(props) {
    const { widgets } = useGlobalConfig();
    const { children, field } = props;

    const { schema } = useProvider({
      upperCtx: props.upperCtx,
      schema: props.schema,
    });

    const widgetName = getWidgetName(schema.value);
    let Widget = getWidget(widgetName, widgets.value);

    const inlineChild = schema.value.displayType === 'inline';

    if (children) {
      console.log(props, schema);

      let childElem = children;
      if (!inlineChild) {
        childElem = <Row gutter={24}>{children}</Row>;
      }
      return () => (
        <Col span={24}>
          <Widget
            schema={schema.value}
            field={field}
            childern={childElem}
          ></Widget>
        </Col>
      );
    }

    return () => (
      <Field
        field={field}
        upperCtx={props.upperCtx}
        schema={schema.value}
      ></Field>
    );
  },
});

export default FieldItem;
