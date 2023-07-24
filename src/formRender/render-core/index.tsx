import { PropType, defineComponent, toRefs } from 'vue';
import { useFormRender } from '../models/useFormRender';
import { Schema } from '../type';
import sortProperties from '../models/sortProperties';
import FieldList from './fieldList/fieldList';

const RenderItem = defineComponent({
  name: 'render-item',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    path: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    rootPath: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    key: {
      type: String,
    },
  },
  setup(props) {
    const { schema, path, rootPath, key } = toRefs(props);

    // renderList
    if (
      schema.value.type === 'array' &&
      schema.value.items?.type === 'object'
    ) {
      return <FieldList />;
    }

    let childs = null;

    if (schema.value.properties) {
      childs = <RenderCore {...props} />;
    }

    return () => {
      return <div>render-item</div>;
    };
  },
});

const RenderCore = defineComponent({
  name: 'render-core',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    parentPath: {
      type: Array as PropType<string[]>,
      reuqired: false,
      default: () => [],
    },
    rootPath: {
      type: Array as PropType<string[]>,
      reuqired: false,
      default: () => [],
    },
  },
  setup(props) {
    const { schema, parentPath, rootPath } = toRefs(props);

    if (schema.value?.items) {
      return <RenderItem schema={schema.value} />;
    }

    const data = sortProperties(
      Object.entries(schema.value.properties || {})
    ).map(([key, item]) => {
      const path = [...parentPath.value, key];
      // console.log({ schema: item, path, key, rootPath });
      return { schema: item, path, key, rootPath };
    });
    console.log(data);

    return () => {
      return <div>render-core</div>;
    };
  },
});

export default RenderCore;
