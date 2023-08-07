import { computed } from 'vue';
import { Schema } from '../type';
import { useGlobalConfig } from './useGlobalConfig';
import { assign, omit } from 'lodash';

interface IProviderProps {
  // 父级 schema
  parent: Schema;
  // 当前 schema
  schema: Schema;
}

/** 属性继承 */
export const useProvider = (props: IProviderProps) => {
  const { globalConfig } = useGlobalConfig();

  const formSchema = computed(() => {
    const { schema, parent } = props;
    // 优先级：schema > parent > globalConfig
    return assign(
      {},
      globalConfig.value,
      omit(parent, 'properties'),
      schema
    ) as Schema;
  });

  return {
    schema: formSchema,
  };
};
