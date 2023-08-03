import { Schema, SchemaBase } from '../type';

/**
 * 通用基础属性默认值填充
 * @param props
 * @returns
 */
const transformProps = (props: Schema): SchemaBase => {
  const { column, displayType, ...rest } = props;
  return {
    ...rest,
    column: column || 3,
    displayType: displayType || 'vertical',
  };
};

export default transformProps;
