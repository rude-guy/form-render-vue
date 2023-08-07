import { ComputedRef, ShallowRef, inject, provide } from 'vue';
import { FRGlobalConfig } from '../type';

const FORM_WIDGETS = Symbol('FORM_WIDGETS');
const FORM_GLOBAL_CONFIG = Symbol('FORM_GLOBAL_CONFIG');

interface FormRenderProvide {
  widgets: ShallowRef<Record<string, any>>;
  globalConfig: ComputedRef<FRGlobalConfig>;
}

/** 全局配置 */
export const useGlobalConfig = () => {
  const widgets = inject(FORM_WIDGETS);
  const globalConfig = inject(FORM_GLOBAL_CONFIG);

  return { widgets, globalConfig } as FormRenderProvide;
};

// 注册全局配置
export const provideGlobalConfig = (params: FormRenderProvide) => {
  provide(FORM_WIDGETS, params.widgets);
  provide(FORM_GLOBAL_CONFIG, params.globalConfig);
};
