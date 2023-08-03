import { ComputedRef, Ref, inject, provide, ref } from 'vue';
import { FormProps, RootSchema } from '../type';
const FORM_RENDER_KEY = Symbol('FORM_RENDER_KEY');
const FORM_DATA = Symbol('FORM_DATA');
const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG');
const GLOBAL_FORM_PROPS = Symbol('GLOBAL_FORM_PROPS');

interface FormRenderProvide {
  globalConfig: Ref<RootSchema>;
  formData?: Ref<Record<string, any>>;
  widgets?: Ref<Record<string, any>>;
  globalFormProps?: ComputedRef<FormProps>;
}

export const useFormRender = () => {
  const widgets = (inject(FORM_RENDER_KEY) || ref({})) as Ref<
    Record<string, any>
  >;
  const formData = (inject(FORM_DATA) || ref({})) as Ref<Record<string, any>>;
  const globalConfig = (inject(GLOBAL_CONFIG) || ref({})) as Ref<RootSchema>;
  const globalFormProps = inject(GLOBAL_FORM_PROPS) as ComputedRef<FormProps>;

  return { widgets, formData, globalConfig, globalFormProps };
};

export const provideFormRender = (params?: FormRenderProvide) => {
  provide(FORM_RENDER_KEY, params?.widgets || ref({}));
  provide(FORM_DATA, params?.formData || ref({}));
  provide(GLOBAL_CONFIG, params?.globalConfig || ref({}));
  provide(GLOBAL_FORM_PROPS, params?.globalFormProps);
};
