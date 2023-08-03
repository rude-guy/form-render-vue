import type { ColProps } from '@arco-design/web-vue';
import { SchemaBase } from '../type';
import { CSSProperties } from 'vue';
import { assign } from 'lodash';

export const getFormItemLayout = (column: number, schema: SchemaBase) => {
  const {
    displayType,
    labelCol: _labelCol,
    fieldCol: _filedCol,
    labelColProps,
    wrapperColProps,
    labelWidth,
    maxWidth,
    labelColStyle: _labelColStyle,
    wrapperColStyle: _wrapperColStyle,
  } = schema;
  let labelCol: ColProps = { span: 5 };
  let fieldCol: ColProps = { span: 19 };
  let labelColStyle: CSSProperties = {};
  let wrapperColStyle: CSSProperties = {};

  if (column === 2) {
    labelCol = { span: 7 };
    fieldCol = { span: 17 };
  }

  if (column > 2) {
    labelCol = { span: 6 };
    fieldCol = { span: 18 };
  }

  if (displayType === 'vertical' || displayType === 'inline') {
    labelCol = {};
    fieldCol = {};
  }

  if (_labelCol) {
    labelCol.span = _labelCol;
    if (displayType === 'vertical') {
      labelCol = {};
    }
  }

  if (_filedCol) {
    fieldCol.span = _filedCol;
  }

  if (labelColProps) {
    labelCol = labelColProps;
  }

  if (wrapperColProps) {
    fieldCol = wrapperColProps;
  }

  if (typeof labelCol.span === 'number' && displayType !== 'horizontal') {
    labelColStyle = { width: (labelCol.span / 24) * 100 + '%' };
  }
  if (typeof fieldCol.span === 'number' && displayType !== 'horizontal') {
    wrapperColStyle = { width: (fieldCol.span / 24) * 100 + '%' };
  }

  if (_labelColStyle) {
    labelColStyle = assign(labelColStyle, _labelColStyle, {
      width: labelWidth + 'px',
    });
  }

  if (_wrapperColStyle) {
    wrapperColStyle = assign(wrapperColStyle, _wrapperColStyle, {
      maxWidth: maxWidth + 'px',
    });
  }

  return { labelCol, fieldCol, labelColStyle, wrapperColStyle };
};

export const getColSpan = (column: number, schema: SchemaBase) => {
  let span = 24;

  if (column) {
    span = 24 / column;
  }
  if (schema.span) {
    span = schema.span;
  }
  return span;
};
