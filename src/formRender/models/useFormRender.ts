import { Ref, inject, provide, ref } from 'vue';
import { RootSchema } from '../type';
const FORM_RENDER_KEY = Symbol('FORM_RENDER_KEY');
const FORM_DATA = Symbol('FORM_DATA');
const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG');

interface FormRenderProvide {
  globalConfig: Ref<RootSchema>;
  formData?: Ref<Record<string, any>>;
  widgets?: Ref<Record<string, any>>;
}

export const useFormRender = () => {
  const widgets = (inject(FORM_RENDER_KEY) || ref({})) as Ref<
    Record<string, any>
  >;
  const formData = (inject(FORM_DATA) || ref({})) as Ref<Record<string, any>>;
  const globalConfig = (inject(GLOBAL_CONFIG) || ref({})) as Ref<RootSchema>;

  return { widgets, formData, globalConfig };
};

export const provideFormRender = (params?: FormRenderProvide) => {
  provide(FORM_RENDER_KEY, params?.widgets || ref({}));
  provide(FORM_DATA, params?.formData || ref({}));
  provide(GLOBAL_CONFIG, params?.globalConfig || ref({}));
};
