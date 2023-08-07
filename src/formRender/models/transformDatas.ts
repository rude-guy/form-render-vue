import { omit } from 'lodash';
import { FRGlobalConfig, FormProps, Schema, SchemaBase } from '../type';

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
    ...omit(formProps, 'rules'),
    labelAlign,
    column: formProps.column || column || 1,
    displayType,
  } as SchemaBase;
};

//  转化初始props
export const transformInitProps = (props: any): FRGlobalConfig => {
  const displayType = props.displayType || 'vertical';
  const column = props.column || 1;
  const type = props.type || 'object';

  return {
    ...props,
    displayType,
    column,
    type,
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
