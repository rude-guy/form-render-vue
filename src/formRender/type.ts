import { CSSProperties, VNodeTypes } from 'vue';
import type { FieldRule, ColProps, RowProps } from '@arco-design/web-vue';
export type SchemaType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'range'
  | 'object'
  | 'email'
  | 'url'
  | 'ip'
  | 'image'
  | string;

export type TDisplayType = 'horizontal' | 'vertical' | 'inline';

export type TFormatType =
  | 'image'
  | 'textarea'
  | 'color'
  | 'email'
  | 'url'
  | 'dateTime'
  | 'date'
  | 'time'
  | 'upload'
  | string;

export interface LayoutBase extends Omit<RowProps, 'gutter'>, ColProps {
  /** 自定义宽度 */
  span?: number;
  /** 表单标签的固定宽度。 */
  labelWidth?: number;
  /** 输入控件最长宽度 */
  maxWidth?: number;
  /** 表单项内部布局 */
  // 标签占位格数
  labelCol?: number;
  // 标签占位格数
  fieldCol?: number;
  /** 标签元素布局选项 */
  labelColProps?: ColProps;
  /** 表单控件布局选项 */
  wrapperColProps?: ColProps;
  /** 标签元素布局组件的 style */
  labelColStyle?: CSSProperties;
  /** 表单控件布局组件的 style */
  wrapperColStyle?: CSSProperties;
}

export interface FormLayout {
  /** 表单项标签的显示方式，可以是 'horizontal'、'vertical' 或 'inline' */
  displayType: TDisplayType;
  /** 表单布局中每行的列数，默认为 3 */
  column: number;
}

export interface FormProps extends LayoutBase, Partial<FormLayout> {
  /**
   * 标签的对齐方向
   */
  labelAlign?: 'left' | 'right';
  /**
   * 是否禁用表单
   */
  disabled?: boolean;
  /**
   * 表单控件大小，默认为 `medium`
   */
  size?: 'mini' | 'small' | 'medium' | 'large';
  /**
   * 表单项校验规则
   */
  rules?: Record<string, FieldRule | FieldRule[]>;
  /**
   * 是否开启自动标签宽度，仅在 layout="horizontal" 下生效。
   */
  autoLabelWidth?: boolean;
}

export type FRGlobalConfig = FormProps & Omit<Schema, 'ruels'> & FormLayout;

export interface IWidgetExpandReturnType<Props = any> {
  widget?: string;
  props?: Props;
}

export type TWidgetCustomType =
  | IWidgetExpandReturnType
  | ((schema: Schema) => IWidgetExpandReturnType);

export type TRenderSlotType =
  | ((schema?: Schema) => JSX.Element | VNodeTypes)
  | JSX.Element
  | VNodeTypes;

export type SlotTypeMap<T> = {
  [K in keyof T]: TRenderSlotType;
};

/** 填充默认值后的schema */
export interface SchemaBase extends LayoutBase, FormLayout {
  /** 表单元素的集合 */
  properties?: { [key: string]: Schema };
  /** 表单字段的类型 */
  type?: SchemaType;
  /** 表单字段的标签 */
  title?: string;
  /** 指定渲染的控件，可以是 form-render 的内置组件，也可以是自定义组件 */
  widget?: string;
  /** 副标题描述 */
  description?: string;
  /** 气泡提示 */
  tooltip?: string;
  /** 自定义标题右侧组件 */
  titleExtraWidget?: TWidgetCustomType;
  /** 更多的说明信息 */
  extra?: string;
  /** 自定义标题extra组件 */
  extraWidget?: TWidgetCustomType;
  /** 帮助信息 */
  help?: string;
  /** 自定义帮助组件 */
  helpWidget?: TWidgetCustomType;
  /** 是否必填 */
  required?: boolean;
  /** 字符串类型为字符串最小长度；数值类型时为最小值；数组类型时为数组最小长度 */
  min?: number;
  /** 字符串类型为字符串最大长度；数值类型时为最大值；数组类型时为数组最大长度 */
  max?: number;
  /** 正则匹配 */
  pattern?: RegExp;
  /** 错误提示 */
  message?: string;
  /** 在已设置的 type 下，如何处理这个 type */
  format?: TFormatType;
  /** 自定义校验函数 */
  validator?: (
    value: any | undefined,
    formData: any
  ) => Promise<{
    status: boolean;
    message: string;
  }>;
  /** 校验规则，参考 Arco Form FieldRule */
  rules?: FieldRule[];
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 当依赖的元素更新时，会触发本元素的重新渲染，用于复杂的表单联动 */
  dependencies?: string[];

  /** 输入内容的提示文本 */
  placeholder?: string | [string, string];
  /** 默认值 */
  defaultvalue: any;
  /** 自定义控件 class 名称 */
  className?: string;
  /** 额外属性配置，如果使用的是 antd 组件，则对应的是 antd 组件的其他属性 */
  props?: Record<string, any>;

  [key: string]: any;
}

export type Schema = Partial<SchemaBase>;
