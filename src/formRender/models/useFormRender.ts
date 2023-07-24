import { inject, provide } from 'vue';
import { Schema } from '../type';

const FORM_RENDER_KEY = Symbol('FORM_RENDER_KEY');

interface FormRenderProvide {
  schema: Schema;
  widgets: Record<string, any>;
}

export const useFormRender = () => {
  const { widgets, schema } = inject(FORM_RENDER_KEY) as FormRenderProvide;

  return { widgets, schema };
};

export const provideFormRender = (params: FormRenderProvide) => {
  provide(FORM_RENDER_KEY, params);
};
