import { computed } from 'vue';
import { Schema, SchemaBase } from '../type';
import { useGlobalConfig } from './useGlobalConfig';
import { assign, pick } from 'lodash';

interface IProviderProps {
  // 父级 schema
  upperCtx: Schema;
  // 当前 schema
  schema: Schema;
}

/** 属性继承 */
export const useProvider = (props: IProviderProps) => {
  const { globalConfig } = useGlobalConfig();

  const formSchema = computed(() => {
    const { schema, upperCtx } = props;
    const defaultVal = assign({}, globalConfig.value, upperCtx);
    return assign(
      // 继承布局相关的属性
      pick(defaultVal, [
        'labelWidth',
        'maxWidth',
        'labelCol',
        'fieldCol',
        'displayType',
        'column',
      ]),
      schema
    ) as SchemaBase;
  });

  return {
    schema: formSchema,
  };
};
