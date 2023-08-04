import { FormProps, Schema, SchemaBase } from '../type';

/**
 * 通用基础属性默认值填充
 * @param props
 * @returns
 */
export const transformProps = (
  schema: Schema,
  formProps: FormProps = {}
): SchemaBase => {
  const { column, displayType, ...rest } = schema;
  return {
    ...rest,
    ...formProps,
    column: formProps.column || column || 3,
    displayType: formProps.displayType || displayType || 'vertical',
  };
};

export const transformProperties = (properties: Schema['properties']) => {
  return Object.entries(properties || {}).map(([name, schema]) => {
    return {
      ...schema,
      // TODO: name 需要处理
      fieldname: name,
    };
  });
};
