import { FieldRule } from '@arco-design/web-vue';
import { CSSProperties } from 'vue';
export type SchemaType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'range'
  | 'object'
  | string;

export type TDisplayType = 'horizontal' | 'vertical' | 'inline';

export interface LayoutBase {
  /** 自定义宽度 */
  span?: string;
  /** 表单标签的固定宽度。 */
  labelWidth?: string;
  /** 输入控件最长宽度 */
  maxWidth?: string;
  /** 表单项内部布局 */
  // 标签占位格数
  labelCol?: number;
  // 标签占位格数
  FieldCol?: number;
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
}

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
  /** 输入内容的提示文本 */
  placeholder?: string | [string, string];
  /** 副标题描述 */
  description?: string;
  /** 气泡提示 */
  tooltip?: string;
  /** 自定义标题右侧组件 */
  titleWidget?: string;
  /** 更多的说明信息 */
  extra?: string;
  /** 是否必填 */
  required?: boolean;
  /** 字符串类型为字符串最小长度；数值类型时为最小值；数组类型时为数组最小长度 */
  min?: number;
  /** 字符串类型为字符串最大长度；数值类型时为最大值；数组类型时为数组最大长度 */
  max?: number;
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
  /** 自定义控件 class 名称 */
  className?: string;
  /** 额外属性配置，如果使用的是 antd 组件，则对应的是 antd 组件的其他属性 */
  props?: Record<string, any>;
  [key: string]: any;
}

export type Schema = Partial<SchemaBase>;

// 顶层schema配置
export interface RootSchema extends Schema {
  column: number;
  displayType?: TDisplayType;
  /** 表单字段的类型 固定 object */
  type: SchemaType;
}

export interface FormLayoutProps
  extends Pick<SchemaBase, 'displayType' | 'column'> {
  /** 表单标签的固定宽度。 */
  labelWidth?: string;

  /** 表单项跨越的列数。 */
  cellSpan?: number;

  /** 表单项标签的对齐方式。 */
  labelAlign?: 'left' | 'right';

  /** 表单项的水平对齐方式（justify-content）。 */
  justify?: CSSProperties['justify-content'];

  /** 表单项的竖直对齐方式（align-items）。 */
  align?: CSSProperties['align-items'];
}
