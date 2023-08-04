import { computed, onMounted, toRefs } from 'vue';
import { Schema } from '../type';
import { getStringFromArrayOrString } from '../utils';
import { useFormRender } from './useFormRender';

interface IFieldProps {
  path: string;
  schema: Schema;
}

export const useField = (props: IFieldProps) => {
  const { path, schema } = toRefs(props);
  const { formData, getValueByStringPath, setValueByStringPath } =
    useFormRender();
  const placeholder = computed(() =>
    getStringFromArrayOrString(schema.value.placeholder)
  );

  const model = computed({
    get: () => getValueByStringPath<string>(formData.value, path.value),
    set: (newValue) =>
      setValueByStringPath(formData.value, path.value, newValue),
  });

  onMounted(() => {
    model.value = model.value || schema.value.defaultvalue;
  });

  return {
    placeholder,
    model,
  };
};
