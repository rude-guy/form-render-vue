import { PropType, defineComponent } from 'vue';
import FieldItem from './fieldItem/index';
import { Schema } from '../type';
import { isEmptyObj } from '../utils';

interface RenderItemProps {
  upperCtx: Schema;
  schema: Schema;
  path: string;
}

const renderItem = (props: RenderItemProps) => {
  const { upperCtx, schema, path } = props;

  // TODO: 列表渲染
  if (schema.type === 'array' && schema.item.type === 'object') {
    return null;
  }

  let children;
  if (schema.properties) {
    children = <RenderCore schema={schema}></RenderCore>;
    console.log(children, 'children');
  }

  return (
    <FieldItem
      upperCtx={upperCtx}
      path={path}
      schema={schema}
      children={children}
    />
  );
};

const RenderCore = defineComponent({
  name: 'renderCore',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
  },
  setup(props) {
    const { schema } = props;
    if (!schema || isEmptyObj(schema)) {
      return null;
    }

    // TODO: 列表渲染
    if (schema?.item) {
      return null;
    }

    return () =>
      Object.entries(schema.properties || {}).map(([key, item]) =>
        renderItem({ upperCtx: schema, schema: item, path: key })
      );
  },
});

export default RenderCore;
