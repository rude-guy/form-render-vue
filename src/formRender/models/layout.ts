import { TDisplayType } from '../type';

export const getFormItemLayout = (
  column: number,
  options: { displayType: TDisplayType }
) => {
  const { displayType } = options;
  let labelCol: any = { span: 5 };
  let fieldCol: any = { span: 9 };

  if (column === 2) {
    labelCol = { span: 6 };
    fieldCol = { span: 14 };
  }

  if (column > 2) {
    labelCol = { span: 7 };
    fieldCol = { span: 16 };
  }

  if (displayType === 'vertical') {
    labelCol = {};
    fieldCol = {};
  }
  return { labelCol, fieldCol };
};
