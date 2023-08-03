import { FormProps, Schema, SchemaBase } from '../type';

/**
 * 通用基础属性默认值填充
 * @param props
 * @returns
 */
const transformProps = (
  props: Schema,
  formProps: FormProps = {}
): SchemaBase => {
  const { column, displayType, ...rest } = props;
  return {
    ...rest,
    ...formProps,
    column: formProps.column || column || 3,
    displayType: formProps.displayType || displayType || 'vertical',
  };
};

export default transformProps;
