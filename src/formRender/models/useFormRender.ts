import { Ref, inject, provide, ref } from 'vue';
const FORM_DATA = Symbol('FORM_DATA');

interface FormRenderProvide {
  formData?: Ref<Record<string, any>>;
}

export const useFormRender = () => {
  const formData = (inject(FORM_DATA) || ref({})) as Ref<Record<string, any>>;

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
    formData,
    getValueByStringPath,
    setValueByStringPath,
  };
};

export const provideFormRender = (params?: FormRenderProvide) => {
  provide(FORM_DATA, params?.formData || ref({}));
};
