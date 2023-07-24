export type SchemaType =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | 'block'
  | string;

export interface SchemaBase {
  /**
   * 类型 默认为 object
   */
  type?: SchemaType;
  /**
   * 表单字段的标签
   */
  title?: string;
  /**
   * 自定义组件
   */
  widget?: string;
  /**
   * 是否必填 支持 "{ formData.xxx === '' }" 形式的表达式
   */
  required?: boolean | string;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 副标题描述
   */
  description?: string;
  /**
   * 更多的说明信息，会紧贴在元素下面一行展示
   */
  extra?: string;
  /**
   * 当依赖的元素更新时，会触发本元素的重新渲染，用于复杂的表单联动场景
   */
  dependencies?: string[];
  /**
   * 是否隐藏
   */
  hidden?: boolean;
  /**
   * 自定义控件 class 名称
   */
  className?: string;
  /**
   * 额外属性，透传到对应的嵌套组件中
   */
  props?: Record<string, any>;
  /**
   * 表单元素集合
   */
  properties?: Record<string, Schema>;
  /**
   * 动态项配置，可以是一个嵌套控件
   */
  items?: Schema;
}

export type Schema = Partial<SchemaBase>;

export interface FCProps {}
