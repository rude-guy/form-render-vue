import { Schema, TWidgetCustomType } from '../type';
export * as defaultWidgets from '../widgets/index';

export const mapping: Record<string, string> = {
  default: 'input',
  string: 'input',
  number: 'inputNumber',
  array: 'list',
  card: 'card',
};

export function getWidgetName(schema: Schema, _mapping = mapping) {
  if (schema.widget) {
    return schema.widget;
  }
  return _mapping[schema.type || 'default'] || _mapping.default;
}

const capitalizeFirstLetter = (str: string) => {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getWidget = (name: string, widgets: Record<string, any>) => {
  let widget = widgets[name];

  // name 转成首字母大写
  if (!widget) {
    widget = widgets[capitalizeFirstLetter(name)];
  }

  if (!widget) {
    widget = widgets['string'] || null;
  }

  return widget;
};

export const getCustomWidget = (
  schema: Schema,
  customWidget?: TWidgetCustomType
) => {
  if (typeof customWidget === 'function') {
    return customWidget(schema);
  }
  return customWidget;
};
