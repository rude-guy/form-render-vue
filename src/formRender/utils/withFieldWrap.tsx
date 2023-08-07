import { defineComponent, ref, toRef } from 'vue';
import { Schema, TRenderSlotType } from '../type';
import { useField } from '../models/useField';
import { isFn } from './tool';
import { getWidget } from '../models/mapping';
import { useGlobalConfig } from '../models/useGlobalConfig';

const getProps = (props: any, filter: any[]) => {
  const result: Record<string, any> = {};

  Object.keys(props || {}).forEach((key) => {
    if (filter.includes(key)) {
      return;
    }
    result[key] = props[key];
  });

  return result;
};

const getSlots = (
  slots: Record<string, TRenderSlotType>,
  schema: Schema,
  widgets: Record<string, any>
) => {
  const result: Record<string, () => unknown> = {};

  Object.keys(slots || {}).forEach((key) => {
    const slot: any = slots[key];
    let retVal = slot;
    if (isFn(slot)) {
      retVal = slot(schema);
    }
    // TODO 暂时不做 widget 的处理
    if (retVal.widget) {
      const Widget = getWidget(retVal.widget, widgets);
      retVal = <Widget {...retVal?.props}></Widget>;
    }
    result[key] = () => retVal;
  });

  return result;
};

const withFieldWrap = (Field: any, filterProps = []) => {
  return defineComponent({
    setup(_, { attrs }: any) {
      const props = attrs as {
        path: string;
        schema: Schema;
      };
      const { model, placeholder } = useField(props);
      const { widgets } = useGlobalConfig();

      const schema = toRef(props, 'schema', {});
      const rest = getProps(schema.value.props, filterProps);

      const slots = getSlots(rest.slots, schema.value, widgets.value);

      return () => (
        <Field
          v-model={model.value}
          default-value={schema.value.defaultvalue || rest.defaultValue}
          class={schema.value.className}
          placeholder={placeholder.value}
          {...rest}
        >
          {{ ...slots }}
        </Field>
      );
    },
  });
};

export default withFieldWrap;
