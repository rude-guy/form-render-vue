import { defineComponent, toRef } from 'vue';
import { Schema } from '../type';
import { useField } from '../models/useField';
import { useGlobalConfig } from '../models/useGlobalConfig';
import { getSlots } from '../models/slot';

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

const withFieldWrap = (Field: any, filterProps = []) => {
  return defineComponent({
    name: Field.name,
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
