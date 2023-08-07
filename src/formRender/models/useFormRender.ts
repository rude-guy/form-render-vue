import { ComputedRef, Ref, ShallowRef, inject, provide, ref } from 'vue';
import { FormProps, RootSchema } from '../type';
const FORM_RENDER_KEY = Symbol('FORM_RENDER_KEY');
const FORM_DATA = Symbol('FORM_DATA');
const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG');
const GLOBAL_FORM_PROPS = Symbol('GLOBAL_FORM_PROPS');

interface FormRenderProvide {
  globalConfig: Ref<RootSchema>;
  formData?: Ref<Record<string, any>>;
  widgets?: ShallowRef<Record<string, any>>;
  globalFormProps?: ComputedRef<FormProps>;
}

export const useFormRender = () => {
  const widgets = (inject(FORM_RENDER_KEY) || ref({})) as ShallowRef<
    Record<string, any>
  >;
  const formData = (inject(FORM_DATA) || ref({})) as Ref<Record<string, any>>;
  const globalConfig = (inject(GLOBAL_CONFIG) || ref({})) as Ref<RootSchema>;
  const globalFormProps = inject(GLOBAL_FORM_PROPS) as ComputedRef<FormProps>;

  // 辅助函数，用于获取嵌套对象属性的值
  const getValueByStringPath = <R extends any>(
    obj: Record<string, any>,
    path: string
  ) => {
    if (path == null) return void 0;
    return path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && Object.hasOwn(acc, key)) {
        return acc[key];
      } else {
        return undefined;
      }
    }, obj) as R;
  };

  // 辅助函数，用于设置嵌套对象属性的值，显式创建对象
  const setValueByStringPath = <V extends any>(
    obj: Record<string, any>,
    path: string,
    value: V
  ) => {
    if (path == null) return;
    const keys = path.split('.');
    keys.reduce((acc, key, index) => {
      if (!acc && typeof acc === 'object') {
        return undefined;
      }
      if (!Object.hasOwn(acc, key)) {
        acc[key] = {};
      }
      if (index === keys.length - 1) {
        acc[key] = value;
      }
      return acc[key];
    }, obj);
  };

  return {
    widgets,
    formData,
    globalConfig,
    globalFormProps,
    getValueByStringPath,
    setValueByStringPath,
  };
};

export const provideFormRender = (params?: FormRenderProvide) => {
  provide(FORM_RENDER_KEY, params?.widgets || ref({}));
  provide(FORM_DATA, params?.formData || ref({}));
  provide(GLOBAL_CONFIG, params?.globalConfig || ref({}));
  provide(GLOBAL_FORM_PROPS, params?.globalFormProps);
};
