import { defineComponent, toRef } from 'vue';
import { Schema } from '../type';
import { useField } from '../models/useField';

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
    setup(_, { attrs }: any) {
      const props = attrs as {
        path: string;
        schema: Schema;
      };
      const { model, placeholder } = useField(props);

      const schema = toRef(props, 'schema');
      const rest = getProps(schema.value.props, filterProps);

      return () => (
        <Field
          v-model={model.value}
          default-value={schema.value.defaultvalue}
          class={schema.value.className}
          placeholder={placeholder.value}
          {...rest}
        >
          {{ ...rest.slots }}
        </Field>
      );
    },
  });
};

export default withFieldWrap;
