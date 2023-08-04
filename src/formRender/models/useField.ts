import { computed, onMounted } from 'vue';
import { Schema } from '../type';
import { getStringFromArrayOrString } from '../utils';
import { useFormRender } from './useFormRender';

interface IFieldProps {
  path: string;
  schema: Schema;
}

export const useField = (props: IFieldProps) => {
  const { schema, path } = props;
  const { formData, getValueByStringPath, setValueByStringPath } =
    useFormRender();
  const placeholder = computed(() =>
    getStringFromArrayOrString(schema.placeholder)
  );

  const model = computed({
    get: () => getValueByStringPath<string>(formData.value, path),
    set: (newValue) => setValueByStringPath(formData.value, path, newValue),
  });

  onMounted(() => {
    model.value = model.value || schema.defaultvalue;
  });

  return {
    placeholder,
    model,
  };
};
