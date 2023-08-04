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
  const { column, ...rest } = schema;

  const displayType = formProps.displayType || schema.displayType || 'vertical';
  const labelAlign = displayType === 'horizontal' ? 'right' : 'left';

  return {
    ...rest,
    ...formProps,
    labelAlign,
    column: formProps.column || column || 3,
    displayType,
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
